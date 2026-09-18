import { useState, type FormEvent } from 'react'
import { ArrowUpRight, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { buildIssueUrl, feedbackTypes, repositoryUrl, type FeedbackType } from '@/lib/feedback'
import type { Palette } from '@/data/palettes'

export function FeedbackDialog({ palette, label = '意见反馈' }: { palette?: Palette; label?: string }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<FeedbackType>('配色建议')
  const [attempted, setAttempted] = useState(false)
  const titleInvalid = attempted && !title.trim()
  const descriptionInvalid = attempted && !description.trim()
  const [draftUrl, setDraftUrl] = useState('')

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAttempted(true)
    if (!title.trim() || !description.trim()) return
    const url = buildIssueUrl({ title, description, type, palette })
    setDraftUrl(url)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return <Dialog>
    <DialogTrigger asChild><Button variant="outline" size="lg"><MessageSquare data-icon="inline-start" />{label}</Button></DialogTrigger>
    <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>意见反馈</DialogTitle>
        <DialogDescription>报告问题或提出配色建议。</DialogDescription>
      </DialogHeader>
      <form onSubmit={submit} noValidate className="flex flex-col gap-6">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="feedback-type">反馈类型</FieldLabel>
            <select id="feedback-type" value={type} onChange={(event) => { setType(event.target.value as FeedbackType); setDraftUrl('') }} className="native-select">
              {feedbackTypes.map((item) => <option key={item}>{item}</option>)}
            </select>
          </Field>
          <Field data-invalid={titleInvalid || undefined}>
            <FieldLabel htmlFor="feedback-title">标题 <span aria-hidden="true">*</span></FieldLabel>
            <Input id="feedback-title" required maxLength={80} value={title} onChange={(event) => { setTitle(event.target.value); setDraftUrl('') }} placeholder="用一句话概括你的想法" aria-invalid={titleInvalid} aria-describedby={titleInvalid ? 'title-error' : undefined} />
            {titleInvalid && <FieldError id="title-error">请填写反馈标题。</FieldError>}
          </Field>
          <Field data-invalid={descriptionInvalid || undefined}>
            <FieldLabel htmlFor="feedback-description">详细描述 <span aria-hidden="true">*</span></FieldLabel>
            <Textarea id="feedback-description" required maxLength={600} rows={5} value={description} onChange={(event) => { setDescription(event.target.value); setDraftUrl('') }} placeholder="你希望改进什么？如果遇到问题，请描述操作步骤。" aria-invalid={descriptionInvalid} aria-describedby={descriptionInvalid ? 'description-error' : 'description-hint'} />
            <FieldDescription id="description-hint">{description.length} / 600 · 可在 GitHub 中继续补充文字或截图</FieldDescription>
            {descriptionInvalid && <FieldError id="description-error">请补充反馈内容。</FieldError>}
          </Field>
          {palette && <p className="feedback-context">关联配色：<strong>{palette.name}</strong> · 色值将自动附上</p>}
        </FieldGroup>
        <div className="flex flex-col gap-3">
          <Button type="submit" size="lg">在 GitHub 中继续<ArrowUpRight data-icon="inline-end" /></Button>
          <p className="form-note">需要 GitHub 账号。内容将作为公开 Issue 发布，请在 GitHub 确认提交，勿填写隐私信息。</p>
          {draftUrl && <p role="status" className="form-note">已准备好反馈草稿。若新窗口未打开，<a href={draftUrl} target="_blank" rel="noreferrer">点击继续 →</a></p>}
          <a className="existing-issues" href={`${repositoryUrl}/issues`} target="_blank" rel="noreferrer">查看已有反馈 ↗</a>
        </div>
      </form>
    </DialogContent>
  </Dialog>
}
