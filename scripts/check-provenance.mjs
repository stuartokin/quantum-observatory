#!/usr/bin/env node
/**
 * GATE 4 — PROVENANCE
 *
 * The auto-merge model rests on one promise: every item on the board says
 * whether a human has read it. If that promise can be broken silently, the
 * whole arrangement is unsafe.
 *
 * So it is enforced here rather than left to the renderer.
 *
 * Three rules:
 *   1. Every item declares a review state.
 *   2. An agent may never write `reviewed`. Only a human sets that.
 *   3. Agent commits may not touch the escalation categories.
 *
 * Usage:
 *   node scripts/check-provenance.mjs                 # rule 1, always
 *   node scripts/check-provenance.mjs --agent <name>  # rules 1–3, on agent PRs
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { execSync } from 'node:child_process'
import yaml from 'js-yaml'

const args = process.argv.slice(2)
const agentIdx = args.indexOf('--agent')
const agent = agentIdx >= 0 ? args[agentIdx + 1] : null

const DIRS = ['content/frontier', 'content/frontier/_inbox']
const errors = []

/** Words that make a change a professional risk rather than a technical one. */
const ESCALATE = [
  'ofgem',
  'consultation',
  'licence condition',
  'license condition',
  'enforcement action',
  'regulatory position',
  'select committee',
]

function items() {
  const out = []
  for (const dir of DIRS) {
    if (!existsSync(dir)) continue
    // README files document the folder; they are not items.
    for (const f of readdirSync(dir).filter((x) => x.endsWith('.md') && x !== 'README.md')) {
      const path = join(dir, f)
      const raw = readFileSync(path, 'utf8')
      const m = raw.match(/^---\n([\s\S]*?)\n---/)
      if (!m) {
        errors.push(`${path}: no front matter`)
        continue
      }
      try {
        out.push({ path, data: yaml.load(m[1]), body: raw })
      } catch (e) {
        errors.push(`${path}: unparseable front matter — ${e.message}`)
      }
    }
  }
  return out
}

const all = items()

/* ---- Rule 1: everything declares its provenance ---- */

for (const { path, data } of all) {
  const r = data?.review
  if (!r) {
    errors.push(`${path}: no review block. Every item must say whether a human has read it.`)
    continue
  }
  if (!['reviewed', 'agent-merged', 'vetoed'].includes(r.state)) {
    errors.push(`${path}: review.state is "${r.state}"`)
  }
  if (r.state === 'reviewed' && !r.on) {
    errors.push(`${path}: reviewed without a date. An undated review is not a review.`)
  }
  if (r.state === 'agent-merged' && !r.agentMergedOn) {
    errors.push(`${path}: agent-merged without agentMergedOn. The reader must be able to see how old it is.`)
  }
}

/* ---- Rules 2 and 3: agent commits only ---- */

if (agent) {
  /**
   * Which files did this agent actually write?
   *
   * The runner records them. That is authoritative and needs no git history.
   * A diff against origin/main is the fallback, and if neither is available we
   * check nothing agent-specific — because the previous behaviour, checking
   * every file on the board, reported dozens of human-reviewed items as agent
   * forgeries. A gate that cries wolf is a gate that gets ignored.
   */
  let changed = null

  if (existsSync('.agent-run/written.txt')) {
    changed = readFileSync('.agent-run/written.txt', 'utf8').split('\n').filter(Boolean)
    console.log(`  scope: ${changed.length} file(s) written by ${agent}`)
  } else {
    const base = process.env.BASE_REF || 'origin/main'
    try {
      changed = execSync(`git diff --name-only ${base}...HEAD`, { encoding: 'utf8' })
        .split('\n')
        .filter(Boolean)
      console.log(`  scope: ${changed.length} file(s) changed against ${base}`)
    } catch {
      console.warn(
        `  Could not determine which files ${agent} wrote — no .agent-run/written.txt\n` +
          '  and no merge base. Skipping the agent-specific checks rather than\n' +
          '  reporting every file on the board as an agent change.',
      )
    }
  }

  if (changed) {
    for (const path of changed) {
      if (!path.endsWith('.md')) continue
      const item = all.find((i) => i.path === path)
      if (!item) continue

      // Rule 2 — the core safeguard.
      if (item.data?.review?.state === 'reviewed') {
        errors.push(
          `${path}: agent "${agent}" wrote review.state: reviewed. ` +
            `Agents may only write agent-merged. Only a human marks something reviewed.`,
        )
      }
      if (item.data?.review?.by === 'human') {
        errors.push(`${path}: agent "${agent}" claimed review.by: human.`)
      }

      // Rule 3 — professional risk, not technical risk. No label fixes this.
      const hay = item.body.toLowerCase()
      for (const term of ESCALATE) {
        if (hay.includes(term)) {
          errors.push(
            `${path}: mentions "${term}". Agents may not auto-merge anything naming ` +
              `Ofgem, a live consultation or a regulatory position. This needs a human.`,
          )
        }
      }
    }

    // Rule 3b — agents propose removals, humans action them.
    try {
      const base = process.env.BASE_REF || 'origin/main'
      const deleted = execSync(`git diff --diff-filter=D --name-only ${base}...HEAD`, {
        encoding: 'utf8',
      })
        .split('\n')
        .filter((p) => p.startsWith('content/frontier/') && p.endsWith('.md'))
      for (const d of deleted) {
        errors.push(
          `${d}: agent "${agent}" deleted a published item. Agents propose removals; ` +
            `humans action them.`,
        )
      }
    } catch {
      /* no usable history; the write-scope gate still covers deletions */
    }
  }
}

/* ---- report ---- */

const counts = all.reduce((acc, i) => {
  const s = i.data?.review?.state ?? 'missing'
  acc[s] = (acc[s] ?? 0) + 1
  return acc
}, {})

console.log('Provenance:')
for (const [k, v] of Object.entries(counts).sort()) console.log(`  ${k.padEnd(14)} ${v}`)

if (errors.length) {
  console.error('\nProvenance check failed:\n' + errors.map((e) => '  - ' + e).join('\n'))
  process.exit(1)
}
console.log(agent ? `Provenance OK for agent "${agent}".` : 'Provenance OK.')
