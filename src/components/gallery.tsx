import { Link } from '@tanstack/react-router'
import { ArrowDown, ArrowUpRight, Copy, MoveUpRight, Sparkles } from 'lucide-react'
import { palettes, readableInk, type Palette } from '@/data/palettes'
import { Header, Footer } from '@/components/layout'
import { FeedbackDialog } from '@/components/feedback-dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { copyColors } from '@/lib/clipboard'

function PaletteCard({ palette, index }: { palette: Palette; index: number }) {
  return <article className="palette-card">
    <Link to="/palettes/$paletteId" params={{ paletteId: palette.id }} className={`palette-art art-${index % 4}`} style={{ '--p0': palette.colors[0], '--p1': palette.colors[1], '--p2': palette.colors[2], '--p3': palette.colors[3], '--p4': palette.colors[4] } as React.CSSProperties} aria-label={`预览${palette.name}`}>
      <span className="art-index">COLOR STUDY / {String(index + 1).padStart(2, '0')}</span>
      <div className="art-composition" aria-hidden="true"><i /><i /><i /><i /></div>
      <span className="art-caption">{palette.english}</span><span className="art-arrow"><MoveUpRight size={17} /></span>
    </Link>
    <div className="card-swatches" aria-label={`${palette.name}色值`}>
      {palette.colors.map((hex) => <button type="button" key={hex} title={`复制 ${hex}`} aria-label={`复制 ${hex}`} onClick={() => copyColors(hex)} style={{ background: hex, color: readableInk(hex) }}><span>{hex}</span><Copy size={13} aria-hidden="true" /></button>)}
    </div>
    <div className="card-info"><div><Link to="/palettes/$paletteId" params={{ paletteId: palette.id }}><h3>{palette.name}<ArrowUpRight size={16} /></h3></Link><p>{palette.english}</p></div><span className="mood">{palette.mood}</span></div>
  </article>
}

export function Gallery() {
  return <><Header /><main id="main" className="page-container">
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy"><p className="eyebrow"><span />A LITTLE COLOR, A LOT OF POSSIBILITY</p><h1 id="hero-title">好设计，从一组<br /><em>好颜色</em>开始。</h1><p className="hero-description">精心搭配的色系，为你的下一个作品找到灵感。<br />从自然到日常，发现颜色之间恰好的默契。</p><div className="hero-actions"><Button asChild size="lg"><a href="#palettes">探索色系<ArrowDown data-icon="inline-end" /></a></Button><span>用色彩，让想法发生。</span></div><div className="hero-meta"><span><b>12</b> 预置色系</span><span><b>60</b> 灵感色彩</span><span><span className="tiny-dot" />自由使用</span></div></div>
      <div className="hero-art" aria-label="赤陶、奶油黄和橄榄绿的配色样本插画" role="img"><div className="hero-art-grid" /><div className="floating-note note-top">THE ART OF<br /><i>color harmony.</i></div><div className="swatch-sheet sheet-back"><span>03 — OLIVE</span><div /><p>Quietly confident.</p></div><div className="swatch-sheet sheet-mid"><span>02 — BUTTER</span><div /><p>A little sunshine.</p></div><div className="swatch-sheet sheet-front"><span>01 — TERRACOTTA</span><div /><p>Warm by nature.</p><small>#A94E35</small></div><div className="floating-note note-bottom"><Sparkles size={18} />Curated, not generated.</div></div>
    </section>
    <section id="palettes" className="collection" aria-labelledby="collection-title"><div className="section-heading"><div><p className="eyebrow">THE PALETTE COLLECTION</p><h2 id="collection-title">每一组，都有自己的性格。<Badge variant="outline">12 色系</Badge></h2></div><p><span className="tiny-squares" aria-hidden="true">▦</span>点击色块复制 · 点击封面预览</p></div><div className="palette-grid">{palettes.map((palette, index) => <PaletteCard palette={palette} index={index} key={palette.id} />)}</div></section>
    <section className="contribute"><div className="contribute-art" aria-hidden="true"><i /><i /><i /></div><div><p className="eyebrow">BETTER, TOGETHER</p><h2>好颜色，也可以来自你。</h2><p>想要更多风格，或是有一点小建议？一起让这本色谱更丰富。</p></div><FeedbackDialog label="分享你的想法" /></section>
  </main><Footer /></>
}
