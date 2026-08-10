#!/usr/bin/env node
/**
 * GATE — NEWS
 *
 * The frontier validator does not know about this collection, and a news item
 * that fails silently is worse than a frontier item that does: it carries a
 * claim about the world with a validation block asserting the claim was
 * checked. That assertion has to be checkable itself.
 *
 * Beyond the schema, two rules the schema cannot express:
 *
 *   - a `verified` item must actually have something to verify against
 *   - `about` must point at frontier items that exist
 */
import { readdirSync, readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const yaml = require('js-yaml')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const DIR = 'content/news'
const SCHEMA = 'content/schema/news.schema.json'

if (!existsSync(DIR) || !existsSync(SCHEMA)) {
  console.log('No news collection. Nothing to validate.')
  process.exit(0)
}

const ajv = new (Ajv.default ?? Ajv)({ allErrors: true, strict: false })
;(addFormats.default ?? addFormats)(ajv)
const validate = ajv.compile(JSON.parse(readFileSync(SCHEMA, 'utf8')))

/** Frontier ids, so `about` can be checked rather than trusted. */
const frontierIds = new Set()
if (existsSync('content/frontier')) {
  for (const f of readdirSync('content/frontier').filter((x) => x.endsWith('.md'))) {
    const m = readFileSync(join('content/frontier', f), 'utf8').match(/^id:\s*(\S+)$/m)
    if (m) frontierIds.add(m[1])
  }
}

function normalise(v) {
  if (v instanceof Date) return v.toISOString().slice(0, 10)
  if (Array.isArray(v)) return v.map(normalise)
  if (v && typeof v === 'object') {
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, normalise(x)]))
  }
  return v
}

const files = readdirSync(DIR).filter((f) => f.endsWith('.md') && f !== 'README.md')
const errors = []
/** Kept for the duplicate pass below. */
const published = []
const counts = { verified: 0, 'single-source': 0, contested: 0, rejected: 0 }
let linked = 0

/**
 * What separates a duplicate from a pair of companion papers is the source.
 *
 * Two Nature papers from the same laboratory on the same day, on adjacent
 * physics, will share most of their significant words and are two events. The
 * same result written twice will share a source URL.
 *
 * So: similar wording and the same source is a duplicate and fails. Similar
 * wording with different sources is worth a look and only warns — the gate
 * cannot tell, and failing a build on a guess trains people to ignore it.
 */
const STOP = new Set([
  'the','a','an','and','or','of','in','on','to','for','with','at','by','from',
  'as','is','are','its','it','that','this','into','over','after','first',
])
const tokens = (t) =>
  new Set(
    t.toLowerCase().replace(/[^a-z0-9× ]/g, ' ').split(/\s+/)
      .filter((w) => w.length > 2 && !STOP.has(w)),
  )
