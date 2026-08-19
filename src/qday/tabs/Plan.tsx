import { useMemo } from 'react'
import { milestones } from '../../content/milestones'
import { frontierById } from '../../content/frontier'
import { useNow } from '../countdown'

/**
 * PLAN — the dated obligations, and how long is left on each.
 *
 * Every date here is a content file in `content/milestones/` with its own
 * source. That matters more than it sounds: for one release these lived as
 * constants in the application, honest only because the file said so at the
 * top. A deadline the board asserts and cannot cite is the same failure as an
 * unsourced item, and this board draws those hollow.
 */

const dateFmt = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

export function Plan() {
  const now = useNow(60_000)

  const grouped = useMemo(() => {
    const by = new Map<string, typeof milestones>()
    for (const m of milestones) {
      const list = by.get(m.jurisdiction)
      if (list) list.push(m)
      else by.set(m.jurisdiction, [m])
    }
    return [...by.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  }, [])

  if (milestones.length === 0) {
    return (
      <div className="qd-pending">
        <p className="qd-pending__flag">Nothing to show</p>
        <h2>Plan</h2>
        <p className="qd-pending__blurb">
          No milestones on the board. This page renders <code>content/milestones/</code>,
          which is empty.
        </p>
      </div>
    )
  }

  return (
    <div className="qd-plan">
      <p className="qd-trends__lede">
        Dated obligations, each with the source that set it. A deadline in the past is
        never marked met by arithmetic — the board records whether it was actually met,
        because a date passing and an obligation being discharged are different facts.
      </p>

      {grouped.map(([jurisdiction, list]) => (
        <section className="qd-plan__group" key={jurisdiction}>
          <h3>{jurisdiction}</h3>
          <ol className="qd-plan__list">
            {list.map((m) => {
              const due = new Date(`${m.date}T23:59:59Z`).getTime()
              const days = Math.ceil((due - now.getTime()) / 864e5)
              const past = days < 0
              return (
                <li key={m.id} data-status={m.status}>
                  <div className="qd-plan__when">
                    <span className="qd-plan__date">{dateFmt(m.date)}</span>
                    <span className="qd-plan__left">
                      {m.status === 'met'
                        ? 'met'
                        : past
                          ? `${Math.abs(days).toLocaleString('en-GB')} days ago`
                          : `${days.toLocaleString('en-GB')} days left`}
                    </span>
                  </div>
                  <div className="qd-plan__body">
                    <p className="qd-plan__title">
                      {m.title}
                      <span className="qd-plan__authority">{m.authority}</span>
                    </p>
                    <p className="qd-plan__what">{m.what}</p>
                    {m.plain && <p className="qd-plan__plain">{m.plain}</p>}
                    <p className="qd-plan__meta">
                      <a href={m.source.url} target="_blank" rel="noreferrer">
                        {m.source.title ?? m.source.publisher ?? 'source'} ↗
                      </a>
                      {m.about && m.about.length > 0 && (
                        <>
                          {' · bears on '}
                          {m.about
                            .map((id) => frontierById.get(id)?.title ?? id)
                            .join(', ')}
                        </>
                      )}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </section>
      ))}
    </div>
  )
}
