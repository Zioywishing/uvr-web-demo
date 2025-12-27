import wasmUrl from './lib/ort/ort-wasm-simd-threaded.wasm?url';
import jsepWasmUrl from './lib/ort/ort-wasm-simd-threaded.jsep.wasm?url';
import jsepMjsContent from './lib/ort/ort-wasm-simd-threaded.jsep.mjs?raw';

import type { Ort } from './types/ort.d.ts';

const jsepMjsUrl = URL.createObjectURL(new Blob([jsepMjsContent], { type: 'application/javascript' }));

const ortAny = window.ort || (globalThis as unknown as { ort: Ort }).ort;
if (ortAny && ortAny.env && ortAny.env.wasm) {
  ortAny.env.wasm.wasmPaths = {
      'mjs': jsepMjsUrl,
      'wasm': jsepWasmUrl,
      'ort-wasm-simd-threaded.wasm': wasmUrl,
      'ort-wasm-simd-threaded.jsep.wasm': jsepWasmUrl,
      'ort-wasm-simd-threaded.jsep.mjs': jsepMjsUrl
  };
  const hc = Math.max(1, Math.min(8, (navigator as { hardwareConcurrency?: number })?.hardwareConcurrency || 1));
  ortAny.env.wasm.numThreads = hc;
}
