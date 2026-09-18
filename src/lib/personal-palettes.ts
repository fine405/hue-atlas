import { useMemo, useSyncExternalStore } from 'react'
import { palettes, type Palette } from '@/data/palettes'

export type PersonalPalette = { id: string; baseId: string; name: string; colors: Palette['colors'] }
const key = 'hue-atlas:personal-palettes:v1'
const changed = 'hue-atlas:palettes-changed'
const unavailable = '__unavailable__'

function snapshot() {
  try { return localStorage.getItem(key) ?? '[]' } catch { return unavailable }
}
function parse(raw: string): PersonalPalette[] {
  const items: unknown = JSON.parse(raw)
  if (!Array.isArray(items) || !items.every((item) => item && typeof item.id === 'string' &&
    typeof item.name === 'string' && item.name.trim().length > 0 && item.name.length <= 40 &&
    palettes.some((palette) => palette.id === item.baseId) && Array.isArray(item.colors) &&
    item.colors.length === 5 && item.colors.every((color: unknown) => typeof color === 'string' && /^#[\da-f]{6}$/i.test(color)))) {
    throw new Error('Invalid saved palettes')
  }
  return items
}
function subscribe(listener: () => void) {
  window.addEventListener('storage', listener)
  window.addEventListener(changed, listener)
  return () => { window.removeEventListener('storage', listener); window.removeEventListener(changed, listener) }
}
export function usePersonalPalettes() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => '')
  return useMemo(() => {
    if (!raw) return { items: [], ready: false, error: false }
    try { return { items: parse(raw), ready: true, error: false } }
    catch { return { items: [], ready: true, error: true } }
  }, [raw])
}
function write(items: PersonalPalette[]) {
  localStorage.setItem(key, JSON.stringify(items))
  window.dispatchEvent(new Event(changed))
}
export function savePersonalPalette(item: PersonalPalette) {
  const items = parse(snapshot())
  parse(JSON.stringify([item]))
  write([item, ...items.filter((saved) => saved.id !== item.id)])
}
export function deletePersonalPalette(id: string) {
  write(parse(snapshot()).filter((item) => item.id !== id))
}
