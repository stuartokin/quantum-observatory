---
schema: frontier/v1
id: qec-logical-qubit-scaling
title: Logical qubit scaling
summary: 'Demonstrating that encoded quantum algorithms can outperform their unencoded counterparts across many logical qubits simultaneously, using high-rate QEC codes on real hardware.'
plain: 'Building one error-corrected logical qubit is hard. Building dozens and running a computation that performs better than the same computation run without error correction — "beyond break-even" — is much harder. In February 2026, Quantinuum demonstrated this across 48 to 94 logical qubits simultaneously on their 98-qubit Helios trapped-ion processor, using high-rate iceberg codes that encode many logical qubits from relatively few physical ones. The encoded algorithms outperformed their unencoded counterparts on benchmarks including GHZ state preparation and 3D XY-model spin dynamics — the first time a significant register of logical qubits has shown this property.'
pillar: quantum
readiness: experimental
constellation: error-correction
cluster: codes
actors:
  - Quantinuum
country:
  - US
  - UK
metrics:
  - name: Logical qubits in demonstration
    value: '48 to 94'
    unit: logical qubits
    note: 'Range across different benchmark experiments; iceberg QED and concatenated iceberg QEC codes'
  - name: Physical qubits
    value: '98'
    unit: physical qubits
    note: 'Quantinuum Helios trapped-ion processor'
links:
  - to: arch-trapped-ion
    relation: depends-on
  - to: qec-modular-architecture
    relation: enables
evidence:
  claim: 'Dasu et al. (Quantinuum, February 2026) demonstrate beyond-break-even performance across 48 to 94 logical qubits simultaneously on a 98-qubit trapped-ion processor using high-rate iceberg QEC codes, with encoded algorithms outperforming unencoded counterparts on GHZ state preparation, cycle benchmarking, and 3D XY-model dynamics.'
  verified: '2026-08-08'
  level: E3
  sources:
    - url: https://arxiv.org/abs/2602.22211
      role: preprint
      title: Computing with many encoded logical qubits beyond break-even
      publisher: arXiv
      date: '2026-02-25'
      identifier: arXiv:2602.22211
      doi: 10.48550/arXiv.2602.22211
      accessed: '2026-08-08'
      note: 'Quantinuum Helios 98-qubit trapped-ion processor. Preprint; not yet peer-reviewed at time of verification.'
confidence: high
status: published
priority: P1
qdayImpact: 0
qdayReasoning: ''
horizon: 2
novelty: 'largest logical qubit register demonstrated beyond break-even'
origin: agent
added: '2026-08-08'
moved:
  from: experimental
  on: '2026-08-08'
review:
  state: reviewed
  by: human
  'on': '2026-08-08'
  agentMergedOn: '2026-08-08'
  agent: sourcer
---

The path to a fault-tolerant quantum computer requires not just one good logical qubit but many of them running in concert. Quantinuum''s February 2026 preprint is the most significant step yet: 48 to 94 logical qubits on a single 98-qubit device, all performing better encoded than unencoded. The iceberg codes they use are high-rate — they pack many logical qubits into relatively few physical qubits, which is essential for scaling. This is a preprint and has not yet been replicated by an independent group, but the experimental detail is extensive and the result sits comfortably at E3.
