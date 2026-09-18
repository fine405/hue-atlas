import { useId } from 'react'
import type { GemShape } from '@/data/palettes'

type Crystal = { x: number; y: number; w: number; h: number; angle?: number; color?: number; cut?: 'point' | 'flat' | 'cube' | 'blade' }
const scenes: Record<GemShape, Crystal[]> = {
  aquamarine: [
    { x: 325, y: 123, w: 80, h: 148, color: 0 }, { x: 406, y: 145, w: 68, h: 141, color: 1 },
    { x: 280, y: 157, w: 73, h: 138, angle: -9, color: 1 }, { x: 352, y: 150, w: 81, h: 154, color: 1 },
    { x: 250, y: 248, w: 67, h: 71, angle: -28, color: 1 }, { x: 432, y: 215, w: 63, h: 103, angle: 18, color: 0 },
    { x: 319, y: 252, w: 71, h: 85, angle: 17, color: 1 }, { x: 383, y: 285, w: 74, h: 62, color: 1 },
  ],
  fluorite: Array.from({ length: 28 }, (_, i) => {
    const rand = random(i + 71)
    return { x: 265 + rand() * 193, y: 143 + Math.floor(i / 7) * 49 + rand() * 22, w: 40 + rand() * 65, h: 34 + rand() * 30, angle: rand() * 66 - 33, color: i % 4, cut: 'cube' }
  }),
  morganite: [{ x: 360, y: 170, w: 282, h: 113, angle: -5, color: 0 }, { x: 465, y: 229, w: 65, h: 81, angle: 24, color: 1 }],
  peridot: [
    { x: 423, y: 215, w: 81, h: 126, color: 1 }, { x: 300, y: 179, w: 92, h: 171, angle: 3, color: 2 },
    { x: 372, y: 117, w: 101, h: 234, angle: -5, color: 0 }, { x: 425, y: 267, w: 66, h: 78, color: 2 },
  ],
  barite: [
    { x: 393, y: 141, w: 64, h: 222, angle: -21, color: 3, cut: 'blade' },
    { x: 304, y: 121, w: 77, h: 226, angle: 11, color: 0, cut: 'blade' },
    { x: 355, y: 190, w: 89, h: 171, angle: -12, color: 1, cut: 'blade' },
    { x: 453, y: 269, w: 59, h: 92, angle: 23, color: 0, cut: 'blade' },
  ],
  dioptase: Array.from({ length: 29 }, (_, i) => {
    const rand = random(333 + i)
    return { x: 298 + rand() * 135, y: 121 + Math.floor(i / 6) * 44 + rand() * 24, w: 27 + rand() * 46, h: 30 + rand() * 53, angle: rand() * 54 - 27, color: i % 3, cut: 'flat' }
  }),
  quartz: [{ x: 359, y: 147, w: 168, h: 220, color: 0, cut: 'point' }],
  tourmaline: [{ x: 365, y: 137, w: 143, h: 225, color: 0 }, { x: 423, y: 199, w: 43, h: 159, color: 1 }],
}