const overlap = (a, b) => {
  const A = tokens(a), B = tokens(b)
  if (!A.size || !B.size) return 0
  let shared = 0
  for (const w of A) if (B.has(w)) shared++
  return shared / Math.min(A.size, B.size)
}
/** arXiv id or DOI, so two URLs for one paper still match. */
const identity = (u = '') => {
  const arxiv = u.match(/arxiv\.org\/abs\/([\d.]+)/i)
  if (arxiv) return `arxiv:${arxiv[1]}`

  const doi = u.match(/(10\.\d{4,}\/[^\s?#]+)/)
  if (doi) return `doi:${doi[1].toLowerCase()}`

  // A Nature article URL and its DOI are the same paper written two ways, and
  // an agent citing one while an earlier run cited the other is exactly how a
  // duplicate slips past a URL comparison.
  const nature = u.match(/nature\.com\/articles\/(s\d{5}-\d{3}-[\dA-Za-z-]+)/)
  if (nature) return `doi:10.1038/${nature[1].toLowerCase()}`

  const science = u.match(/science\.org\/doi\/(?:abs\/|full\/)?(10\.\d{4,}\/[^\s?#]+)/)
  if (science) return `doi:${science[1].toLowerCase()}`

  return u.replace(/[?#].*$/, '').toLowerCase()
}

for (const f of files) {
  const path = join(DIR, f)
  const raw = readFileSync(path, 'utf8')
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!m) {
    errors.push(`${path}: no front matter`)
    continue
  }

  let data
  try {
    data = normalise(yaml.load(m[1]))
  } catch (e) {
    errors.push(`${path}: unparseable YAML — ${String(e.message).split('\n')[0]}`)
    continue
  }

  if (!validate(data)) {
    for (const e of validate.errors.slice(0, 3)) {
      errors.push(`${path}${e.instancePath} ${e.message}`)
    }
    continue
  }

  if (data.id !== f.replace(/\.md$/, '')) {
    errors.push(`${path}: id "${data.id}" does not match the filename`)
  }

  const v = data.validation
  counts[v.status] = (counts[v.status] ?? 0) + 1

  // A claim of verification has to rest on something.
  if (v.status === 'verified') {
    const primary = ['paper', 'preprint', 'standard', 'authority'].includes(data.source.kind)
    const corroborated = (data.corroboration ?? []).length > 0
    if (!primary && !corroborated) {
      errors.push(
        `${path}: marked verified, but the source is "${data.source.kind}" with no ` +
          `corroboration. Verified needs a primary source or an independent report.`,
      )
    }
  }

  if (v.status === 'rejected') {
    errors.push(`${path}: rejected items should not be written as files`)
  }

  if (!v.checks?.length) {
    errors.push(`${path}: validation.checks is empty — say what was actually done`)
  }

  // A story dated the day the file was written is usually dated by discovery
  // rather than by the event, which defeats every duplicate check including
  // the agent's own.
  if (data.added && data.date === data.added && data.source?.date &&
      data.source.date.slice(0, 10) !== data.date) {
    errors.push(
      `${path}: date ${data.date} is the day this was written, but the source is ` +
        `dated ${data.source.date}. Date the event, not the discovery.`,
    )
  }

  for (const id of data.about ?? []) {
    if (!frontierIds.has(id)) {
      errors.push(`${path}: about -> "${id}" is not an item on the board`)
    }
  }

  if (data.establishedBy?.length) linked++
  published.push({
    id: data.id,
    date: data.date,
    headline: data.headline,
    source: data.source?.url ?? '',
    established: (data.establishedBy ?? []).map((e) => identity(e.url)),
  })
}


const warnings = []
for (let i = 0; i < published.length; i++) {
  for (let j = i + 1; j < published.length; j++) {
    const a = published[i], b = published[j]
    const sim = overlap(a.headline, b.headline)
    const days = Math.abs(new Date(a.date) - new Date(b.date)) / 864e5
    if (days > 8 || sim < 0.5) continue

    const sameSource =
      identity(a.source) === identity(b.source) ||
      (a.established ?? []).some((u) => (b.established ?? []).includes(u))

    if (sameSource) {
      errors.push(
        `duplicate: "${a.id}" and "${b.id}" report the same source ` +
          `(${Math.round(sim * 100)}% of the significant words shared). Keep one.`,
      )
    } else if (sim > 0.65) {
      warnings.push(
        `"${a.id}" and "${b.id}" are ${Math.round(sim * 100)}% alike but cite ` +
          `different sources. Companion papers, or one story written twice? Worth a look.`,
      )
    }
  }
}

console.log(`  news: ${files.length} items`)
if (files.length) {
  console.log(
    '  ' +
      Object.entries(counts)
        .filter(([, n]) => n)
        .map(([k, n]) => `${k} ${n}`)
        .join(' · '),
  )
  console.log(`  ${linked} of ${files.length} traced to the research behind them`)
}

if (warnings.length) {
  console.log('\nWorth a look:')
  for (const w of warnings) console.log('  - ' + w)

  /**
   * Written to a file as well as the log.
   *
   * A warning that only appears in build output is a warning nobody sees. The
   * agent workflow picks this up and puts it in the weekly issue, which is the
   * one place these get read.
   */
  try {
    mkdirSync('.agent-run', { recursive: true })
    writeFileSync('.agent-run/news-warnings.txt', warnings.join('\n'))
  } catch {
    /* not running under an agent; the log will have to do */
  }
}

if (errors.length) {
  console.error('\nNews validation failed:\n' + errors.map((e) => '  - ' + e).join('\n'))
  process.exit(1)
}
console.log('News OK.')
