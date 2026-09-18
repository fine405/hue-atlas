import { Link } from '@tanstack/react-router'
import { CodeXml } from 'lucide-react'
import { FeedbackDialog } from '@/components/feedback-dialog'
import { repositoryUrl } from '@/lib/feedback'
import type { Palette } from '@/data/palettes'

export function Header({ palette }: { palette?: Palette }) {
  return <header className="site-header"><div className="header-inner">
    <Link to="/" className="brand" aria-label="Hue Atlas 色谱首页"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>hue atlas<span className="brand-cn">色谱</span></span></Link>

    <div className="header-actions"><a href={repositoryUrl} target="_blank" rel="noreferrer" aria-label="GitHub 源码仓库" className="github-icon"><CodeXml size={19} /></a><FeedbackDialog palette={palette} /></div>
  </div></header>
}
