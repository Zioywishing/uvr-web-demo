
import ortWasmSimdThreadedUrl from './lib/ort/ort-wasm-simd-threaded.wasm?url';
import ortWasmSimdThreadedJsepUrl from './lib/ort/ort-wasm-simd-threaded.jsep.wasm?url';
import ortWasmSimdThreadedJsepMjsContent from './lib/ort/ort-wasm-simd-threaded.jsep.mjs?raw';

// Create Blob URL for the MJS file to avoid fetch errors
const ortWasmSimdThreadedJsepMjsUrl = URL.createObjectURL(new Blob([ortWasmSimdThreadedJsepMjsContent], { type: 'application/javascript' }));

import type { Ort, Session } from './types/ort.d.ts';

// Variables to hold imported modules
type FFTFunc = (input: Float32Array) => Float32Array;

let ORT: Ort;
let ort: Ort;
let rfft: FFTFunc, irfft: FFTFunc;

// Initialization Promise
const initPromise = (async () => {
    try {
        // Dynamic imports to catch errors
        const ortModule = await import('./lib/ort/ort.all.mjs') as unknown as Ort;
        ORT = ortModule;
        ort = ORT;

        const kissModule = await import('./lib/kissfft/lib/api.js') as unknown as { rfft: FFTFunc; irfft: FFTFunc };
        rfft = kissModule.rfft;
        irfft = kissModule.irfft;

        // Initialize ORT WASM
        if (ort.env && ort.env.wasm) {
            ort.env.wasm.wasmPaths = {
                'mjs': ortWasmSimdThreadedJsepMjsUrl,
                'wasm': ortWasmSimdThreadedJsepUrl,
                'ort-wasm-simd-threaded.wasm': ortWasmSimdThreadedUrl,
                'ort-wasm-simd-threaded.jsep.wasm': ortWasmSimdThreadedJsepUrl,
                'ort-wasm-simd-threaded.jsep.mjs': ortWasmSimdThreadedJsepMjsUrl
            };
            ort.env.wasm.numThreads = 1; 
        }
    } catch (e: unknown) {
        const error = e instanceof Error ? e.message : String(e);
        // Post error to main thread
        self.postMessage({
            type: 'error',
            error: 'Worker initialization failed: ' + error
        });
        throw e; // Re-throw to ensure await initPromise fails
    }
})();


import { interleave, floatTo16BitPCM, writeWAVStereoPCM } from './wav-utils';

// Helpers
function hann(n: number) {
    const w = new Float32Array(n);
    for (let i = 0; i < n; i++) w[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (n - 1)));
    return w
}


let __webgpu_init_promise: Promise<void> | null = null;

interface StreamingState {
    session: Session;
    inputName: string;
    dimF: number;
    dimT: number;
    nfft: number;
    hop: number;
    chunkSize: number;
    segStep: number;
    win: Float32Array;
    fadeIn: Float32Array;
    fadeOut: Float32Array;
    
    inputBufferL: Float32Array;
    inputBufferR: Float32Array;
    inputBufferWritePos: number;
    
    outputBufferL: Float32Array;
    outputBufferR: Float32Array;
    normBuffer: Float32Array;
    
    processedPos: number;
    outputPos: number;
}

let streamingState: StreamingState | null = null;
let taskQueue = Promise.resolve();

self.onmessage = (e: MessageEvent) => {
    taskQueue = taskQueue.then(async () => {
        const {
            type,
            data
        } = e.data;

        try {
            await initPromise;

            if (type === 'run') {
                const result = await runSeparationInner(data);
                self.postMessage({
                    type: 'result',
                    data: result
                });
            } else if (type === 'stream_start') {
                streamingState = await initStreaming(data);
                self.postMessage({ type: 'stream_started' });
            } else if (type === 'stream_data') {
                if (!streamingState) throw new Error('Streaming not started');
                await processStreamChunk(streamingState, data);
            } else if (type === 'stream_end') {
                if (!streamingState) throw new Error('Streaming not started');
                await flushStream(streamingState);
                streamingState = null;
                self.postMessage({ type: 'stream_ended' });
            }
        } catch (err: unknown) {
            const error = err instanceof Error ? err.message : String(err);
            self.postMessage({
                type: 'error',
                error: error
            });
        }
    });
};


