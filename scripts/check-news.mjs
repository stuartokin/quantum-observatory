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
import { readdirSync, readFileSync, existsSync } from 'node:fs'
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
const counts = { verified: 0, 'single-source': 0, contested: 0, rejected: 0 }
let linked = 0

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

  for (const id of data.about ?? []) {
    if (!frontierIds.has(id)) {
      errors.push(`${path}: about -> "${id}" is not an item on the board`)
    }
  }

  if (data.establishedBy?.length) linked++
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

if (errors.length) {
  console.error('\nNews validation failed:\n' + errors.map((e) => '  - ' + e).join('\n'))
  process.exit(1)
}
console.log('News OK.')
