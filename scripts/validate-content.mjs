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
      for (const e of validate.errors) errors.push(`${col.dir}/${file}${e.instancePath} ${e.message}`)
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
  total += ids.size
}

if (errors.length) {
  console.error('Content validation failed:\n' + errors.map((e) => '  - ' + e).join('\n'))
  process.exit(1)
}
console.log(`Content OK — ${total} items across ${COLLECTIONS.length} collections.`)
