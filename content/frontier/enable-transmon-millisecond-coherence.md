---
schema: frontier/v1
id: enable-transmon-millisecond-coherence
title: 'Millisecond coherence time for a superconducting transmon qubit'
summary: 'Tuokkola et al. (Nat Commun 2025, Aalto University) measured echo coherence reaching 1.06 ms and T1 up to 666 µs in a superconducting transmon — setting a new literature record and nearly doubling the prior maximum.'
plain: 'A qubit is only useful while it retains its quantum state. Superconducting transmon qubits lose their state through energy relaxation (the qubit flips spontaneously) and dephasing (the qubit loses phase information). Both have characteristic times; longer is better. This team at Aalto University in Finland measured an energy relaxation time of up to 666 microseconds and an echo dephasing time of up to 1,057 microseconds — the first to reach the millisecond range for dephasing in a transmon, surpassing all previous published records. The previous best dephasing time was around 600 microseconds. The chip was made using high-quality superconducting film from Finland''s national research infrastructure (VTT/Micronova). Longer coherence means more quantum operations before errors accumulate, and directly reduces the overhead needed for quantum error correction. The paper describes methods in enough detail to allow other laboratories to attempt replication.'
pillar: quantum
readiness: experimental
constellation: enabling
cluster: 'qubit coherence'
actors:
  - Aalto University
  - VTT Technical Research Centre of Finland
metrics:
  - name: 'Echo dephasing time T2 (maximum)'
    value: '1057'
    unit: 'µs'
    note: 'Uncertainty ±138 µs; median 541 µs. Exceeds all prior published values.'
  - name: 'Energy relaxation time T1 (maximum)'
    value: '666'
    unit: 'µs'
    note: 'Uncertainty ±33 µs; median 425 µs.'
  - name: 'Qubit frequency'
    value: '2.9'
    unit: 'GHz'
    note: ''
links:
  - to: arch-superconducting
    relation: enables
  - to: qec-surface-code
    relation: enables
  - to: qec-error-correction-threshold
    relation: enables
evidence:
  claim: 'Tuokkola et al. report a high-coherence transmon qubit with energy relaxation T1 up to 666(33) µs and echo dephasing time T2 up to 1057(138) µs, exceeding all values in the existing literature. Qubit frequency is 2.9 GHz. The paper describes fabrication methods using superconducting film supplied by VTT and the Micronova national cleanroom, and is written for reproducibility. The authors note that longer coherence directly reduces quantum error correction overhead by reducing the ratio of operation time to coherence time.'
  verified: '2026-08-11'
  level: E4
  sources:
    - url: 'https://www.nature.com/articles/s41467-025-61126-0'
      role: primary
      title: 'Methods to achieve near-millisecond energy relaxation and dephasing times for a superconducting transmon qubit'
      publisher: 'Nature Communications'
      date: '2025-07-08'
      identifier: 'Nat Commun 16, 5421 (2025)'
      doi: 10.1038/s41467-025-61126-0
      accessed: '2026-08-11'
      note: 'Open access. ArXiv preprint at arXiv:2407.18778 (2024).'
    - url: 'https://arxiv.org/abs/2407.18778'
      role: preprint
      title: 'Methods to achieve near-millisecond energy relaxation and dephasing times for a superconducting transmon qubit'
      publisher: arXiv
      date: '2024-07-26'
      identifier: 'arXiv:2407.18778'
      accessed: '2026-08-11'
      note: 'Preprint version; journal record at doi above.'
confidence: high
status: draft
priority: P2
qdayImpact: 0
qdayReasoning: 'Improved transmon coherence reduces quantum error correction overhead and enables longer circuits, but does not by itself change the resources needed to break RSA-2048 or elliptic-curve cryptography. The relevant constraint for cryptanalytic capability is logical qubit count and error rate under fault-tolerant operation at scale, not single-qubit coherence on an isolated device. Improved coherence is a necessary input to future progress but does not move the Q-Day estimate on its own.'
country:
  - FI
novelty: 'first transmon to reach millisecond-scale echo dephasing; record T1 and T2 in the published literature'
horizon: 2
added: '2026-08-11'
origin: agent
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-11'
---

## What happened

Physicists at Aalto University in Finland, using superconducting film from VTT and fabricated in the Micronova national research cleanroom, measured a transmon qubit with echo dephasing times up to 1,057 µs (median 541 µs) and energy relaxation times up to 666 µs (median 425 µs). These are the highest values published in the scientific literature, surpassing the previous maximum dephasing measurement of approximately 600 µs. The paper is written for reproducibility.

## Why it matters

Superconducting transmon qubits underpin the most advanced quantum processors in operation today, including those used for surface-code error correction demonstrations. Coherence time directly sets the budget for quantum operations before errors dominate: longer coherence means either more operations or lower error-correction overhead for the same circuit depth. A near-doubling of coherence time, if it generalises to multi-qubit production chips, would meaningfully reduce the physical qubit overhead needed for fault-tolerant algorithms.

## Previous state of the art

The previous published maximum echo coherence time for a transmon was approximately 600 µs. Typical research-grade devices sit in the 100-400 µs range. This result clears the 1 ms threshold for dephasing for the first time in the published literature.

## Limitations

The result is on a single carefully prepared qubit, not on a multi-qubit chip optimised for gate performance. Coupling qubits together introduces noise sources that typically reduce coherence by one to two orders of magnitude. Independent confirmation has not yet been reported; evidence level is E4 (peer-reviewed) but not E5 (independently replicated).

## What would change this assessment

Replication by an independent group, especially on a device integrated with other qubits, would raise this to E5. Demonstration of comparable coherence in a multi-qubit processor would support moving toward demonstrated readiness.
