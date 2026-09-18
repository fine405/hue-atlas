import { useState, type CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Check, Copy, Circle, Layers, Leaf, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { palettes, contrastRatio, readableInk, type Palette } from '@/data/palettes'
import { Header } from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel } from '@/components/ui/field'
import { copyColors } from '@/lib/clipboard'

function InterfacePreview({ palette }: { palette: Palette }) {
  const [completed, setCompleted] = useState(false)
  const [note, setNote] = useState('')
  const theme = {
    '--background': palette.background, '--foreground': palette.foreground,
    '--primary': palette.primary, '--primary-foreground': readableInk(palette.primary),
    '--secondary': palette.muted, '--secondary-foreground': palette.foreground,
    '--muted': palette.muted, '--muted-foreground': palette.foreground,
    '--accent': palette.muted, '--accent-foreground': palette.foreground,
    '--border': palette.colors[2], '--input': palette.colors[2], '--ring': palette.primary,
  } as CSSProperties

  return <section className="interface-preview" style={theme} aria-label="配色组件预览">
    <div className="preview-browser"><span><i /><i /><i /></span><p>studio / your next idea</p><Layers size={14} /></div>
    <div className="preview-body"><div className="preview-heading"><span className="preview-logo"><Leaf size={20} />slow studio</span><Badge variant="secondary">灵感空间</Badge></div>
      <div className="preview-quote"><p>A LITTLE ROOM TO GROW</p><h2>把日常，<br />过成喜欢的样子。</h2><span>留一点时间，给正在发生的美好。</span><div className="preview-sculpture" aria-hidden="true"><i /><i /><i /></div></div>
      <div className="preview-workspace"><div><p className="preview-section-label">TODAY'S LITTLE WINS</p><h3>今天的小计划</h3><button className="task-check" onClick={() => setCompleted((value) => !value)} aria-pressed={completed}>{completed ? <Check size={19} /> : <Circle size={19} />}<span>{completed ? '完成啦，做得不错！' : '为新项目收集一些灵感'}</span></button></div>
        <form onSubmit={(event) => { event.preventDefault(); if (note.trim()) { toast.success('预览交互成功', { description: '这是组件演示，不会保存或发送内容。' }); setNote('') } }} className="flex flex-col gap-3"><Field><FieldLabel htmlFor="preview-note">记下此刻的想法</FieldLabel><Input id="preview-note" value={note} onChange={(event) => setNote(event.target.value)} placeholder="一个新的灵感……" maxLength={100} /></Field><Button type="submit" disabled={!note.trim()}><Plus data-icon="inline-start" />添加灵感</Button></form></div>
      <div className="preview-bottom"><span>Less noise. More meaning.</span><span>Made with {palette.english}</span></div>
    </div>
  </section>
}

export function PaletteDetail({ palette }: { palette: Palette }) {
  const index = palettes.findIndex((item) => item.id === palette.id)
  const next = palettes[(index + 1) % palettes.length]
  const contrast = contrastRatio(palette.primary, readableInk(palette.primary))
  return <><Header palette={palette} /><main id="main" className="page-container detail-page"><Link to="/" hash="palettes" className="back-link"><ArrowLeft size={15} />返回色系库</Link>
    <div className="detail-heading"><div><p className="eyebrow">{palette.english}</p><h1>{palette.name}<Badge variant="outline">{palette.mood}</Badge></h1><p className="detail-description">{palette.description}</p></div><Button variant="outline" size="lg" onClick={() => copyColors(palette.colors.join(', '))}><Copy data-icon="inline-start" />复制整组色值</Button></div>
    <div className="detail-swatches">{palette.colors.map((hex, colorIndex) => <button key={hex} onClick={() => copyColors(hex)} style={{ background: hex, color: readableInk(hex) }} aria-label={`复制 ${hex}`}><span>0{colorIndex + 1}</span><div><strong>{hex}</strong><Copy size={17} /></div></button>)}</div>
    <div className="preview-section-header"><div><h2>界面预览</h2></div><span>浅色主题 · 可交互</span></div>
    <div className="detail-preview-grid"><InterfacePreview palette={palette} /><aside className="palette-notes"><h3>颜色分配</h3><dl><div><dt>正文 / Foreground</dt><dd><i style={{ background: palette.foreground }} />{palette.foreground}</dd></div><div><dt>主色 / Primary</dt><dd><i style={{ background: palette.primary }} />{palette.primary}</dd></div><div><dt>底色 / Background</dt><dd><i style={{ background: palette.background }} />{palette.background}</dd></div></dl><div className="contrast-note"><Check size={17} /><div><strong>按钮文字对比度 {contrast.toFixed(2)} : 1</strong><p>{contrast >= 4.5 ? '达到 WCAG AA 普通文字对比度要求。' : '请增加按钮文字与背景的对比度。'}其他搭配仍需按实际用法检查。</p></div></div>{palette.source && <div className="palette-source"><p>色系参考</p><a href={palette.source.url} target="_blank" rel="noreferrer">{palette.source.title} ↗</a><p>色卡保留原图色值与顺序。组件预览按用途分配颜色，必要时补充中性色。</p></div>}</aside></div>
    <div className="next-palette"><span>继续发现另一种性格</span><Link to="/palettes/$paletteId" params={{ paletteId: next.id }}><span className="next-dots">{next.colors.slice(0, 3).map((color) => <i key={color} style={{ background: color }} />)}</span>{next.name}<ArrowRight size={18} /></Link></div>
  </main></>
}
