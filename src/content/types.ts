/**
 * One domain.
 *
 * The board declared five for most of its life and populated exactly one; the
 * four others were a promise it was never going to keep, and a schema that
 * offers a category holding nothing is the same quiet untruth as an unsourced
 * claim. The field survives the narrowing so that every record still states
 * its domain and a second could be added without a migration.
 */
export type Pillar = 'quantum'
export type ItemType = 'article' | 'observatory' | 'note' | 'talk' | 'pillar'
export type Status = 'draft' | 'review' | 'published' | 'archived'

export interface Spatial {
  magnitude: number
  depth: number
  connections?: string[]
  anchor?: boolean
}

export interface Item {
  schema: 'item/v1'
  id: string
  title: string
  summary?: string
  type: ItemType
  pillars: Pillar[]
  status: Status
  published?: string
  updated?: string
  url?: string
  poster?: string
  spatial: Spatial
  access?: 'public' | 'registered' | 'paid'
  dataLicence?: string
  locked?: string[]
  lastHumanEdit?: string
  lastAgentEdit?: string
  author?: string
  liveness?: { lastChecked?: string; state?: 'ok' | 'slow' | 'broken' | 'stale'; note?: string }
  /** Markdown body. Absent for external items. */
  body?: string
}

export interface SiteMeta {
  title: string
  tagline: string
  disclaimer: string
  byline: string
}
