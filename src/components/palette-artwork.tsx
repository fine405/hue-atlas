import { useEffect, useRef, useState } from 'react'
import type { Palette } from '@/data/palettes'

const rgb = (hex: string) => [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16))

// Soft color masks move each source color toward the edited palette while
// retaining the source's fine texture. Zero deltas reproduce the image exactly.
function recolor(source: ImageData, original: string[], colors: string[], preserveInk: boolean) {
  const anchors = original.map(rgb)
  const deltas = colors.map((hex, index) => rgb(hex).map((value, channel) => value - anchors[index][channel]))
  const lut = new Float32Array(32 * 32 * 32 * 3)
  for (let r = 0; r < 32; r++) for (let g = 0; g < 32; g++) for (let b = 0; b < 32; b++) {
    const pixel = [r * 8 + 4, g * 8 + 4, b * 8 + 4]
    const weights = anchors.map((anchor) => 1 / (500 + anchor.reduce((sum, value, channel) => sum + (value - pixel[channel]) ** 2, 0)) ** 2)
    const total = weights.reduce((sum, value) => sum + value, 0)
    const protection = preserveInk ? Math.min(1, Math.min(...pixel) / 45) * Math.min(1, (255 - Math.min(...pixel)) / 30) : 1
    const offset = ((r * 32 + g) * 32 + b) * 3
    for (let channel = 0; channel < 3; channel++) lut[offset + channel] = weights.reduce((sum, weight, index) => sum + weight / total * deltas[index][channel], 0) * protection
  }
  const output = new ImageData(new Uint8ClampedArray(source.data), source.width, source.height)
  for (let i = 0; i < source.data.length; i += 4) {
    const offset = (((source.data[i] >> 3) * 32 + (source.data[i + 1] >> 3)) * 32 + (source.data[i + 2] >> 3)) * 3
    for (let channel = 0; channel < 3; channel++) output.data[i + channel] += lut[offset + channel]
  }
  return output
}

export function PaletteArtwork({ palette, colors = palette.colors, interactive = false }: { palette: Palette; colors?: Palette['colors']; interactive?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [source, setSource] = useState<ImageData | null>(null)
  const [failed, setFailed] = useState(false)
  const edited = colors.some((hex, index) => hex !== palette.colors[index])
  const needsCanvas = interactive || edited
  const src = `/artwork/${palette.id}.webp`
  useEffect(() => {
    if (!needsCanvas) return
    let cancelled = false
    const image = new Image()
    image.onload = () => {
      if (cancelled) return
      const surface = document.createElement('canvas')
      surface.width = image.naturalWidth
      surface.height = image.naturalHeight
      const context = surface.getContext('2d', { willReadFrequently: true })
      if (!context) { setFailed(true); return }
      context.drawImage(image, 0, 0)
      setSource(context.getImageData(0, 0, surface.width, surface.height))
    }
    image.onerror = () => { if (!cancelled) setFailed(true) }
    image.src = src
    return () => { cancelled = true }
  }, [src, needsCanvas])
  useEffect(() => {
    if (!source || !canvas.current) return
    const frame = requestAnimationFrame(() => {
      const context = canvas.current?.getContext('2d')
      if (!context) { setFailed(true); return }
      context.putImageData(edited ? recolor(source, palette.colors, colors, palette.id === 'memphis' || palette.id === 'mondrian') : source, 0, 0)
    })
    return () => cancelAnimationFrame(frame)
  }, [source, colors, edited, palette])
  return <div className="artwork" data-render-state={failed ? 'error' : source || !needsCanvas ? 'ready' : 'loading'}>
    <img src={src} alt={`${palette.name}效果图`} width="1080" height={palette.id === 'morandi' ? 664 : palette.id === 'mondrian' ? 654 : palette.id === 'memphis' ? 660 : 659} />
    {needsCanvas && source && !failed && <canvas ref={canvas} width={source.width} height={source.height} role="img" aria-label={`${palette.name}实时配色预览`} />}
    {failed && <p role="alert" className="artwork-error">效果图暂时无法换色，请刷新重试。</p>}
  </div>
}
