import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Copy, MoveUpRight } from 'lucide-react'
import { palettes, readableInk, type Palette } from '@/data/palettes'
import { Header } from '@/components/layout'
import { copyColors } from '@/lib/clipboard'

function PaletteCard({ palette, index }: { palette: Palette; index: number }) {
  return <article className="palette-card">
    <Link to="/palettes/$paletteId" params={{ paletteId: palette.id }} className={`palette-art art-${index % 4}`} style={{ '--p0': palette.colors[0], '--p1': palette.colors[1], '--p2': palette.colors[2], '--p3': palette.colors[3], '--p4': palette.colors[4], '--art-ink': readableInk(palette.colors[4]) } as React.CSSProperties} aria-label={`预览${palette.name}`}>
      <div className="art-composition" aria-hidden="true"><i /><i /><i /><i /></div>
      <span className="art-arrow"><MoveUpRight size={17} /></span>
    </Link>
    <div className="card-swatches" aria-label={`${palette.name}色值`}>
      {palette.colors.map((hex) => <button type="button" key={hex} title={`复制 ${hex}`} aria-label={`复制 ${hex}`} onClick={() => copyColors(hex)} style={{ background: hex, color: readableInk(hex) }}><span>{hex}</span><Copy size={13} aria-hidden="true" /></button>)}
    </div>
    <div className="card-info"><div><Link to="/palettes/$paletteId" params={{ paletteId: palette.id }}><h2>{palette.name}<ArrowUpRight size={16} /></h2></Link><p>{palette.english}</p></div><span className="mood">{palette.mood}</span></div>
  </article>
}

export function Gallery() {
  return <>
    <Header />
    <main id="main" className="page-container">
      <section id="palettes" className="collection" aria-labelledby="collection-title">
        <div className="section-heading">
          <h1 id="collection-title">色系</h1>
          <p>点击色块复制 · 点击封面预览</p>
        </div>
        <div className="palette-grid">
          {palettes.map((palette, index) => <PaletteCard palette={palette} index={index} key={palette.id} />)}
        </div>
      </section>
    </main>
  </>
}
