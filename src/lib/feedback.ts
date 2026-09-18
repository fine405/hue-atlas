import type { Palette } from '@/data/palettes'

export const repositoryUrl = 'https://github.com/fine405/hue-atlas'
export const feedbackTypes = ['使用问题', '配色建议', '功能建议'] as const
export type FeedbackType = (typeof feedbackTypes)[number]

export function buildIssueUrl(input: { type: FeedbackType; title: string; description: string; palette?: Palette }) {
  const body = [
    `### 反馈类型\n${input.type}`,
    `### 详细描述\n${input.description.trim()}`,
    input.palette ? `### 相关配色\n${input.palette.name} (${input.palette.id})\n${input.palette.colors.join(', ')}` : '### 相关配色\n通用反馈',
    '---\n来自 Hue Atlas 色谱 · v0.1',
  ].join('\n\n')
  const params = new URLSearchParams({ title: `[${input.type}] ${input.title.trim()}`, body })
  return `${repositoryUrl}/issues/new?${params.toString()}`
}
