---
schema: frontier/v1
id: qec-magic-state-distillation
title: Magic state distillation on logical qubits
summary: Non-Clifford gates produced entirely inside the protected layer. Completes the toolkit for running whole programs on logical qubits rather than raw hardware.
pillar: quantum
constellation: error-correction
readiness: experimental
actors: [QuEra Computing, Harvard University, MIT]
metrics:
  - name: Protocol
    value: 5-to-1 distillation
  - name: Code distances
    value: 'd=3 and d=5'
    note: colour-code logical qubits
  - name: Platform
    value: neutral atom
    note: QuEra Gemini
evidence:
  claim: The first experimental demonstration of magic state distillation performed entirely on logical qubits, using distance-3 and distance-5 colour-code qubits on a neutral-atom processor, with output fidelity exceeding that of any input state.
  verified: '2026-08-04'
  sources:
    - url: https://www.nature.com/articles/s41586-025-09367-3
      role: primary
      title: Experimental demonstration of logical magic state distillation
      publisher: Nature
      date: '2025-07-14'
      identifier: Nature 645, 620–625 (2025)
links:
  - to: qec-below-threshold-surface-code
    relation: depends-on
confidence: high
status: published
added: '2026-08-04'
origin: human
---