async function initStreaming(data: { modelFile: string, provider: string, sampleRate: number }): Promise<StreamingState> {
    const { modelFile, provider } = data;
    const modelPath = modelFile.startsWith('/') || modelFile.startsWith('http') ? modelFile : `/models/${modelFile}`;
    
    // Check for LFS
    const headResp = await fetch(modelPath, { headers: { Range: 'bytes=0-100' } });
    const headText = await headResp.text();
    if (headText.includes('version https://git-lfs.github.com/spec/v1')) {
        throw new Error(`模型文件 "${modelFile}" 尚未下载 (Git LFS 指针)`);
    }

    let dimF = 3072, dimT = 256, nfft = 6144, hop = 1024;
    if (modelFile.includes('9662') || modelFile.includes('Inst_3') && !modelFile.includes('HQ') || modelFile.includes('KARA') || modelFile.includes('Kim_Inst')) {
        dimF = 2048;
        nfft = 4096;
    }

    const chunkSize = hop * (dimT - 1);
    const segStep = chunkSize - nfft;
    const win = hann(nfft);
    const fadeIn = new Float32Array(nfft);
    const fadeOut = new Float32Array(nfft);
    for (let i = 0; i < nfft; i++) {
        const w = 0.5 * (1 - Math.cos(Math.PI * i / (nfft - 1)));
        fadeIn[i] = w;
        fadeOut[i] = 1 - w;
    }

    // Provider check (reusing logic from runSeparationInner but simplified for brevity)
    let providerUsed = provider;
    if (provider === 'webgpu') {
        const nav = (self.navigator as unknown as { gpu: unknown });
        if (!nav || !nav.gpu) throw new Error('WebGPU not available');
        
        const envWgpu = (ort.env.webgpu = (ort.env.webgpu || { device: null }));
        if (!envWgpu.device) {
            if (!__webgpu_init_promise) {
                __webgpu_init_promise = (async () => {
                    const adapter = await (nav.gpu as { requestAdapter(): Promise<unknown> }).requestAdapter();
                    if (!adapter) throw new Error('webgpu adapter 不可用');
                    const device = await (adapter as { requestDevice(opts: unknown): Promise<unknown> }).requestDevice({
                        requiredFeatures: Array.from((adapter as { features: Iterable<unknown> }).features || [])
                    });
                    envWgpu.device = device;
                })();
            }
            await __webgpu_init_promise;
        }
    }

    const session = await ort.InferenceSession.create(modelPath, {
        executionProviders: [providerUsed]
    });
    const inputName = session.inputNames[0] || 'input';

    // Buffers for streaming
    // We need enough space for input buffering and overlap-add
    // chunkSize is ~260k. incoming chunks might be ~22k or larger.
    // We need to accommodate at least segExt (chunkSize + nfft) + incoming chunk size.
    // To be safe, we allocate significantly more.
    const maxBufferSize = chunkSize + nfft * 2 + 256 * 1024; // Add 256k buffer margin
    
    // Initial padding to avoid click at start
    // We pad with zeros (default in Float32Array)
    const padding = chunkSize; 

    return {
        session, inputName, dimF, dimT, nfft, hop, chunkSize, segStep, win, fadeIn, fadeOut,
        inputBufferL: new Float32Array(maxBufferSize),
        inputBufferR: new Float32Array(maxBufferSize),
        inputBufferWritePos: padding,
        outputBufferL: new Float32Array(maxBufferSize),
        outputBufferR: new Float32Array(maxBufferSize),
        normBuffer: new Float32Array(maxBufferSize),
        processedPos: 0,
        outputPos: padding
    };
}

