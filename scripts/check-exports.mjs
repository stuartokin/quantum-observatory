#!/usr/bin/env node
/**
 * NO SYMBOL EXPORTED FROM TWO MODULES.
 *
 * `glyphFor` was defined in both tower.ts and glyphs.ts. The board imported
 * tower's, so rewriting the rules in glyphs.ts changed nothing on screen — and
 * the version number went up twice while the display stayed identical.
 *
 * A duplicated name is not a compile error and no type check will find it. It
 * simply means half your changes go somewhere nobody is looking.
 *
 * A re-export — `export { X } from './x'` — is not a duplicate: there is still
 * one definition. Those are allowed. A second declaration, or a re-export of
 * something this module also declares, is not.
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

const seen = new Map()
for (const file of walk('src')) {
  const src = readFileSync(file, 'utf8')
  const names = [
    ...[...src.matchAll(/^export (?:default )?(?:async )?(?:function|const|let|type|interface|class|enum) (\w+)/gm)]
      .map((m) => m[1]),
    // `export type { X }` counts too. It was invisible to an earlier version
    // of this pattern, so a re-export passed the gate by accident rather than
    // by decision — which is the same as not being checked.
    ...[...src.matchAll(/^export (?:type )?\{([^}]+)\}(?!\s*from)/gm)].flatMap((m) =>
      m[1].split(',').map((n) => n.trim().split(/\s+as\s+/).pop().trim()),
    ),
  ]
  for (const n of names) {
    if (!n || n === 'default') continue
    if (!seen.has(n)) seen.set(n, [])
    seen.get(n).push(file)
  }
}

const clashes = [...seen.entries()].filter(([, files]) => files.length > 1)
if (clashes.length) {
  console.error('Exported from more than one module:')
  for (const [name, files] of clashes) {
    console.error(`  - ${name}: ${files.join(', ')}`)
  }
  console.error('\nOne name, one home. Callers cannot tell which they are getting.')
  process.exit(1)
}
console.log(`  exports: ${seen.size} symbols, no name used twice`)
