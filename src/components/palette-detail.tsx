import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Copy, RotateCcw, Save } from 'lucide-react'
import { toast } from 'sonner'
import { palettes, readableInk, type Palette } from '@/data/palettes'
import { Header } from '@/components/layout'
import { PaletteArtwork } from '@/components/palette-artwork'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { copyColors } from '@/lib/clipboard'
import { savePersonalPalette, type PersonalPalette } from '@/lib/personal-palettes'

function ColorField({ color, index, onChange }: { color: string; index: number; onChange: (value: string) => void }) {
  const [draft, setDraft] = useState(color)
  const invalid = !/^#[\da-f]{6}$/i.test(draft)
  return <div className="color-field">
    <label className="color-picker" style={{ background: color }}>
      <input type="color" value={color} aria-label={`选择颜色 ${index + 1}`} onInput={(event) => { const value = event.currentTarget.value.toUpperCase(); setDraft(value); onChange(value) }} onChange={(event) => { const value = event.target.value.toUpperCase(); setDraft(value); onChange(value) }} />
    </label>
    <Field data-invalid={invalid || undefined}>
      <FieldLabel htmlFor={`color-${index}`}>颜色 0{index + 1}</FieldLabel>
      <Input id={`color-${index}`} aria-label={`颜色 ${index + 1} HEX`} value={draft} maxLength={7} spellCheck={false} aria-invalid={invalid} aria-describedby={invalid ? `color-error-${index}` : undefined}
        onBlur={() => { if (invalid) setDraft(color) }}
        onChange={(event) => { const value = event.target.value.toUpperCase(); setDraft(value); if (/^#[\dA-F]{6}$/.test(value)) onChange(value) }} />
      {invalid && <FieldError id={`color-error-${index}`}>输入 6 位 HEX 色值</FieldError>}
    </Field>
    <Button variant="ghost" size="icon-sm" aria-label={`复制 ${color}`} onClick={() => copyColors(color)}><Copy size={15} /></Button>
  </div>
}

export function PaletteDetail({ palette, saved }: { palette: Palette; saved?: PersonalPalette }) {
  const navigate = useNavigate()
  const [colors, setColors] = useState<Palette['colors']>(saved?.colors ?? palette.colors)
  const [resetVersion, setResetVersion] = useState(0)
  const [showOriginal, setShowOriginal] = useState(false)
  const [saveOpen, setSaveOpen] = useState(false)
  const [name, setName] = useState(saved?.name ?? `我的${palette.name.replace('色系', '')}`)
  const [nameError, setNameError] = useState('')
  const next = palettes[(palettes.findIndex((item) => item.id === palette.id) + 1) % palettes.length]
  const current = { ...palette, name: saved?.name ?? palette.name, colors }
  const modified = colors.some((hex, index) => hex !== palette.colors[index])

  function save() {
    if (!name.trim()) { setNameError('请为色系取个名字。'); return }
    const item: PersonalPalette = { id: saved?.id ?? crypto.randomUUID(), baseId: palette.id, name: name.trim(), colors }
    try {
      savePersonalPalette(item)
      setSaveOpen(false)
      toast.success(saved ? '已保存修改' : '已保存到我的色系')
      void navigate({ to: '/palettes/$paletteId', params: { paletteId: palette.id }, search: { saved: item.id }, replace: true })
    } catch {
      setNameError('保存失败，请检查浏览器是否允许本地存储。当前调色仍保留在页面中。')
    }
  }

  return <><Header palette={current} /><main id="main" className="page-container detail-page">
    <Link to="/" hash={saved ? 'personal' : 'palettes'} className="back-link"><ArrowLeft size={15} />返回色系库</Link>
    <div className="detail-heading"><div><p className="eyebrow">{saved ? `我的色系 / ${palette.english}` : palette.english}</p><h1>{current.name}</h1></div>
      <Button variant="outline" onClick={() => copyColors(colors.join(', '))}><Copy data-icon="inline-start" />复制整组色值</Button>
    </div>
    <div className="studio-grid">
      <section className="preview-panel" aria-label="效果预览">
        <div className="studio-section-heading"><h2>效果预览</h2><Button variant="ghost" size="sm" disabled={!modified} aria-pressed={showOriginal} onClick={() => setShowOriginal((value) => !value)}>{showOriginal ? '返回调色' : '查看原色'}</Button></div>
        <div className="artwork-frame"><PaletteArtwork palette={palette} colors={showOriginal ? palette.colors : colors} interactive />{showOriginal && <span className="original-label">原色</span>}</div>
        <div className="preview-swatches">{colors.map((hex, index) => <button key={index} type="button" style={{ background: hex, color: readableInk(hex) }} onClick={() => copyColors(hex)} aria-label={`复制色块 ${index + 1} ${hex}`}>{hex}</button>)}</div>
      </section>
      <aside className="color-editor" aria-label="自定义配色">
        <div className="studio-section-heading"><h2>自定义配色</h2><Button variant="ghost" size="sm" disabled={!modified} onClick={() => { setColors(palette.colors); setResetVersion((value) => value + 1); setShowOriginal(false) }}><RotateCcw size={14} />恢复原色</Button></div>
        <p className="editor-hint">点击色块选色，画面实时更新</p>
        <FieldGroup className="color-fields">{colors.map((hex, index) => <ColorField key={`${resetVersion}-${index}`} color={hex} index={index} onChange={(value) => { setColors((previous) => previous.map((color, i) => i === index ? value : color) as Palette['colors']); setShowOriginal(false) }} />)}</FieldGroup>
        <Dialog open={saveOpen} onOpenChange={(open) => { setSaveOpen(open); setNameError('') }}>
          <DialogTrigger asChild><Button size="lg" className="save-palette"><Save data-icon="inline-start" />{saved ? '保存修改' : '保存为个人色系'}</Button></DialogTrigger>
          <DialogContent><DialogHeader><DialogTitle>{saved ? '保存个人色系' : '给新色系取个名字'}</DialogTitle><DialogDescription>保存在当前浏览器，可在「我的色系」中继续编辑。</DialogDescription></DialogHeader>
            <form onSubmit={(event) => { event.preventDefault(); save() }} className="flex flex-col gap-5" noValidate>
              <Field data-invalid={!!nameError || undefined}><FieldLabel htmlFor="palette-name">色系名称</FieldLabel><Input id="palette-name" maxLength={40} value={name} onChange={(event) => { setName(event.target.value); setNameError('') }} aria-invalid={!!nameError} aria-describedby={nameError ? 'save-error' : undefined} />{nameError && <FieldError id="save-error">{nameError}</FieldError>}</Field>
              <Button type="submit">确认保存</Button>
            </form>
          </DialogContent>
        </Dialog>
        <p className="editor-storage-note">仅保存在此浏览器，清除浏览器数据后会丢失。</p>
      </aside>
    </div>
    <div className="next-palette"><span>继续发现另一种性格</span><Link to="/palettes/$paletteId" params={{ paletteId: next.id }} search={{}}><span className="next-dots">{next.colors.slice(0, 3).map((color) => <i key={color} style={{ background: color }} />)}</span>{next.name}<ArrowRight size={18} /></Link></div>
  </main></>
}
