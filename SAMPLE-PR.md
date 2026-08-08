# scout: 4 proposal(s)

*This is an illustrative example, not a real run. It shows the shape of what
lands in your inbox on a Monday morning.*

---

Four proposals this cycle, weighted toward `enabling`, which is the thinnest
constellation on the board. Two are hardware results with peer-reviewed sources,
one is a preprint I would not rate above E3, and one is a negative finding on
classical simulation that arguably matters more than the other three.

Nothing found this cycle changes Q-Day materially. One item scores −1.

I looked at eleven candidates and rejected seven, listed below.

## Checklist

- **What has changed since the last scan?** Two peer-reviewed results in
  cryogenic control, one preprint on photonic interconnects, and a classical
  simulation result narrowing an advantage claim from 2024.
- **Does anything alter the likely timing of Q-Day?** No. The control
  electronics work removes a scaling bottleneck but does not move resource
  estimates.
- **Has any bottleneck become easier — or harder?** Easier: wiring density.
  Harder: nothing new, though the classical simulation result weakens one
  advantage claim.
- **Is anything theoretical moving toward demonstration?** Photonic interconnect
  proposals now have a first experimental result, though only at two nodes.
- **Are lab results becoming prototypes?** Cryogenic CMOS is being described in
  engineering rather than physics terms for the first time.
- **New architectures outperforming established ones?** Nothing this cycle.
- **Architectures improving faster or slower than expected?** No clear signal in
  one week. This question needs the Cartographer's trend view, not mine.
- **Anything outside the industry accelerating it?** Yes — the control
  electronics work comes from a semiconductor group, not a quantum lab.
- **Real applications demonstrating advantage?** No. `applications` remains
  empty and I found nothing sourceable enough to open it with.
- **Sensing, comms or networking progressing independently?** Nothing new.
- **Roadmap changes?** None found.
- **Forecasts looking outdated?** No, though see the classical simulation item.

## Considered and rejected

- **A vendor announcement of a 1,000-qubit processor** — physical qubit count
  with no error-correction figures. Qubit count alone predicts nothing, and this
  is the exact error the board must not make.
- **A widely syndicated "quantum breakthrough" story** — traced back to a press
  release with no paper behind it. Three outlets carrying it is one finding, not
  three.
- **A funding announcement, €120m** — money, not a technical result.
- **A magnetometry paper** — good work, but already covered by
  `sense-nv-magnetometry`. Not a readiness change.
- **A room-temperature claim** — the phrase matched my search vocabulary, but
  the paper is about a component, not a qubit. Would have been misleading.
- **A conference abstract on modular scaling** — no accessible full text.
  Dropped rather than cite an abstract.
- **A second paper on real-time decoding** — same group as the existing source.
  A follow-up by the same team is not independent replication.

## Files (4)

- `content/frontier/_inbox/cryogenic-cmos-control.md` — E4, P1, demonstrated
- `content/frontier/_inbox/photonic-interconnect-two-node.md` — E3, P2, experimental
- `content/frontier/_inbox/classical-simulation-narrowing.md` — E4, P1, −1 Q-Day
- `content/frontier/_inbox/wiring-density-multiplexing.md` — E4, P2, demonstrated

## Note for the reviewer

`classical-simulation-narrowing` is the one I would look at first. It is a
negative finding — a classical algorithm reproducing results previously
presented as quantum advantage — and it links to `algo-random-circuit-sampling`
as `competes-with`. If you accept it, the existing item's framing probably needs
revisiting too. I have not touched that file.

I could not open `applications`. Everything I found was either a vendor case
study or a simulation with no benchmark against a classical method. I would
rather leave the constellation empty than open it badly.

---

*Proposed by the scout agent. Nothing here is published until merged.*
