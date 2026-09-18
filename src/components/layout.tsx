import { Link } from '@tanstack/react-router'
import { ArrowUpRight, CodeXml } from 'lucide-react'
import { FeedbackDialog } from '@/components/feedback-dialog'
import { repositoryUrl } from '@/lib/feedback'
import type { Palette } from '@/data/palettes'

export function Header({ palette }: { palette?: Palette }) {
  return <header className="site-header"><div className="header-inner">
    <Link to="/" className="brand" aria-label="Hue Atlas 色谱首页"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>hue atlas<span className="brand-cn">色谱</span></span></Link>
    <nav className="header-nav" aria-label="主导航"><Link to="/" className="nav-current">色系库</Link><a href={`${repositoryUrl}/issues`} target="_blank" rel="noreferrer">共建色谱<ArrowUpRight size={13} /></a></nav>
    <div className="header-actions"><a href={repositoryUrl} target="_blank" rel="noreferrer" aria-label="GitHub 源码仓库" className="github-icon"><CodeXml size={19} /></a><FeedbackDialog palette={palette} /></div>
  </div></header>
}

export function Footer() {
  return <footer className="site-footer"><p>hue atlas <span>一组好颜色，开启一个好想法。</span></p><a href={repositoryUrl} target="_blank" rel="noreferrer">Made for the love of color.<ArrowUpRight size={14} /></a></footer>
}
