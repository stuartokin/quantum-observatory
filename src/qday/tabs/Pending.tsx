import type { QDayTabDef } from '../route'

/**
 * A tab that does not exist yet, saying so.
 *
 * The alternative was to ship one tab and hide six, which would have been the
 * tidier demo and the less honest one. This board's whole argument is that
 * admitting a gap is worth more than papering it — an unsourced item is drawn
 * hollow rather than left off. A section with no evidence behind it gets the
 * same treatment: it is visibly here, visibly empty, and says what it is
 * waiting for.
 */
export function Pending({ def }: { def: QDayTabDef }) {
  return (
    <div className="qd-pending">
      <p className="qd-pending__flag">Not built yet</p>
      <h2>{def.label}</h2>
      <p className="qd-pending__blurb">{def.blurb}</p>
      <p className="qd-pending__where">
        The sequence, and what each section is waiting on, is in{' '}
        <code>QDAY-PLAN.md</code>.
      </p>
    </div>
  )
}
