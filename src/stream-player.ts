export class StreamPlayer {
    private ctx: AudioContext;
    private nextStartTime: number = 0;
    private gainNode: GainNode;

    constructor(sampleRate: number = 44100) {
        const AudioContextClass = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
        this.ctx = new AudioContextClass({ sampleRate });
        this.gainNode = this.ctx.createGain();
        this.gainNode.connect(this.ctx.destination);
    }

    push(left: Float32Array, right: Float32Array) {
        const buffer = this.ctx.createBuffer(2, left.length, this.ctx.sampleRate);
        buffer.copyToChannel(left as Float32Array<ArrayBuffer>, 0);
        buffer.copyToChannel(right as Float32Array<ArrayBuffer>, 1);

        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.gainNode);

        // Schedule playback
        // If nextStartTime is in the past (buffer underrun), reset to currentTime + small latency
        const currentTime = this.ctx.currentTime;
        if (this.nextStartTime < currentTime) {
            this.nextStartTime = currentTime + 0.05; // 50ms buffer
        }

        source.start(this.nextStartTime);
        this.nextStartTime += buffer.duration;
    }

    stop() {
        if (this.ctx.state !== 'closed') {
            this.ctx.close();
        }
    }

    setVolume(value: number) {
        this.gainNode.gain.value = value;
    }

    async resume() {
        if (this.ctx.state === 'suspended') {
            await this.ctx.resume();
        }
    }
}
