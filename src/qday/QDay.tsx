import { useEffect } from 'react'
import { QDAY_TABS, hrefFor, goToBoard, type QDayTab } from './route'
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
      <header className="qday-surface__head">
        <button className="qday-surface__back" onClick={goToBoard}>
          ← Board
        </button>
        <h1 className="qday-surface__title">
          Q-Day <span>Observatory</span>
        </h1>
        <p className="qday-surface__sub">
          Capability against the migration deadline — the gap is your headroom.
          <b> Estimates, not predictions.</b>
        </p>
      </header>

      <main className="qday-surface__main">
        {tab === 'clocks' ? (
          <Clocks forecast={forecast} />
        ) : tab === 'trends' ? (
          <Trends forecast={forecast} />
        ) : tab === 'plan' ? (
          <Plan />
        ) : tab === 'stack' ? (
          <Stack forecast={forecast} />
        ) : tab === 'learn' ? (
          <Learn />
        ) : (
          <Pending def={def} />
        )}
      </main>

      {/*
        The dock lists every tab including the six with nothing behind them.
        The board's own dock lists what is put away rather than everything that
        exists; this one is the opposite on purpose — here the set of tabs is
        the map of the subject, and hiding the unbuilt ones would tell a reader
        the subject is smaller than it is.
      */}
      <nav className="qday-dock" aria-label="Q-Day sections">
        {QDAY_TABS.map((t) => (
          <a
            key={t.id}
            className="qday-dock__tab"
            href={hrefFor(t.id)}
            aria-current={t.id === tab ? 'page' : undefined}
            data-pending={!t.ready || undefined}
          >
            {t.label}
          </a>
        ))}
      </nav>
    </div>
  )
}