async function processStreamChunk(state: StreamingState, data: { chL: Float32Array, chR: Float32Array }) {
    const { chL, chR } = data;
    const len = chL.length;
    
    // Append to input buffers
    // In a real implementation, we'd use a circular buffer or shift data.
    // For simplicity, we'll shift data if we run out of space.
    if (state.inputBufferWritePos + len > state.inputBufferL.length) {
        // Shift remaining data to start
        const remainingInput = state.inputBufferWritePos - state.processedPos;
        
        if (remainingInput + len > state.inputBufferL.length) {
             throw new Error(`Stream Buffer Overflow: Input chunk ${len} + remaining ${remainingInput} > buffer ${state.inputBufferL.length}. This usually means the input chunk size is too large or processing is stalled.`);
        }

        // Shift Input
        state.inputBufferL.copyWithin(0, state.processedPos, state.inputBufferWritePos);
        state.inputBufferR.copyWithin(0, state.processedPos, state.inputBufferWritePos);
        
        // Shift Output & Norm
        // IMPORTANT: We must also shift output buffers because overlap-add writes into future positions.
        // The data starting at processedPos in outputBuffer contains the tail of the last processed segment
        // which needs to be overlapped with the next segment.
        // We assume outputPos is close to processedPos (processedPos - outputPos is small or 0).
        // Actually, we should shift from processedPos.
        state.outputBufferL.copyWithin(0, state.processedPos, state.outputBufferL.length);
        state.outputBufferR.copyWithin(0, state.processedPos, state.outputBufferR.length);
        state.normBuffer.copyWithin(0, state.processedPos, state.normBuffer.length);

        // Zero out the rest of the output buffers to prevent accumulating old data
        // The valid data moved is of length (bufferLen - processedPos).
        // The new empty space starts at (bufferLen - processedPos).
        // However, we only care about clearing up to where we might write next.
        // Safest is to clear everything after the shifted valid data.
        // But simpler: just clear the newly exposed tail. 
        // Or even simpler: we know we only write up to a certain point.
        // Let's clear from `remainingInput` (since that's where input ends, output tail might extend a bit further but not much).
        // Actually, overlap-add can extend nfft beyond processedPos + chunkSize.
        // To be safe, let's clear from remainingInput + nfft to end?
        // Let's just clear the whole tail to be safe.
        const validLen = state.outputBufferL.length - state.processedPos;
        state.outputBufferL.fill(0, validLen);
        state.outputBufferR.fill(0, validLen);
        state.normBuffer.fill(0, validLen);

        // Update positions
        state.inputBufferWritePos = remainingInput;
        // outputPos needs to be adjusted relative to processedPos
        // old processedPos -> 0
        // old outputPos -> old outputPos - old processedPos
        state.outputPos = Math.max(0, state.outputPos - state.processedPos);
        state.processedPos = 0;
    }
    
    state.inputBufferL.set(chL, state.inputBufferWritePos);
    state.inputBufferR.set(chR, state.inputBufferWritePos);
    state.inputBufferWritePos += len;

    // Process segments if enough data is available
    const segExt = state.chunkSize + state.nfft;
    while (state.inputBufferWritePos - state.processedPos >= segExt) {
        await processSegment(state, state.processedPos);
        state.processedPos += state.segStep;
        
        // Output data that is no longer needed for overlaps
        // Samples before processedPos are mostly safe, but we need to consider the fadeOut overlap
        // Actually, samples before current state.processedPos have been fully contributed to by all possible segments
        // except for the current one's tail.
        const safeOutputLen = state.processedPos - state.outputPos;
        if (safeOutputLen > 0) {
            emitStreamResult(state, safeOutputLen);
        }
    }
}

