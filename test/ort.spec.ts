import { describe, it, expect, beforeAll } from 'vitest'
import { JSDOM } from 'jsdom'

describe('ORT WASM config', () => {
  let window:any
  beforeAll(async () => {
    const dom = new JSDOM(`<!doctype html><html><head></head><body></body></html>`, { url: 'http://localhost/' })
    // emulate minimal global
    // @ts-ignore
    global.window = dom.window as any
    global.document = dom.window.document as any
    // inject fake ort for config testing
    ;(dom.window as any).ort = { env: { wasm: { numThreads:0, wasmPaths:'' } } }
    await import('../src/ort-config')
    window = dom.window
  })

  it('sets wasmPaths to /vendor/ort/', () => {
    expect(window.ort.env.wasm.wasmPaths).toBe('/vendor/ort/')
  })
})
