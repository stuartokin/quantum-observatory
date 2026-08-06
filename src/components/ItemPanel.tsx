import { useEffect } from 'react'
import { byId } from '../content/loader'
import { useSite } from '../store/useSite'
import { PILLAR_SPECTRUM } from '../worlds/types'

/**
 * App chrome, not world code — which is why it may read content directly.
 * Worlds still only ever see Placements.
 */
export function ItemPanel() {
  const selected = useSite((s) => s.selected)
  const select = useSite((s) => s.select)
  const item = selected ? byId.get(selected) : null

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') select(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [select])

  if (!item) return null

  const colour = PILLAR_SPECTRUM[item.pillars[0]].colour

  return (
    <aside className="item-panel" style={{ borderColor: colour }} role="dialog" aria-label={item.title}>
      <button className="item-panel__close" onClick={() => select(null)} aria-label="Close">×</button>

      <div className="meta">
        <span className="badge">{item.type}</span>
        {item.published && <span className="badge">{item.published}</span>}
        {item.pillars.map((p) => (
          <span key={p} className="badge" style={{ color: PILLAR_SPECTRUM[p].colour, borderColor: PILLAR_SPECTRUM[p].colour }}>
            {p}
          </span>
        ))}
      </div>

      <h3 style={{ marginTop: '0.6rem' }}>{item.title}</h3>
      {item.summary && <p>{item.summary}</p>}

      {item.url && (
        <a className="item-panel__open" href={item.url} target="_blank" rel="noopener noreferrer" style={{ borderColor: colour, color: colour }}>
          Open →
        </a>
      )}
    </aside>
  )
}