async function processSegment(state: StreamingState, pos: number) {
    const { session, inputName, dimF, dimT, nfft, hop, win, fadeIn, fadeOut, chunkSize, segStep } = state;
    const segExt = chunkSize + nfft;
    
    const segL = state.inputBufferL.subarray(pos, pos + segExt);
    const segR = state.inputBufferR.subarray(pos, pos + segExt);

    const frames = new Float32Array(4 * dimF * dimT);
    for (let t = 0; t < dimT; t++) {
        const start = t * hop;
        const wl = new Float32Array(nfft);
        const wr = new Float32Array(nfft);
        for (let i = 0; i < nfft; i++) {
            wl[i] = (segL[start + i] || 0) * win[i];
            wr[i] = (segR[start + i] || 0) * win[i];
        }
        const outSpecL = rfft(wl);
        const outSpecR = rfft(wr);
        for (let k = 0; k < dimF; k++) {
            const base = k * dimT + t;
            const idx = k * 2;
            frames[base] = outSpecL[idx];
            frames[dimT * dimF + base] = outSpecL[idx + 1];
            frames[2 * dimT * dimF + base] = outSpecR[idx];
            frames[3 * dimT * dimF + base] = outSpecR[idx + 1];
        }
    }

    const inputTensor = new ort.Tensor('float32', frames, [1, 4, dimF, dimT]);
    const outMap = await session.run({ [inputName]: inputTensor });
    const firstKey = Object.keys(outMap)[0];
    const spec = outMap[firstKey].data;

    const segOutL = new Float32Array(segExt);
    const segOutR = new Float32Array(segExt);
    const segNorm = new Float32Array(segExt);

    for (let t = 0; t < dimT; t++) {
        const start = t * hop;
        const specL = new Float32Array(2 * nfft);
        const specR = new Float32Array(2 * nfft);
        for (let k = 0; k < dimF; k++) {
            const base = k * dimT + t;
            const idx = k * 2;
            specL[idx] = spec[base];
            specL[idx + 1] = spec[dimT * dimF + base];
            specR[idx] = spec[2 * dimT * dimF + base];
            specR[idx + 1] = spec[3 * dimT * dimF + base];
        }
        const xL = irfft(specL);
        const xR = irfft(specR);
        for (let i = 0; i < nfft; i++) {
            const w = win[i];
            segOutL[start + i] += xL[i] * w;
            segOutR[start + i] += xR[i] * w;
            segNorm[start + i] += w * w;
        }
    }

    const dMin = 1e-8;
    for (let i = 0; i < segExt; i++) {
        const d = segNorm[i] || dMin;
        segOutL[i] /= d;
        segOutR[i] /= d;
    }

    // Overlap-Add into state buffers
    const isFirst = pos === 0;
    const writeMax = segExt;
    const headLen = isFirst ? Math.min(nfft, writeMax) : nfft; // Simplified fade logic for streaming
    
    // Apply fades and add to output buffers
    for (let i = 0; i < headLen; i++) {
        const bufIdx = (pos + i) % state.outputBufferL.length;
        const w = isFirst ? fadeIn[i] : fadeIn[i]; // In streaming, we always use fadeIn for the head of a segment
        state.outputBufferL[bufIdx] += segOutL[i] * w;
        state.outputBufferR[bufIdx] += segOutR[i] * w;
        state.normBuffer[bufIdx] += w;
    }
    for (let i = headLen; i < Math.min(segStep, writeMax); i++) {
        const bufIdx = (pos + i) % state.outputBufferL.length;
        state.outputBufferL[bufIdx] += segOutL[i];
        state.outputBufferR[bufIdx] += segOutR[i];
        state.normBuffer[bufIdx] += 1;
    }
    const tailLen = Math.min(nfft, Math.max(0, writeMax - segStep));
    for (let j = 0; j < tailLen; j++) {
        const i = segStep + j;
        const bufIdx = (pos + i) % state.outputBufferL.length;
        const w = fadeOut[j];
        state.outputBufferL[bufIdx] += segOutL[i] * w;
        state.outputBufferR[bufIdx] += segOutR[i] * w;
        state.normBuffer[bufIdx] += w;
    }
}

