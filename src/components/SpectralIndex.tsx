import { PILLAR_ORDER, PILLAR_SPECTRUM } from '../worlds/types'
import { useSite } from '../store/useSite'

const MIN = 420
const MAX = 670

/**
 * Lines sit at true wavelength. Captions are nudged apart, because materials
 * (486nm) and quantum (501nm) are only 15nm apart and their labels collide.
 * Each caption is coloured to match its line, so attribution survives the nudge.
 */
function captionPositions(ideal: number[], gap = 17, lo = 9, hi = 91): number[] {
  const out = [...ideal]
  for (let i = 1; i < out.length; i++) out[i] = Math.max(out[i], out[i - 1] + gap)
  out[out.length - 1] = Math.min(out[out.length - 1], hi)
  for (let i = out.length - 2; i >= 0; i--) out[i] = Math.min(out[i], out[i + 1] - gap)
  out[0] = Math.max(out[0], lo)
  for (let i = 1; i < out.length; i++) out[i] = Math.max(out[i], out[i - 1] + gap)
  return out
}

export function SpectralIndex({ compact = false }: { compact?: boolean }) {
  const active = useSite((s) => s.pillars)
  const toggle = useSite((s) => s.togglePillar)
  const anyActive = active.length > 0

  const ideal = PILLAR_ORDER.map((p) => ((PILLAR_SPECTRUM[p].nm - MIN) / (MAX - MIN)) * 100)
  const captions = captionPositions(ideal)

  return (
    <div
      className="spectral-index"
      role="group"
      aria-label="Filter by pillar"
      style={compact ? { height: 44 } : undefined}
    >
      {PILLAR_ORDER.map((p, i) => {
        const { colour, line } = PILLAR_SPECTRUM[p]
        const on = active.includes(p)
        return (
          <button
            key={p}
            className="line"
            style={{ left: `calc(${ideal[i]}% - 1.5px)`, color: colour }}
            data-dimmed={anyActive && !on}
            aria-pressed={on}
            aria-label={`${p}, ${line} nanometres`}
            title={`${p} — ${line} nm`}
            onClick={() => toggle(p)}
          />
        )
      })}

      {!compact &&
        PILLAR_ORDER.map((p, i) => (
          <span
            key={`c-${p}`}
            className="caption"
            style={{ left: `${captions[i]}%`, color: PILLAR_SPECTRUM[p].colour }}
            data-dimmed={anyActive && !active.includes(p)}
          >
            {p}
          </span>
        ))}
    </div>
  )
}
