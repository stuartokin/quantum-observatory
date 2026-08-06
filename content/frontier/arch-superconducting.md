---
schema: frontier/v1
id: arch-superconducting
title: Superconducting transmon
summary: Lithographed circuits at millikelvin. Fast gates and mature fabrication; needs large dilution refrigerators and heavy error-correction overhead.
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
  sources:
    - url: https://www.nature.com/articles/s41586-024-08449-y
      role: primary
links:
  - to: arch-trapped-ion
    relation: competes-with
  - to: qec-below-threshold-surface-code
    relation: evidence-for
confidence: high
status: published
added: 2026-08-04
origin: human
---
