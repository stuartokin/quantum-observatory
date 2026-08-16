# The queue

Focus instructions waiting to run. The steward writes them here after reading
the open issues; the agents drain them on their next run.

**Nothing here has run yet.** Delete any entry you disagree with — this file is
the window between an instruction being proposed and it being executed, and it
exists so that window is a real one rather than a formality.

## How an entry is read

Each entry is a `## ` heading, three metadata lines, and a fenced block holding
the exact instruction. The runner parses this file, so the shape matters:

```
## <a short description>
agent: scout
added: 2026-08-14
source: issue #85

    /focus scout: the exact instruction, indented four spaces
    continuing across as many lines as it needs
```

- **agent** — which agent runs it. One of scout, sourcer, verifier, reviewer,
  newsroom.
- **added** — when it was queued. Entries older than 21 days are dropped rather
  than run: an instruction that has sat unexecuted for three weeks has probably
  been overtaken, and running it blind is worse than losing it.
- **source** — the issue it came from, so a result can be traced back to the
  question that prompted it.

An entry is removed by the run that executes it. If a run fails, the entry stays
and will be tried again.

## What is queued

## Confirm Lu et al. Science 391 — possible device-independent QKD from Pan group at USTC
agent: scout
added: 2026-08-16
source: issue #85

    /focus scout: confirm Lu et al., Science 391, 592–597 (2026) from the Pan group at USTC. The Nature News & Views commentary d41586-026-00804-5 cites this paper. Assess whether it is a device-independent QKD result over 100 km or similar. If confirmed, determine whether it updates comms-mdi-qkd or warrants a new communications item. Do not create a new item without confirming the journal record.

## Find arXiv or journal record for Algorithmiq QB-DMRG photodynamic therapy paper
agent: scout
added: 2026-08-16
source: issue #93

    /focus scout: search for an arXiv preprint or peer-reviewed journal version of the Algorithmiq photodynamic therapy paper on the QB-DMRG method, referenced in the Q4Bio program. A PDF exists at algorithmiq.fi/publications/Q4Bio_Perspective_Paper.pdf. Confirm whether an arXiv or journal record exists. If so, assess whether it warrants a separate applications item from app-hybrid-protein-simulation — the method (QB-DMRG) and domain (cancer drug photophysics vs protein-ligand binding) are distinct. Do not create a new item without a citable source.

## Confirm arXiv:2505.08424 — 200 mm wafer CMOS-compatible superconducting qubits with >200 µs T1
agent: sourcer
added: 2026-08-16
source: issue #74

    /focus sourcer: confirm arXiv:2505.08424 (May 2025) on 200 mm wafer CMOS-compatible superconducting qubit fabrication with >200 µs T1 and 99.7% Josephson junction yield. Verify authors, institution, key metrics, and whether a peer-reviewed journal version exists. If confirmed, assess whether it updates enable-fabrication (which covers imec 300 mm at 98.25% yield and >100 µs coherence) or warrants a separate note in the review field. Do not create a new item — attach findings as a source or update the existing enable-fabrication item.

## Confirm IBM large-scale cryo-CMOS system — Underwood et al. APS Global Physics Summit 2026
agent: scout
added: 2026-08-16
source: issue #74

    /focus scout: confirm the IBM large-scale cryo-CMOS architecture paper by Underwood et al. presented at APS Global Physics Summit 2026, described as a system-level cryo-CMOS demonstration with 16 independently programmable flux channels per ASIC for superconducting qubit control. Find the publication record — conference proceedings, arXiv, or journal. Confirm authors, institution, key metrics, and whether this is a new item or an update to enable-control-electronics. The existing enable-control-electronics item covers the 2024 single-qubit-pair PRX Quantum result; this appears to be a significantly more advanced system.

## Publish decision needed: three confirmed draft items — enable-cryo-cmos-qubit-control, enable-transmon-millisecond-coherence, qec-ftqc-neutral-atom
agent: sourcer
added: 2026-08-16
source: issue #74

    /focus sourcer: verify current state of enable-cryo-cmos-qubit-control, enable-transmon-millisecond-coherence, and qec-ftqc-neutral-atom. All three carry status: draft and have been agent-reviewed with sources confirmed across multiple passes. Check whether any field corrections are needed before a human publish decision. Report findings without changing status to published — that action requires a human.

## Verify app-quantum-materials-advantage against classical counter-paper arXiv:2608.13110
agent: verifier
added: 2026-08-16
source: issue #93

    /focus verifier: check app-quantum-materials-advantage against the classical counter-paper arXiv:2608.13110, which the item notes is already addressing the doped-Clifford claim in arXiv:2607.25941. Confirm whether arXiv:2608.13110 is accessible and whether its findings materially weaken the advantage claim in the item. If the classical counter-paper succeeds on the doped-Clifford circuit regime, the evidence level or confidence field may need downward correction. Do not raise any level or readiness — only apply downward corrections if warranted.
