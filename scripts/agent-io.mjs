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
  /**
   * Blocks are streaming fragments, not sentences.
   *
   * A block boundary can fall anywhere — including inside a JSON string — so
   * joining with a newline inserts a literal newline into that string and makes
   * the whole object unparseable. Concatenating with nothing is the faithful
   * reconstruction; the newline join stays last, for the older case where a
   * model emitted one object per block.
   *
   * This cost a full run: sixteen searches and a finished answer, discarded
   * because of a separator.
   */
  for (const obj of jsonCandidates(chunks)) {
    for (const text of [obj, repairJson(obj)]) {
      try {
        const parsed = JSON.parse(text)
        if (parsed && typeof parsed === 'object' && Array.isArray(parsed.files)) return parsed
      } catch {
        /* not this one */
      }
    }
  }
  return null
}

/** Every balanced object worth trying, in the order worth trying them. */
function* jsonCandidates(chunks) {
  const candidates = [
    ...[...chunks].reverse(),
    chunks.join(''),
    chunks.join('\n'),
  ]
  for (const chunk of candidates) {
    const cleaned = chunk.replace(/```(?:json)?/g, '')
    yield* balancedObjects(cleaned).reverse()
  }
}

/**
 * REPAIR THE TWO WAYS A MODEL'S JSON IS INVALID BUT UNAMBIGUOUS.
 *
 * A raw newline inside a string, and a backslash that begins an escape JSON
 * does not define. Both are rejected outright by `JSON.parse`, and in both
 * cases what was meant is not in doubt — a note that wrapped across a line
 * meant a line break, and `\'` meant an apostrophe.
 *
 * This is deliberately the *only* repair. Nothing here guesses at structure:
 * no closing of unbalanced braces, no stripping of trailing commas, no
 * salvaging of a half-written array. A malformed shape might mean several
 * things and picking one silently writes something nobody said. A control
 * character inside a string can only mean itself.
 *
 * The alternative is what happened without it: a sourcer run with three
 * searches, seven fully-sourced metrics and two finished patches, thrown away
 * whole because a character in a note could not be spelled.
 */
export function repairJson(text) {
  let out = ''
  let inStr = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (!inStr) {
      if (c === '"') inStr = true
      out += c
      continue
    }
    if (c === '\\') {
      const next = text[i + 1]
      // A valid escape passes through untouched; anything else was a literal
      // backslash the model failed to double.
      if (next !== undefined && '"\\/bfnrtu'.includes(next)) {
        out += c + next
        i++
      } else {
        out += '\\\\'
      }
      continue
    }
    if (c === '"') {
      inStr = false
      out += c
      continue
    }
    if (c === '\n') out += '\\n'
    else if (c === '\r') out += '\\r'
    else if (c === '\t') out += '\\t'
    else if (c < ' ') out += `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`
    else out += c
  }
  return out
}

/**
 * READ A TRIM REPLY, AND REFUSE ANYTHING THAT IS NOT WHAT WAS ASKED FOR.
 *
 * The runner asks the model to shorten the fields that overran, and this reads
 * the answer. It trusts the reply to be *shorter*. It does not trust it to be
 * right about which fields exist.
 *
 * - A key that was not one of the overflowing fields is **dropped, not
 *   applied.** The one thing this pass must never do is edit a field nobody
 *   complained about — that would be an automatic edit to content no check had
 *   objected to.
 * - A value still over its limit is dropped too. Applying it fails validation
 *   again, with the model's second guess standing in for its first, and the
 *   original is the better thing to report.
 * - All or nothing. A file with two overrunning fields and one shortened is
 *   still rejected, so a half-trimmed file never reaches the board.
 */
export function trimReply(reply, overflows) {
  const text = String(reply ?? '').replace(/```(?:json)?/g, '')
  const raw = (() => {
    for (const obj of balancedObjects(text).reverse()) {
      for (const candidate of [obj, repairJson(obj)]) {
        try {
          const parsed = JSON.parse(candidate)
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed
        } catch {
          /* not this one */
        }
      }
    }
    return null
  })()
  if (!raw) return null

  const out = {}
  for (const o of overflows) {
    const v = raw[o.field]
    if (typeof v !== 'string' || !v.length || v.length > o.limit) continue
    out[o.field] = v
  }
  return Object.keys(out).length === overflows.length ? out : null
}

/**
 * Why no JSON came out, in one line a person can act on.
 *
 * "No parseable JSON object found" is true and useless: it does not say
 * whether the model wrote no object, wrote a truncated one, or wrote a
 * complete one with a bad character in it — three problems with three
 * different answers. Called only on the failure path, so its cost is nothing.
 */
export function explainJsonFailure(chunks) {
  const objects = [...jsonCandidates(chunks)]
  if (objects.length === 0) {
    const joined = chunks.join('')
    return joined.includes('{')
      ? 'an object opens but never closes — the response was cut off mid-JSON'
      : 'no JSON object at all — the model answered in prose'
  }
  const biggest = objects.reduce((a, b) => (b.length > a.length ? b : a))
  try {
    const parsed = JSON.parse(repairJson(biggest))
    return Array.isArray(parsed?.files)
      ? 'parsed, but something else rejected it'
      : `parsed, but has no "files" array — top-level keys: ${Object.keys(parsed ?? {}).join(', ') || 'none'}`
  } catch (e) {
    const at = Number(String(e.message).match(/position (\d+)/)?.[1] ?? -1)
    const where =
      at >= 0
        ? `\n  around: ${JSON.stringify(biggest.slice(Math.max(0, at - 60), at + 60))}`
        : ''
    return `${objects.length} object(s) found, largest ${biggest.length} chars; JSON.parse: ${String(e.message).split('\n')[0]}${where}`
  }
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

/**
 * One compiled validator per schema, not one for the whole process.
 *
 * The cache was keyed on nothing, so the first schema compiled became the only
 * schema used — which meant a run that touched the frontier then validated
 * every news file against the frontier shape, and reported missing `readiness`
 * on a headline. Caching by path is the whole fix.
 */
const validators = new Map()
function itemValidator(schemaPath) {
  const hit = validators.get(schemaPath)
  if (hit) return hit
  const Ajv = require('ajv')
  const addFormats = require('ajv-formats')
  const ajv = new (Ajv.default ?? Ajv)({ allErrors: true, strict: false })
  ;(addFormats.default ?? addFormats)(ajv)
  const v = ajv.compile(JSON.parse(readFileSync(schemaPath, 'utf8')))
  validators.set(schemaPath, v)
  return v
}

/** The schema a path is governed by, inferred from its collection. */
/**
 * One table, consulted by everything.
 *
 * This mapping existed twice — once here for validation, once in the runner for
 * deciding which schema to show an agent — and the second copy only knew about
 * news. So the questions collection was handed the frontier schema and wrote
 * frontier-shaped files, which is the same failure the newsroom had one
 * collection earlier.
 *
 * Adding a collection now means adding one line, in one place.
 */
export const COLLECTIONS = [
  { dir: 'content/news/', schema: 'content/schema/news.schema.json', name: 'news' },
  { dir: 'content/questions/', schema: 'content/schema/question.schema.json', name: 'questions' },
  { dir: 'content/forecasts/', schema: 'content/schema/forecast.schema.json', name: 'forecasts' },
  { dir: 'content/milestones/', schema: 'content/schema/milestone.schema.json', name: 'milestones' },
  { dir: 'content/assessment/', schema: 'content/schema/assessment.schema.json', name: 'assessment' },
  { dir: 'content/frontier/', schema: 'content/schema/frontier.schema.json', name: 'frontier' },
]

export function schemaForPath(path) {
  const hit = COLLECTIONS.find((c) => path.includes(`/${c.name}/`) || path.includes(c.dir))
  return hit ? hit.schema : 'content/schema/frontier.schema.json'
}

/**
 * EVERY LENGTH LIMIT IN A SCHEMA, AS A TABLE, COMPUTED.
 *
 * Three runs were destroyed by a limit an agent had been told wrongly, and
 * each time the fix was to hand-edit a table in a prompt — which is the same
 * mistake with a longer fuse, because the next schema change makes the new
 * table wrong too. The counts are:
 *
 *   - `plain` is 1600 on a frontier item and 400 on a milestone. Scout was
 *     shown one table headed by nothing and wrote the frontier length into a
 *     milestone, four times.
 *   - `measurements[].qualifier` is 60. The newsroom was shown no number at
 *     all and wrote 94.
 *
 * The schema is the only thing that actually enforces these, so it is the only
 * honest place to read them from. Nested objects and array items are walked,
 * because that is exactly where the ones that bite are — nobody overruns
 * `title`; they overrun the fifth field of the third element of an array.
 *
 * Prompts must not restate these numbers. Point at this table instead.
 */
export function limitsFor(schemaPath) {
  const rows = []
  const walk = (node, path) => {
    if (!node || typeof node !== 'object') return
    if (typeof node.maxLength === 'number') rows.push([path, `${node.maxLength} characters`])
    if (typeof node.maxItems === 'number') rows.push([path, `${node.maxItems} items`])
    if (node.properties) for (const [k, v] of Object.entries(node.properties)) walk(v, path ? `${path}.${k}` : k)
    if (node.items) walk(node.items, `${path}[]`)
  }
  walk(JSON.parse(readFileSync(schemaPath, 'utf8')), '')
  return rows
}

/** The same, rendered for a prompt: one markdown table per collection. */
export function limitsTable(collections) {
  return collections
    .map((c) => {
      const rows = limitsFor(c.schema)
      if (!rows.length) return `## ${c.name} — no length limits`
      return [
        `## ${c.name} — for files under content/${c.name}/`,
        '',
        '| Field | Maximum |',
        '| --- | --- |',
        ...rows.map(([f, lim]) => `| \`${f}\` | ${lim} |`),
      ].join('\n')
    })
    .join('\n\n')
}

/**
 * The value a file's own `schema:` field must carry, for the collection its
 * path puts it in — `milestone/v1`, `question/v1`, and so on.
 *
 * **Read out of the schema file, never listed here.** The comment above
 * COLLECTIONS says adding a collection means adding one line in one place, and
 * that was untrue for two releases: the runner kept a fourth copy of this
 * mapping as a hand-written ternary that knew news, questions and forecasts
 * and silently defaulted everything else to `frontier/v1`. So when scout's
 * write scope gained `content/milestones/`, every milestone it wrote was
 * stamped `frontier/v1` on the way past and then rejected for it — four runs,
 * all of the research done, none of it written.
 *
 * A JSON Schema already states this as `properties.schema.const`. Asking it is
 * the only version that cannot fall behind.
 */
const schemaConsts = new Map()
export function schemaConstFor(path) {
  const file = schemaForPath(path)
  const hit = schemaConsts.get(file)
  if (hit) return hit
  const konst = JSON.parse(readFileSync(file, 'utf8'))?.properties?.schema?.const
  if (!konst) throw new Error(`${file} declares no properties.schema.const, so no file can be stamped for it`)
  schemaConsts.set(file, konst)
  return konst
}

/** Which collections an agent may write to, from its write_scope. */
export function collectionsFor(writeScope = []) {
  return COLLECTIONS.filter((c) => writeScope.some((p) => p.includes(c.name)))
}

/**
 * The directory an existing, already-published file for this path actually
 * lives in — the collection's own directory, never a staging subfolder like
 * `_inbox`. An agent's write_scope points at `_inbox`, because that is where
 * a new proposal is queued for the workflow to move onto the board; the file
 * a patch means to change is not there; it is already live.
 */
export function collectionDirFor(path) {
  const hit = COLLECTIONS.find((c) => path.includes(c.dir) || path.includes(`/${c.name}/`))
  return hit ? hit.dir : 'content/frontier/'
}

/**
 * Set a value at a dotted path inside a plain object, creating intermediate
 * objects as needed. A `null` value deletes the path instead of setting it —
 * the schema has no use for an explicit null, and "take this field out"
 * needs some way to be said without a second verb.
 */
function setPath(obj, path, value) {
  const parts = path.split('.')
  let cur = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i]
    if (Array.isArray(cur[k])) {
      // A path addressing *into* an array — "evidence.sources.role" and
      // the like — isn't supported; there is no per-element merge verb,
      // deliberately (see the comment on applyFields). Silently replacing
      // the whole array with {} to build the rest of the path is worse
      // than refusing: it destroys real data on a path that was never
      // going to mean what the agent thought it meant.
      throw new Error(
        `"${path}" addresses into "${parts.slice(0, i + 1).join('.')}", which is an array — ` +
          `replace the whole array by its own top-level path instead`,
      )
    }
    if (cur[k] == null || typeof cur[k] !== 'object') {
      if (value === null) return // nothing to delete on a path that isn't there
      cur[k] = {}
    }
    cur = cur[k]
  }
  const last = parts[parts.length - 1]
  if (value === null) delete cur[last]
  else cur[last] = value
}

