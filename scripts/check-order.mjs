#!/usr/bin/env node
/**
 * USE BEFORE DECLARATION, AT MODULE SCOPE.
 *
 * `const` is not hoisted, so referencing one above its declaration is a runtime
 * error that no syntax check will find. This has now cost three separate agent
 * runs — each time a block was patched into a file above the helper it needed,
 * each time the file parsed perfectly, each time it failed in CI.
 *
 * Deliberately narrow: only top-level declarations, only uses at top level.
 * A helper called from inside a function declared earlier is fine, and flagging
 * those would bury the real ones.
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const DIR = 'scripts'
const issues = []

for (const file of readdirSync(DIR).filter((f) => f.endsWith('.mjs'))) {
  const path = join(DIR, file)
  const lines = readFileSync(path, 'utf8').split('\n')

  const declared = new Map()
  const depth = []
  let d = 0
  let inTemplate = false

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i]
    depth[i] = inTemplate ? -1 : d // -1 marks prose inside a template literal
    // Backticks open and close multi-line strings, which hold prose that looks
    // like code. Counting them is cruder than parsing and enough here.
    if ((l.match(/`/g) ?? []).length % 2 === 1) inTemplate = !inTemplate
    if (inTemplate) continue

    d += (l.match(/[{[(]/g) ?? []).length - (l.match(/[}\])]/g) ?? []).length
    const m = l.match(/^(?:export )?const ([A-Za-z_$][\w$]*)\s*=/)
    if (m && depth[i] === 0) declared.set(m[1], i)
  }

  for (const [name, at] of declared) {
    for (let i = 0; i < at; i++) {
      if (depth[i] !== 0) continue // inside a function or a template: fine
      const l = lines[i]
      if (l.trim().startsWith('*') || l.trim().startsWith('//')) continue
      if (l.trim().startsWith('/*') || l.trim().startsWith('*/')) continue
      // A parameter of the same name shadows the outer one; not a forward use.
      if (/^\s*(?:export )?(?:async )?function\s/.test(l)) continue
      const stripped = l.replace(/'[^']*'|"[^"]*"|`[^`]*`/g, '')
      if (new RegExp(`(?<![.\\w$])${name}(?![\\w$])`).test(stripped)) {
        issues.push(`${path}:${i + 1} uses "${name}" — declared at line ${at + 1}`)
        break
      }
    }
  }
}

if (issues.length) {
  console.error('Used before declaration:\n' + issues.map((i) => '  - ' + i).join('\n'))
  process.exit(1)
}
console.log(`  order: ${readdirSync(DIR).filter((f) => f.endsWith('.mjs')).length} scripts, no forward references`)
