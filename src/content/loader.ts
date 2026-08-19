import type { Item } from './types'
import type { ContentRecord } from './collections'

/**
 * `let`, not `const` — content is fetched and hydrated once before React
 * mounts. See `store.ts`. Never derive from these at module scope.
 */
export let allItems: Item[] = []
/** Only published, public items reach the renderers. Drafts stay in the repo, off the site. */
export let items: Item[] = []
export let byId: Map<string, Item> = new Map()

export function hydrateItems(records: ContentRecord[]): void {
  allItems = records.map(({ attributes }) => attributes as unknown as Item)

  items = allItems
    .filter((i) => i.status === 'published')
    .filter((i) => (i.access ?? 'public') === 'public')
    .sort((a, b) => (b.published ?? '').localeCompare(a.published ?? ''))

  byId = new Map(items.map((i) => [i.id, i]))
}
