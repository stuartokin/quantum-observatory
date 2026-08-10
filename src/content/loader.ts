import type { Item } from './types'

/**
 * Vite reads every markdown file in /content/items at build time.
 * No runtime fetch, no CMS, no database. The repo is the content graph.
 *
 * `?parsed` is handled by plugins/frontmatter.ts, which parses and normalises
 * at build time. The browser no longer downloads a YAML parser to read files
 * that were fixed when the site was built.
 */
const files = import.meta.glob('/content/items/*.md', {
  query: '?parsed',
  import: 'default',
  eager: true,
}) as Record<string, { attributes: Record<string, unknown>; body: string }>

export const allItems: Item[] = Object.values(files).map(
  ({ attributes, body }) => ({ ...(attributes as Omit<Item, 'body'>), body }),
)

/** Only published, public items reach the renderers. Drafts stay in the repo, off the site. */
export const items: Item[] = allItems
  .filter((i) => i.status === 'published')
  .filter((i) => (i.access ?? 'public') === 'public')
  .sort((a, b) => (b.published ?? '').localeCompare(a.published ?? ''))

export const byId = new Map(items.map((i) => [i.id, i]))
