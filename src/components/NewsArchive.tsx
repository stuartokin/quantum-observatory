import { useMemo, useState } from 'react'
import type { NewsItem } from '../content/newsTypes'

/**
 * Opened on demand, so loaded on demand.
 *
 * The ticker is on screen from the first paint; the archive and the detail view
 * are not shown until a reader asks for them. Keeping them out of the entry
 * chunk costs nothing and saves everyone else the download.
 */

export default function NewsArchive({
  items,
  colour,
  onOpen,
  onTicker,
}: {
  items: NewsItem[]
  colour: string
  onOpen: (n: NewsItem) => void
  onTicker: () => void
}) {
  /**
   * Year, then month.
   *
   * A flat list is a wall, and months alone become one as soon as there are
   * more than a dozen. Year is how anyone actually navigates a back catalogue —
   * "sometime in 2025" is a real thought; "the fourteenth month back" is not.
   */
  const years = useMemo(() => {
    const byYear = new Map<string, Map<string, NewsItem[]>>()
    for (const n of items) {
      const y = n.date.slice(0, 4)
      const m = n.date.slice(0, 7)
      if (!byYear.has(y)) byYear.set(y, new Map())
      const months = byYear.get(y)!
      if (!months.has(m)) months.set(m, [])
      months.get(m)!.push(n)
    }
    return [...byYear.entries()]
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([year, months]) => ({
        year,
        count: [...months.values()].reduce((t, l) => t + l.length, 0),
        months: [...months.entries()].sort((a, b) => b[0].localeCompare(a[0])),
      }))
  }, [items])

  // Newest year and newest month open; everything else closed.
  const [openYears, setOpenYears] = useState<Set<string>>(
    () => new Set(years.length ? [years[0].year] : []),
  )
  const [openMonths, setOpenMonths] = useState<Set<string>>(
    () => new Set(years[0]?.months.length ? [years[0].months[0][0]] : []),
  )

  const monthLabel = (key: string) =>
    new Date(key + '-01').toLocaleDateString('en-GB', { month: 'long' })

  const allYearsOpen = years.length > 0 && years.every((y) => openYears.has(y.year))

  const toggleSet =
    (set: (fn: (s: Set<string>) => Set<string>) => void) => (key: string) =>
      set((s) => {
        const n = new Set(s)
        n.has(key) ? n.delete(key) : n.add(key)
        return n
      })

  const toggleYear = toggleSet(setOpenYears)
  const toggleMonth = toggleSet(setOpenMonths)

  if (items.length === 0) {
    return (
      <p className="label" style={{ lineHeight: 1.6 }}>
        No headlines yet. The newsroom agent gathers them daily, validates each
        before publishing, and links it to the research behind it.
      </p>
    )
  }

  return (
    <div className="archive">
      <div className="archive__bar">
        <span className="label">
          {items.length} headline{items.length > 1 ? 's' : ''} · {years.length} year
          {years.length > 1 ? 's' : ''}
        </span>
        <span className="archive__actions">
          <button
            onClick={() =>
              setOpenYears(allYearsOpen ? new Set() : new Set(years.map((y) => y.year)))
            }
          >
            {allYearsOpen ? 'Collapse all' : 'Expand all'}
          </button>
          <button onClick={onTicker} title="Back to the rolling view">Rolling</button>
        </span>
      </div>

      {years.map(({ year, count, months }) => {
        const yOpen = openYears.has(year)
        return (
          <section key={year} className="archive__year" data-open={yOpen || undefined}>
            <button
              className="archive__head archive__head--year"
              aria-expanded={yOpen}
              onClick={() => toggleYear(year)}
            >
              <span className="archive__caret">{yOpen ? '▾' : '▸'}</span>
              {year}
              <em>{count}</em>
            </button>

            {yOpen &&
              months.map(([key, list]) => {
                const mOpen = openMonths.has(key)
                return (
                  <section key={key} className="archive__month" data-open={mOpen || undefined}>
                    <button
                      className="archive__head"
                      aria-expanded={mOpen}
                      onClick={() => toggleMonth(key)}
                    >
                      <span className="archive__caret">{mOpen ? '▾' : '▸'}</span>
                      {monthLabel(key)}
                      <em>{list.length}</em>
                    </button>

                    {mOpen && (
                      <ul className="archive__list">
                        {list.map((n) => (
                          <li key={n.id} data-sig={n.significance}>
                            <button onClick={() => onOpen(n)}>
                              <span className="archive__date">{n.date.slice(8)}</span>
                              <span className="archive__headline">{n.headline}</span>
                              <span className="archive__meta">
                                {n.significance === 'headline' && (
                                  <em style={{ color: colour }}>headline · </em>
                                )}
                                {n.validation?.status}
                                {n.establishedBy?.length
                                  ? ` · ${n.establishedBy.length} linked`
                                  : ''}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                )
              })}
          </section>
        )
      })}
    </div>
  )
}
