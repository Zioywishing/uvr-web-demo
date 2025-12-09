import './style.css'
import './ort-config'
import { runSeparationUI } from './ui'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>人声分离（浏览器端，WASM/WebGPU/WebGL）</h1>
  <div class="row">
    <label>执行后端</label>
    <select id="provider">
      <option value="wasm">WASM</option>
      <option value="webgpu">WebGPU</option>
      <option value="webgl">WebGL</option>
    </select>
  </div>
  <div class="row">
    <label>选择内置模型</label>
    <select id="modelSel"></select>
  </div>
  <div class="row">
    <label>选择音频文件</label>
    <input id="audio" type="file" accept="audio/*" />
  </div>
  <div class="row">
    <button id="run">开始分离</button>
  </div>
  <div class="row">
    <label>状态</label>
    <pre id="log"></pre>
  </div>
  <div class="row">
    <label>WebGPU检测</label>
    <pre id="gpu"></pre>
  </div>
  <div class="row">
    <label>结果试听/下载</label>
    <audio id="outAudio" controls></audio>
    <div><a id="downloadLink" download="instrumental.wav">下载WAV</a></div>
  </div>
  <div class="row">
    <label>混合播放</label>
    <input id="mixRatio" type="range" min="0" max="100" value="100" />
    <span id="mixRatioText">100%</span>
    <audio id="origAudio" preload="auto" style="display:none"></audio>
  </div>
`

runSeparationUI()

async function detectWebGPUAndUpdateUI(){
  const pre = document.getElementById('gpu') as HTMLPreElement
  const sel = document.getElementById('provider') as HTMLSelectElement
  const lines: string[] = []
  const isSecure = !!(globalThis as any).isSecureContext
  lines.push('secure='+isSecure)
  const nav: any = (globalThis as any).navigator
  const hasGPU = !!(nav && nav.gpu)
  lines.push('navigator.gpu='+hasGPU)
  let adapter: any = null
  let adapterOk = false
  if (hasGPU){
    try{ adapter = await nav.gpu.requestAdapter(); adapterOk = !!adapter }catch{}
  }
  lines.push('adapter='+adapterOk)
  if (adapter){
    const name = (adapter as any).name || ''
    if (name) lines.push('adapter.name='+name)
    const features = Array.from((adapter as any).features || []) as string[]
    lines.push('features='+features.join(','))
    const limitKeys = ['maxComputeWorkgroupSizeX','maxComputeWorkgroupSizeY','maxComputeWorkgroupSizeZ','maxComputeInvocationsPerWorkgroup','maxComputeWorkgroupStorageSize','maxBufferSize','maxBindingsPerBindGroup','maxComputeWorkgroupsPerDimension','maxStorageBufferBindingSize']
    const lims = (adapter as any).limits || {}
    lines.push('limits='+limitKeys.map(k=>k+':'+(lims?.[k])).join(','))
    const hasF16 = features.includes('shader-f16')
    lines.push('shader-f16='+hasF16)
    const hasTimestamp = features.includes('timestamp-query')
    lines.push('timestamp-query='+hasTimestamp)
  }
  const ortAny = (globalThis as any).ort
  const ortWebgpu = !!(ortAny && typeof ortAny.InferenceSession?.create === 'function')
  lines.push('ort.webgpu='+ortWebgpu)
  if (pre) pre.textContent = lines.join('\n')
  const optGpu = sel?.querySelector('option[value="webgpu"]') as HTMLOptionElement
  if (!adapterOk){
    if (optGpu) optGpu.disabled = true
  } else {
    if (sel) sel.value = 'webgpu'
  }
  const optGl = sel?.querySelector('option[value="webgl"]') as HTMLOptionElement
  try{
    const hasDoc = typeof (globalThis as any).document !== 'undefined'
    let glOk = false
    if (hasDoc){
      const canvas = (globalThis as any).document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      glOk = !!gl
    }
    if (!glOk && optGl) optGl.disabled = true
  }catch{}
}

detectWebGPUAndUpdateUI()
