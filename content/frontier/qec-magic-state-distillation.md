---
schema: frontier/v1
id: qec-magic-state-distillation
title: Magic state distillation on logical qubits
summary: Non-Clifford gates produced entirely inside the protected layer.
plain: Error correction protects a limited set of operations easily; one crucial type has to be produced separately by a purification process. Until this, that purification was done on raw, unprotected hardware — a weak link in an otherwise protected chain. Doing it entirely inside the protected layer completes the toolkit for running whole programs on reliable qubits.
pillar: quantum
constellation: error-correction
readiness: experimental
actors: [QuEra Computing, Harvard University, MIT]
metrics:
  - name: Protocol
    value: '5-to-1 distillation'
  - name: Code distances
    value: 'd=3 and d=5'
    note: colour-code logical qubits
  - name: Platform
    value: 'neutral atom'
    note: QuEra Gemini
evidence:
  claim: The first experimental demonstration of magic state distillation performed entirely on logical qubits, using distance-3 and distance-5 colour-code qubits on a neutral-atom processor, with output fidelity exceeding that of any input state.
  verified: '2026-08-04'
  level: E4
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
  - to: arch-neutral-atom
    relation: depends-on
  - to: qec-colour-code
    relation: depends-on
moved:
  from: emerging
  'on': '2026-07-14'
priority: P1
horizon: 2
qdayImpact: 1
qdayReasoning: 'Completes the logical gate set, removing one of the remaining unknowns in fault-tolerant operation.'
country: [US]
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-08'
  reviewedOn: '2026-08-10'
  note: 'Nature 645, 620-625 (July 2025) confirmed via Nature website and multiple secondary sources. QuEra Gemini, Harvard/MIT team. 5-to-1 distillation on d=3 and d=5 colour-code qubits confirmed. Output fidelity exceeds any input confirmed. E4 correct for peer-reviewed experimental result. No changes made.'
confidence: high
status: published
added: '2026-08-04'
origin: human
---