// Seeded geometry keeps SSR, thumbnails and saved variations identical.
function random(seed: number) {
  let state = seed >>> 0
  return () => {
    state += 0x6D2B79F5
    let value = Math.imul(state ^ (state >>> 15), 1 | state)
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}
function tint(hex: string, amount: number) {
  const target = amount > 0 ? 255 : 0
  return '#' + [1, 3, 5].map((start) => {
    const value = parseInt(hex.slice(start, start + 2), 16)
    return Math.round(value + (target - value) * Math.abs(amount)).toString(16).padStart(2, '0')
  }).join('')
}

function MineralMatrix({ colors, front = false, shape }: { colors: string[]; front?: boolean; shape: GemShape }) {
  const rng = random(front ? 193 : 127)
  const count = front ? 27 : 45
  return <g>{Array.from({ length: count }, (_, index) => {
    const theta = rng() * Math.PI * 2
    const radius = Math.sqrt(rng())
    const x = 355 + Math.cos(theta) * radius * (shape === 'dioptase' ? 88 : 144)
    const y = (front ? 325 : 292) + Math.sin(theta) * radius * (front ? 27 : 63)
    const w = 11 + rng() * 37, h = 10 + rng() * 23
    const rock = shape === 'fluorite' ? tint(colors[0], -.72) : tint(colors[(index % 2) + 2], front ? .24 : -.25)
    const points = `${x - w},${y} ${x - w * .4},${y - h} ${x + w * .7},${y - h * .75} ${x + w},${y + h * .4} ${x},${y + h}`
    return <g key={index}>
      <polygon points={points} fill={rock} stroke={tint(rock, -.25)} strokeWidth=".5" />
      <path d={`M${x-w},${y} L${x+3},${y-4} L${x+w*.7},${y-h*.75} M${x+3},${y-4} L${x},${y+h}`} fill="none" stroke={tint(rock, .6)} strokeWidth=".8" opacity=".65" />
      {front && <path d={`M${x-w*.5},${y} l${w},${-h*.55} l${-w*.45},${h*.85} Z`} fill={tint(rock, .65)} opacity=".8" />}
    </g>
  })}</g>
}

function CrystalPrism({ crystal, index, prefix, shape, colors }: { crystal: Crystal; index: number; prefix: string; shape: GemShape; colors: string[] }) {
  const { x, y, w, h, angle = 0, color = 0, cut = 'flat' } = crystal
  const rng = random(index * 107 + 19)
  const pointed = cut === 'point' || cut === 'blade'
  const top = pointed ? -w * .55 : -w * .22
  const hull = cut === 'cube'
    ? `${-w*.5},0 ${w*.1},${-w*.36} ${w*.53},${-w*.13} ${w*.5},${h*.73} 0,${h} ${-w*.5},${h*.6}`
    : `${-w*.5},0 ${-w*.23},${top} ${w*.2},${top*.93} ${w*.5},0 ${w*.48},${h*.85} ${w*.12},${h} ${-w*.45},${h*.9}`
  const crown = cut === 'cube' ? `${-w*.5},0 ${w*.1},${-w*.36} ${w*.53},${-w*.13} 0,${w*.23}` : `${-w*.5},0 ${-w*.23},${top} ${w*.2},${top*.93} ${w*.5},0 ${w*.1},${w*.22} ${-w*.21},${w*.16}`
  const clip = `${prefix}-crystal-${index}`
  return <g transform={`translate(${x} ${y}) rotate(${angle})`}>
    <defs><clipPath id={clip}><polygon points={hull} /></clipPath></defs>
    <polygon points={hull} fill={`url(#${prefix}-body-${color})`} stroke={tint(colors[color], -.35)} strokeWidth=".8" />
    <g clipPath={`url(#${clip})`}>
      <polygon points={`${-w*.5},0 ${-w*.23},${top} ${-w*.19},${h*.72} ${-w*.45},${h*.9}`} fill={tint(colors[(color+2)%4], .35)} opacity=".64" />
      <polygon points={`${w*.2},${top*.93} ${w*.5},0 ${w*.48},${h*.85} ${w*.12},${h}`} fill={tint(colors[color], -.63)} opacity=".71" />
      <polygon points={crown} fill={`url(#${prefix}-top-${color})`} stroke="white" strokeWidth=".6" strokeOpacity=".4" />
      <polygon points={`${-w*.21},${w*.16} ${w*.1},${w*.22} ${w*.12},${h} ${-w*.14},${h*.79}`} fill={colors[(color+1)%4]} opacity=".23" />
      <path d={`M${-w*.42} ${h*.62} L${w*.38} ${h*.35} L${w*.12} ${h*.95} Z`} fill={colors[(color+3)%4]} opacity=".28" />
      <path d={`M${-w*.39} ${h*.58} L${w*.29} ${h*.7} L${-w*.1} ${h*.94} Z`} fill="#fff" opacity=".19" />
      <path d={`M${-w*.21} ${w*.16} L${-w*.14} ${h*.79} M${w*.1} ${w*.22} L${w*.12} ${h} M${-w*.5} 0 L${-w*.21} ${w*.16} L${w*.1} ${w*.22} L${w*.5} 0`} stroke="#fff" strokeWidth="1.1" strokeOpacity=".52" fill="none" />
      {Array.from({ length: shape === 'tourmaline' ? 65 : 23 }, (_, i) => {
        const px = (rng() - .5) * w, py = rng() * h, length = rng() * h * .7 + 8
        return shape === 'tourmaline' ? <path key={i} d={`M${px},${-w*.3} l${rng()*3-1.5},${h+w*.5}`} stroke={i%3 === 0 ? '#fff' : tint(colors[i%4], -.6)} opacity={.12+rng()*.36} strokeWidth={.3+rng()*1.6} /> :
          <path key={i} d={`M${px},${py} l${length*.16},${length*.08} l${-length*.27},${length*.22} l${length*.12},${length*.16}`} fill="none" stroke={i%4 ? '#fff' : tint(colors[color], -.5)} opacity={.12+rng()*.34} strokeWidth={.35+rng()*.7} />
      })}
      {Array.from({ length: 20 }, (_, i) => <circle key={i} cx={(rng()-.5)*w} cy={rng()*h} r={.4+rng()*1.1} fill="white" opacity={rng()*.6} />)}
      <polygon points={hull} fill={`url(#${prefix}-reflection)`} />
    </g>
    <path d={`M${-w*.5},0 L${-w*.23},${top} L${w*.2},${top*.93}`} fill="none" stroke="white" strokeWidth="1.5" opacity=".8" />
  </g>
}

export function GemstoneArtwork({ shape, colors, name }: { shape: GemShape; colors: string[]; name: string }) {
  const prefix = `gem-${useId().replace(/:/g, '')}`
  const matrix = !['quartz', 'tourmaline', 'peridot'].includes(shape)
  return <div className="artwork gemstone-artwork" data-render-state="ready" data-gem-shape={shape}>
    <svg viewBox="0 0 720 440" role="img" aria-label={`${name}晶体配色预览`}>
      <defs>
        {colors.map((color, i) => <g key={i}>
          <linearGradient id={`${prefix}-body-${i}`} x1="0" y1="0" x2=".75" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor={tint(color, shape === 'dioptase' ? -.78 : -.32)} /><stop offset=".25" stopColor={tint(color, shape === 'dioptase' ? -.35 : shape === 'aquamarine' ? .4 : .15)} /><stop offset=".58" stopColor={shape === 'dioptase' ? tint(color, -.55) : color} /><stop offset=".8" stopColor={tint(colors[(i+1)%4], shape === 'dioptase' ? -.2 : .25)} /><stop offset="1" stopColor={tint(colors[(i+2)%4], shape === 'tourmaline' ? .72 : -.12)} />
          </linearGradient>
          <linearGradient id={`${prefix}-top-${i}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={tint(color, shape === 'dioptase' ? -.25 : .72)} /><stop offset=".5" stopColor={shape === 'aquamarine' ? tint(color, .35) : tint(colors[(i+2)%4], shape === 'dioptase' ? -.5 : .17)} /><stop offset="1" stopColor={tint(color, -.25)} /></linearGradient>
        </g>)}
        <linearGradient id={`${prefix}-reflection`} x1="0" y1="0" x2="1" y2=".5"><stop stopColor="white" stopOpacity=".06" /><stop offset=".4" stopColor="white" stopOpacity="0" /><stop offset=".43" stopColor="white" stopOpacity=".28" /><stop offset=".49" stopColor="white" stopOpacity=".02" /><stop offset="1" stopColor="white" stopOpacity="0" /></linearGradient>
        <radialGradient id={`${prefix}-shadow`}><stop stopColor={tint(colors[0], -.65)} stopOpacity=".19" /><stop offset="1" stopColor={colors[0]} stopOpacity="0" /></radialGradient>
        <filter id={`${prefix}-grain`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency=".65" numOctaves="3" seed="9" result="noise" />
          <feColorMatrix in="noise" type="saturate" values="0" /><feComponentTransfer><feFuncA type="linear" slope=".12" /></feComponentTransfer>
          <feComposite in2="SourceGraphic" operator="in" /><feBlend in2="SourceGraphic" mode="soft-light" />
        </filter>
      </defs>
      <rect width="720" height="440" fill="#FDFDFC" />
      <ellipse cx="360" cy="374" rx={shape === 'quartz' || shape === 'tourmaline' ? 124 : 201} ry="31" fill={`url(#${prefix}-shadow)`} />
      <g filter={`url(#${prefix}-grain)`} transform="translate(360 220) scale(1.1) translate(-360 -220)">
        {matrix && <MineralMatrix colors={colors} shape={shape} />}
        {scenes[shape].map((crystal, index) => <CrystalPrism key={index} crystal={crystal} index={index} prefix={prefix} shape={shape} colors={colors} />)}
        {['aquamarine', 'morganite', 'barite'].includes(shape) && <MineralMatrix colors={colors} shape={shape} front />}
      </g>
    </svg>
  </div>
}
