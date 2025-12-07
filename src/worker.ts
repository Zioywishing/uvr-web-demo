import '/public/vendor/kissfft/lib/kissfft.mjs'
declare const __kissfft_api__: any
// @ts-expect-error external public module resolution via global mapping in vite config
import { rfft, irfft } from '/public/vendor/kissfft/lib/api.js'

declare global { interface Window { ort:any } }

function hann(n:number){ const w=new Float32Array(n); for(let i=0;i<n;i++) w[i]=0.5*(1-Math.cos((2*Math.PI*i)/(n-1))); return w }
function interleave(l:Float32Array, r:Float32Array){ const out=new Float32Array(l.length*2); for(let i=0,j=0;i<l.length;i++,j+=2){ out[j]=l[i]; out[j+1]=r[i] } return out }
function floatTo16BitPCM(float32:Float32Array){ const out=new Int16Array(float32.length); for(let i=0;i<float32.length;i++){ let s=Math.max(-1, Math.min(1, float32[i])); out[i]=s<0?s*0x8000:s*0x7FFF } return out }
function writeWAVStereoPCM(int16Interleaved:Int16Array, sampleRate=44100){ const blockAlign=4; const byteRate=sampleRate*blockAlign; const dataSize=int16Interleaved.length*2; const buffer=new ArrayBuffer(44+dataSize); const view=new DataView(buffer); const writeStr=(off:number,str:string)=>{ for(let i=0;i<str.length;i++) view.setUint8(off+i, str.charCodeAt(i)) }; writeStr(0,'RIFF'); view.setUint32(4,36+dataSize,true); writeStr(8,'WAVE'); writeStr(12,'fmt '); view.setUint32(16,16,true); view.setUint16(20,1,true); view.setUint16(22,2,true); view.setUint32(24,sampleRate,true); view.setUint32(28,byteRate,true); view.setUint16(32,blockAlign,true); view.setUint16(34,16,true); writeStr(36,'data'); view.setUint32(40,dataSize,true); for(let i=0;i<int16Interleaved.length;i++) view.setInt16(44+2*i, int16Interleaved[i], true); return new Blob([buffer], {type:'audio/wav'}) }

