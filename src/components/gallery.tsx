import { Link, useSearch } from '@tanstack/react-router'
import { ArrowUpRight, Copy, MoveUpRight, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { palettes, paletteGroups, readableInk, type Palette } from '@/data/palettes'
import { Header } from '@/components/layout'
import { PaletteArtwork } from '@/components/palette-artwork'
import { Button } from '@/components/ui/button'
import { copyColors } from '@/lib/clipboard'
import { usePersonalPalettes, deletePersonalPalette, savePersonalPalette, type PersonalPalette } from '@/lib/personal-palettes'

function PaletteCard({ palette, saved }: { palette: Palette; saved?: PersonalPalette }) {
  const colors = saved?.colors ?? palette.colors
  const name = saved?.name ?? palette.name
  const search = saved ? { saved: saved.id } : {}
  function remove() {
    if (!saved) return
    try {
      deletePersonalPalette(saved.id)
      toast.success('已删除个人色系', { action: { label: '撤销', onClick: () => {
        try { savePersonalPalette(saved) } catch { toast.error('恢复失败，请检查浏览器存储设置。') }
      } } })
    } catch { toast.error('删除失败，请检查浏览器存储设置。') }
  }
  return <article className="palette-card">
    <Link to="/palettes/$paletteId" params={{ paletteId: palette.id }} search={search} className="palette-art" aria-label={`预览${name}`}>
      <PaletteArtwork palette={palette} colors={colors} />
      <span className="art-arrow"><MoveUpRight size={17} /></span>
    </Link>
    <div className="card-swatches" aria-label={`${name}色值`}>
      {colors.map((hex, index) => <button type="button" key={index} title={`复制 ${hex}`} aria-label={`复制 ${hex}`} onClick={() => copyColors(hex)} style={{ background: hex, color: readableInk(hex) }}><span>{hex}</span><Copy size={13} aria-hidden="true" /></button>)}
    </div>
    <div className="card-info"><div><Link to="/palettes/$paletteId" params={{ paletteId: palette.id }} search={search}><h2>{name}<ArrowUpRight size={16} /></h2></Link><p>{palette.english}</p></div>{saved ? <Button variant="ghost" size="icon-sm" aria-label={`删除${name}`} onClick={remove}><Trash2 size={15} /></Button> : <span className="mood">{palette.mood}</span>}</div>
  </article>
}

export function Gallery() {
  const personal = usePersonalPalettes()
  const { group = 'classic' } = useSearch({ from: '/' })
  const visiblePalettes = palettes.filter((palette) => palette.group === group)
  return <><Header /><main id="main" className="page-container">
    <section id="palettes" className="collection" aria-labelledby="collection-title">
      <div className="section-heading"><h1 id="collection-title">色系</h1><p>点击色块复制 · 点击封面调色</p></div>
      <nav className="group-nav" aria-label="色系分组">{paletteGroups.map((item) => <Link key={item.id} to="/" search={{ group: item.id }} hash="palettes" resetScroll={false} aria-current={group === item.id ? 'page' : undefined}>{item.name}<span>{palettes.filter((palette) => palette.group === item.id).length}</span></Link>)}</nav>
      <div className="palette-grid" aria-label={paletteGroups.find((item) => item.id === group)?.name}>{visiblePalettes.map((palette) => <PaletteCard palette={palette} key={palette.id} />)}</div>
    </section>
    <section id="personal" className="personal-collection" aria-labelledby="personal-title">
      <div className="section-heading"><h2 id="personal-title">我的色系</h2><p>保存在当前浏览器</p></div>
      {personal.error ? <p role="alert" className="personal-empty">无法读取个人色系，请检查浏览器存储设置。已有数据未被覆盖。</p> : personal.items.length ?
        <div className="palette-grid">{personal.items.map((saved) => <PaletteCard key={saved.id} saved={saved} palette={palettes.find((palette) => palette.id === saved.baseId)!} />)}</div> :
        <p className="personal-empty">{personal.ready ? '打开喜欢的色系，调出你的配色并保存到这里。' : '正在读取个人色系…'}</p>}
    </section>
  </main></>
}
