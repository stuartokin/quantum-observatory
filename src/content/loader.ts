import fm from 'front-matter'
import type { Item } from './types'

/**
 * Vite reads every markdown file in /content/items at build time.
 * No runtime fetch, no CMS, no database. The repo is the content graph.
 */
const files = import.meta.glob('/content/items/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

/**
 * YAML turns an unquoted 2026-05-14 into a Date, not a string. Agents will
 * write dates both ways, so normalise here rather than depend on quoting
 * discipline in every content file.
 */
function normalise(value: unknown): unknown {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (Array.isArray(value)) return value.map(normalise)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, normalise(v)]),
    )
  }
  return value
}

function parse(raw: string): Item {
  const { attributes, body } = fm<Record<string, unknown>>(raw)
  return { ...(normalise(attributes) as Omit<Item, 'body'>), body }
}

export const allItems: Item[] = Object.values(files).map(parse)

/** Only published, public items reach the renderers. Drafts stay in the repo, off the site. */
export const items: Item[] = allItems
  .filter((i) => i.status === 'published')
  .filter((i) => (i.access ?? 'public') === 'public')
  .sort((a, b) => (b.published ?? '').localeCompare(a.published ?? ''))

export const byId = new Map(items.map((i) => [i.id, i]))
