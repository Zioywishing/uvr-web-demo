export async function runSeparation(provider: string, file: File, modelFile?: string, onProgress?: (p: number) => void) {
    const marks: Record < string, number > = {}
    const steps: {
        name: string,
        ms: number
    } [] = []
    const start = (name: string) => {
        marks[name] = (performance ?.now ?.() || Date.now())
    }
    const end = (name: string) => {
        steps.push({
            name,
            ms: (performance ?.now ?.() || Date.now()) - marks[name]
        })
    }

    start('readFile')
    const fileBuffer = await file.arrayBuffer()
    end('readFile')

    start('decodeAudio')
    const ctx = new(window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 44100
    })
    const audioBuf = await ctx.decodeAudioData(fileBuffer)
    end('decodeAudio')

    let buf = audioBuf
    let didResample = false
    if (audioBuf.sampleRate !== 44100) {
        start('resample44100')
        const targetFrames = Math.round(audioBuf.length * 44100 / audioBuf.sampleRate)
        const offline = new OfflineAudioContext(audioBuf.numberOfChannels, targetFrames, 44100)
        const src = offline.createBufferSource();
        src.buffer = audioBuf;
        src.connect(offline.destination);
        src.start();
        buf = await offline.startRendering()
        end('resample44100');
        didResample = true
    }
    const chL = buf.numberOfChannels > 0 ? buf.getChannelData(0) : new Float32Array(buf.length)
    const chR = buf.numberOfChannels > 1 ? buf.getChannelData(1) : chL

    // Prepare metrics to pass to worker
    const metrics = {
        steps,
        didResample,
        inputDurationSec: buf.duration,
        inputSampleFrames: buf.length
    }

    // Spawn Worker
    const worker = new Worker(new URL('./sep-worker.ts', import.meta.url), {
        type: 'module'
    });

    return new Promise < {
        url: string,
        metrics: any
    } > ((resolve, reject) => {
        worker.onmessage = (e) => {
            const {
                type,
                data,
                error
            } = e.data;
            if (type === 'result') {
                const {
                    blob,
                    metrics: resMetrics
                } = data;
                const url = URL.createObjectURL(blob);
                // Merge metrics
                const finalMetrics = {
                    ...metrics,
                    ...resMetrics
                };
                // steps might have been updated in worker
                // resMetrics.steps contains worker steps.
                // metrics.steps contains main thread steps (readFile/decode).
                finalMetrics.steps = metrics.steps.concat(resMetrics.steps);

                worker.terminate();
                resolve({
                    url,
                    metrics: finalMetrics
                });
            } else if (type === 'progress') {
                if (onProgress) onProgress(data);
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
