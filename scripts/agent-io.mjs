/**
 * Reading what an agent returned, and deciding whether it is usable.
 *
 * Kept in its own module because these are the two places the pipeline has
 * repeatedly broken, and because they are testable in isolation — which the
 * previous inline versions were not.
 */
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

/** The front matter delimiters. Defined once so the check and the repair agree. */
export const FRONT_MATTER = /^---\r?\n([\s\S]*?)\r?\n---/

/** Balanced-brace scan, respecting strings and escapes. */
export function balancedObjects(text) {
  const out = []
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== '{') continue
    let depth = 0
    let inStr = false
    let esc = false
    for (let j = i; j < text.length; j++) {
      const c = text[j]
      if (esc) { esc = false; continue }
      if (c === '\\') { esc = true; continue }
      if (c === '"') { inStr = !inStr; continue }
      if (inStr) continue
      if (c === '{') depth++
      else if (c === '}') {
        depth--
        if (depth === 0) { out.push(text.slice(i, j + 1)); i = j; break }
      }
    }
  }
  return out
}

/**
 * With web search on, the reply is commentary interleaved with tool calls and
 * the JSON can span several text blocks. Try each block, then the whole thing
 * joined, and take the last object matching the output contract.
 */
export function extractJson(chunks) {
  const candidates = [...[...chunks].reverse(), chunks.join('\n')]
  for (const chunk of candidates) {
    const cleaned = chunk.replace(/```(?:json)?/g, '')
    for (const obj of balancedObjects(cleaned).reverse()) {
      try {
        const parsed = JSON.parse(obj)
        if (parsed && typeof parsed === 'object' && Array.isArray(parsed.files)) return parsed
      } catch {
        /* not this one */
      }
    }
  }
  return null
}

/**
 * Models wrap files in code fences, add a heading above the front matter, or
 * leave stray whitespace. That is formatting, not misbehaviour. Normalise it
 * rather than failing the run.
 */
export function normaliseFile(raw) {
  let t = String(raw ?? '')
  t = t.replace(/^\uFEFF/, '')
  const fence = t.match(/^\s*```[a-zA-Z]*\n([\s\S]*?)\n```\s*$/)
  if (fence) t = fence[1]
  const start = t.indexOf('---')
  if (start > 0 && !t.slice(0, start).includes('---')) t = t.slice(start)
  t = t.trimStart()

  /**
   * Repair a missing closing delimiter.
   *
   * If the file opens with "---" but never closes, the front matter still ends
   * somewhere identifiable: at the first line that is neither a field nor an
   * indented continuation. Losing a fully sourced item over one absent line of
   * dashes is a poor trade, so close it there.
   */
  if (/^---\r?\n/.test(t) && !/\n---\s*(\r?\n|$)/.test(t)) {
    const lines = t.split('\n')
    let end = lines.length
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i]
      if (line === '') continue
      const isField = /^[A-Za-z_][\w-]*:/.test(line)
      const isIndented = /^\s+\S/.test(line)
      const isListItem = /^\s*-\s/.test(line)
      if (!isField && !isIndented && !isListItem) {
        end = i
        break
      }
    }
    lines.splice(end, 0, '---', '')
    t = lines.join('\n')
  }

  /**
   * Quote scalar values that YAML would misread.
   *
   * "summary: Quantum sensors: magnetometers" parses the second colon as a
   * nested key and the document fails. The agent is told to quote these, but a
   * rule stated is not a rule obeyed, and discarding a fully researched item
   * over one missing pair of quotes is a poor trade.
   *
   * Only single-line scalars are touched, and only where the value is plainly
   * prose rather than structure.
   */
  const parts = t.match(/^(---\r?\n)([\s\S]*?)(\r?\n---)/)
  if (parts) {
    const RISKY = /^[%&*!|>@`\[{]/
    const fixed = parts[2]
      .split('\n')
      .map((line) => {
        const m = line.match(/^(\s*(?:- )?[A-Za-z_][\w-]*: )(.+)$/)
        if (!m) return line
        const [, head, rawValue] = m
        const value = rawValue.trim()
        if (!value) return line
        // A quoted value can still be broken. YAML escapes an apostrophe
        // inside single quotes by doubling it, never with a backslash, so
        // 'Shor\'s algorithm' terminates early and the rest of the line
        // becomes nonsense. Models write the backslash form constantly.
        // Block scalars are valid YAML and must be left alone. Quoting
        // "summary: >-" into "summary: '>-'" turns a folded string into a
        // literal two-character value followed by orphaned indented lines,
        // which is what broke four files.
        if (/^[|>][-+]?\d*$/.test(value)) return line

        if (/^'/.test(value)) {
          if (!value.includes("\\'")) return line
          return head + value.replace(/\\'/g, "''")
        }
        if (/^"/.test(value)) return line             // already quoted
        if (/^[[{]/.test(value)) return line          // a flow collection
        const needsQuote = /: /.test(value) || value.endsWith(':') || RISKY.test(value)
        if (!needsQuote) return line
        return head + "'" + value.replace(/'/g, "''") + "'"
      })
      .join('\n')
    t = parts[1] + fixed + parts[3] + t.slice(parts[0].length)
  }

  if (!t.endsWith('\n')) t += '\n'
  return t
}

/** YAML turns 2.14 into a float and dates into Date objects. Normalise both. */
export function normaliseTypes(v) {
  if (v instanceof Date) return v.toISOString().slice(0, 10)
  if (Array.isArray(v)) return v.map(normaliseTypes)
  if (v && typeof v === 'object') {
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, normaliseTypes(x)]))
  }
  return v
}

let validateItem = null
function itemValidator(schemaPath) {
  if (validateItem) return validateItem
  const Ajv = require('ajv')
  const addFormats = require('ajv-formats')
  const ajv = new (Ajv.default ?? Ajv)({ allErrors: true, strict: false })
  ;(addFormats.default ?? addFormats)(ajv)
  validateItem = ajv.compile(JSON.parse(readFileSync(schemaPath, 'utf8')))
  return validateItem
}

/**
 * Full schema validation before anything is written, using the same validator
 * CI uses — one definition of valid, checked at the earliest possible moment.
 */
/**
 * Structural checks only — front matter present, parseable, and not claiming
 * human review. No schema, no dependencies beyond the YAML parser, so this can
 * be tested in isolation. It is where the pipeline has broken twice.
 */
export function checkStructure(text) {
  const m = text.match(FRONT_MATTER)
  if (!m) {
    // "no front matter" is a useless diagnosis when the opener is plainly
    // there. Say which delimiter is missing, so the next fix is the right one.
    const opens = /^---\r?\n/.test(text)
    const closes = /\n---\s*(\r?\n|$)/.test(text)
    if (opens && !closes) {
      return {
        ok: false,
        reason: 'front matter is never closed — no "---" line after the fields',
      }
    }
    if (!opens) {
      return { ok: false, reason: 'does not start with "---" on the first line' }
    }
    return { ok: false, reason: 'front matter present but unmatched' }
  }

  const yaml = require('js-yaml')
  let data
  try {
    data = normaliseTypes(yaml.load(m[1]))
  } catch (e) {
    return { ok: false, reason: `unparseable YAML — ${String(e.message).split('\n')[0]}` }
  }

  if (!data?.id) return { ok: false, reason: 'no id field' }
  if (!data.review) return { ok: false, reason: 'no review block' }
  if (data.review.state === 'reviewed')
    return { ok: false, reason: 'claims review.state: reviewed — agents may not' }
  // agent-reviewed is allowed: it says a machine checked it, not that a person did.
  if (data.review.by === 'human')
    return { ok: false, reason: 'claims review.by: human — agents may not' }
  return { ok: true, id: data.id, data }
}

/** Structural checks, then the full schema. Same validator CI uses. */
export function checkFile(text, schemaPath = 'content/schema/frontier.schema.json') {
  const base = checkStructure(text)
  if (!base.ok) return base
  const data = base.data

  const validate = itemValidator(schemaPath)
  if (!validate(data)) {
    const first = validate.errors
      .slice(0, 3)
      .map((e) => `${e.instancePath || '/'} ${e.message}`)
      .join('; ')
    return { ok: false, reason: `schema: ${first}` }
  }
  return { ok: true, id: data.id }
}
