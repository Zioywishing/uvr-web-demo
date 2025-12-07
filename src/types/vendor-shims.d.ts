declare module '/public/vendor/kissfft/lib/kissfft.mjs'

declare module '/public/vendor/kissfft/lib/api.js' {
  export function rfft(x: Float32Array): Float32Array
  export function irfft(x: Float32Array): Float32Array
}
