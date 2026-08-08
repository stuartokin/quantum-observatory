#!/usr/bin/env node
/**
 * Self-test for the agent IO layer.
 *
 * These two functions have broken twice in ways that only surfaced during a
 * live agent run — an escaping error in a regex, and JSON split across text
 * blocks. Both were invisible to the type checker and cost a full round trip
 * to discover. This runs in CI instead.
 */
import { normaliseFile, extractJson, balancedObjects } from './agent-io.mjs'

const FRONT_MATTER = /^---\r?\n([\s\S]*?)\r?\n---/
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
