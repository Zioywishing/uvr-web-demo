
// Variables to hold imported modules
let ORT: any;
let ort: any;
let rfft: any, irfft: any;
let ortWasmBase64: string;

// Initialization Promise
const initPromise = (async () => {
    try {
        // Dynamic imports to catch errors
        const ortModule = await import('./lib/ort/ort.all.mjs');
        ORT = ortModule;
        ort = ORT;

        const kissModule = await import('./lib/kissfft/lib/api.js');
        rfft = kissModule.rfft;
        irfft = kissModule.irfft;

        const wasmModule = await import('./ort-wasm-data');
        ortWasmBase64 = wasmModule.ortWasmBase64;

        // Initialize ORT WASM
        if (ort.env && ort.env.wasm) {
            const wasmUrl = base64ToBlobUrl(ortWasmBase64, 'application/wasm');
            ort.env.wasm.wasmPaths = {
                'ort-wasm-simd-threaded.wasm': wasmUrl,
                'ort-wasm-simd.wasm': wasmUrl, 
                'ort-wasm.wasm': wasmUrl 
            };
            ort.env.wasm.numThreads = 1; 
        }
    } catch (e: any) {
        // Post error to main thread
        self.postMessage({
            type: 'error',
            error: 'Worker initialization failed: ' + (e.message || e)
        });
        throw e; // Re-throw to ensure await initPromise fails
    }
})();

// Helper to create Blob URL from Base64
function base64ToBlobUrl(base64: string, type: string) {
    const binStr = atob(base64);
    const len = binStr.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binStr.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type });
    return URL.createObjectURL(blob);
}

declare global {
    interface Window {
        ort: any
    }
}


// Helpers
function hann(n: number) {
    const w = new Float32Array(n);
    for (let i = 0; i < n; i++) w[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (n - 1)));
    return w
}

function interleave(l: Float32Array, r: Float32Array) {
    const out = new Float32Array(l.length * 2);
    for (let i = 0, j = 0; i < l.length; i++, j += 2) {
        out[j] = l[i];
        out[j + 1] = r[i]
    }
    return out
}

function floatTo16BitPCM(float32: Float32Array) {
    const out = new Int16Array(float32.length);
    for (let i = 0; i < float32.length; i++) {
        let s = Math.max(-1, Math.min(1, float32[i]));
        out[i] = s < 0 ? s * 0x8000 : s * 0x7FFF
    }
    return out
}

function writeWAVStereoPCM(int16Interleaved: Int16Array, sampleRate = 44100) {
    const blockAlign = 4;
    const byteRate = sampleRate * blockAlign;
    const dataSize = int16Interleaved.length * 2;
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);
    const writeStr = (off: number, str: string) => {
        for (let i = 0; i < str.length; i++) view.setUint8(off + i, str.charCodeAt(i))
    };
    writeStr(0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    writeStr(8, 'WAVE');
    writeStr(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 2, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, 16, true);
    writeStr(36, 'data');
    view.setUint32(40, dataSize, true);
    for (let i = 0; i < int16Interleaved.length; i++) view.setInt16(44 + 2 * i, int16Interleaved[i], true);
    return new Blob([buffer], {
        type: 'audio/wav'
    })
}

let __webgpu_init_promise: Promise < void > | null = null

self.onmessage = async (e) => {
    const {
        type,
        data
    } = e.data;

    if (type === 'run') {
        try {
            // Wait for initialization
            await initPromise;

            const result = await runSeparationInner(data);
            self.postMessage({
                type: 'result',
                data: result
            });
        } catch (err: any) {
            self.postMessage({
                type: 'error',
                error: err.message || String(err)
            });
        }
    }
};

interface RunData {
    file?: File; // Raw file passed from main thread
    fileBuffer?: ArrayBuffer; // Or buffer
    // Or pre-decoded:
    chL?: Float32Array;
    chR?: Float32Array;
    sampleRate: number; // Should be 44100
    modelFile: string; // Or ArrayBuffer if passed
    provider: string;
    metrics: any; // Passed from main thread (loading/decoding times)
}

