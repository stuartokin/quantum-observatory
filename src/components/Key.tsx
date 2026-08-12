import { useEffect, useRef } from 'react'
import { CONSTELLATIONS, CONSTELLATION_LABEL } from '../renderers/board/tower'
import {
  constellationColour,
  SUPERGROUPS,
  SUPERGROUP_LABEL,
  supergroupOf,
  supergroupColour,
} from '../constellationPalette'
import {
  ACTOR_TYPES,
  ACTOR_TYPE_LABEL,
  glyphForType,
  drawBody,
  type ActorType,
} from '../renderers/board/glyphs'

/**
 * THE KEY.
 *
 * Drawn on the canvas until now, which meant it was clipped by whichever frame
 * it belonged to, could not be moved, and appeared twice when two plots were
 * open. It explains the same grammar for every view, so it is one window.
 *
 * Colour is the constellation. Shape is the kind of organisation. Size and
 * brightness are importance. That is the whole vocabulary.
 */

function GlyphSwatch({ type, colour }: { type: ActorType; colour: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    c.width = 18 * dpr
    c.height = 18 * dpr
    const g = c.getContext('2d')!
    g.setTransform(dpr, 0, 0, dpr, 0, 0)
    g.clearRect(0, 0, 18, 18)
    drawBody(g, glyphForType(type), 9, 9, 4.4, colour, true)
  }, [type, colour])
  return <canvas ref={ref} style={{ width: 18, height: 18, flex: '0 0 auto' }} aria-hidden="true" />
}

export default function Key({
  activeCons,
  colour,
  hovered,
}: {
  activeCons: string[]
  colour: string
  /** The organisation under the pointer, named against its own type. */
  hovered?: { name: string; type: ActorType } | null
}) {
  const shown = CONSTELLATIONS.filter((c) => activeCons.includes(c))
  const groups = SUPERGROUPS.filter((g) => shown.some((c) => supergroupOf(c) === g))

  return (
    <div className="key">
      <span className="label">Colour — what field</span>
      <ul className="key__list">
        {groups.map((g) => (
          <li key={g} className="key__group">
            <span className="key__dot" style={{ background: supergroupColour(g) }} />
            <strong>{SUPERGROUP_LABEL[g]}</strong>
            <ul>
              {shown
                .filter((c) => supergroupOf(c) === g)
                .map((c) => (
                  <li key={c}>
                    <span className="key__dot" style={{ background: constellationColour(c) }} />
                    {CONSTELLATION_LABEL[c]}
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>

      <span className="label">Shape — who did the work</span>
      <ul className="key__list key__list--actors">
        {ACTOR_TYPES.map((t) => {
          const named = hovered?.type === t ? hovered.name : null
          return (
            <li key={t} data-named={named ? '' : undefined}>
              <GlyphSwatch type={t} colour={named ? colour : '#A9B6C9'} />
              <span style={named ? { color: 'var(--ink)' } : undefined}>
                {ACTOR_TYPE_LABEL[t]}
                {named && <em> ({named})</em>}
              </span>
            </li>
          )
        })}
      </ul>

      <p className="filter-group__note">
        Size and brightness carry importance. A dashed amber ring means nobody
        has read that entry. A small dim dot is an item the current zoom has
        demoted — still there, still clickable.
      </p>
    </div>
  )
}
