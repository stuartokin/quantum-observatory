/**
 * FRONT MATTER, PARSED ONCE AT BUILD TIME.
 *
 * Kept separate from `contentJson.ts` — its only caller today — because this
 * half is pure and testable and that half touches the filesystem and the dev
 * server. It also used to have a second caller, `frontmatter.ts`, which served
 * single files to `?parsed` imports; that plugin was deleted when content
 * moved to runtime fetch and nothing imported `?parsed` any more.
 *
 * The reason this work happens here at all: every visitor was downloading
 * js-yaml, about 30 KB gzipped, to parse files that were fixed when the site
 * was built. The content cannot change in the browser, so neither can the
 * result of parsing it.
 */
import yaml from 'js-yaml'

export interface ParsedFile {
  attributes: Record<string, unknown>
  body: string
}

const FRONT_MATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/

/**
 * Parse one markdown file's front matter.
 *
 * A file without front matter is not an error — the README in each collection
 * is one — so it comes back with empty attributes and the whole file as body.
 * A file with *broken* front matter is an error, and the caller is expected to
 * name the file when it reports it: a YAML error reported against a bundle id
 * tells you nothing about which file to open.
 */
export function parseFrontMatter(raw: string): ParsedFile {
  const m = raw.match(FRONT_MATTER)
  if (!m) return { attributes: {}, body: raw }

  const attributes = yaml.load(m[1]) ?? {}
  return {
    attributes: normalise(attributes) as Record<string, unknown>,
    body: m[2] ?? '',
  }
}

/**
 * YAML turns an unquoted 2026-05-14 into a Date, not a string.
 *
 * This used to live in each of the loaders, running on every page load in
 * every visitor's browser. It happens once at build time instead — which also
 * means a Date can never survive into JSON and surprise a renderer, since
 * `JSON.stringify` would silently turn it into an ISO timestamp and every
 * `.localeCompare()` downstream would be comparing the wrong shape of string.
 */
export function normalise(value: unknown): unknown {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (Array.isArray(value)) return value.map(normalise)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, normalise(v)]),
    )
  }
  return value
}
