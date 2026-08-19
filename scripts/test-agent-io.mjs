#!/usr/bin/env node
/**
 * Self-test for the agent IO layer.
 *
 * These two functions have broken twice in ways that only surfaced during a
 * live agent run — an escaping error in a regex, and JSON split across text
 * blocks. Both were invisible to the type checker and cost a full round trip
 * to discover. This runs in CI instead.
 */
import {
  normaliseFile,
  extractJson,
  balancedObjects,
  schemaForPath,
  schemaConstFor,
  applyFields,
  checkFile,
  FRONT_MATTER,
  COLLECTIONS,
} from './agent-io.mjs'
import { readFileSync } from 'node:fs'
let pass = 0
let fail = 0
const t = (name, cond) => {
  console.log(`  ${cond ? 'ok  ' : 'FAIL'} ${name}`)
  cond ? pass++ : fail++
}

const doc = [
  '---',
  'schema: frontier/v1',
  'id: enable-benchmarking',
  'review:',
  '  state: agent-merged',
  '---',
  '',
  'Body text.',
  '',
].join('\n')

t('plain document', FRONT_MATTER.test(normaliseFile(doc)))
t('wrapped in a code fence', FRONT_MATTER.test(normaliseFile('```markdown\n' + doc.trim() + '\n```')))
t('heading above front matter', FRONT_MATTER.test(normaliseFile('# Title\n\n' + doc)))
t('leading blank lines', FRONT_MATTER.test(normaliseFile('\n\n' + doc)))
t('byte order mark', FRONT_MATTER.test(normaliseFile('\uFEFF' + doc)))
t('CRLF line endings', FRONT_MATTER.test(normaliseFile(doc.replace(/\n/g, '\r\n'))))
t('prose is refused', !FRONT_MATTER.test(normaliseFile('Just prose.\n')))

// An unclosed front matter is a formatting slip, not a reason to discard a
// fully sourced item. Repair it and keep the body.
const unclosed = [
  '---',
  'schema: frontier/v1',
  'id: algo-shor',
  'review:',
  '  state: agent-merged',
  '',
  'Body paragraph explaining the result.',
  '',
].join('\n')
const repaired = normaliseFile(unclosed)
t('unclosed front matter repaired', FRONT_MATTER.test(repaired))
t('  fields survive', (repaired.match(FRONT_MATTER) || [])[1]?.includes('id: algo-shor'))
t('  body survives', repaired.includes('Body paragraph'))
t('  exactly two delimiters', (repaired.match(/^---$/gm) || []).length === 2)
const alreadyGood = '---\nid: a\nreview:\n  state: agent-merged\n---\n\nBody.\n'
t('correct file untouched', normaliseFile(alreadyGood) === alreadyGood)

// An unquoted colon in a scalar breaks the whole document. Agents are told to
// quote; a rule stated is not a rule obeyed, so repair it too.
const colons = [
  '---',
  'id: quantum-sensing-grid',
  'summary: Quantum sensors: magnetometers, atomic clocks: timing',
  'evidence:',
  '  claim: The paper reports: a tenfold improvement.',
  'actors: [IBM, Google Quantum AI]',
  'review:',
  '  state: agent-merged',
  '---',
  '',
  'Body: colons here must be left alone.',
  '',
].join('\n')
const quoted = normaliseFile(colons)
t('unquoted colon repaired', quoted.includes("summary: 'Quantum sensors: magnetometers, atomic clocks: timing'"))
t('  nested value repaired', quoted.includes("claim: 'The paper reports: a tenfold improvement.'"))
t('  flow sequence untouched', quoted.includes('actors: [IBM, Google Quantum AI]'))
t('  body untouched', quoted.includes('Body: colons here must be left alone.'))
t('  mapping keys untouched', /^evidence:$/m.test(quoted))

