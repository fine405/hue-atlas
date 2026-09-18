import { createFileRoute } from '@tanstack/react-router'
import { Gallery } from '@/components/gallery'

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): { group?: 'classic' | 'gemstones' } => ({
    group: search.group === 'gemstones' ? 'gemstones' : undefined,
  }),
  component: Gallery,
})
