declare global { interface Window { ort: any } }

const ortAny = (window as any).ort || (globalThis as any).ort;
if (ortAny && ortAny.env && ortAny.env.wasm) {
  ortAny.env.wasm.wasmPaths = '/vendor/ort/';
  const hc = Math.max(1, Math.min(8, (navigator as any)?.hardwareConcurrency || 1));
  ortAny.env.wasm.numThreads = hc;
}
