/**
 * A dated obligation, deliberately not a frontier item.
 *
 * A frontier item maps how close a development is to being real. A deadline is
 * not a development: it has no readiness level, nobody demonstrates it, and it
 * does not become more or less true with evidence. It is a date somebody has
 * to meet.
 *
 * These lived in `src/qday/deadlines.ts` as hardcoded constants for one
 * release, which was honest only because that file said so at the top. This is
 * where they belong — versioned, schema-checked, sourced, and visible to an
 * agent that finds a deadline has moved.
 */
export interface Milestone {
  schema: 'milestone/v1'
  id: string
  title: string
  jurisdiction: 'UK' | 'US' | 'EU' | 'AU' | 'CA' | 'NZ' | 'international'
  authority: string
  date: string
  kind: 'deadline' | 'published' | 'selected'
  what: string
  plain?: string
  /** Never computed from the date. A deadline in the past is not automatically met. */
  status: 'upcoming' | 'met' | 'missed' | 'superseded'
  about?: string[]
  source: { url: string; title?: string; publisher?: string; date?: string }
  /** Whether anyone has checked this date against the document that sets it.
   *  Same vocabulary as every other collection rather than a new one. */
  review?: {
    state: 'reviewed' | 'agent-reviewed' | 'agent-merged' | 'vetoed'
    by?: 'human' | 'agent'
    on?: string
    agent?: string
    note?: string
  }
  added?: string
}
