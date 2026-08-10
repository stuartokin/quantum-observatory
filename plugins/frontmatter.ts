import { readFileSync } from 'node:fs'
import type { Plugin } from 'vite'
import yaml from 'js-yaml'

/**
 * PARSE FRONT MATTER AT BUILD TIME.
 *
 * Every visitor was downloading a YAML parser — about 30 KB gzipped, roughly a
 * third of the application bundle — to read files that were fixed when the site
 * was built. The content cannot change in the browser, so neither can the
 * result of parsing it.
 *
 * Import a markdown file with `?parsed` and this returns `{ attributes, body }`
 * already parsed and normalised. `?raw` still works and still returns a string,
 * which is what the Help panel wants for rendering the project's own documents.
 */
export function frontmatter(): Plugin {
  return {
    name: 'horizonq:frontmatter',
    enforce: 'pre',

    load(id) {
      const [file, query] = id.split('?')
      if (query !== 'parsed' || !file.endsWith('.md')) return null

      const raw = readFileSync(file, 'utf8')
      const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)

      // A file without front matter is not an error — the README in each
      // collection is one. Return an empty object rather than failing a build.
      if (!m) {
        return `export default ${JSON.stringify({ attributes: {}, body: raw })}`
      }

      let attributes: unknown
      try {
        attributes = yaml.load(m[1]) ?? {}
      } catch (e) {
        // Name the file. A YAML error reported against a bundle id is useless.
        this.error(`Front matter in ${file} is not valid YAML: ${(e as Error).message}`)
      }

      return `export default ${JSON.stringify({
        attributes: normalise(attributes),
        body: m[2] ?? '',
      })}`
    },

    // Editing a content file should refresh the page in development.
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.md') && file.includes('/content/')) {
        server.ws.send({ type: 'full-reload' })
      }
    },
  }
}

/**
 * YAML turns an unquoted 2026-05-14 into a Date, not a string.
 *
 * This used to live in each of the four loaders, running on every page load in
 * every visitor's browser. It happens once here instead, and the result is
 * serialised into the bundle — which also means a Date can never survive into
 * JSON and surprise a renderer.
 */
function normalise(value: unknown): unknown {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (Array.isArray(value)) return value.map(normalise)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, normalise(v)]),
    )
  }
  return value
}
