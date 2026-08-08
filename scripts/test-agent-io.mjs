#!/usr/bin/env node
/**
 * Self-test for the agent IO layer.
 *
 * These two functions have broken twice in ways that only surfaced during a
 * live agent run — an escaping error in a regex, and JSON split across text
 * blocks. Both were invisible to the type checker and cost a full round trip
 * to discover. This runs in CI instead.
 */
import { normaliseFile, extractJson, balancedObjects, FRONT_MATTER } from './agent-io.mjs'
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

console.log(`\n  ${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
