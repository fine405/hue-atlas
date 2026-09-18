import { createRootRoute, HeadContent, Outlet, Scripts, Link } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
import { palettes } from '@/data/palettes'
import stylesheet from '../index.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Hue Atlas 色谱 — 为好设计，找到好颜色' },
      { name: 'description', content: `探索 ${palettes.length} 套精心搭配的色系，复制色值、预览真实界面。Hue Atlas 色谱，设计灵感的下一站。` },
    ],
    links: [{ rel: 'stylesheet', href: stylesheet }, { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  }),
  component: () => <html lang="zh-CN"><head><HeadContent /></head><body><a className="skip-link" href="#main">跳转到主要内容</a><Outlet /><Toaster position="bottom-center" /><Scripts /></body></html>,
  notFoundComponent: () => <main id="main" className="not-found"><p className="eyebrow">404 / COLOR NOT FOUND</p><h1>这抹颜色还没有被收录</h1><p>回到色系库，发现另一种灵感。</p><Link to="/">返回色系库 →</Link></main>,
})
