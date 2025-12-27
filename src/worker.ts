export interface SeparationMetrics {
    steps: { name: string, ms: number }[];
    didResample: boolean;
    inputDurationSec: number;
    inputSampleFrames: number;
    providerRequested?: string;
    providerUsed?: string;
    fallbackReason?: string;
    segmentCount?: number;
    sampleRate?: number;
    outputDurationSec?: number;
    padSamples?: number;
    trimStartSamples?: number;
}

export interface StreamResult {
    chL: Float32Array;
    chR: Float32Array;
}


export async function decodeAudioFile(file: File): Promise<{ chL: Float32Array, chR: Float32Array, sampleRate: number, duration: number, didResample: boolean }> {
    const fileBuffer = await file.arrayBuffer()
    const AudioContextClass = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
    const ctx = new AudioContextClass({
        sampleRate: 44100
    })
    const audioBuf = await ctx.decodeAudioData(fileBuffer)

    let buf = audioBuf
    let didResample = false
    if (audioBuf.sampleRate !== 44100) {
        const targetFrames = Math.round(audioBuf.length * 44100 / audioBuf.sampleRate)
        const offline = new OfflineAudioContext(audioBuf.numberOfChannels, targetFrames, 44100)
        const src = offline.createBufferSource();
        src.buffer = audioBuf;
        src.connect(offline.destination);
        src.start();
        buf = await offline.startRendering()
        didResample = true
    }
    const chL = buf.numberOfChannels > 0 ? buf.getChannelData(0) : new Float32Array(buf.length)
    const chR = buf.numberOfChannels > 1 ? buf.getChannelData(1) : chL

    return {
        chL,
        chR,
        sampleRate: 44100,
        duration: buf.duration,
        didResample
    }
}

export async function runSeparation(provider: string, file: File, modelFile?: string, onProgress?: (p: number) => void): Promise<{ url: string, metrics: SeparationMetrics }> {
    const marks: Record < string, number > = {}
    const steps: {
        name: string,
        ms: number
    } [] = []
    const start = (name: string) => {
        marks[name] = (performance?.now?.() || Date.now())
    }
    const end = (name: string) => {
        steps.push({
            name,
            ms: (performance?.now?.() || Date.now()) - marks[name]
        })
    }

    start('decodeAudio')
    const decoded = await decodeAudioFile(file);
    end('decodeAudio')
    
    const { chL, chR, didResample, duration } = decoded;

    // Prepare metrics to pass to worker
    const metrics = {
        steps,
        didResample,
        inputDurationSec: duration,
        inputSampleFrames: chL.length
    }

    // Spawn Worker
    const worker = new Worker(new URL('./sep-worker.ts', import.meta.url), {
        type: 'module'
    });

    return new Promise < {
        url: string,
        metrics: SeparationMetrics
    } > ((resolve, reject) => {
        worker.onmessage = (e) => {
            const {
                type,
                data,
                error
            } = e.data as { type: string, data: { blob: Blob, metrics: SeparationMetrics }, error?: string };
            if (type === 'result') {
                const {
                    blob,
                    metrics: resMetrics
                } = data;
                const url = URL.createObjectURL(blob);
                // Merge metrics
                const finalMetrics: SeparationMetrics = {
                    ...metrics,
                    ...resMetrics
                };
                finalMetrics.steps = metrics.steps.concat(resMetrics.steps);

                worker.terminate();
                resolve({
                    url,
                    metrics: finalMetrics
                });
            } else if (type === 'progress') {
                if (onProgress) onProgress(data as unknown as number);
            } else if (type === 'error') {
                worker.terminate();
                reject(new Error(error));
            }
        };
        worker.onerror = (e) => {
            worker.terminate();
            reject(new Error('Worker error: ' + e.message));
        };

        // Post message to worker
        // We transfer the buffers to avoid copy
        worker.postMessage({
            type: 'run',
            data: {
                chL,
                chR,
                sampleRate: 44100,
                modelFile,
                provider,
                metrics
            }
        }, [chL.buffer, chR.buffer]);
    });
}

export function startStreamSeparation(provider: string, modelFile: string, onResult: (res: StreamResult) => void, onEnd?: (error?: string) => void) {
    const worker = new Worker(new URL('./sep-worker.ts', import.meta.url), {
        type: 'module'
    });

    let isStarted = false;
    const pendingChunks: { chL: Float32Array, chR: Float32Array }[] = [];

    worker.onmessage = (e) => {
        const { type, data, error } = e.data as { type: string, data: unknown, error?: string };
        if (type === 'stream_started') {
            isStarted = true;
            // Send pending chunks
            while (pendingChunks.length > 0) {
                const chunk = pendingChunks.shift();
                if (chunk) {
                    worker.postMessage({ type: 'stream_data', data: chunk }, [chunk.chL.buffer, chunk.chR.buffer]);
                }
            }
        } else if (type === 'stream_result') {
            onResult(data as StreamResult);
        } else if (type === 'stream_ended') {
            if (onEnd) onEnd();
        } else if (type === 'error') {
            console.error('Stream worker error:', error);
            worker.terminate();
            if (onEnd) onEnd(error || 'Unknown worker error');
        }
    };

    worker.postMessage({
        type: 'stream_start',
        data: { provider, modelFile, sampleRate: 44100 }
    });

    return {
        push(chL: Float32Array, chR: Float32Array) {
            if (isStarted) {
                worker.postMessage({ type: 'stream_data', data: { chL, chR } }, [chL.buffer, chR.buffer]);
            } else {
                pendingChunks.push({ chL, chR });
            }
        },
        stop() {
            worker.postMessage({ type: 'stream_end' });
        },
        terminate() {
            worker.terminate();
        }
    };
}
