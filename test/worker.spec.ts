import { describe, it, expect, beforeAll } from 'vitest'

describe('runSeparation smoke', () => {
  let runSeparation: (provider:string, file:File)=>Promise<{url:string}>
  let capturedBlob: Blob | null = null

  beforeAll(async () => {
    const path = await import('node:path')
    const fs = await import('node:fs')
    const resolve = path.resolve

    ;(globalThis as any).Module = {
      locateFile: (p:string)=> resolve(__dirname, '../public/vendor/kissfft/lib/', p),
      wasmBinary: fs.readFileSync(resolve(__dirname, '../public/vendor/kissfft/lib/kissfft.wasm')),
    }
    ;(globalThis as any).fetch = async (url:string)=>{
      if (url.endsWith('kissfft.wasm') || url.includes('/public/vendor/kissfft/lib/kissfft.wasm')){
        const data = fs.readFileSync(resolve(__dirname, '../public/vendor/kissfft/lib/kissfft.wasm'))
        return { ok:true, arrayBuffer: async()=> new Uint8Array(data).buffer } as any
      }
      if (url.includes('/models/UVR-MDX-NET-Inst_HQ_3.onnx')){
        const data = fs.readFileSync(resolve(__dirname, '../public/models/UVR-MDX-NET-Inst_HQ_3.onnx'))
        return { ok:true, arrayBuffer: async()=> new Uint8Array(data).buffer } as any
      }
      return { ok:true, arrayBuffer: async()=> new ArrayBuffer(0) } as any
    }

    const OriginalURL: any = (globalThis as any).URL
    ;(OriginalURL as any).createObjectURL = (b:Blob)=>{ capturedBlob = b; return 'blob://test' }

    const dimF = 3072, dimT = 256
    class FakeTensor {
      type: string; data: Float32Array; dims: number[]
      constructor(type:string, data:Float32Array, dims:number[]){ this.type=type; this.data=data; this.dims=dims }
    }
    ;(globalThis as any).window = {
      ort: {
        env: { wasm: { numThreads: 1, wasmPaths: '/vendor/ort/' } },
        Tensor: FakeTensor,
        InferenceSession: {
          create: async (_model:any, _opts:any)=>{
            return {
              inputNames: ['input'],
              run: async (_inputs:any)=>{
                const arr = new Float32Array(4*dimF*dimT)
                for(let i=0;i<arr.length;i++){
                  if (i < dimF*dimT) arr[i] = 1e-3
                  else if (i < 2*dimF*dimT) arr[i] = 0
                  else if (i < 3*dimF*dimT) arr[i] = 1e-3
                  else arr[i] = 0
                }
                return { out: { data: arr } }
              }
            }
          }
        }
      },
      AudioContext: class {
        sampleRate = 44100
        decodeAudioData(arr: ArrayBuffer){
          const hop = 1024; const dimT = 256; const chunkSize = hop*(dimT-1)
          const len = chunkSize
          const chL = new Float32Array(len); const chR = new Float32Array(len)
          for(let i=0;i<len;i++){ chL[i] = Math.sin(2*Math.PI*440*i/44100); chR[i] = chL[i] }
          return Promise.resolve({
            sampleRate: 44100,
            numberOfChannels: 2,
            length: len,
            getChannelData: (c:number)=> c===0? chL : chR
          } as any)
        }
      }
    } as any

    await import('../public/vendor/kissfft/lib/kissfft.mjs')
    const mod = await import('../src/worker')
    runSeparation = mod.runSeparation
  })

  it('generates non-empty WAV blob URL', async () => {
    const fakeFile = { arrayBuffer: async()=> new ArrayBuffer(8) } as File
    const { url } = await runSeparation('wasm', fakeFile)
    expect(url).toBe('blob://test')
    expect(capturedBlob).toBeTruthy()
    expect((capturedBlob as Blob).size).toBeGreaterThan(44)
  })
})