/**
 * Find a top-level YAML key's block in a list of front-matter lines: the
 * line it starts on, and the line it ends before — the next line that opens
 * a new top-level key (no leading whitespace), or the end of the front
 * matter. Everything indented, every list item, every blank line in between
 * belongs to the key above it.
 */
function findBlock(lines, key) {
  const start = lines.findIndex((l) => new RegExp(`^${key}:`).test(l))
  if (start === -1) return null
  let end = lines.length
  for (let i = start + 1; i < lines.length; i++) {
    if (/^[A-Za-z_][\w-]*:/.test(lines[i])) {
      end = i
      break
    }
  }
  return { start, end }
}

/**
 * Apply a set of field changes to an existing file, returning a new full
 * file text.
 *
 * This is the fix for the failure mode that discarded five runs across four
 * items: an agent that must return a whole file bundles every field of that
 * item into one return, so one overflowing field loses the other twenty that
 * were already correct along with it. A patch only ever contains the fields
 * actually being changed — usually a handful — so the same overflow now
 * costs that handful, not the item's entire state.
 *
 * Each key in `fields` is a dotted path into the parsed document —
 * "evidence.claim", "review.note", "qdayImpact" — replacing exactly the
 * value at that path and leaving everything else untouched. A path into an
 * array such as "evidence.sources" replaces the whole array; there is no
 * merge protocol for one element of a list, deliberately — the lists here
 * are short, and a merge protocol is a second thing to get wrong for a
 * problem that resending the whole list already solves.
 *
 * The special key "body" replaces the markdown below the closing front
 * matter.
 *
 * Only the *top-level* keys named in `fields` are re-serialised — the
 * runner locates each one's block in the original text and replaces exactly
 * that block, dumped fresh with js-yaml. Everything else in the front
 * matter is left as bytes, untouched.
 *
 * That's deliberate, and cost a wasted first attempt to learn: dumping the
 * *whole* document through js-yaml after every patch is correct — it never
 * mis-quotes a colon or an apostrophe the way text substitution can — but it
 * also re-serialises every field that was never touched, because js-yaml
 * decides quoting style for the object as a whole. A patch that changed one
 * line in `review.note` produced a diff touching the title, the summary,
 * every metric and every source, because js-yaml prefers plain scalars over
 * quoted ones and none of this content happened to need quoting by its
 * rules. A diff like that defeats the reason a patch exists: reviewing one
 * changed field should not require reading twenty unchanged ones to confirm
 * they are, in fact, unchanged.
 *
 * Scoping the re-serialisation to the touched top-level blocks keeps
 * js-yaml's correctness — it still owns quoting and escaping for anything it
 * writes — while confining the blast radius of *that* to the keys the patch
 * actually named, which is the same scoping principle the patch itself is
 * built on.
 */
