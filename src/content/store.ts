import { COLLECTIONS, DATA_PREFIX, type ContentRecord } from './collections'
import { VERSION } from '../version'
import { hydrateFrontier } from './frontier'
import { hydrateNews } from './newsroom'
import { hydrateQuestions } from './questions'
import { hydrateForecasts } from './forecast'
import { hydrateItems } from './loader'

/**
 * FETCH THE BOARD, THEN LET IT RENDER.
 *
 * Content used to arrive as part of the JavaScript bundle, which meant it was
 * present the instant any module could ask for it. It is now fetched, so there
 * is a window in which it is not — and the whole design here is about making
 * that window impossible to observe from inside the application.
 *
 * The rule: `loadContent()` resolves before React mounts (see `main.tsx`).
 * Nothing renders against half-loaded content, so no component needs a loading
 * branch, no `useEffect` needs to re-run when data lands, and the 3,246 lines
 * of `Board.tsx` did not have to change at all.
 *
 * That is bought with `export let` in each loader rather than `export const`.
 * ES modules export live *bindings*, not values, so when a loader reassigns
 * its array here every importer sees the new one — provided nobody snapshots
 * it at module scope. Nobody does; that was checked across every consumer
 * before this was written, and it is the one invariant that would break this
 * quietly rather than loudly.
 *
 * **If you add a module-level `const x = frontier.filter(...)` anywhere, it
 * will capture the empty array and silently render nothing.** Derive inside a
 * component, a hook or a function — never at module scope.
 */

/** Named hydrators rather than positional destructuring of the fetch results:
 *  a list whose order silently matters is the same failure as naming
 *  collections in two places, and this file already imports the one list. */
const HYDRATORS: Record<string, (records: ContentRecord[]) => void> = {
  frontier: hydrateFrontier,
  news: hydrateNews,
  questions: hydrateQuestions,
  forecasts: hydrateForecasts,
  items: hydrateItems,
}

/**
 * `?v=` is the cache key, and the version is bumped on every delivered change
 * — so a reader who has the current build gets their cached copy, and a reader
 * who does not gets a fresh one. GitHub Pages serves assets with a ten-minute
 * max-age, which would otherwise mean a content update could sit invisible.
 */
function urlFor(name: string): string {
  return `${import.meta.env.BASE_URL}${DATA_PREFIX}/${name}.json?v=${encodeURIComponent(VERSION)}`
}

async function fetchCollection(name: string): Promise<ContentRecord[]> {
  const res = await fetch(urlFor(name))
  if (!res.ok) {
    throw new Error(`content: ${name} failed to load — ${res.status} ${res.statusText}`)
  }
  const data: unknown = await res.json()
  if (!Array.isArray(data)) {
    throw new Error(`content: ${name} did not return an array`)
  }
  return data as ContentRecord[]
}

let loaded = false

/**
 * Fetch every collection in parallel and hand each to its loader.
 *
 * All five are awaited together rather than streamed in, because a board drawn
 * from three of five collections is a board that is quietly wrong — the
 * timeline would place items with no headlines against them, and the header
 * would report counts that changed under the reader a second later. A wrong
 * number is worse than a slow one, and this project's first commitment is that
 * every number on screen is a real count.
 *
 * News is the obvious next thing to defer: it is the largest collection, the
 * ticker shows a fortnight of it, and the archive is opened rarely. That is a
 * change to this function and nothing else, which is why it is shaped this way.
 */
export async function loadContent(): Promise<void> {
  if (loaded) return
  const results = await Promise.all(
    COLLECTIONS.map(async (c) => [c.name, await fetchCollection(c.name)] as const),
  )
  for (const [name, records] of results) {
    const hydrate = HYDRATORS[name]
    if (!hydrate) throw new Error(`content: no loader registered for "${name}"`)
    hydrate(records)
  }
  loaded = true
}
