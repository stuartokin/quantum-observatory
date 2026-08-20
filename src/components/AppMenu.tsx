import { useEffect, useRef, useState } from 'react'

/**
 * THE THREE DOTS, TOP RIGHT — THE SAME ONE ON BOTH SURFACES.
 *
 * Everything that is *about* the product rather than *in* it lives here: help,
 * what this is, the theme, resetting a layout. Those had been scattered — help
 * was a dock item on the board and nowhere at all on the Observatory, the
 * theme toggle sat loose in one header, and the build date was printed in a
 * corner of the other.
 *
 * Putting them behind one control in one position is worth more than the click
 * it costs. A reader crossing between the two surfaces should find the same
 * furniture in the same place; anything that moves reads as a different site.
 *
 * **What it does not do is open its own copy of anything.** On the board,
 * "Help" opens the help *window* that already exists — moveable, resizable,
 * parked beside the galaxy while you read. Building a second help panel here
 * would have made the menu consistent and the board worse. The menu is an
 * entry point, not an owner.
 */

export interface MenuItem {
  key: string
  label: string
  /** Shown under the label. One line, and only where it earns it. */
  hint?: string
  onClick: () => void
  /** For a toggle — the theme — so the menu can show its state. */
  state?: string
}

export function AppMenu({ items, label = 'Menu' }: { items: MenuItem[]; label?: string }) {
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  /**
   * Escape closes the menu and nothing else.
   *
   * Both surfaces already listen for Escape at the document — the Observatory
   * uses it to return to the board. A bubbling listener here would let one key
   * press close the menu *and* leave the page, so this captures and stops.
   * The same fix the source panels needed, for the same reason.
   */
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.stopPropagation()
      setOpen(false)
    }
    const onDown = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey, { capture: true })
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey, { capture: true })
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  return (
    <div className="appmenu" ref={box}>
      <button
        className="appmenu__dots"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
          <circle cx="12" cy="5" r="1.6" />
          <circle cx="12" cy="12" r="1.6" />
          <circle cx="12" cy="19" r="1.6" />
        </svg>
      </button>

      {open && (
        <div className="appmenu__panel" role="menu">
          {items.map((it) => (
            <button
              key={it.key}
              className="appmenu__item"
              role="menuitem"
              onClick={() => {
                setOpen(false)
                it.onClick()
              }}
            >
              <span className="appmenu__label">
                {it.label}
                {it.state && <i>{it.state}</i>}
              </span>
              {it.hint && <span className="appmenu__hint">{it.hint}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
