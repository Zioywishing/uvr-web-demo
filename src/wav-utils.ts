
export function interleave(l: Float32Array, r: Float32Array) {
    const out = new Float32Array(l.length * 2);
    for (let i = 0, j = 0; i < l.length; i++, j += 2) {
        out[j] = l[i];
        out[j + 1] = r[i]
    }
    return out
}

export function floatTo16BitPCM(float32: Float32Array) {
    const out = new Int16Array(float32.length);
    for (let i = 0; i < float32.length; i++) {
        let s = Math.max(-1, Math.min(1, float32[i]));
        out[i] = s < 0 ? s * 0x8000 : s * 0x7FFF
    }
    return out
}

export function writeWAVStereoPCM(int16Interleaved: Int16Array, sampleRate = 44100) {
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