async function runSeparationInner(inputData: RunData) {
    const {
        provider,
        modelFile,
        metrics
    } = inputData;

    const steps: {
        name: string,
        ms: number
    } [] = metrics.steps || [];
    const marks: Record < string, number > = {};
    const start = (name: string) => {
        marks[name] = (performance ?.now ?.() || Date.now())
    };
    const end = (name: string) => {
        steps.push({
            name,
            ms: (performance ?.now ?.() || Date.now()) - marks[name]
        })
    };

    let chL: Float32Array;
    let chR: Float32Array;

    // Decoding Logic in Worker
    if (inputData.chL && inputData.chR) {
        chL = inputData.chL;
        chR = inputData.chR;
    } else {
        throw new Error('No audio data provided');
    }

    // We assume ORT is initialized by import

    start('loadModel')
    const defaultModel = 'UVR-MDX-NET-Inst_HQ_3.onnx'
    const modelName = modelFile || defaultModel
    // If modelFile is just a name, fetch it. If it's a path, use it.
    // In worker, we can use fetch.
    const modelPath = modelName.startsWith('/') || modelName.startsWith('http') ? modelName : `/models/${modelName}`
    
    // Check if modelFile is actually an ArrayBuffer (if we decide to pass buffer)
    // For now assume string path.
    const modelResp = await fetch(modelPath)
    if (!modelResp.ok) throw new Error('无法加载本地模型')
    const modelBuf = new Uint8Array(await modelResp.arrayBuffer())
    end('loadModel')

    let dimF = 3072,
        dimT = 256,
        nfft = 6144,
        hop = 1024
    if (modelName.includes('9662') || modelName.includes('Inst_3') && !modelName.includes('HQ') || modelName.includes('KARA') || modelName.includes('Kim_Inst')) {
        dimF = 2048
        nfft = 4096
    }

    const chunkSize = hop * (dimT - 1)
    const segStep = chunkSize - nfft
    const win = hann(nfft)
    const fadeIn = new Float32Array(nfft)
    const fadeOut = new Float32Array(nfft)
    for (let i = 0; i < nfft; i++) {
        const w = 0.5 * (1 - Math.cos(Math.PI * i / (nfft - 1)))
        fadeIn[i] = w
        fadeOut[i] = 1 - w
    }

    let providerUsed = provider
    let fallbackReason = ''

    // WebGPU Check in Worker
    if (provider === 'webgpu') {
        const nav: any = (self.navigator as any)
        if (!nav || !nav.gpu) {
            throw new Error('navigator.gpu 不可用 (Worker)')
        }
        // Adapter check is usually async
    }

    // WebGL Check in Worker
    if (provider === 'webgl') {
        let webglOk = false
        if (typeof OffscreenCanvas !== 'undefined') {
            const canvas = new OffscreenCanvas(1, 1);
            const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
            webglOk = !!gl
        }
        if (!webglOk) {
             // Fallback or error
             // throw new Error('webgl 不可用 (Worker)')
             // Or maybe silent fallback?
             // Original code threw error.
             throw new Error('webgl 不可用 (Worker)')
        }
    }

    if (providerUsed === 'webgpu') {
        try {
            start('webgpuInit')
            const nav: any = (self.navigator as any)
            const envWgpu: any = (ort.env.webgpu = (ort.env.webgpu || {}))
            if (envWgpu.device) {
                end('webgpuInit')
            } else {
                if (!__webgpu_init_promise) {
                    __webgpu_init_promise = (async () => {
                        const adapter = await nav ?.gpu ?.requestAdapter ?.()
                        if (!adapter) throw new Error('webgpu adapter 不可用')
                        const device = await adapter.requestDevice ?.({
                            requiredFeatures: Array.from(adapter.features || [])
                        })
                        envWgpu.device = device
                    })()
                }
                await __webgpu_init_promise
                end('webgpuInit')
            }
        } catch (e: any) {
            steps.push({
                name: 'webgpuInitError',
                ms: 0
            })
            throw e
        }
    }

    start('createSession')
    let session: any
    try {
        session = await ort.InferenceSession.create(modelBuf, {
            executionProviders: [providerUsed]
        })
    } catch (e: any) {
        throw e
    }
    end('createSession')
    const inputName = session.inputNames ? session.inputNames[0] : 'input'

    const sr = 44100
    const padSamples = Math.max(0, Math.floor(0.4 * sr))
    if (padSamples > 0) {
        const lPad = new Float32Array(padSamples + chL.length)
        const rPad = new Float32Array(padSamples + chR.length)
        lPad.set(chL, padSamples)
        rPad.set(chR, padSamples)
        chL = lPad
        chR = rPad
    }
    const totalLen = chL.length
    const outL = new Float32Array(totalLen)
    const outR = new Float32Array(totalLen)
    const norm = new Float32Array(totalLen)

    let segCount = 0
    let stftTotal = 0
    let istftTotal = 0
    let runTotal = 0
    const tAllStart = (performance ?.now ?.() || Date.now())
    const headFadeSamples = Math.min(chunkSize, Math.max(1, Math.floor(0.015 * sr)))

    let lastProgress = -1;

    for (let pos = 0; pos < totalLen; pos += segStep) {
        const progress = Math.floor((pos / totalLen) * 100);
        if (progress > lastProgress) {
            lastProgress = progress;
            self.postMessage({
                type: 'progress',
                data: progress
            });
        }

        const segExt = chunkSize + nfft
        const segLenExt = Math.min(totalLen - pos, segExt)
        const segL = new Float32Array(segExt)
        const segR = new Float32Array(segExt)
        segL.set(chL.subarray(pos, pos + segLenExt))
        segR.set(chR.subarray(pos, pos + segLenExt))

        const frames = new Float32Array(4 * dimF * dimT)
        const tStftStart = (performance ?.now ?.() || Date.now())
        for (let t = 0; t < dimT; t++) {
            const start = t * hop
            const wl = new Float32Array(nfft)
            const wr = new Float32Array(nfft)
            for (let i = 0; i < nfft; i++) {
                wl[i] = (segL[start + i] || 0) * win[i]
                wr[i] = (segR[start + i] || 0) * win[i]
            }
            const outSpecL = rfft(wl)
            const outSpecR = rfft(wr)
            for (let k = 0; k < dimF; k++) {
                const base = k * dimT + t
                const idx = k * 2
                frames[base] = outSpecL[idx]
                frames[dimT * dimF + base] = outSpecL[idx + 1]
                frames[2 * dimT * dimF + base] = outSpecR[idx]
                frames[3 * dimT * dimF + base] = outSpecR[idx + 1]
            }
        }
        stftTotal += ((performance ?.now ?.() || Date.now()) - tStftStart)

        const inputTensor = new ort.Tensor('float32', frames, [1, 4, dimF, dimT])
        const tRunStart = (performance ?.now ?.() || Date.now())
        let outMap: any
        try {
            outMap = await session.run({
                [inputName]: inputTensor
            })
        } catch (e: any) {
            throw e
        }
        runTotal += ((performance ?.now ?.() || Date.now()) - tRunStart)
        const firstKey = Object.keys(outMap)[0]
        const arrOut = (outMap as any)[firstKey].data as Float32Array
        const spec = arrOut.length === 4 * dimF * dimT ? arrOut : frames

        const segOutL = new Float32Array(segExt)
        const segOutR = new Float32Array(segExt)
        const segNorm = new Float32Array(segExt)
        const tIstftStart = (performance ?.now ?.() || Date.now())
        for (let t = 0; t < dimT; t++) {
            const start = t * hop
            const specL = new Float32Array(2 * nfft)
            const specR = new Float32Array(2 * nfft)
            for (let k = 0; k < dimF; k++) {
                const base = k * dimT + t
                const idx = k * 2
                specL[idx] = spec[base]
                specL[idx + 1] = spec[dimT * dimF + base]
                specR[idx] = spec[2 * dimT * dimF + base]
                specR[idx + 1] = spec[3 * dimT * dimF + base]
            }
            const xL = irfft(specL)
            const xR = irfft(specR)
            for (let i = 0; i < nfft; i++) {
                const w = win[i]
                segOutL[start + i] += xL[i] * w
                segOutR[start + i] += xR[i] * w
                segNorm[start + i] += w * w
            }
        }
        istftTotal += ((performance ?.now ?.() || Date.now()) - tIstftStart)
        const dMin = 1e-8
        for (let i = 0; i < segLenExt; i++) {
            const d = segNorm[i]
            const dd = d >= dMin ? d : dMin
            segOutL[i] /= dd
            segOutR[i] /= dd
        }
        const nextPos = pos + segStep
        const isFirst = pos === 0
        const isLast = nextPos >= totalLen
        const writeMax = Math.min(chunkSize, segLenExt)
        const headLen = isFirst ? Math.min(headFadeSamples, writeMax) : Math.min(nfft, writeMax)
        for (let i = 0; i < headLen; i++) {
            const idx = pos + i
            if (idx >= totalLen) break
            const w = fadeIn[i]
            outL[idx] += segOutL[i] * w
            outR[idx] += segOutR[i] * w
            norm[idx] += w
        }
        for (let i = headLen; i < Math.min(segStep, writeMax); i++) {
            const idx = pos + i
            if (idx >= totalLen) break
            const w = 1
            outL[idx] += segOutL[i] * w
            outR[idx] += segOutR[i] * w
            norm[idx] += w
        }
        if (!isLast) {
            const tailLen = Math.min(nfft, Math.max(0, writeMax - segStep))
            for (let j = 0; j < tailLen; j++) {
                const i = segStep + j
                const idx = pos + i
                if (idx >= totalLen) break
                const w = fadeOut[j]
                outL[idx] += segOutL[i] * w
                outR[idx] += segOutR[i] * w
                norm[idx] += w
            }
        } else {
            for (let i = segStep; i < writeMax; i++) {
                const idx = pos + i
                if (idx >= totalLen) break
                const w = 1
                outL[idx] += segOutL[i] * w
                outR[idx] += segOutR[i] * w
                norm[idx] += w
            }
        }
        segCount++
    }
    const tAllMs = (performance ?.now ?.() || Date.now()) - tAllStart

    for (let i = 0; i < totalLen; i++) {
        const d = norm[i]
        if (d > 1e-12) {
            outL[i] /= d
            outR[i] /= d
        }
    }

    steps.push({
        name: 'stftTotal',
        ms: stftTotal
    })
    steps.push({
        name: 'sessionRunTotal',
        ms: runTotal
    })
    steps.push({
        name: 'istftTotal',
        ms: istftTotal
    })
    steps.push({
        name: 'overallSegments',
        ms: segCount
    })
    steps.push({
        name: 'overallPipeline',
        ms: tAllMs
    })

    const trimStart = padSamples
    const interleaved = interleave(outL.subarray(trimStart), outR.subarray(trimStart))
    start('wavEncode')
    const int16 = floatTo16BitPCM(interleaved)
    const wavBlob = writeWAVStereoPCM(int16, 44100)
    end('wavEncode')
    // In Worker, we can return Blob. The Main thread will create URL.
    
    // We update metrics
    const resultMetrics = {
        steps,
        providerRequested: provider,
        providerUsed,
        fallbackReason,
        segmentCount: segCount,
        sampleRate: 44100,
        // We don't have input buffer duration easily here unless passed.
        // But we have interleaved length.
        outputDurationSec: interleaved.length / 2 / 44100,
        didResample: metrics.didResample,
        padSamples,
        trimStartSamples: trimStart
    }

    return { blob: wavBlob, metrics: resultMetrics };
}
