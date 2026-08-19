/**
 * THE COLLECTIONS, NAMED ONCE.
 *
 * The build plugin reads these to know what to emit; the store reads them to
 * know what to fetch. Naming collections in more than one place has now failed
 * twice in this repo — once in the chunk matcher, where /content/news/ was
 * missed and every headline landed in the entry chunk, and once in the schema
 * cache, where the questions collection was handed the frontier schema. Both
 * times the fix was one list. This is that list.
 *
 * Adding a collection means adding one line here, a schema, a gate entry and a
 * loader — see HANDOVER.md for the full checklist.
 */
export interface Collection {
  /** Emitted as content-data/<name>.json, fetched under the same path. */
  name: string
  /** Source directory, relative to the repo root. Not read in the browser. */
  dir: string
}

export const COLLECTIONS: readonly Collection[] = [
  { name: 'frontier', dir: 'content/frontier' },
  { name: 'news', dir: 'content/news' },
  { name: 'questions', dir: 'content/questions' },
  { name: 'forecasts', dir: 'content/forecasts' },
  { name: 'items', dir: 'content/items' },
]

/**
 * Deliberately not `/content/` — that prefix is already a Vite resolve alias
 * for module imports (`import '/content/x.md?raw'`). Reusing it for an HTTP
 * path would work today and become confusing the first time one of them moved.
 */
export const DATA_PREFIX = 'content-data'

/** One record as emitted, plus the source path — a loader that skips a
 *  malformed file has to be able to name it, or the warning is unactionable.
 *
 *  `body` is optional and, today, never present: nothing on the site renders a
 *  content body. See `INCLUDE_BODIES` in `plugins/contentJson.ts`. */
export interface ContentRecord {
  path: string
  attributes: Record<string, unknown>
  body?: string
}
