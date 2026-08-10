import fm from 'front-matter'
import type { NewsItem } from './newsTypes'

const files = import.meta.glob('/content/news/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function normalise(v: unknown): unknown {
  if (v instanceof Date) return v.toISOString().slice(0, 10)
  if (Array.isArray(v)) return v.map(normalise)
  if (v && typeof v === 'object') {
    return Object.fromEntries(
      Object.entries(v as Record<string, unknown>).map(([k, x]) => [k, normalise(x)]),
    )
  }
  return v
}

export const allNews: NewsItem[] = Object.entries(files)
  .filter(([path]) => !path.endsWith('README.md'))
  .map(([, raw]) => {
    const { attributes, body } = fm<Record<string, unknown>>(raw)
    return { ...(normalise(attributes) as NewsItem), body }
  })
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
