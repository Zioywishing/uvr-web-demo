import { runSeparation, startStreamSeparation, decodeAudioFile } from './worker'
import { StreamPlayer } from './stream-player'
import { Howl } from 'howler'
import { interleave, floatTo16BitPCM, writeWAVStereoPCM } from './wav-utils'

export function runSeparationUI(){
  const logEl = document.getElementById('log') as HTMLPreElement
  const btn = document.getElementById('run') as HTMLButtonElement
  let lastLogWasProgress = false;
  function log(m:string){ 
      lastLogWasProgress = false;
      logEl.textContent += m+'\n'; 
      logEl.scrollTop = logEl.scrollHeight 
  }
  function updateProgress(p: number) {
      const msg = `Progress: ${p}%`;
      if (lastLogWasProgress) {
           let text = logEl.textContent || '';
           const effectiveEnd = text.endsWith('\n') ? text.length - 1 : text.length;
           const lastLineStart = text.lastIndexOf('\n', effectiveEnd - 1) + 1;
           logEl.textContent = text.substring(0, lastLineStart) + msg + '\n';
      } else {
          logEl.textContent += msg + '\n';
      }
      lastLogWasProgress = true;
      logEl.scrollTop = logEl.scrollHeight;
  }
  const modelSel = document.getElementById('modelSel') as HTMLSelectElement
  const defaultModel = 'UVR-MDX-NET-Inst_HQ_3.onnx'
  const outAudio = document.getElementById('outAudio') as HTMLAudioElement
  const origAudio = document.getElementById('origAudio') as HTMLAudioElement
  const mixRatio = document.getElementById('mixRatio') as HTMLInputElement
  const mixText = document.getElementById('mixRatioText') as HTMLSpanElement
  if (mixRatio && mixText){ mixRatio.value = mixRatio.value||'50'; mixText.textContent = Math.round(Math.max(0, Math.min(100, Number(mixRatio.value))))+'%' }
  let syncRaf: number | null = null
  let outHowl: Howl | null = null
  let origHowl: Howl | null = null
  function updateMix(){
    const r = Math.max(0, Math.min(100, Number(mixRatio?.value||'50'))) / 100
    if (mixText) mixText.textContent = Math.round(r*100)+'%'
    outHowl?.volume(r)
    origHowl?.volume(1 - r)
  }
  if (mixRatio) mixRatio.addEventListener('input', updateMix)
  function startSync(){
    const tick = ()=>{
      const tOut = outHowl ? (typeof outHowl.seek()==='number' ? (outHowl.seek() as number) : outAudio.currentTime) : outAudio.currentTime
      const tOrig = origHowl ? (typeof origHowl.seek()==='number' ? (origHowl.seek() as number) : outAudio.currentTime) : outAudio.currentTime
      const d = Math.abs(tOrig - tOut)
      if (origHowl && d > 0.05) origHowl.seek(tOut)
      syncRaf = (globalThis as any).requestAnimationFrame(tick)
    }
    if (syncRaf==null) syncRaf = (globalThis as any).requestAnimationFrame(tick)
  }
  function stopSync(){
    if (syncRaf!=null){ (globalThis as any).cancelAnimationFrame(syncRaf); syncRaf = null }
  }
  outAudio?.addEventListener('play', async ()=>{
    outAudio.muted = true; origAudio.muted = true
    const rate = outAudio.playbackRate
    if (outHowl) outHowl.rate(rate)
    if (origHowl) origHowl.rate(rate)
    const t = outAudio.currentTime
    if (outHowl){
      if (outHowl.state()==='loaded'){ outHowl.seek(t); outHowl.play() } else { outHowl.once('load', ()=>{ outHowl!.seek(t); outHowl!.play() }) }
    }
    if (origHowl){
      if (origHowl.state()==='loaded'){ origHowl.seek(t); origHowl.play() } else { origHowl.once('load', ()=>{ origHowl!.seek(t); origHowl!.play() }) }
    }
    startSync()
  })
  outAudio?.addEventListener('pause', ()=>{ outHowl?.pause(); origHowl?.pause(); stopSync() })
  outAudio?.addEventListener('seeking', ()=>{ const t = outAudio.currentTime; outHowl?.seek(t); origHowl?.seek(t) })
  outAudio?.addEventListener('ratechange', ()=>{ const r = outAudio.playbackRate; outHowl?.rate(r); origHowl?.rate(r) })
  outAudio?.addEventListener('timeupdate', ()=>{ const t = outAudio.currentTime; const cur = origHowl && typeof origHowl.seek()==='number' ? (origHowl.seek() as number) : t; const d = Math.abs(cur - t); if (origHowl && d>0.1) origHowl.seek(t) })
  ;(async ()=>{
    try{
      const resp = await fetch('/models/index.json')
      if (resp.ok){
        const list = await resp.json() as string[]
        const models = Array.isArray(list) ? list : []
        const unique = Array.from(new Set(models))
        unique.forEach(name=>{
          const opt = document.createElement('option')
          opt.value = name
          opt.textContent = name
          modelSel?.appendChild(opt)
        })
        const foundDefault = unique.includes(defaultModel)
        if (modelSel && foundDefault) modelSel.value = defaultModel
      } else {
        throw new Error('index.json 加载失败')
      }
    }catch{
      if (modelSel){
        const opt = document.createElement('option')
        opt.value = defaultModel
        opt.textContent = defaultModel
        modelSel.appendChild(opt)
        modelSel.value = defaultModel
      }
    }
  })()
  btn.addEventListener('click', async ()=>{
    const provider = (document.getElementById('provider') as HTMLSelectElement).value
    const audioFile = (document.getElementById('audio') as HTMLInputElement).files?.[0]
    const streamMode = (document.getElementById('streamMode') as HTMLInputElement).checked;

    if(!audioFile){ log('请先选择音频文件'); return }

    if (streamMode) {
        // Streaming Mode
        let stream: ReturnType<typeof startStreamSeparation> | undefined;
        try {
            btn.disabled = true;
            log('模式: 流式播放 (边分离边听)');
            log('正在解码音频...');
            const chosenModel = modelSel?.value || defaultModel;
            const decoded = await decodeAudioFile(audioFile);
            log(`解码完成 (时长: ${decoded.duration.toFixed(2)}s)`);

            const streamPlayer = new StreamPlayer();
            // Store streamPlayer globally or on window to prevent GC
            (window as any).__streamPlayer = streamPlayer;
            
            const accumulatedL: Float32Array[] = [];
            const accumulatedR: Float32Array[] = [];
            let totalSamples = 0;

            const onEnd = (error?: string) => {
                 if (error) {
                     log('流式处理出错: ' + error);
                     stream?.terminate();
                     btn.disabled = false;
                     return;
                 }

                 log('流式处理完成');
                 stream?.terminate();
                 
                 // Generate WAV asynchronously to avoid blocking UI/Audio
                 setTimeout(() => {
                    try {
                        if (totalSamples === 0) {
                            log('警告: 没有生成音频数据');
                            btn.disabled = false;
                            return;
                        }

                        // Merge chunks
                        const finalL = new Float32Array(totalSamples);
                        const finalR = new Float32Array(totalSamples);
                        let offset = 0;
                        for (let i = 0; i < accumulatedL.length; i++) {
                            finalL.set(accumulatedL[i], offset);
                            finalR.set(accumulatedR[i], offset);
                            offset += accumulatedL[i].length;
                        }
                        
                        // Generate WAV
                        const interleaved = interleave(finalL, finalR);
                        const pcm = floatTo16BitPCM(interleaved);
                        const blob = writeWAVStereoPCM(pcm, 44100);
                        const url = URL.createObjectURL(blob);
                        
                        // Setup Download Link
                        const a = document.getElementById('downloadLink') as HTMLAnchorElement;
                        a.href = url; 
                        a.download = 'instrumental.wav';
                        log('生成WAV可下载 (点击下方链接)');

                        // Delay switching playback source until stream playback is likely done
                        // Or just set it but don't autoplay.
                        // Ideally we should wait for streamPlayer to finish.
                        // For now, we update the UI elements but don't stop streamPlayer.
                        
                        outAudio.src = url;
                        const origUrl = URL.createObjectURL(audioFile);
                        origAudio.src = origUrl;
                        
                        try{ outHowl?.unload() }catch{}
                        try{ origHowl?.unload() }catch{}
                        outHowl = new Howl({ src:[url], html5:false, preload:true, format:['wav'] });
                        
                        const ext = (audioFile.name||'').split('.').pop()?.toLowerCase();
                        if (ext){
                            origHowl = new Howl({ src:[origUrl], html5:false, preload:true, format:[ext] });
                        } else {
                            origHowl = new Howl({ src:[origUrl], html5:false, preload:true });
                        }
                        
                        updateMix();
                        
                        // Log durations
                        const logDurations = ()=>{
                            const o1 = Number.isFinite(outAudio.duration) ? outAudio.duration : NaN
                            const o2 = Number.isFinite(origAudio.duration) ? origAudio.duration : NaN
                            const parts: string[] = []
                            if (!Number.isNaN(o1)) parts.push(`outAudio.duration=${o1.toFixed(3)}s`)
                            if (!Number.isNaN(o2)) parts.push(`origAudio.duration=${o2.toFixed(3)}s`)
                            if (parts.length){
                            log('播放时长\n'+parts.join('\n'))
                            }
                        }
                        outAudio.addEventListener('loadedmetadata', logDurations, { once: true })
                        origAudio.addEventListener('loadedmetadata', logDurations, { once: true })
                    } catch (e: any) {
                        console.error('Error creating WAV:', e);
                        log('生成文件失败: ' + e.message);
                    }

                    btn.disabled = false;
                 }, 100);
            };

            stream = startStreamSeparation(provider, chosenModel, (res) => {
                streamPlayer.push(res.chL, res.chR);
                accumulatedL.push(res.chL);
                accumulatedR.push(res.chR);
                totalSamples += res.chL.length;
            }, onEnd);

            log('开始流式处理与播放...');
            
            // Push chunks as fast as possible (Greedy Processing)
            const { chL, chR } = decoded;
            const chunkSize = 22050; // 0.5s
            const totalLen = chL.length;
            let offset = 0;

            // Ensure AudioContext is running
            streamPlayer.resume().catch((e: unknown) => console.error('Failed to resume audio context:', e));

            async function pushNext() {
                if (offset >= totalLen) {
                    stream?.stop();
                    log('流式输入结束，等待处理完成...');
                    return;
                }

                // Throttle push: 1 chunk per tick, wait 5ms
                // This is fast enough (>50x real-time) but avoids message queue overload
                const chunksPerTick = 1; 
                for (let i = 0; i < chunksPerTick && offset < totalLen; i++) {
                    const end = Math.min(offset + chunkSize, totalLen);
                    const chunkL = chL.slice(offset, end);
                    const chunkR = chR.slice(offset, end);
                    
                    stream?.push(chunkL, chunkR);
                    offset = end;
                }

                setTimeout(pushNext, 5); 
            }

            pushNext();

        } catch (e: any) {
            console.error(e);
            log('错误: ' + (e?.message || e));
            stream?.terminate();
            btn.disabled = false;
        }
        return;
    }

    try{
      log('开始运行...')
      const chosenModel = modelSel?.value || defaultModel
      const { url, metrics } = await runSeparation(provider, audioFile, chosenModel, updateProgress)
      outAudio.src = url
      const origUrl = URL.createObjectURL(audioFile)
      origAudio.src = origUrl
      try{ outHowl?.unload() }catch{}
      try{ origHowl?.unload() }catch{}
      outHowl = new Howl({ src:[url], html5:false, preload:true, format:['wav'] })
      const ext = (audioFile.name||'').split('.').pop()?.toLowerCase()
      if (ext){
        origHowl = new Howl({ src:[origUrl], html5:false, preload:true, format:[ext] })
      } else {
        origHowl = new Howl({ src:[origUrl], html5:false, preload:true })
      }
      updateMix()
      const a = document.getElementById('downloadLink') as HTMLAnchorElement
      a.href = url; a.download = 'instrumental.wav'
      log('完成，生成WAV可试听/下载')
      if (metrics){
        const gpuEl = document.getElementById('gpu') as HTMLPreElement
        const lines = metrics.steps.map((s: any)=> `${s.name}: ${s.ms.toFixed ? s.ms.toFixed(2)+'ms' : String(s.ms)}`)
        lines.unshift(`provider: ${metrics.providerUsed} (requested: ${metrics.providerRequested})`)
        if (metrics.fallbackReason) lines.unshift(`fallback: ${metrics.fallbackReason}`)
        lines.push(`segments: ${metrics.segmentCount}`)
        lines.push(`inputDurationSec: ${metrics.inputDurationSec?.toFixed?.(2)}`)
        if ((metrics as any).outputDurationSec){
          lines.push(`outputDurationSec: ${(metrics as any).outputDurationSec?.toFixed?.(2)}`)
        }
        if ((metrics as any).inputSampleFrames!=null){
          lines.push(`inputSampleFrames: ${(metrics as any).inputSampleFrames}`)
        }
        if ((metrics as any).outputSampleFrames!=null){
          lines.push(`outputSampleFrames: ${(metrics as any).outputSampleFrames}`)
        }
        if ((metrics as any).padSamples!=null){
          lines.push(`padSamples: ${(metrics as any).padSamples}`)
        }
        if ((metrics as any).trimStartSamples!=null){
          lines.push(`trimStartSamples: ${(metrics as any).trimStartSamples}`)
        }
        lines.push(`resampled44100: ${metrics.didResample}`)
        log('性能计时\n'+lines.join('\n'))
        if (gpuEl){
          const extra: string[] = []
          const nav: any = (globalThis as any).navigator
          extra.push('userAgent='+(nav?.userAgent||''))
          const ortAny = (globalThis as any).ort
          extra.push('ortVersion='+(ortAny?.version||''))
          gpuEl.textContent += '\n'+extra.join('\n')
        }
      }
      const logDurations = ()=>{
        const o1 = Number.isFinite(outAudio.duration) ? outAudio.duration : NaN
        const o2 = Number.isFinite(origAudio.duration) ? origAudio.duration : NaN
        const parts: string[] = []
        if (!Number.isNaN(o1)) parts.push(`outAudio.duration=${o1.toFixed(3)}s`)
        if (!Number.isNaN(o2)) parts.push(`origAudio.duration=${o2.toFixed(3)}s`)
        if (parts.length){
          log('播放时长\n'+parts.join('\n'))
        }
      }
      outAudio.addEventListener('loadedmetadata', logDurations, { once: true })
      origAudio.addEventListener('loadedmetadata', logDurations, { once: true })
    }catch(e:any){ console.error(e); log('错误: '+(e?.message||e)) }
  })
}
