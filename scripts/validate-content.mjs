#!/usr/bin/env node
/**
 * Gate 1 of 3. Every content file must satisfy the schema before it can ship.
 *
 * Two things this has to be careful about:
 *
 * 1. YAML parses an unquoted 2026-05-14 into a Date object, not a string.
 *    Agents will write dates both ways, so we normalise rather than nag.
 * 2. IDs are collected in a FIRST pass, before any validation. Otherwise one
 *    bad file makes every connection in the repo look broken.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import yaml from 'js-yaml'

const COLLECTIONS = [
  { dir: 'content/items', schema: 'content/schema/item.schema.json', label: 'articles' },
  { dir: 'content/frontier', schema: 'content/schema/frontier.schema.json', label: 'frontier' },
  { dir: 'content/forecasts', schema: 'content/schema/forecast.schema.json', label: 'forecasts' },
  { dir: 'content/milestones', schema: 'content/schema/milestone.schema.json', label: 'milestones' },
  { dir: 'content/assessment', schema: 'content/schema/assessment.schema.json', label: 'assessment' },
]

const ajv = new Ajv({ allErrors: true, strict: false })
addFormats(ajv)

/** Recursively turn Date objects back into YYYY-MM-DD strings. */
function normalise(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (Array.isArray(value)) return value.map(normalise)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, normalise(v)]))
  }
  return value
}

/**
 * The part of a validation failure a person can act on.
 *
 * Ajv says "must be equal to one of the allowed values" and does not say what
 * they are, or "must NOT have more than 400 characters" and does not say how
 * long the field actually is. Both are true and neither is enough to fix
 * anything without opening the schema, which is exactly the round trip this
 * message exists to save.
 *
 * The narrowing of `pillar` to a single value is what made this obvious: an
 * agent wrote `pillar: cyber` into a new item, the build stopped, and the log
 * said only that the value was not allowed — not that the sole allowed value
 * is `quantum`.
 */
function explain(err, data) {
  if (err.keyword === 'enum') {
    const allowed = (err.params.allowedValues ?? []).join(', ')
    return allowed ? ` (allowed: ${allowed})` : ''
  }
  if (err.keyword === 'maxLength') {
    const value = err.instancePath
      .split('/')
      .slice(1)
      .reduce((cur, k) => (cur == null ? cur : cur[k.replace(/~1/g, '/').replace(/~0/g, '~')]), data)
    if (typeof value !== 'string') return ''
    return ` (it is ${value.length}, so ${value.length - err.params.limit} over)`
  }
  if (err.keyword === 'additionalProperties') {
    return ` — "${err.params.additionalProperty}" is not a field this schema has`
  }
  if (err.keyword === 'required') {
    return ''
  }
  return ''
}

const errors = []
let total = 0

for (const col of COLLECTIONS) {
  if (!existsSync(col.dir)) continue
  const validate = ajv.compile(JSON.parse(readFileSync(col.schema, 'utf8')))
  const parsed = []

  // Pass 1: parse everything, collect ids unconditionally. Collecting ids after
  // validation means one bad file makes every link in the repo look broken.
  for (const file of readdirSync(col.dir).filter((f) => f.endsWith('.md'))) {
    const raw = readFileSync(join(col.dir, file), 'utf8')
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    if (!match) {
      errors.push(`${col.dir}/${file}: no front matter`)
      continue
    }
    try {
      parsed.push({ file, data: normalise(yaml.load(match[1])) })
    } catch (e) {
      errors.push(`${col.dir}/${file}: unparseable front matter — ${e.message}`)
    }
  }

  const ids = new Set()
  for (const { file, data } of parsed) {
    if (!data?.id) { errors.push(`${col.dir}/${file}: missing id`); continue }
    if (ids.has(data.id)) errors.push(`${col.dir}/${file}: duplicate id "${data.id}"`)
    ids.add(data.id)
  }

  // Pass 2: schema
  for (const { file, data } of parsed) {
    if (!validate(data)) {
      for (const e of validate.errors) {
        errors.push(`${col.dir}/${file}${e.instancePath} ${e.message}${explain(e, data)}`)
      }
    }
  }

  // Pass 3: references resolve. Both collections use different field names.
  for (const { file, data } of parsed) {
    for (const c of data?.spatial?.connections ?? []) {
      if (!ids.has(c)) errors.push(`${col.dir}/${file}: connection "${c}" does not exist`)
    }
    for (const l of data?.links ?? []) {
      if (!ids.has(l.to)) errors.push(`${col.dir}/${file}: link to "${l.to}" does not exist`)
    }
  }

  console.log(`  ${col.label}: ${ids.size} items`)

  /**
   * How many items the timeline has to guess a position for.
   *
   * evidence.sources[].date decides where an item sits. Without one the board
   * falls back to when the evidence was last checked, which can be a year after
   * the work — so this is a real gap in the data rather than a cosmetic one, and
   * it should be visible in every build.
   */
  if (col.dir.includes('frontier')) {
    const undated = parsed.filter(
      ({ data }) =>
        (data?.evidence?.sources ?? []).length > 0 &&
        !(data.evidence.sources ?? []).some((src) => src.date),
    ).length
    if (undated) {
      console.log(
        `    ${undated} with sources but no source date — the timeline estimates their position`,
      )
    }
  }

  total += ids.size
}

if (errors.length) {
  console.error('Content validation failed:\n' + errors.map((e) => '  - ' + e).join('\n'))
  process.exit(1)
}
console.log(`Content OK — ${total} items across ${COLLECTIONS.length} collections.`)
