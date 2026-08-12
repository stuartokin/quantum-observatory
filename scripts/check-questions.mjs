#!/usr/bin/env node
/**
 * GATE — QUESTIONS.
 *
 * The twelve are the board's answer to "so what". A question with an answer but
 * no date is an opinion, and one whose lastChanged is always today is dated by
 * discovery rather than by the change — the same fault the newsroom had.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const yaml = require('js-yaml')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')

const DIR = 'content/questions'
const SCHEMA = 'content/schema/question.schema.json'

if (!existsSync(DIR) || !existsSync(SCHEMA)) {
  console.log('No questions collection. Nothing to validate.')
  process.exit(0)
}

const ajv = new (Ajv.default ?? Ajv)({ allErrors: true, strict: false })
;(addFormats.default ?? addFormats)(ajv)
const validate = ajv.compile(JSON.parse(readFileSync(SCHEMA, 'utf8')))

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
const warnings = []
const states = {}
let dated = 0

for (const f of files) {
  const path = join(DIR, f)
  const m = readFileSync(path, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!m) {
    errors.push(`${path}: no front matter`)
    continue
  }
  let d
  try {
    d = normalise(yaml.load(m[1]))
  } catch (e) {
    errors.push(`${path}: unparseable YAML — ${String(e.message).split('\n')[0]}`)
    continue
  }
  if (!validate(d)) {
    for (const e of validate.errors.slice(0, 3)) errors.push(`${path}${e.instancePath} ${e.message}`)
    continue
  }
  if (d.id !== f.replace(/\.md$/, '')) {
    errors.push(`${path}: id "${d.id}" does not match the filename`)
  }
  states[d.state] = (states[d.state] ?? 0) + 1
  if (d.lastChanged) dated++

  // An answer that says something happened must say when.
  if (d.state !== 'unknown' && !d.lastChanged) {
    warnings.push(`${d.id}: answered "${d.state}" with no lastChanged. When did it last change?`)
  }
}

const today = new Date().toISOString().slice(0, 10)
const allToday = files.length > 1 && dated === files.length &&
  readdirSync(DIR).filter((f) => f.endsWith('.md'))
    .every((f) => readFileSync(join(DIR, f), 'utf8').includes(`lastChanged: '${today}'`))
if (allToday) {
  warnings.push(
    'Every question has lastChanged set to today. That is dating by discovery, ' +
      'not by the change — the figure is only useful if it records when an ' +
      'answer actually moved.',
  )
}

console.log(`  questions: ${files.length}`)
if (files.length) {
  console.log('  ' + Object.entries(states).map(([k, n]) => `${k} ${n}`).join(' · '))
  console.log(`  ${dated} of ${files.length} record when the answer last changed`)
}
if (warnings.length) {
  console.log('\nWorth a look:')
  for (const w of warnings) console.log('  - ' + w)
}
if (errors.length) {
  console.error('\nQuestion validation failed:\n' + errors.map((e) => '  - ' + e).join('\n'))
  process.exit(1)
}
console.log('Questions OK.')
