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
  claim: Logical magic state distillation was demonstrated on a neutral-atom processor using dynamically reconfigurable atom transport. A separate paper (Bluvstein et al., Nature 649, 39-46, Jan 2026) demonstrated all key elements of a universal fault-tolerant quantum processing architecture using up to 448 atoms, including surface code below-threshold performance, transversal gates, lattice surgery, and transversal teleportation.
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
    - url: https://www.nature.com/articles/s41586-025-09848-5
      role: corroborating
      title: A fault-tolerant neutral-atom architecture for universal quantum computation
      publisher: Nature
      date: '2026-01-01'
      identifier: Nature 649, 39-46 (2026)
      doi: 10.1038/s41586-025-09848-5
      accessed: '2026-08-11'
      note: 'Bluvstein, Geim, Li, Evered et al.; Harvard / MIT / Caltech / Maryland. Reconfigurable arrays of up to 448 atoms. Surface code 2.14(13)x below-threshold, transversal gates, lattice surgery, transversal teleportation with 3D [[15,1,3]] codes. Publisher correction: Nature 650, E3 (2026) — figure label in Fig 3d corrected from "corrected decoding" to "correlated decoding" only; results unchanged. Confirmed via published correction at nature.com (DOI 10.1038/s41586-026-10108-3) and Weizmann repository.'
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
  reviewedOn: '2026-08-11'
  note: 'Bluvstein Nature 649, 39-46 re-confirmed this run via nature.com abstract (2.14(13)x below-threshold confirmed), Weizmann repository. Publisher correction Nature 650, E3 (DOI 10.1038/s41586-026-10108-3) confirmed via PubMed and nature.com: label change in Fig 3d from "corrected decoding" to "correlated decoding" only — results unchanged. E4 correct. No changes to entry.'
confidence: high
status: published
added: '2026-08-04'
origin: human
---
