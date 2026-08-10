import type { NewsItem } from './newsTypes'

const files = import.meta.glob('/content/news/*.md', {
  query: '?parsed',
  import: 'default',
  eager: true,
}) as Record<string, { attributes: Record<string, unknown>; body: string }>


export const allNews: NewsItem[] = Object.entries(files)
  .filter(([path]) => !path.endsWith('README.md'))
  .map(([, { attributes, body }]) => ({ ...(attributes as unknown as NewsItem), body }))
  .filter((n) => n.schema === 'news/v1')
  .filter((n) => n.status !== 'archived' && n.validation?.status !== 'rejected')
  .sort((a, b) => b.date.localeCompare(a.date))

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
