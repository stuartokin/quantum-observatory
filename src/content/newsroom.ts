import type { NewsItem } from './newsTypes'
import type { ContentRecord } from './collections'

/**
 * `let`, not `const` — content is fetched and hydrated once before React
 * mounts. See `store.ts`. Never derive from these at module scope.
 */
export let allNews: NewsItem[] = []

export function hydrateNews(records: ContentRecord[]): void {
  allNews = records
    .map(({ attributes }) => attributes as unknown as NewsItem)
    .filter((n) => n.schema === 'news/v1')
    // 'draft' is a real status a file can carry mid-edit; this never enforced
    // published-only the way frontier.ts and loader.ts do for their own
    // collections, so a draft news file rendered live indistinguishably from
    // a published one.
    .filter((n) => n.status === 'published' && n.validation?.status !== 'rejected')
    .sort((a, b) => b.date.localeCompare(a.date))
}

export const newsFor = (pillar: string): NewsItem[] =>
  allNews.filter((n) => n.pillar === pillar)

/** The last N days, most recent first. Empty is a legitimate answer. */
export function recentNews(pillar: string, days = 14): NewsItem[] {
  const cutoff = new Date(Date.now() - days * 864e5).toISOString().slice(0, 10)
  return newsFor(pillar).filter((n) => n.date >= cutoff)
}

/** Everything bearing on one frontier item, for the overlay and the detail panel. */
export function newsAbout(id: string): NewsItem[] {
  return allNews.filter((n) => n.about?.includes(id))
}
