#!/usr/bin/env node
/**
 * THE QUEUE.
 *
 * The steward reads issues and writes focus instructions here. The agents drain
 * them. Nothing runs in the same pass that proposes it — there is always a
 * committed file a person can read, and delete from, before anything executes.
 *
 * That gap is the point. An agent that can enlarge its own workload will, and
 * the cheapest guard is a file somebody glances at rather than a rule nobody
 * checks.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

export const QUEUE = 'agents/_queue.md'

/** Entries older than this are dropped rather than run. */
export const STALE_DAYS = 21

const MARKER = '## What is queued'

/**
 * An entry is { title, agent, added, source, focus }. Plain objects rather than
 * a type, because this file is run by node directly and never compiled.
 */

export function readQueue(path = QUEUE) {
  if (!existsSync(path)) return { head: '', entries: [] }
  const raw = readFileSync(path, 'utf8')
  const at = raw.indexOf(MARKER)
  if (at === -1) return { head: raw, entries: [] }

  const head = raw.slice(0, at + MARKER.length)
  const body = raw.slice(at + MARKER.length)

  const entries = []
  // Split on headings, keeping the heading with its block.
  const blocks = body.split(/\n## /).slice(1)
  for (const b of blocks) {
    const lines = b.split('\n')
    const title = lines[0].trim()
    const meta = {}
    let i = 1
    for (; i < lines.length; i++) {
      const m = lines[i].match(/^(agent|added|source):\s*(.+)$/)
      if (!m) break
      meta[m[1]] = m[2].trim()
    }
    // The instruction is the indented block that follows.
    const focus = lines
      .slice(i)
      .filter((l) => l.startsWith('    '))
      .map((l) => l.slice(4))
      .join('\n')
      .trim()

    if (meta.agent && focus) {
      entries.push({
        title,
        agent: meta.agent,
        added: meta.added ?? '',
        source: meta.source ?? '',
        focus,
      })
    }
  }
  return { head, entries }
}

export function writeQueue(entries, head, path = QUEUE) {
  const body = entries.length
    ? entries
        .map(
          (e) =>
            `\n\n## ${e.title}\nagent: ${e.agent}\nadded: ${e.added}\nsource: ${e.source}\n\n` +
            e.focus
              .split('\n')
              .map((l) => `    ${l}`)
              .join('\n'),
        )
        .join('')
    : '\n\n_Nothing queued._'
  writeFileSync(path, head + body + '\n')
}

/** Days since an entry was queued. Infinity when undated, so it is dropped. */
export function ageOf(entry, now = new Date()) {
  const d = new Date(entry.added)
  if (isNaN(d.getTime())) return Infinity
  return (now.getTime() - d.getTime()) / 864e5
}

/**
 * What this agent should run, and what should be dropped on the way.
 *
 * Returns at most one instruction. A run that drained four queued instructions
 * at once would be four runs' worth of work reported as one, and the summary
 * would be useless for judging any of them.
 */
export function takeFor(agent, entries, now = new Date()) {
  const stale = entries.filter((e) => e.agent === agent && ageOf(e, now) > STALE_DAYS)
  const live = entries.filter((e) => e.agent === agent && ageOf(e, now) <= STALE_DAYS)
  const next = live[0] ?? null
  const remaining = entries.filter((e) => e !== next && !stale.includes(e))
  return { next, stale, remaining }
}
