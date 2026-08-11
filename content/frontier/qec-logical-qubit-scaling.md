---
schema: frontier/v1
id: qec-logical-qubit-scaling
title: Logical qubit scaling
summary: 'Demonstrating that encoded quantum algorithms can outperform their unencoded counterparts across many logical qubits simultaneously, using high-rate QEC codes on real hardware.'
plain: 'Building one error-corrected logical qubit is hard. Building dozens and running a computation that performs better than the same computation run without error correction — "beyond break-even" — is much harder. In February 2026, Quantinuum demonstrated this across up to 94 error-detected or 48 error-corrected logical qubits on their 98-qubit Helios trapped-ion processor, using high-rate iceberg codes that encode many logical qubits from relatively few physical ones. The encoded algorithms outperformed their unencoded counterparts on benchmarks including GHZ state preparation and 3D XY-model spin dynamics — the first time a significant register of logical qubits has shown this property.'
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
  - name: Logical qubits in demonstration (error-corrected)
    value: '48'
    unit: logical qubits
    note: 'Concatenated iceberg QEC codes; 98-qubit Helios processor'
  - name: Logical qubits in demonstration (error-detected)
    value: '94'
    unit: logical qubits
    note: 'Iceberg QED codes; separate experiments from the 48-qubit QEC experiments'
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
  claim: 'Dasu et al. (Quantinuum, February 2026) demonstrate beyond-break-even performance on a 98-qubit trapped-ion processor using high-rate iceberg codes, with up to 94 error-detected logical qubits (iceberg QED codes) and up to 48 error-corrected logical qubits (concatenated iceberg QEC codes) in separate experiments. Encoded algorithms outperform unencoded counterparts on GHZ state preparation, cycle benchmarking, and 3D XY-model dynamics.'
  verified: '2026-08-11'
  level: E3
  sources:
    - url: https://arxiv.org/abs/2602.22211
      role: preprint
      title: Computing with many encoded logical qubits beyond break-even
      publisher: arXiv
      date: '2026-02-25'
      identifier: arXiv:2602.22211
      doi: 10.48550/arXiv.2602.22211
      accessed: '2026-08-11'
      note: 'Quantinuum Helios 98-qubit trapped-ion processor. Preprint; not yet peer-reviewed at time of verification. The 94 and 48 qubit results are in separate experiments using different code types.'
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
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-08'
  reviewedOn: '2026-08-11'
  note: 'arXiv:2602.22211 confirmed via multiple citations in recent arXiv papers (arch-trapped-ion item confirms this is the Dasu et al. Helios iceberg codes result). 48 error-corrected and 94 error-detected logical qubits in separate experiments confirmed. E3 correct — preprint, not peer-reviewed. No changes made.'
---

The path to a fault-tolerant quantum computer requires not just one good logical qubit but many of them running in concert. Quantinuum's February 2026 preprint is the most significant step yet: up to 48 error-corrected or 94 error-detected logical qubits on a single 98-qubit device, all performing better encoded than unencoded. The iceberg codes they use are high-rate — they pack many logical qubits into relatively few physical qubits, which is essential for scaling. This is a preprint and has not yet been replicated by an independent group, but the experimental detail is extensive and the result sits comfortably at E3.
