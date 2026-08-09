import type { FrontierItem } from '../../content/frontierTypes'

/**
 * WHAT WAS DECIDED, AND BY WHOM
 *
 * Two kinds of decision run through this board and neither was visible.
 *
 * Human precedents live in `agents/_decisions.md` — vendor documents are E2,
 * reviews cap at E3, and so on. Those are rendered from source in Help.
 *
 * Agent decisions are scattered across item front matter: a readiness moved, a
 * level corrected downward, a note explaining why. Individually they are
 * fields; together they are a record of how the board came to say what it says,
 * and until now the only way to read it was to open fifty-six files.
 *
 * Derived, never authored — so it cannot drift from what the board actually
 * holds.
 */

export type DecisionKind = 'moved' | 'corrected' | 'published' | 'confirmed' | 'vetoed'

export interface Decision {
  id: string
  title: string
  kind: DecisionKind
  /** Who settled it. The distinction the whole provenance model rests on. */
  by: 'human' | 'agent'
  agent?: string
  date: string
  what: string
  why?: string
  level?: string
  priority?: string
  constellation?: string
}

const KIND_ORDER: Record<DecisionKind, number> = {
  vetoed: 0,
  moved: 1,
  corrected: 2,
  confirmed: 3,
  published: 4,
}

export function buildDecisions(items: FrontierItem[]): Decision[] {
  const out: Decision[] = []

  for (const i of items) {
    const base = {
      id: i.id,
      title: i.title,
      level: i.evidence?.level,
      priority: i.priority,
      constellation: i.constellation,
    }
    const rev = i.review

    // A readiness change is a judgement about the world, not about the file.
    if (i.moved?.on) {
      out.push({
        ...base,
        kind: 'moved',
        by: rev?.state === 'reviewed' ? 'human' : 'agent',
        agent: rev?.agent,
        date: i.moved.on,
        what: `Readiness ${i.moved.from ?? 'unknown'} → ${i.readiness}`,
        why: i.evidence?.claim?.slice(0, 220),
      })
    }

    if (rev?.state === 'vetoed' && rev.on) {
      out.push({
        ...base,
        kind: 'vetoed',
        by: 'human',
        date: rev.on,
        what: 'Removed from the board',
        why: rev.note,
      })
    }

    // The reviewer only ever corrects downward, so this is always the board
    // becoming more cautious than it was.
    if (rev?.state === 'agent-reviewed') {
      out.push({
        ...base,
        kind: 'corrected',
        by: 'agent',
        agent: rev.agent ?? 'reviewer',
        date: rev.reviewedOn ?? rev.agentMergedOn ?? '',
        what: rev.note ? 'Corrected downward' : 'Checked against its sources',
        why: rev.note,
      })
    }

    if (rev?.state === 'agent-merged' && rev.agentMergedOn) {
      out.push({
        ...base,
        kind: 'published',
        by: 'agent',
        agent: rev.agent,
        date: rev.agentMergedOn,
        what: `Published at ${i.evidence?.level ?? 'unrated'}`,
        why: rev.note,
      })
    }

    if (rev?.state === 'reviewed' && rev.on && !i.moved?.on) {
      out.push({
        ...base,
        kind: 'confirmed',
        by: 'human',
        date: rev.on,
        what: rev.agent ? `Confirmed ${rev.agent}'s entry` : 'Reviewed',
        why: rev.note,
      })
    }
  }

  return out.sort(
    (a, b) =>
      b.date.localeCompare(a.date) || KIND_ORDER[a.kind] - KIND_ORDER[b.kind],
  )
}

export interface DecisionTally {
  total: number
  byHuman: number
  byAgent: number
  moved: number
  corrected: number
  vetoed: number
}

export function tally(decisions: Decision[]): DecisionTally {
  return {
    total: decisions.length,
    byHuman: decisions.filter((d) => d.by === 'human').length,
    byAgent: decisions.filter((d) => d.by === 'agent').length,
    moved: decisions.filter((d) => d.kind === 'moved').length,
    corrected: decisions.filter((d) => d.kind === 'corrected').length,
    vetoed: decisions.filter((d) => d.kind === 'vetoed').length,
  }
}
