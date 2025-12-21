import { describe, it, expect, beforeAll } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

describe('FFT rfft/irfft', () => {
  let rfft:(x:Float32Array)=>Float32Array, irfft:(x:Float32Array)=>Float32Array
  beforeAll(async () => {
    await import('../src/lib/kissfft/lib/kissfft.mjs')
    const api = await import('../src/lib/kissfft/lib/api.js') as any
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
