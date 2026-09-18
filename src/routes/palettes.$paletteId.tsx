import { createFileRoute, notFound } from '@tanstack/react-router'
import { palettes } from '@/data/palettes'
import { PaletteDetail } from '@/components/palette-detail'

export const Route = createFileRoute('/palettes/$paletteId')({
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
  return <PaletteDetail key={palette.id} palette={palette} />
}
