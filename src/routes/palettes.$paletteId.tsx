import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { palettes } from '@/data/palettes'
import { PaletteDetail } from '@/components/palette-detail'
import { usePersonalPalettes } from '@/lib/personal-palettes'
import { Header } from '@/components/layout'

export const Route = createFileRoute('/palettes/$paletteId')({
  validateSearch: (search: Record<string, unknown>): { saved?: string } => ({ saved: typeof search.saved === 'string' ? search.saved : undefined }),
  loader: ({ params }) => {
    const palette = palettes.find((item) => item.id === params.paletteId)
    if (!palette) throw notFound()
    return palette
  },
  head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.name} · ${loaderData.english} — Hue Atlas 色谱` : '未找到配色 — Hue Atlas' }] }),
  component: PalettePage,
})

function PalettePage() {
  const palette = Route.useLoaderData()
  const { saved: savedId } = Route.useSearch()
  const personal = usePersonalPalettes()
  const saved = personal.items.find((item) => item.id === savedId && item.baseId === palette.id)
  if (savedId && !saved) return <><Header /><main id="main" className="not-found"><h1>{!personal.ready ? '正在读取个人色系…' : personal.error ? '无法读取个人色系' : '此浏览器中没有这组色系'}</h1><p>个人色系只保存在创建它的浏览器中。</p><Link to="/" hash="personal">返回我的色系 →</Link></main></>
  return <PaletteDetail key={`${palette.id}-${savedId ?? 'preset'}`} palette={palette} saved={saved} />
}