export function applyFields(existingRaw, fields) {
  const m = existingRaw.match(FRONT_MATTER)
  if (!m) throw new Error('the existing file has no front matter to patch')
  const yaml = require('js-yaml')
  // Same reason checkStructure normalises: YAML parses an unquoted date into
  // a Date object, not a string. Only the fields named in `fields` end up
  // re-dumped below, but that dump re-serialises the *whole* top-level block
  // the field lives in — so an unrelated unquoted date sharing a block with
  // a touched field would otherwise round-trip as an ISO timestamp
  // (`2026-08-01T00:00:00.000Z`) instead of surviving as the plain date
  // string the schema expects. Normalising the parsed copy before anything
  // is read from it closes that off, the same way checkStructure already does.
  const data = normaliseTypes(yaml.load(m[1]))
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('the existing front matter is not an object')
  }

  let newBody = existingRaw.slice(m[0].length)
  const touchedKeys = new Set()
  for (const [key, value] of Object.entries(fields ?? {})) {
    if (key === 'body') {
      newBody = '\n\n' + String(value).trim() + '\n'
      continue
    }
    setPath(data, key, value)
    touchedKeys.add(key.split('.')[0])
  }

  const lines = m[1].split('\n')
  const DUMP_OPTS = { lineWidth: -1, noRefs: true, quotingType: "'" }
  for (const key of touchedKeys) {
    const block = findBlock(lines, key)
    const stillPresent = Object.prototype.hasOwnProperty.call(data, key)
    // lineWidth: -1 so a long claim is never hard-wrapped — wrapping would
    // change a scalar's on-disk form without changing its meaning.
    const fragment = stillPresent ? yaml.dump({ [key]: data[key] }, DUMP_OPTS) : ''
    const fragmentLines = fragment ? fragment.replace(/\n$/, '').split('\n') : []
    if (block) {
      lines.splice(block.start, block.end - block.start, ...fragmentLines)
    } else if (fragmentLines.length) {
      // A key that was not there before — e.g. an item that never had
      // qdayImpact set — is appended at the end of the front matter.
      lines.push(...fragmentLines)
    }
  }

  return `---\n${lines.join('\n')}\n---${newBody}`
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

