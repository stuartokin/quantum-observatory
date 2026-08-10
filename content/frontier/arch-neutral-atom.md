---
schema: frontier/v1
id: arch-neutral-atom
title: Neutral atom arrays
summary: Optical tweezers holding atoms that can be physically rearranged mid-computation.
plain: Uncharged atoms held in place by focused laser beams, like marbles in invisible tweezers. Because the tweezers can be moved during a calculation, the wiring diagram is rearranged on the fly rather than fixed at manufacture. That flexibility is a real advantage for error correction.
pillar: quantum
constellation: architectures
readiness: experimental
actors: [QuEra Computing, Harvard University, MIT]
metrics:
  - name: Code distances
    value: 'd=3, d=5'
    note: colour code, Gemini
evidence:
  claim: Logical magic state distillation was demonstrated on a neutral-atom processor using dynamically reconfigurable atom transport.
  verified: '2026-08-04'
  level: E4
  sources:
    - url: https://www.nature.com/articles/s41586-025-09367-3
      role: primary
      title: Experimental demonstration of logical magic state distillation
      publisher: Nature
      date: '2025-07-14'
      identifier: Nature 645, 620–625 (2025)
      doi: 10.1038/s41586-025-09367-3
      accessed: '2026-08-10'
      note: 'QuEra / Harvard / MIT. First demonstration of magic state distillation entirely on logical qubits. 5-to-1 protocol on d=3 and d=5 colour-code qubits on QuEra Gemini neutral-atom platform.'
links:
  - to: qec-magic-state-distillation
    relation: evidence-for
  - to: arch-trapped-ion
    relation: competes-with
priority: P1
horizon: 2
country: [US]
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-08'
  reviewedOn: '2026-08-10'
  note: 'Nature 645, 620-625 confirmed via Nature website cross-check. DOI 10.1038/s41586-025-09367-3 verified. 5-to-1 magic state distillation on d=3 and d=5 colour-code qubits on QuEra Gemini, Harvard/MIT/QuEra team confirmed. E4 correct for peer-reviewed experimental result. No independent replication by a separate institution found. Bluvstein et al. Nature 649, 39-46 (Jan 2026) — fault-tolerant neutral-atom architecture for universal quantum computation using up to 448 atoms — confirmed as published and flagged for Scout as a significant update to this entry or potential new item.'
confidence: high
status: published
added: '2026-08-04'
origin: human
---
