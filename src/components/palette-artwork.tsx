import { useEffect, useRef, useState } from 'react'
import type { Palette } from '@/data/palettes'

const rgb = (hex: string) => [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16))

// Soft color masks move each source color toward the edited palette while
// retaining the source's fine texture. Zero deltas reproduce the image exactly.
function recolor(source: ImageData, original: string[], colors: string[], preserveInk: boolean, preserveLight: boolean) {
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
    // Gem backgrounds and specular highlights stay neutral; deep shadows retain depth.
    const low = Math.min(source.data[i], source.data[i + 1], source.data[i + 2])
    const high = Math.max(source.data[i], source.data[i + 1], source.data[i + 2])
    const exposure = preserveLight ? Math.min(1, high / 48, Math.max(0, (247 - low) / 48)) : 1
    for (let channel = 0; channel < 3; channel++) output.data[i + channel] += lut[offset + channel] * exposure
  }
  return output
}

// A bounded luminance-only sharpen improves local edges without shifting hue.
// Run once per image; picker updates reuse the prepared source.
function sharpen(source: ImageData) {
  const { width, height, data } = source
  const light = new Float32Array(width * height)
  for (let i = 0; i < light.length; i++) light[i] = data[i * 4] * .2126 + data[i * 4 + 1] * .7152 + data[i * 4 + 2] * .0722
  const output = new ImageData(new Uint8ClampedArray(data), width, height)
  for (let y = 1; y < height - 1; y++) for (let x = 1; x < width - 1; x++) {
    const i = y * width + x
    const detail = light[i] - (light[i - 1] + light[i + 1] + light[i - width] + light[i + width]) / 4
    if (Math.abs(detail) < 3) continue
    const boost = Math.max(-10, Math.min(10, detail * .65))
    for (let c = 0; c < 3; c++) output.data[i * 4 + c] += boost
  }
  return output
}

export function PaletteArtwork({ palette, colors = palette.colors, interactive = false }: { palette: Palette; colors?: Palette['colors']; interactive?: boolean }) {
  const container = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const buffer = useRef<HTMLCanvasElement | null>(null)
  const [pixelWidth, setPixelWidth] = useState(0)
  const [source, setSource] = useState<ImageData | null>(null)
  const [failed, setFailed] = useState(false)
  const edited = colors.some((hex, index) => hex !== palette.colors[index])
  const needsCanvas = interactive || edited
  const src = `/artwork/${palette.id}.webp`
  const renderWidth = source ? Math.max(source.width, pixelWidth) : 0
  const renderHeight = source ? Math.round(renderWidth * source.height / source.width) : 0
  useEffect(() => {
    if (!needsCanvas || !container.current) return
    const resize = () => setPixelWidth(Math.min(3240, Math.ceil((container.current?.getBoundingClientRect().width ?? 0) * window.devicePixelRatio)))
    const observer = new ResizeObserver(resize)
    observer.observe(container.current)
    window.addEventListener('resize', resize)
    let resolution = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
    const densityChanged = () => {
      resolution.removeEventListener('change', densityChanged)
      resize()
      resolution = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
      resolution.addEventListener('change', densityChanged)
    }
    resolution.addEventListener('change', densityChanged)
    resize()
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', resize)
      resolution.removeEventListener('change', densityChanged)
    }
  }, [needsCanvas])
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
      setSource(sharpen(context.getImageData(0, 0, surface.width, surface.height)))
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
      const surface = buffer.current ??= document.createElement('canvas')
      if (surface.width !== source.width || surface.height !== source.height) {
        surface.width = source.width
        surface.height = source.height
      }
      const native = surface.getContext('2d')
      if (!native) { setFailed(true); return }
      native.putImageData(edited ? recolor(source, palette.colors, colors, palette.id === 'memphis' || palette.id === 'mondrian', palette.group === 'gemstones') : source, 0, 0)
      context.imageSmoothingEnabled = true
      context.imageSmoothingQuality = 'high'
      context.clearRect(0, 0, renderWidth, renderHeight)
      context.drawImage(surface, 0, 0, renderWidth, renderHeight)
    })
    return () => cancelAnimationFrame(frame)
  }, [source, colors, edited, palette, renderWidth, renderHeight])
  return <div ref={container} className={palette.group === 'gemstones' ? 'artwork gemstone-artwork' : 'artwork'} data-artwork-id={palette.id} data-render-state={failed ? 'error' : source || !needsCanvas ? 'ready' : 'loading'}>
    <img src={src} alt={`${palette.name}效果图`} width={palette.group === 'gemstones' ? 1008 : 1080} height={palette.group === 'gemstones' ? 616 : palette.id === 'morandi' ? 664 : palette.id === 'mondrian' ? 654 : palette.id === 'memphis' ? 660 : 659} />
    {needsCanvas && source && !failed && <canvas ref={canvas} width={renderWidth} height={renderHeight} role="img" aria-label={`${palette.name}实时配色预览`} />}
    {failed && <p role="alert" className="artwork-error">效果图暂时无法换色，请刷新重试。</p>}
  </div>
}
