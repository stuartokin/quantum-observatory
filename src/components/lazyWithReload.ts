import { lazy, type ComponentType } from 'react'

/**
 * Lazy loading that survives a redeploy.
 *
 * Chunk filenames carry a content hash, so a deploy replaces them. A tab left
 * open before the deploy still holds the old index and asks for a chunk that no
 * longer exists — "Failed to fetch dynamically imported module" — and the whole
 * board goes to the error boundary because a panel could not open.
 *
 * A static site cannot keep old chunks around forever, so the honest recovery
 * is to reload once and get the current index. The sessionStorage flag stops
 * that becoming a loop if the module is genuinely broken rather than merely
 * stale.
 *
 * The generic mirrors React.lazy's own constraint, ComponentType<any>.
 * ComponentType<never> reads as stricter and means the opposite: a component
 * accepting no props at all, which none of these are.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyWithReload<T extends ComponentType<any>>(
  name: string,
  factory: () => Promise<{ default: T }>,
) {
  return lazy(async () => {
    try {
      const mod = await factory()
      sessionStorage.removeItem(`reload:${name}`)
      return mod
    } catch (err) {
      const key = `reload:${name}`
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, '1')
        window.location.reload()
        // Never resolves; the page is on its way out.
        return new Promise<never>(() => {})
      }
      throw err
    }
  })
}
