#!/usr/bin/env node
/**
 * EVERY REFERENCED STATE NAME MUST BE DECLARED.
 *
 * A `useState` block inserted by a text substitution that matched nothing
 * leaves every reference to it orphaned — and a check that merely looks for the
 * name in the file finds it, in the uses, and reports success. That has now
 * happened twice.
 *
 * The question is not "does this name appear" but "is it declared".
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

function walk(dir) {
  const out = []
  for (const f of readdirSync(dir)) {
    const p = join(dir, f)
    if (statSync(p).isDirectory()) out.push(...walk(p))
    else if (['.ts', '.tsx'].includes(extname(p))) out.push(p)
  }
  return out
}

const issues = []
for (const file of walk('src')) {
  const src = readFileSync(file, 'utf8')

  const declared = new Set()
  for (const m of src.matchAll(/const \[(\w+),\s*(\w+)\] = useState/g)) {
    declared.add(m[1])
    declared.add(m[2])
  }
  for (const m of src.matchAll(/const (\w+) = use(?:Ref|Memo|Callback|State)/g)) {
    declared.add(m[1])
  }

  // Setters are the tell: a setX referenced with no matching useState.
  for (const m of src.matchAll(/(?<![.\w])(set[A-Z]\w*)\s*\(/g)) {
    const name = m[1]
    if (declared.has(name)) continue
    // Canvas and DOM methods are called on an object, excluded by the lookbehind,
    // but a local helper may still be legitimately defined some other way.
    if (new RegExp(`(?:function|const)\\s+${name}\\b`).test(src)) continue
    issues.push(`${file}: ${name}() called, but no useState declares it`)
  }
}

if (issues.length) {
  console.error('State used but never declared:\n' + [...new Set(issues)].map((i) => '  - ' + i).join('\n'))
  process.exit(1)
}
console.log('  state: every setter has a declaration')
