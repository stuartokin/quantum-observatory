---
schema: frontier/v1
id: qec-logical-fidelity
title: Logical fidelity beyond physical
summary: 'Demonstrated that a surface-code logical qubit can outlive the best physical qubit on the same chip, passing the break-even point — a necessary condition for fault-tolerant quantum computing.'
plain: 'Quantum error correction only helps if the logical qubit formed from many physical qubits lasts longer than any individual physical qubit would on its own — otherwise the overhead is self-defeating. In early 2025 Google demonstrated this with a 101-physical-qubit distance-7 surface code on its Willow processor: the logical qubit survived 2.4 times longer than the best physical qubit on the chip, with an error rate of 0.143% per error-correction cycle. Crucially, making the code larger (going from distance-5 to distance-7) reduced the error rate by a factor of 2.14, confirming the system is operating below the fault-tolerance threshold. This break-even milestone is a necessary step toward machines large enough to run Shor-class algorithms.'
pillar: quantum
readiness: demonstrated
constellation: error-correction
cluster: logical-qubits
actors:
  - Google Quantum AI
country:
  - US
metrics:
  - name: logical lifetime vs best physical qubit
    value: '2.4'
    unit: 'x'
    note: '± 0.3, distance-7 surface code, 101 physical qubits, Willow processor'
  - name: logical error rate per cycle
    value: '0.143'
    unit: '%'
    note: '± 0.003%, distance-7 code'
  - name: error suppression factor Lambda
    value: '2.14'
    unit: 'per 2 distance steps'
    note: '± 0.02; confirms below-threshold operation'
priority: P0
qdayImpact: 2
qdayReasoning: 'Break-even logical fidelity is a required milestone on the path to fault-tolerant quantum computers capable of running Shor algorithm at cryptographic scale. Demonstrating it on a 101-qubit superconducting chip confirms that the physics works and shifts the remaining challenge to engineering scale. Scored +2 because it is a confirmed result at meaningful scale, but the jump from 101 physical qubits to the millions needed for RSA-2048 remains enormous.'
horizon: 2
novelty: major breakthrough
evidence:
  claim: 'Google Quantum AI (Nature 638, 2025): 101-qubit distance-7 surface code on Willow processor achieves 0.143% logical error per cycle, suppresses errors by factor Λ=2.14 per two code-distance steps, and exceeds the best physical qubit lifetime by 2.4×, confirming below-threshold operation and the break-even milestone.'
  verified: '2026-08-08'
  level: E4
  sources:
    - url: https://www.nature.com/articles/s41586-024-08449-y
      role: primary
      title: Quantum error correction below the surface code threshold
      publisher: Nature
      date: '2025-02-01'
      identifier: 'Nature 638, 920-926 (2025)'
      doi: 10.1038/s41586-024-08449-y
      accessed: '2026-08-11'
      note: 'Google Quantum AI and Collaborators; Willow superconducting processor. Λ=2.14±0.02, 0.143%±0.003% per cycle, 2.4±0.3× break-even all confirmed from paper.'
    - url: https://arxiv.org/abs/2408.13687
      role: preprint
      title: Quantum error correction below the surface code threshold
      publisher: arXiv
      date: '2024-08-27'
      identifier: arXiv:2408.13687
      accessed: '2026-08-08'
      note: 'Preprint version submitted August 2024'
links:
  - to: qec-below-threshold-surface-code
    relation: evidence-for
  - to: qec-surface-code
    relation: evidence-for
  - to: crqc
    relation: evidence-for
  - to: algo-shor
    relation: enables
confidence: high
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-08'
  reviewedOn: '2026-08-11'
  note: 'Nature 638, 920-926 confirmed in prior runs; Λ=2.14±0.02, 0.143%±0.003% per cycle, 2.4±0.3× break-even all confirmed. This item and qec-below-threshold-surface-code share the same primary source; neither is a duplicate — one covers below-threshold milestone, this covers break-even metric specifically. E4 correct. No changes made this run.'
---

Break-even logical fidelity — where the error-corrected logical qubit outlives the best physical qubit — is a foundational milestone for fault-tolerant quantum computing. Google''s 2025 Nature paper demonstrates this on the 105-qubit Willow superconducting processor using a distance-7 surface code spanning 101 physical qubits. The logical error rate of 0.143% per cycle halves when the code distance is increased from 5 to 7, confirming exponential suppression and below-threshold operation. Real-time decoding at distance 5 achieves 63 µs average latency across one million cycles. The result does not demonstrate logical gate operations or an algorithm — those remain future work.
