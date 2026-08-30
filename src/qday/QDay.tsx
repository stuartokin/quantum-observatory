import { useEffect } from 'react'
import {
  QDAY_TABS,
  hrefFor,
  goToBoard,
  goToQDay,
  requestHelpOnBoard,
  type QDayTab,
} from './route'
import { Toolbar } from '../components/Toolbar'
import { AppMenu } from '../components/AppMenu'
import { VERSION } from '../version'

/** One glyph per section, so the dock still reads when the labels drop off. */
const TAB_ICON: Record<QDayTab, string> = {
  clocks: '◷',
  trends: '∿',
  stack: '≡',
  plan: '⊞',
  threats: '⚠',
  readiness: '◎',
  learn: '✦',
}
import { forecastFor } from '../content/forecast'
import { Clocks } from './tabs/Clocks'
import { Trends } from './tabs/Trends'
import { Plan } from './tabs/Plan'
import { Stack } from './tabs/Stack'
import { Learn } from './tabs/Learn'
import { Pending } from './tabs/Pending'
import './qday.css'

/**
 * THE Q-DAY SURFACE.
 *
 * A full-screen takeover rather than another window on the board. The board is
 * a place you navigate by moving around in; this is seven dense pages you move
 * between. Putting seven tabs of charts inside a draggable frame would make
 * both worse.
 *
 * The board unmounts while this is open. That loses window positions, which is
 * a real cost — but the board keeps no layout across a reload either, so it is
 * a cost readers already meet, and it is cheaper than leaving a canvas
 * animation loop running behind an opaque overlay for as long as somebody
 * reads about cryptography.
 */
export default function QDay({ tab }: { tab: QDayTab }) {
  const forecast = forecastFor('quantum')

  /**
   * Escape returns to the board.
   *
   * A takeover with no keyboard way out is a trap for anyone not using a
   * mouse, and the affordance costs one listener.
   */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') goToBoard()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /** A tab change should start at the top. Reading halfway down Clocks and
   *  switching to Plan used to open the new page in the middle of itself on
   *  the board's detail panel, which is the same mistake one surface along. */
  useEffect(() => {
    document.querySelector('.qday-surface__main')?.scrollTo({ top: 0 })
  }, [tab])

  const def = QDAY_TABS.find((t) => t.id === tab) ?? QDAY_TABS[0]

  return (
    <div className="qday-surface">
      {/*
        The same header the board has: wordmark on the left, what you are
        looking at beside it, and the three dots on the right. Nothing here is
        Observatory-specific except the words — which is the point. A reader
        crossing between the two surfaces should find the same furniture in the
        same place, and the "← Board" button that used to float in the corner
        has moved into the dock, where the board's own "Q-Day" already lives.
      */}
      <header className="app-head">
        <div className="app-head__id">
          <a
            className="wordmark"
            href="#"
            onClick={(e) => {
              e.preventDefault()
              goToBoard()
            }}
          >
            Quantum Observatory
          </a>
          <span className="app-head__sep">·</span>
          <span className="app-head__where">
            Q-Day
          </span>
        </div>
        <p className="app-head__sub">
          Capability against the migration deadline — the gap is your headroom.
          <b> Estimates, not predictions.</b>
        </p>
        <AppMenu
          items={[
            {
              key: 'help',
              label: 'Help & documentation',
              hint: 'Opens on the board, where it is a window you can park',
              onClick: requestHelpOnBoard,
            },
            {
              key: 'board',
              label: 'Back to the board',
              hint: 'The galaxy this section is derived from · Esc',
              onClick: goToBoard,
            },
            {
              key: 'about',
              label: 'About this surface',
              hint: `Version ${VERSION} · seven sections, ${QDAY_TABS.filter((t) => t.ready).length} built`,
              onClick: () => goToQDay('learn'),
            },
          ]}
        />
      </header>

      <main className="qday-surface__main">
        {tab === 'clocks' ? (
          <Clocks forecast={forecast} />
        ) : tab === 'trends' ? (
          <Trends forecast={forecast} />
        ) : tab === 'plan' ? (
          <Plan forecast={forecast} />
        ) : tab === 'stack' ? (
          <Stack forecast={forecast} />
        ) : tab === 'learn' ? (
          <Learn />
        ) : (
          <Pending def={def} />
        )}
      </main>

      {/*
        The board's dock, with sections in it instead of windows.

        It lists every section including the two with nothing behind them yet.
        The board hides a window while that window is open, because the window
        is its own control; a section is not, and here the set of sections is
        the map of the subject — hiding the one being read would make that map
        change as you read it, and hiding the unbuilt ones would tell a reader
        the subject is smaller than it is.

        Everything else comes free: drag to move, click the grip to collapse,
        drag the corner to set the width, labels drop to icons when it is
        narrow. The Observatory had none of that an hour ago.
      */}
      <Toolbar
        accent="var(--qd-defence)"
        buttons={[
          {
            // No href: returning to the board is a pushState that clears the
            // hash, and an anchor to '#' would leave one behind.
            key: 'board',
            kind: 'nav',
            icon: '←',
            label: 'Board',
            onClick: goToBoard,
          },
          { key: 'rule', divider: true, label: '' },
          ...QDAY_TABS.map((t) => ({
            key: t.id,
            kind: 'section' as const,
            icon: TAB_ICON[t.id],
            label: t.label,
            href: hrefFor(t.id),
            active: t.id === tab,
          })),
        ]}
      />
    </div>
  )
}
