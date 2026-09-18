import { toast } from 'sonner'

export async function copyColors(value: string) {
  try {
    await navigator.clipboard.writeText(value)
    toast.success('已复制到剪贴板', { description: value })
  } catch {
    toast.error('暂时无法访问剪贴板', { description: '请选中色值，手动复制。' })
  }
}
