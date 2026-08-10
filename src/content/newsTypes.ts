export type NewsSignificance = 'headline' | 'notable' | 'routine'
export type SourceKind =
  | 'paper' | 'preprint' | 'standard' | 'authority' | 'vendor' | 'press' | 'journalism'

export interface NewsSource {
  url: string
  kind: SourceKind
  title?: string
  publisher?: string
  date?: string
  doi?: string
}

/** Why an item is believed. An unvalidated item is not published. */
export interface NewsValidation {
  status: 'verified' | 'single-source' | 'contested' | 'rejected'
  checks: string[]
  note?: string
}

export interface EstablishedBy {
  url: string
  title?: string
  publisher?: string
  date?: string
  doi?: string
  relation?: 'reports' | 'builds-on' | 'applies' | 'contradicts'
}

/**
 * A dated event, deliberately not a frontier item.
 *
 * The board maps how close things are to being real. News is what happened and
 * when. Mixing them would let a stream of announcements move a readiness map,
 * which is precisely what the map exists to resist.
 */
export interface NewsItem {
  schema: 'news/v1'
  id: string
  headline: string
  pillar: 'ai' | 'quantum' | 'materials' | 'energy' | 'cyber'
  date: string
  plain: string
  significance?: NewsSignificance
  source: NewsSource
  corroboration?: { url: string; publisher?: string; kind?: string }[]
  validation: NewsValidation
  /** Frontier item ids this bears on. */
  about?: string[]
  /** The research behind it — the link that makes an announcement traceable. */
  establishedBy?: EstablishedBy[]
  actors?: string[]
  country?: string[]
  review?: {
    state: 'reviewed' | 'agent-reviewed' | 'agent-merged' | 'vetoed'
    by?: 'human' | 'agent'
    on?: string
    agentMergedOn?: string
    reviewedOn?: string
    agent?: string
    note?: string
  }
  status: 'draft' | 'published' | 'archived'
  added?: string
  body?: string
}
