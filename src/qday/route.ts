import { useMemo, useSyncExternalStore } from 'react'

/**
 * THE FIRST ROUTE THIS PROJECT HAS EVER HAD.
 *
 * The board is one page with windows over a canvas, and that was right — a
 * galaxy you navigate by moving around in does not want URLs for its parts.
 * Q-Day is different: seven dense pages a reader moves between, compares, and
 * wants to send to somebody. Qday-Research already syncs `?tab=` for exactly
 * that reason, so shipping this without addresses would have been a
 * regression against the thing being replaced.
 *
 * Hash routing rather than the History API, because GitHub Pages serves
 * static files and has no rewrite rules: `/q-day/trends` would 404 on a
 * refresh, and the usual workaround — a 404.html that re-serves index.html —
 * turns every genuine mistyped URL into a silent success. A hash never leaves
 * the client, so a reload and a shared link both simply work.
 */
export type QDayTab =
  | 'clocks'
  | 'trends'
  | 'stack'
  | 'plan'
  | 'threats'
  | 'readiness'
  | 'learn'

export interface QDayTabDef {
  id: QDayTab
  label: string
  /** What the tab is for, shown on the ones not built yet. */
  blurb: string
  /** False until the tab has real content behind it. */
  ready: boolean
}

/**
 * All seven exist from the first release, and the six that are not built say
 * so plainly rather than being hidden.
 *
 * Hiding them would be the tidier demo and the worse answer: a reader who can
 * see that Threats is coming and *why* it is empty knows more about this board
 * than one shown a tab bar with a single item. The blurbs are the honest
 * version of a roadmap — each says what will fill it and what it is waiting on.
 */
export const QDAY_TABS: readonly QDayTabDef[] = [
  {
    id: 'clocks',
    label: 'Clocks',
    blurb: 'Countdowns, headroom and the Mosca test.',
    ready: true,
  },
  {
    id: 'trends',
    label: 'Trends',
    blurb:
      'Where demonstrated capability stands against the falling requirement floor, derived from the board when the page loads.',
    ready: true,
  },
  {
    id: 'stack',
    label: 'Stack',
    blurb:
      'What a cryptographically relevant machine still needs, component by component — as multiples, never as invented percentages.',
    ready: true,
  },
  {
    id: 'plan',
    label: 'Plan',
    blurb:
      'Regulatory deadlines and the migration timeline, each held as content with the source that set it.',
    ready: true,
  },
  {
    id: 'threats',
    label: 'Threats',
    blurb:
      'Vulnerabilities and attacks bearing on the migration. The board holds no CVE records at all today, so this arrives with imported material marked unverified rather than with numbers it cannot stand behind.',
    ready: false,
  },
  {
    id: 'readiness',
    label: 'Readiness',
    blurb:
      'Vendor and organisation post-quantum readiness. Same position as Threats: the scores exist elsewhere, carry citations, and have not been checked by this board. They arrive quarantined and get promoted as an agent verifies them.',
    ready: false,
  },
  {
    id: 'learn',
    label: 'Learn',
    blurb:
      'The vocabulary this subject runs on, and the questions the board is holding open.',
    ready: true,
  },
]

const DEFAULT_TAB: QDayTab = 'clocks'
const PREFIX = '#/q-day'

export type Route = { view: 'board' } | { view: 'qday'; tab: QDayTab }

export function parseHash(hash: string): Route {
  if (!hash.startsWith(PREFIX)) return { view: 'board' }
  const rest = hash.slice(PREFIX.length).replace(/^\//, '')
  const tab = QDAY_TABS.find((t) => t.id === rest)
  // An unknown tab is a typo or a stale link, not a reason to show nothing.
  return { view: 'qday', tab: tab ? tab.id : DEFAULT_TAB }
}

export const hrefFor = (tab: QDayTab): string => `${PREFIX}/${tab}`

/** Navigating from a click handler. Assigning the hash is what pushes history,
 *  so Back returns to the board without any bookkeeping of our own. */
export function goToQDay(tab: QDayTab = DEFAULT_TAB): void {
  window.location.hash = hrefFor(tab)
}

export function goToBoard(): void {
  // `pushState` rather than clearing the hash: setting `location.hash = ''`
  // leaves a bare '#' in the address bar and, in some browsers, scrolls to the
  // top of the document. This leaves the URL clean.
  history.pushState(null, '', window.location.pathname + window.location.search)
  window.dispatchEvent(new HashChangeEvent('hashchange'))
}

const subscribe = (onChange: () => void): (() => void) => {
  window.addEventListener('hashchange', onChange)
  // Back and Forward across a pushState do not raise hashchange on their own.
  window.addEventListener('popstate', onChange)
  return () => {
    window.removeEventListener('hashchange', onChange)
    window.removeEventListener('popstate', onChange)
  }
}

/** The snapshot is the raw hash string, so React can compare it with Object.is.
 *  Returning a parsed object here would be a new object every call and would
 *  re-render forever. */
const getSnapshot = (): string => window.location.hash
const getServerSnapshot = (): string => ''

export function useRoute(): Route {
  const hash = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return useMemo(() => parseHash(hash), [hash])
}
