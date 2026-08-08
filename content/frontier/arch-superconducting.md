---
schema: frontier/v1
id: arch-superconducting
title: Superconducting transmon
summary: Lithographed circuits at millikelvin. Fast gates and mature fabrication; needs large dilution refrigerators.
plain: Tiny circuits printed on a chip and chilled to a hundredth of a degree above absolute zero, where they behave as artificial atoms. Fast, and built with adapted semiconductor manufacturing, which is why it scaled quickest. The cost is enormous refrigeration and a dense forest of wiring.
pillar: quantum
constellation: architectures
readiness: adopted
actors: [IBM, Google Quantum AI]
metrics:
  - name: Nighthawk qubits
    value: '120'
    note: with 218 tunable couplers
  - name: Willow distance
    value: '7'
    note: 101 qubits, below threshold
evidence:
  claim: Google demonstrated below-threshold surface code memory on a superconducting processor; IBM has shipped successive transmon processors on a published roadmap.
  verified: '2026-08-04'
  level: E4
  sources:
    - url: https://www.nature.com/articles/s41586-024-08449-y
      role: primary
      publisher: Nature
      date: '2025'
      identifier: Nature 638, 920–926 (2025)
links:
  - to: arch-trapped-ion
    relation: competes-with
  - to: qec-below-threshold-surface-code
    relation: evidence-for
  - to: enable-cryogenics
    relation: depends-on
  - to: enable-control-electronics
    relation: depends-on
priority: P1
horizon: 1
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
