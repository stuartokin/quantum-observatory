import { useMemo } from 'react'
import { frontier } from '../../content/frontier'
import { allNews } from '../../content/newsroom'
import type { Forecast } from '../../content/forecast'
import { derive } from '../derive'

/**
 * STACK — what a cryptographically relevant machine still needs.
 *
 * **There are no percentages here, and that is the whole design decision.**
 *
 * The research prototype gave each component a completion figure — logical
 * qubits 8%, error correction 34% — and summed them to "15% of the way to a
 * CRQC". Those numbers are editorial. Nothing in the literature says a machine
 * is 8% of the way to having enough logical qubits, and 96 against 835 is not
 * 11% of anything meaningful: the remaining work is not linear in qubit count.
 *
 * What the board can say honestly is the multiple. You need roughly nine times
 * more logical qubits than anyone has demonstrated, and the number moved by an
 * order of magnitude last year because the requirement fell rather than
 * because the hardware rose. That is more useful than a percentage and it is
 * true, which the percentage was not.
 */

interface Component {
  name: string
  what: string
  /** The board's best demonstrated figure, where there is one. */
  best?: string
  bestFrom?: string
  /** The published requirement, where there is one. */
  need?: string
  needFrom?: string
  /** Demonstrated-to-required multiple, only where both are real numbers. */
  multiple?: number
  note?: string
}

export function Stack({ forecast }: { forecast?: Forecast }) {
  const d = useMemo(() => derive(frontier, forecast, allNews), [forecast])

  const components: Component[] = useMemo(() => {
    const out: Component[] = []

    for (const gap of d.capability.gaps) {
      const mult = gap.required.value.n / gap.demonstrated.value.n
      out.push({
        name: gap.kind === 'logical' ? 'Logical qubits' : 'Physical qubits',
        what:
          gap.kind === 'logical'
            ? 'Error-corrected qubits that stay coherent long enough to run a cryptanalytic circuit end to end. The figure that actually gates a break.'
            : 'Raw devices on the chip or in the trap. They matter only through the logical qubits they can be assembled into.',
        best: `${gap.demonstrated.value.raw} — ${gap.demonstrated.metricName}`,
        bestFrom: gap.demonstrated.itemId,
        need: `${gap.required.value.raw} for ${gap.required.target}`,
        needFrom: gap.required.itemId,
        multiple: mult,
        note:
          gap.kind === 'logical'
            ? 'Both ends are the most favourable reading available — the largest demonstration against the lowest published requirement.'
            : undefined,
      })
    }

    /**
     * The rest are read straight off the board rather than scored. Where the
     * literature publishes no target — nobody says what gate fidelity a CRQC
     * needs, because it depends on the code — the row says so instead of
     * inventing one.
     */
    const pick = (id: string, match: RegExp) => {
      const item = frontier.find((i) => i.id === id)
      const m = item?.metrics?.find((x) => match.test(x.name))
      return m && item ? { text: `${m.value}${m.unit ? ` ${m.unit}` : ''} — ${m.name}`, id: item.id } : null
    }

    const threshold = pick('qec-below-threshold-surface-code', /suppression/i)
    if (threshold)
      out.push({
        name: 'Below threshold',
        what: 'Adding more physical qubits has to reduce the logical error rate rather than compound it. Without this, scale makes things worse.',
        best: threshold.text,
        bestFrom: threshold.id,
        note: 'Demonstrated on more than one platform. This is the one component that is not a matter of degree — it is crossed or it is not, and it has been crossed.',
      })

    const fidelity = pick('arch-trapped-ion', /two-qubit gate fidelity/i)
    if (fidelity)
      out.push({
        name: 'Gate fidelity',
        what: 'How often a two-qubit operation is right. Every logical qubit is built out of many of these, so the error compounds.',
        best: fidelity.text,
        bestFrom: fidelity.id,
        note: 'No published target: the fidelity a break needs depends on the code and the runtime, so a required figure would be a guess.',
      })

    const decoding = frontier.find((i) => i.id === 'qec-realtime-decoding')
    if (decoding)
      out.push({
        name: 'Real-time decoding',
        what: 'Errors must be identified and corrected faster than they accumulate, for the whole length of the computation.',
        best: `readiness: ${decoding.readiness}`,
        bestFrom: decoding.id,
        note: 'Tracked on the board as a readiness level rather than a number, because the useful measure is whether it keeps up, not by how much.',
      })

    const magic = frontier.find((i) => i.id === 'qec-magic-state-distillation')
    if (magic)
      out.push({
        name: 'Magic state distillation',
        what: 'Surface codes cannot do the gates a cryptanalytic circuit needs directly; those gates are supplied by distilling special states, and the distillation dominates the qubit budget.',
        best: `readiness: ${magic.readiness}`,
        bestFrom: magic.id,
        note: 'Most of the qubits in every RSA-2048 estimate go here rather than into the algorithm itself.',
      })

    return out
  }, [d])

  return (
    <div className="qd-stack">
      <p className="qd-trends__lede">
        What a machine capable of breaking deployed cryptography still needs, component by
        component, read off the board. <b>Deliberately without percentages</b> — the
        remaining work is not linear in qubit count, so a completion figure would be a
        number nobody could defend. Where a multiple is real, it is shown; where the
        literature publishes no target, the row says so.
      </p>

      <ol className="qd-stack__list">
        {components.map((c) => (
          <li key={c.name}>
            <div className="qd-stack__head">
              <h3>{c.name}</h3>
              {c.multiple !== undefined && (
                <span className="qd-stack__mult">
                  {c.multiple >= 10
                    ? `${Math.round(c.multiple).toLocaleString('en-GB')}×`
                    : `${c.multiple.toFixed(1)}×`}{' '}
                  more needed
                </span>
              )}
            </div>
            <p className="qd-stack__what">{c.what}</p>
            <dl className="qd-stack__figs">
              {c.best && (
                <div>
                  <dt>Best demonstrated</dt>
                  <dd>
                    {c.best} <i>{c.bestFrom}</i>
                  </dd>
                </div>
              )}
              {c.need && (
                <div>
                  <dt>Published requirement</dt>
                  <dd>
                    {c.need} <i>{c.needFrom}</i>
                  </dd>
                </div>
              )}
            </dl>
            {c.note && <p className="qd-stack__note">{c.note}</p>}
          </li>
        ))}
      </ol>

      <p className="qd-note">
        The two multiples above move for two different reasons, and only one of them is
        hardware. The logical-qubit requirement fell from 1,193 to 835 in four months
        because somebody found a better algorithm — no machine changed. That is why this
        page shows the requirement's own source date next to every figure.
      </p>
    </div>
  )
}
