import { useCallback, useState } from 'react'

/**
 * Filter chips, in one row above the chart they filter.
 *
 * Two rules worth stating because both are easy to get wrong:
 *
 * 1. **Colour follows the entity, never its rank.** Turning a series off must
 *    not repaint the survivors — so a chip carries the colour its series will
 *    have, assigned by identity, and hiding one changes nothing about the
 *    others.
 * 2. **The chip is the legend.** A separate legend beside a set of toggles is
 *    two controls for one job, and the reader has to work out which is which.
 */
export interface ChipDef<T extends string> {
  id: T
  label: string
  /** The mark colour for this series, where it has one. */
  colour?: string
}

export function Chips<T extends string>({
  chips,
  active,
  onToggle,
  mode = 'multi',
  label,
}: {
  chips: readonly ChipDef<T>[]
  active: readonly T[]
  onToggle: (id: T) => void
  /** `single` behaves as a segmented control — one always selected. */
  mode?: 'single' | 'multi'
  label: string
}) {
  return (
    <div className="qd-chips" role="group" aria-label={label}>
      {chips.map((c) => {
        const on = active.includes(c.id)
        return (
          <button
            key={c.id}
            className="qd-chip"
            aria-pressed={on}
            data-mode={mode}
            onClick={() => onToggle(c.id)}
          >
            {c.colour && <i style={{ background: on ? c.colour : 'transparent', borderColor: c.colour }} />}
            {c.label}
          </button>
        )
      })}
    </div>
  )
}

/** Single-select, for a chip row that behaves as a switch between views. */
export function useSingle<T extends string>(initial: T) {
  const [value, setValue] = useState<T>(initial)
  const toggle = useCallback((id: T) => setValue(id), [])
  return { value, active: [value] as readonly T[], toggle }
}

/** Multi-select where at least one must stay on — turning the last one off
 *  would leave an empty chart and no way back except guessing. */
export function useMulti<T extends string>(all: readonly T[]) {
  const [active, setActive] = useState<readonly T[]>(all)
  const toggle = useCallback((id: T) => {
    setActive((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      return next.length ? next : prev
    })
  }, [])
  return { active, toggle }
}
