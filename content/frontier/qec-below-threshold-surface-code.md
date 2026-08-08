---
schema: frontier/v1
id: qec-below-threshold-surface-code
title: Below-threshold surface code memory
summary: The first superconducting demonstration that adding qubits makes a logical qubit better rather than worse.
plain: 'Qubits are extremely error-prone, so you combine many physical ones into a single reliable "logical" one. For years, adding more physical qubits added more errors than it fixed. This was the first clear demonstration of the opposite: build it bigger and it gets better. That crossing point is what makes a useful quantum computer conceivable at all.'
pillar: quantum
constellation: error-correction
readiness: demonstrated
actors: [Google Quantum AI]
metrics:
  - name: Error suppression factor
    value: '2.14'
    note: Λ, per two units of code distance, ±0.02
  - name: Code distance
    value: '7'
    note: 101 physical qubits
  - name: Logical error per cycle
    value: '0.143'
    note: per cent, ±0.003
  - name: Beyond break-even
    value: '2.4x'
    note: versus best physical qubit lifetime, ±0.3
evidence:
  claim: Two below-threshold surface code memories were demonstrated on the Willow processor; the distance-7 code showed logical error suppressed by Λ = 2.14 per two units of distance, exceeding the best physical qubit lifetime by a factor of 2.4.
  verified: '2026-08-04'
  level: E4
  sources:
    - url: https://www.nature.com/articles/s41586-024-08449-y
      role: primary
      title: Quantum error correction below the surface code threshold
      publisher: Nature
      date: '2025'
      identifier: Nature 638, 920–926 (2025)
    - url: https://arxiv.org/pdf/2408.13687
      role: preprint
      publisher: arXiv
      date: '2024-08-27'
      identifier: 'arXiv:2408.13687'
links:
  - to: qec-qldpc-bivariate-bicycle
    relation: competes-with
  - to: qec-magic-state-distillation
    relation: enables
  - to: qec-surface-code
    relation: evidence-for
  - to: arch-superconducting
    relation: depends-on
  - to: qec-logical-fidelity
    relation: evidence-for
priority: P0
horizon: 2
qdayImpact: 2
qdayReasoning: 'Crossing the error-correction threshold on a scalable platform is a precondition for any cryptanalytic machine. Moves engineering feasibility, not the date directly.'
country: [US]
review:
  state: reviewed
  by: human
  'on': '2026-08-07'
confidence: high
status: published
added: '2026-08-04'
origin: human
---