export async function runSeparation(provider:string, file:File){
  const marks: Record<string, number> = {}
  const steps: { name:string, ms:number }[] = []
  const start = (name:string)=>{ marks[name] = (performance?.now?.()||Date.now()) }
  const end = (name:string)=>{ steps.push({ name, ms: (performance?.now?.()||Date.now()) - marks[name] }) }

  const ortAny = (window as any).ort || (globalThis as any).ort;
  if(!ortAny) throw new Error('ORT 未初始化，请检查 ort-config 的加载顺序')
  start('readFile')
  const arr = await file.arrayBuffer()
  end('readFile')

  start('decodeAudio')
  const ctx = new (window.AudioContext||(window as any).webkitAudioContext)({sampleRate:44100})
  const audioBuf = await ctx.decodeAudioData(arr)
  end('decodeAudio')

  let buf = audioBuf
  let didResample = false
  if (audioBuf.sampleRate !== 44100){
    start('resample44100')
    const offline = new OfflineAudioContext(audioBuf.numberOfChannels, Math.round(audioBuf.duration*44100), 44100)
    const src = offline.createBufferSource(); src.buffer = audioBuf; src.connect(offline.destination); src.start(); buf = await offline.startRendering()
    end('resample44100'); didResample = true
  }
  const chL = buf.numberOfChannels>0 ? buf.getChannelData(0) : new Float32Array(buf.length)
  const chR = buf.numberOfChannels>1 ? buf.getChannelData(1) : chL

  const dimF=3072, dimT=256, nfft=6144, hop=1024
  const chunkSize = hop*(dimT-1)
  const segStep = chunkSize - nfft
  const win = hann(nfft)
  const fadeIn = new Float32Array(nfft)
  const fadeOut = new Float32Array(nfft)
  for(let i=0;i<nfft;i++){
    const w = 0.5*(1 - Math.cos(Math.PI * i / (nfft-1)))
    fadeIn[i] = w
    fadeOut[i] = 1 - w
  }

  start('loadModel')
  const modelResp = await fetch('/models/UVR-MDX-NET-Inst_HQ_3.onnx')
  if(!modelResp.ok) throw new Error('无法加载本地模型')
  const modelBuf = new Uint8Array(await modelResp.arrayBuffer())
  end('loadModel')

  let providerUsed = provider
  let fallbackReason = ''
  if(provider==='webgpu'){
    try{
      const nav:any = (globalThis as any).navigator
      if(!nav || !nav.gpu){
        providerUsed = 'wasm'
        fallbackReason = 'navigator.gpu 不可用，直接回退 wasm'
      }else{
        start('webgpuAdapter')
        const adapter = await nav.gpu.requestAdapter()
        end('webgpuAdapter')
        if(!adapter){
          providerUsed = 'wasm'
          fallbackReason = 'webgpu adapter 获取失败，回退 wasm'
        }
      }
    }catch(e:any){
      providerUsed = 'wasm'
      fallbackReason = 'webgpu 预检查失败: '+(e?.message||e)
    }
  }

  if(providerUsed==='webgpu'){
    try{
      start('webgpuInit')
      const nav:any = (globalThis as any).navigator
      const adapter = await (ortAny?.env?.webgpu?.adapter || nav?.gpu?.requestAdapter?.())
      if (!adapter) throw new Error('webgpu adapter 不可用')
      const device = await adapter.requestDevice?.({ requiredFeatures: Array.from(adapter.features||[]) })
      ;(ortAny.env.webgpu as any).adapter = adapter
      ;(ortAny.env.webgpu as any).device = device
      end('webgpuInit')
    }catch(e:any){
      providerUsed = 'wasm'
      fallbackReason = 'webgpu init 失败: '+(e?.message||e)
      steps.push({ name:'webgpuInitError', ms: 0 })
    }
  }

  start('createSession')
  let session: any
  try{
    session = await ortAny.InferenceSession.create(modelBuf, { executionProviders:[providerUsed] })
  }catch(e:any){
    if (providerUsed==='webgpu'){
      providerUsed = 'wasm'
      fallbackReason = 'webgpu session.create 失败: '+(e?.message||e)
      session = await ortAny.InferenceSession.create(modelBuf, { executionProviders:[providerUsed] })
    }else{
      throw e
    }
  }
  end('createSession')
  const inputName = session.inputNames ? session.inputNames[0] : 'input'

  const totalLen = chL.length
  const outL = new Float32Array(totalLen)
  const outR = new Float32Array(totalLen)
  const norm = new Float32Array(totalLen)

  let segCount = 0
  let stftTotal = 0
  let istftTotal = 0
  let runTotal = 0
  const tAllStart = (performance?.now?.()||Date.now())
  for(let pos=0; pos<totalLen; pos+=segStep){
    const segExt = chunkSize + nfft
    const segLenExt = Math.min(totalLen - pos, segExt)
    const segL = new Float32Array(segExt)
    const segR = new Float32Array(segExt)
    segL.set(chL.subarray(pos, pos+segLenExt))
    segR.set(chR.subarray(pos, pos+segLenExt))

    const frames = new Float32Array(4*dimF*dimT)
    const tStftStart = (performance?.now?.()||Date.now())
    for(let t=0;t<dimT;t++){
      const start = t*hop
      const wl = new Float32Array(nfft)
      const wr = new Float32Array(nfft)
      for(let i=0;i<nfft;i++){
        wl[i]=(segL[start+i]||0)*win[i]
        wr[i]=(segR[start+i]||0)*win[i]
      }
      const outSpecL = rfft(wl)
      const outSpecR = rfft(wr)
      for(let k=0;k<dimF;k++){
        const base=k*dimT+t
        const idx=k*2
        frames[base]=outSpecL[idx]
        frames[dimT*dimF+base]=outSpecL[idx+1]
        frames[2*dimT*dimF+base]=outSpecR[idx]
        frames[3*dimT*dimF+base]=outSpecR[idx+1]
      }
    }
    stftTotal += ((performance?.now?.()||Date.now()) - tStftStart)

    const inputTensor = new ortAny.Tensor('float32', frames, [1,4,dimF,dimT])
    const tRunStart = (performance?.now?.()||Date.now())
    let outMap: any
    try{
      outMap = await session.run({[inputName]: inputTensor})
    }catch(e:any){
      if (providerUsed==='webgpu'){
        providerUsed = 'wasm'
        fallbackReason = 'webgpu session.run 失败: '+(e?.message||e)
        session = await ortAny.InferenceSession.create(modelBuf, { executionProviders:[providerUsed] })
        outMap = await session.run({[inputName]: inputTensor})
      }else{
        throw e
      }
    }
    runTotal += ((performance?.now?.()||Date.now()) - tRunStart)
    const firstKey = Object.keys(outMap)[0]
    const arrOut = (outMap as any)[firstKey].data as Float32Array
    const spec = arrOut.length===4*dimF*dimT ? arrOut : frames

    const segOutL = new Float32Array(segExt)
    const segOutR = new Float32Array(segExt)
    const segNorm = new Float32Array(segExt)
    const tIstftStart = (performance?.now?.()||Date.now())
    for(let t=0;t<dimT;t++){
      const start = t*hop
      const specL = new Float32Array(2*nfft)
      const specR = new Float32Array(2*nfft)
      for(let k=0;k<dimF;k++){
        const base=k*dimT+t
        const idx=k*2
        specL[idx]=spec[base]
        specL[idx+1]=spec[dimT*dimF+base]
        specR[idx]=spec[2*dimT*dimF+base]
        specR[idx+1]=spec[3*dimT*dimF+base]
      }
      const xL = irfft(specL)
      const xR = irfft(specR)
      for(let i=0;i<nfft;i++){
        const w = win[i]
        segOutL[start+i] += xL[i]*w
        segOutR[start+i] += xR[i]*w
        segNorm[start+i] += w*w
      }
    }
    istftTotal += ((performance?.now?.()||Date.now()) - tIstftStart)
    for(let i=0;i<segLenExt;i++){
      const d = segNorm[i]
      if(d>1e-12){
        segOutL[i] /= d
        segOutR[i] /= d
      }
    }
    const nextPos = pos + segStep
    const isFirst = pos===0
    const isLast = nextPos >= totalLen
    const writeMax = Math.min(chunkSize, segLenExt)
    const bodyStart = isFirst ? 0 : Math.min(nfft, writeMax)
    for(let i=0;i<bodyStart;i++){
      const idx = pos + i
      if (idx>=totalLen) break
      const w = isFirst ? 1 : fadeIn[i]
      outL[idx] += segOutL[i]*w
      outR[idx] += segOutR[i]*w
      norm[idx] += w
    }
    for(let i=bodyStart;i<Math.min(segStep, writeMax);i++){
      const idx = pos + i
      if (idx>=totalLen) break
      const w = 1
      outL[idx] += segOutL[i]*w
      outR[idx] += segOutR[i]*w
      norm[idx] += w
    }
    if (!isLast){
      const tailLen = Math.min(nfft, Math.max(0, writeMax - segStep))
      for(let j=0;j<tailLen;j++){
        const i = segStep + j
        const idx = pos + i
        if (idx>=totalLen) break
        const w = fadeOut[j]
        outL[idx] += segOutL[i]*w
        outR[idx] += segOutR[i]*w
        norm[idx] += w
      }
    } else {
      for(let i=segStep;i<writeMax;i++){
        const idx = pos + i
        if (idx>=totalLen) break
        const w = 1
        outL[idx] += segOutL[i]*w
        outR[idx] += segOutR[i]*w
        norm[idx] += w
      }
    }
    segCount++
  }
  const tAllMs = (performance?.now?.()||Date.now()) - tAllStart

  for(let i=0;i<totalLen;i++){
    const d = norm[i]
    if(d>1e-12){
      outL[i] /= d
      outR[i] /= d
    }
  }

  steps.push({ name:'stftTotal', ms: stftTotal })
  steps.push({ name:'sessionRunTotal', ms: runTotal })
  steps.push({ name:'istftTotal', ms: istftTotal })
  steps.push({ name:'overallSegments', ms: segCount })
  steps.push({ name:'overallPipeline', ms: tAllMs })

  const interleaved = interleave(outL, outR)
  start('wavEncode')
  const int16 = floatTo16BitPCM(interleaved)
  const wavBlob = writeWAVStereoPCM(int16, 44100)
  end('wavEncode')
  const url = URL.createObjectURL(wavBlob)
  const metrics = {
    steps,
    providerRequested: provider,
    providerUsed,
    fallbackReason,
    segmentCount: segCount,
    sampleRate: 44100,
    inputDurationSec: buf.duration,
    didResample
  }
  return { url, metrics }
}
