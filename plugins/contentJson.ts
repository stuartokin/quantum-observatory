import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import type { Plugin } from 'vite'
import { parseFrontMatter } from './parseFrontMatter'
import { COLLECTIONS, DATA_PREFIX, type ContentRecord } from '../src/content/collections'

/**
 * CONTENT AS DATA, FETCHED — NOT AS JAVASCRIPT, BUNDLED.
 *
 * Every visitor used to download the whole board as JavaScript before anything
 * appeared on screen: 188.8 KB gzipped of frontier items and 106.1 KB of
 * headlines, parsed and executed as code, on a chunk that changed identity
 * whenever a single agent run touched a single field.
 *
 * `AGENT-PLAN.md §11a` and `DESIGN-LOG.md` both called this in advance and
 * both said the same thing about what to do when it ran out:
 *
 *   > At roughly 200 items, or 220 KB gzipped of content, the fix is to emit
 *   > content as a JSON file fetched at runtime rather than bundled. Do not
 *   > raise the ceiling instead.
 *
 * This is that. Three things follow from it, and the second is the one that
 * actually matters day to day:
 *
 *   1. Content leaves the JavaScript budget entirely, so the board can grow
 *      without the application appearing to bloat.
 *   2. Code and content are cached independently. A code deploy no longer
 *      invalidates 295 KB of unchanged research, and — more to the point here
 *      — a Monday agent run no longer invalidates the application for every
 *      reader. Previously *any* change to either re-hashed both chunks.
 *   3. JSON parses several times faster than the equivalent JavaScript, since
 *      the engine never has to treat it as a program.
 *
 * The trade is that content is no longer guaranteed present at import time,
 * which is why `src/content/store.ts` exists and why `main.tsx` waits for it
 * before mounting. That waiting is a real cost and it is charged honestly:
 * nothing renders against half-loaded content.
 */
/**
 * MARKDOWN BODIES ARE NOT SHIPPED.
 *
 * Nothing on the site renders one. `Markdown` is used in exactly six places,
 * all of them Help rendering the project's own documents through `?raw`, and
 * `CHANGELOG.md` has recorded the gap since 0.1.0: *"Article bodies not
 * rendered — titles and summaries only. Phase 1."*
 *
 * They were shipped anyway for the whole life of the project, because
 * `?parsed` emitted `{attributes, body}` as one object literal per file and a
 * bundler cannot tree-shake a property nobody reads off an object it has to
 * construct. Every visitor downloaded every body and threw them all away.
 *
 * When bodies are wanted — the Phase 1 note above — the answer is to fetch one
 * item's body when a reader opens that item, not to put ninety of them back in
 * front of first paint. That is the same argument as this whole plugin.
 *
 * Flip this to `true` to restore the old payload; it is one line, deliberately.
 */
const INCLUDE_BODIES = false

export function contentJson(): Plugin {
  /**
   * Read one collection off disk and parse it.
   *
   * Non-recursive, matching the `/content/<dir>/*.md` globs this replaces —
   * `content/frontier/_inbox/` holds a run's unmerged proposals and has never
   * been part of the site. Recursing into it would publish drafts.
   */
  const read = (dir: string): ContentRecord[] => {
    if (!existsSync(dir)) return []
    return readdirSync(dir)
      .filter((f) => f.endsWith('.md') && f !== 'README.md')
      .sort()
      .map((f) => {
        const path = `/${dir}/${f}`
        try {
          const { attributes, body } = parseFrontMatter(readFileSync(join(dir, f), 'utf8'))
          return INCLUDE_BODIES ? { path, attributes, body } : { path, attributes }
        } catch (e) {
          // Name the file. This is the whole reason the parser doesn't report
          // its own errors — only the caller knows which file it handed over.
          throw new Error(`Front matter in ${path} is not valid YAML: ${(e as Error).message}`)
        }
      })
  }

  const serialise = (name: string, dir: string) => JSON.stringify(read(dir))

  return {
    name: 'horizonq:content-json',

    /**
     * Emitted as a plain asset, not a chunk, so Rollup never gives it a
     * content hash. The fetch adds `?v=<version>` instead: the version is
     * bumped on every delivered change anyway, so it busts exactly when
     * something actually changed, and a reader's cached copy survives a
     * deploy that didn't touch content.
     */
    generateBundle() {
      for (const { name, dir } of COLLECTIONS) {
        this.emitFile({
          type: 'asset',
          fileName: `${DATA_PREFIX}/${name}.json`,
          source: serialise(name, dir),
        })
      }
    },

    /**
     * In development the same paths are served from disk on every request, so
     * editing a content file and reloading shows the edit. Registered directly
     * rather than through the returned-callback form, so it runs before Vite's
     * own static handling rather than after it.
     */
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? '').split('?')[0]
        const hit = COLLECTIONS.find((c) => url === `/${DATA_PREFIX}/${c.name}.json`)
        if (!hit) return next()
        try {
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-store')
          res.end(serialise(hit.name, hit.dir))
        } catch (e) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: (e as Error).message }))
        }
      })
    },

    /** Editing a content file should refresh the page in development. */
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.md') && file.includes('/content/')) {
        server.ws.send({ type: 'full-reload' })
      }
    },
  }
}
