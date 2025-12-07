import { describe, it, expect, beforeAll } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

describe('FFT rfft/irfft', () => {
  let rfft:(x:Float32Array)=>Float32Array, irfft:(x:Float32Array)=>Float32Array
  beforeAll(async () => {
    ;(globalThis as any).Module = {
      locateFile: (path:string)=> resolve(__dirname, '../public/vendor/kissfft/lib/', path),
      wasmBinary: readFileSync(resolve(__dirname, '../public/vendor/kissfft/lib/kissfft.wasm'))
    }
    ;(globalThis as any).fetch = async (url:string)=>{
      const p = resolve(__dirname, '../public/vendor/kissfft/lib/kissfft.wasm')
      const data = readFileSync(p)
      return {
        ok: true,
        arrayBuffer: async () => new Uint8Array(data).buffer
      } as any
    }
    await import('../public/vendor/kissfft/lib/kissfft.mjs')
    const api = await import('../public/vendor/kissfft/lib/api.js') as any
    rfft = api.rfft; irfft = api.irfft
  })
  it('roundtrip for impulse', () => {
    const N=16; const x=new Float32Array(N); x[0]=1
    const spec = rfft(x)
    const y = irfft(spec)
    expect(y.length).toBe(N)
    const err = y.reduce((s,v,i)=> s+Math.abs(v-x[i]), 0)
    expect(err).toBeLessThan(1e-4)
  })
})
