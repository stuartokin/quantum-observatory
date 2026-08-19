/**
 * THE MIGRATION DEADLINE, AND WHERE IT COMES FROM.
 *
 * **This is the one thing on the Q-Day surface that is not read from the
 * board, and it is marked as such wherever it is shown.**
 *
 * The UK NCSC's three checkpoints — discover and plan by 2028, migrate the
 * priorities by 2031, finish by 2035 — appear on the board today only as a
 * source URL hanging off `mig-supply-chain`. They are cited; they are not
 * held as data. Nothing can render a countdown from a hyperlink.
 *
 * So they live here for now, with their real sources attached, and Phase 3 of
 * `QDAY-PLAN.md` moves them onto the frontier items where they belong. Until
 * then the surface shows the citation next to the clock rather than presenting
 * the date as though the board had verified it — which is the difference
 * between an honest placeholder and a quiet lie.
 *
 * If you are the session doing Phase 3: this file should end up empty and
 * deleted, not extended.
 */
export interface Milestone {
  year: number
  title: string
  /** End of the stated year, UTC — a deadline is met until it is not. */
  date: Date
  what: string
  /** Plain terms, for a reader who does not do this for a living. */
  plain: string
  href: string
  srcLabel: string
}

export const NCSC_MILESTONES: readonly Milestone[] = [
  {
    year: 2028,
    title: 'Discover and plan',
    date: new Date(Date.UTC(2028, 11, 31, 23, 59, 59)),
    what: 'Define migration goals, complete a full discovery of where cryptography is used, and build a prioritised plan — engaging suppliers on the post-quantum support you will need.',
    plain: 'Find every place you rely on vulnerable encryption, and write the plan to replace it.',
    href: 'https://www.ncsc.gov.uk/guidance/pqc-migration-timelines',
    srcLabel: 'NCSC guidance',
  },
  {
    year: 2031,
    title: 'Migrate the priorities',
    date: new Date(Date.UTC(2031, 11, 31, 23, 59, 59)),
    what: 'The highest-priority migrations complete — the most critical systems and the longest-lived secrets — with infrastructure in place and the plan refined to finish on schedule.',
    plain: 'Upgrade your most important and most sensitive systems first, and get set up to finish the rest.',
    href: 'https://www.ncsc.gov.uk/guidance/pqc-migration-timelines',
    srcLabel: 'NCSC guidance',
  },
  {
    year: 2035,
    title: 'Complete',
    date: new Date(Date.UTC(2035, 11, 31, 23, 59, 59)),
    what: 'Migration to post-quantum cryptography complete across all systems, services and products, with PQC the new default.',
    plain: 'Everything is quantum-safe.',
    href: 'https://www.ncsc.gov.uk/news/pqc-migration-roadmap-unveiled',
    srcLabel: 'NCSC roadmap',
  },
]

/** The clock the whole surface is measured against. */
export const NCSC_DEADLINE = NCSC_MILESTONES[NCSC_MILESTONES.length - 1]
