import { runSeparation } from './worker'

export function runSeparationUI(){
  const logEl = document.getElementById('log') as HTMLPreElement
  const btn = document.getElementById('run') as HTMLButtonElement
  function log(m:string){ logEl.textContent += m+'\n'; logEl.scrollTop = logEl.scrollHeight }
  btn.addEventListener('click', async ()=>{
    const provider = (document.getElementById('provider') as HTMLSelectElement).value
    const audioFile = (document.getElementById('audio') as HTMLInputElement).files?.[0]
    if(!audioFile){ log('请先选择音频文件'); return }
    try{
      log('开始运行...')
      const { url, metrics } = await runSeparation(provider, audioFile)
      ;(document.getElementById('outAudio') as HTMLAudioElement).src = url
      const a = document.getElementById('downloadLink') as HTMLAnchorElement
      a.href = url; a.download = 'instrumental.wav'
      log('完成，生成WAV可试听/下载')
      if (metrics){
        const gpuEl = document.getElementById('gpu') as HTMLPreElement
        const lines = metrics.steps.map(s=> `${s.name}: ${s.ms.toFixed ? s.ms.toFixed(2)+'ms' : String(s.ms)}`)
        lines.unshift(`provider: ${metrics.providerUsed} (requested: ${metrics.providerRequested})`)
        if (metrics.fallbackReason) lines.unshift(`fallback: ${metrics.fallbackReason}`)
        lines.push(`segments: ${metrics.segmentCount}`)
        lines.push(`inputDurationSec: ${metrics.inputDurationSec?.toFixed?.(2)}`)
        lines.push(`resampled44100: ${metrics.didResample}`)
        log('性能计时\n'+lines.join('\n'))
        if (gpuEl){
          const extra: string[] = []
          const nav: any = (globalThis as any).navigator
          extra.push('userAgent='+(nav?.userAgent||''))
          const ortAny = (globalThis as any).ort
          extra.push('ortVersion='+(ortAny?.version||''))
          gpuEl.textContent += '\n'+extra.join('\n')
        }
      }
    }catch(e:any){ console.error(e); log('错误: '+(e?.message||e)) }
  })
}