// YAML doubles an apostrophe inside single quotes; it has no backslash escape.
// Models write the backslash form constantly, and it terminates the string.
const escaped = [
  '---',
  'id: algo-shor',
  "summary: 'Shor\\'s algorithm breaks RSA.'",
  'evidence:',
  "  claim: 'The paper\\'s result is tenfold.'",
  'review:',
  '  state: agent-merged',
  '---',
  '',
  "Body with Shor's apostrophe.",
  '',
].join('\n')
const unescaped = normaliseFile(escaped)
t('backslash apostrophe repaired', unescaped.includes("summary: 'Shor''s algorithm breaks RSA.'"))
t('  nested value repaired', unescaped.includes("claim: 'The paper''s result is tenfold.'"))
t('  no backslash escapes remain', !(unescaped.match(FRONT_MATTER)?.[1] ?? '').includes("\\'"))
t('  body untouched', unescaped.includes("Body with Shor's apostrophe."))

// Block scalars are valid YAML. Quoting "summary: >-" into "summary: '>-'"
// turns a folded string into a two-character value with orphaned lines under
// it, which is what broke four files on the reviewer's first run.
const folded = [
  '---',
  'id: a',
  'summary: >-',
  '  A folded string that runs',
  '  across two lines.',
  'plain: |',
  '  Literal line one.',
  'review:',
  '  state: agent-merged',
  '---',
  '',
  'Body.',
  '',
].join('\n')
const kept = normaliseFile(folded)
t('folded scalar untouched', kept.includes('summary: >-'))
t('  literal scalar untouched', kept.includes('plain: |'))
t('  no stray quotes added', !kept.includes("'>-'") && !kept.includes("'|'"))
t('trailing newline added', normaliseFile('---\nid: a\n---\nbody').endsWith('\n'))

const split = [
  'Searching.',
  'More searching.',
  '{"summary":"s","checklist":{},"rejected":[],"files":[',
  '{"path":"content/frontier/_inbox/a.md","content":"---\\nid: a\\n---\\n"}]}',
]
t('JSON split across text blocks', extractJson(split)?.files?.length === 1)
t('ignores braces in prose', extractJson(['Consider {this}.', '{"summary":"s","files":[]}'])?.files?.length === 0)
t('braces inside strings', balancedObjects('{"a":"} not the end"}').length === 1)

// The validator cache was keyed on nothing, so the first schema compiled
// became the only schema used for the rest of the process — and every news
// file was checked for `readiness`.
t('news paths take the news schema', schemaForPath('content/news/a.md').includes('news.schema'))
t('  frontier paths take the frontier schema',
  schemaForPath('content/frontier/_inbox/a.md').includes('frontier.schema'))

// applyFields — the patch mechanism. A patch is validated by feeding the
// result through the same checkFile a full file always went through, so
// these tests use the real frontier schema rather than a stand-in.
const doc2 = [
  '---',
  'schema: frontier/v1',
  'id: algo-shor',
  "title: 'A title with a colon: like this'",
  'pillar: quantum',
  'readiness: emerging',
  'status: draft',
  'confidence: medium',
  'actors:',
  "  - 'Some Lab'",
  'evidence:',
  "  claim: 'Original claim.'",
  '  level: E3',
  "  verified: '2026-08-01'",
  '  sources:',
  '    - url: https://arxiv.org/abs/1234.5678',
  '      role: preprint',
  'review:',
  '  state: agent-merged',
  '  by: agent',
  '  agent: scout',
  "  agentMergedOn: '2026-08-01'",
  '---',
  '',
  'Body paragraph one.',
  '',
].join('\n')

const patchedNote = applyFields(doc2, { 'review.note': "Checked: Shor's result confirmed." })
t('patch touches only the named top-level block', (() => {
  const untouchedLines = doc2.split('\n').filter((l) => !l.startsWith('review'))
  return untouchedLines.every((l) => patchedNote.includes(l) || l === '')
})())
t('  the review block gained the note', /note: .*Checked: Shor''s result confirmed\./.test(patchedNote))
t('  review.state survives untouched', /state: agent-merged/.test(patchedNote))
t('  body is untouched', patchedNote.includes('Body paragraph one.'))