/**
 * How far past a length limit a field actually is.
 *
 * Ajv says "must NOT have more than 400 characters", which states the rule and
 * withholds the one fact needed to act on it. A field eleven characters over
 * and a field written to twice the limit are the same message, so a person
 * reading the log cannot tell a slip from a misunderstanding — and four runs
 * were lost to exactly this before anyone realised the agent had been given
 * the wrong limits rather than ignored the right ones.
 */
function valueAt(data, instancePath) {
  return instancePath
    .split('/')
    .slice(1)
    .reduce((cur, k) => (cur == null ? cur : cur[k.replace(/~1/g, '/').replace(/~0/g, '~')]), data)
}

function overBy(data, err) {
  if (err.keyword !== 'maxLength') return ''
  const value = valueAt(data, err.instancePath)
  if (typeof value !== 'string') return ''
  return ` (it is ${value.length}, so ${value.length - err.params.limit} over)`
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
      .map((e) => `${e.instancePath || '/'} ${e.message}${overBy(data, e)}`)
      .join('; ')
    /**
     * Say, structurally, whether this file failed *only* on length.
     *
     * That is the one failure a machine can put right without inventing
     * anything — the text exists and is merely too long — and it is the
     * failure that has cost this project more runs than every other kind
     * together. Everything else stays a flat rejection.
     */
    const overflows = validate.errors.every((e) => e.keyword === 'maxLength')
      ? validate.errors.map((e) => ({
          field: e.instancePath.slice(1).split('/').join('.'),
          limit: e.params.limit,
          actual: valueAt(data, e.instancePath)?.length ?? 0,
        }))
      : []
    return { ok: false, reason: `schema: ${first}`, overflows }
  }
  return { ok: true, id: data.id }
}