function emitStreamResult(state: StreamingState, length: number) {
    const outL = new Float32Array(length);
    const outR = new Float32Array(length);
    
    for (let i = 0; i < length; i++) {
        const bufIdx = (state.outputPos + i) % state.outputBufferL.length;
        const d = state.normBuffer[bufIdx] || 1;
        outL[i] = state.outputBufferL[bufIdx] / d;
        outR[i] = state.outputBufferR[bufIdx] / d;
        
        // Reset for next use (circular buffer)
        state.outputBufferL[bufIdx] = 0;
        state.outputBufferR[bufIdx] = 0;
        state.normBuffer[bufIdx] = 0;
    }
    
    state.outputPos += length;
    self.postMessage({
        type: 'stream_result',
        data: { chL: outL, chR: outR }
    });
}

async function flushStream(state: StreamingState) {
    // Process remaining data in input buffer if any
    const remainingInput = state.inputBufferWritePos - state.processedPos;
    if (remainingInput > 0) {
        // We might need to pad to at least nfft to run one last segment
        // but MDX models need a full segment. 
        // For simplicity, we just output what's left in the overlap-add buffer.
    }
    
    // Output everything remaining in the output buffer
    // The max possible pending samples are up to nfft (the last tail)
    const pendingLen = state.inputBufferWritePos - state.outputPos;
    if (pendingLen > 0) {
        emitStreamResult(state, pendingLen);
    }
}

interface RunData {
    file?: File; // Raw file passed from main thread
    fileBuffer?: ArrayBuffer; // Or buffer
    // Or pre-decoded:
    chL?: Float32Array;
    chR?: Float32Array;
    sampleRate: number; // Should be 44100
    modelFile: string; // Or ArrayBuffer if passed
    provider: string;
    metrics: unknown; // Passed from main thread (loading/decoding times)
}

async function runSeparationInner(inputData: RunData) {
    const {
        provider,
        modelFile,
        metrics
    } = inputData as { provider: string, modelFile: string, metrics: { steps?: { name: string, ms: number }[], didResample?: boolean } };

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
    
    // Optimized loading: check for LFS pointer and pass path directly to ORT
    // We fetch a small chunk first to check if it's a Git LFS pointer
    const headResp = await fetch(modelPath, { headers: { Range: 'bytes=0-100' } });
    const headText = await headResp.text();
    if (headText.includes('version https://git-lfs.github.com/spec/v1')) {
        throw new Error(`模型文件 "${modelName}" 尚未下载 (Git LFS 指针)。请在项目根目录运行 "git lfs pull" 以获取真实模型文件。`);
    }

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
            const nav = (self.navigator as unknown as { gpu: { requestAdapter(): Promise<unknown>, features: Iterable<unknown> } })
            if (!ort.env.webgpu) {
                ort.env.webgpu = { device: null };
            }
            const envWgpu = ort.env.webgpu;
            
            if (envWgpu.device) {
                end('webgpuInit')
            } else {
                if (!__webgpu_init_promise) {
                    __webgpu_init_promise = (async () => {
                        const adapter = await nav?.gpu?.requestAdapter?.() as { requestDevice(opts: unknown): Promise<unknown>, features: Iterable<unknown> } | null
                        if (!adapter) throw new Error('webgpu adapter 不可用')
                        const device = await adapter.requestDevice?.({
                            requiredFeatures: Array.from(adapter.features || [])
                        })
                        envWgpu.device = device
                    })()
                }
                await __webgpu_init_promise
                end('webgpuInit')
            }
        } catch (e: unknown) {
            steps.push({
                name: 'webgpuInitError',
                ms: 0
            })
            throw e
        }
    }

    start('createSession')
    let session: Session
    try {
        session = await ort.InferenceSession.create(modelPath, {
            executionProviders: [providerUsed]
        })
    } catch (e: unknown) {
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
        const tRunStart = (performance?.now?.() || Date.now())
        let outMap: Record<string, { data: Float32Array }>
        try {
            outMap = await session.run({
                [inputName]: inputTensor
            })
        } catch (e: unknown) {
            throw e
        }
        runTotal += ((performance?.now?.() || Date.now()) - tRunStart)
        const firstKey = Object.keys(outMap)[0]
        const arrOut = outMap[firstKey].data
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