// checkStructure normalises an unquoted YAML date (a Date object once
// parsed) back to a plain string; applyFields used to skip that step, so a
// patch touching one field of a block that also held an unquoted date
// re-dumped the date as an ISO timestamp instead of leaving it as the date
// string the schema expects. doc3 mirrors doc2 but with `agentMergedOn`
// written unquoted, the way an agent sometimes does.
const doc3 = doc2.replace("  agentMergedOn: '2026-08-01'", '  agentMergedOn: 2026-08-01')
const patchedUnquotedDate = applyFields(doc3, { 'review.note': 'Checked again.' })
t('an unquoted date sharing a touched block survives as a plain date', (() => {
  const m = patchedUnquotedDate.match(/agentMergedOn: (\S+)/)
  return !!m && m[1].replace(/'/g, '') === '2026-08-01'
})())
t('  not re-dumped as an ISO timestamp', !/agentMergedOn: 2026-08-01T/.test(patchedUnquotedDate))

const patchedNested = applyFields(doc2, { 'evidence.claim': 'A revised claim: with a colon.' })
t('nested dotted path replaces one leaf, keeps its siblings', (() => {
  const m = patchedNested.match(/evidence:\n([\s\S]*?)\nreview:/)
  return m[1].includes('level: E3') && m[1].includes('sources:') && m[1].includes('revised claim')
})())
t('  untouched top-level fields survive byte for byte', patchedNested.includes("title: 'A title with a colon: like this'"))

const patchedList = applyFields(doc2, { 'evidence.sources': [{ url: 'https://example.com/new', role: 'primary' }] })
t('evidence.sources replaces the whole array', (() => {
  const m = patchedList.match(/sources:\n([\s\S]*?)\nreview:/)
  return m[1].includes('example.com/new') && !m[1].includes('arxiv.org/abs/1234.5678')
})())

// A path that addresses *into* an array (per-element addressing was never
// supported) used to silently overwrite the whole array with {} while
// building the intermediate path, rather than refusing the patch.
t('a dotted path into an array is refused rather than destroying it', (() => {
  try {
    applyFields(doc2, { 'evidence.sources.role': 'primary' })
    return false
  } catch (e) {
    return /is an array/.test(e.message)
  }
})())

const patchedNewKey = applyFields(doc2, { qdayImpact: 1 })
t('a field absent from the original is appended, not fabricated elsewhere', /^qdayImpact: 1$/m.test(patchedNewKey))

const patchedDelete = applyFields(patchedNewKey, { qdayImpact: null })
t('null deletes a field rather than writing a null', !/qdayImpact/.test(patchedDelete))

const patchedBody = applyFields(doc2, { body: 'Replaced body.' })
t('the special "body" key replaces the markdown below the front matter', patchedBody.trim().endsWith('Replaced body.'))
t('  front matter is untouched by a body-only patch', patchedBody.includes("claim: 'Original claim.'"))

const okCheck = checkFile(applyFields(doc2, { 'evidence.claim': 'A fine, valid, short claim.' }), schemaForPath('content/frontier/_inbox/algo-shor.md'))
t('a well-formed patch validates against the real frontier schema', okCheck.ok === true)

const overflowCheck = checkFile(applyFields(doc2, { 'evidence.claim': 'x'.repeat(1700) }), schemaForPath('content/frontier/_inbox/algo-shor.md'))
t('an overflowing field is rejected by the same schema a full file always used', overflowCheck.ok === false)

const unknownCheck = checkFile(applyFields(doc2, { notARealField: 'nope' }), schemaForPath('content/frontier/_inbox/algo-shor.md'))
t('a field name outside the schema is rejected before anything is written', unknownCheck.ok === false)

/**
 * Every collection can stamp its own files.
 *
 * The runner used to decide this with a hand-written ternary that knew three
 * collections and quietly defaulted the rest to `frontier/v1`. Scout's write
 * scope gained `content/milestones/`, every milestone it wrote was stamped
 * `frontier/v1` on the way past, and all four runs were rejected on
 * `/schema must be equal to constant` after the research was done.
 *
 * So this asserts the property that failure violated: for every collection,
 * the constant a file is stamped with is the constant that collection's own
 * schema demands. A new collection cannot be added without this passing.
 */
for (const c of COLLECTIONS) {
  const konst = JSON.parse(readFileSync(c.schema, 'utf8')).properties.schema.const
  t(`${c.name} files are stamped ${konst}, not the frontier default`, schemaConstFor(`${c.dir}x.md`) === konst)
}
t('an _inbox path is stamped for its collection, not its staging folder', schemaConstFor('content/frontier/_inbox/x.md') === 'frontier/v1')

console.log(`\n  ${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
