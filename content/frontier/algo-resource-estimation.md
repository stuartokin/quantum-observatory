---
schema: frontier/v1
id: algo-resource-estimation
title: Cryptanalytic resource estimation
summary: 'Estimates of the quantum resources needed to break RSA-2048 and ECC-256. The 2025 leading estimate is under one million noisy physical qubits for RSA-2048, down from 20 million in 2019 — a twenty-fold reduction driven by algorithmic advances alone.'
plain: 'Resource estimation asks how powerful a quantum computer needs to be before it can break the encryption protecting the internet. The answer has dropped sharply in recent years — not because anyone built a bigger machine, but because researchers found smarter algorithms. In May 2025, Craig Gidney at Google Quantum AI showed that a quantum computer with fewer than one million noisy physical qubits could factor a 2048-bit RSA key in under a week, assuming 0.1% gate error rates and 1-microsecond surface code cycles. The previous best estimate from 2019 required 20 million qubits for the same task. Separately, a French research team at Inria showed in 2026 that breaking ECC-256 needs only about 1,193 logical qubits using a new space-efficient algorithm. These are theoretical resource estimates — no machine exists that could run either circuit — but the gap between current hardware and the required machine has narrowed substantially on the algorithmic side.'
pillar: quantum
readiness: demonstrated
constellation: algorithms
cluster: cryptanalysis
actors:
  - 'Google Quantum AI'
  - 'Craig Gidney'
  - 'Clémence Chevignard'
  - 'André Schrottenloher'
  - 'Inria / Univ Rennes'
country:
  - US
  - FR
metrics:
  - name: Physical qubits to factor RSA-2048
    value: '<1000000'
    unit: physical qubits
    note: 'Gidney 2025. Assumes 0.1% gate error, 1 µs surface code cycle, 10 µs reaction time, nearest-neighbour 2D grid. Runtime under one week.'
  - name: Reduction vs 2019 estimate
    value: '20'
    unit: 'times fewer qubits'
    note: 'Prior Gidney+Ekerå 2019 estimate was 20 million qubits in 8 hours under same physical assumptions.'
  - name: Logical qubits for ECC-256
    value: '1193'
    unit: logical qubits
    note: 'Chevignard/Fouque/Schrottenloher EUROCRYPT 2026 (ePrint 2026/280). Width-optimised; high gate count.'
links:
  - to: crqc
    relation: evidence-for
  - to: algo-shor
    relation: enables
  - to: qec-surface-code
    relation: depends-on
priority: P0
qdayImpact: 2
qdayReasoning: 'Gidney 2025 reduces the physical-qubit threshold for breaking RSA-2048 from 20 million to under one million — a twenty-fold reduction achieved by algorithmic improvements alone (approximate residue arithmetic, yoked surface codes, efficient magic-state distillation). No hardware changed. This compresses the hardware gap between demonstrated machines and cryptographically relevant capability. It does not move Q-Day directly — the gap is still multiple orders of magnitude in error rate and qubit quality — but it makes risk models calibrated to the 2019 figure significantly too conservative. Impact +2 rather than +3 because the machine remains far from existence.'
horizon: 2
novelty: 'Twenty-fold reduction in physical-qubit requirement for RSA-2048 attack via algorithmic advances alone'
evidence:
  claim: 'Gidney (Google Quantum AI, arXiv:2505.15917, May 2025) estimates that a 2048-bit RSA integer can be factored in under one week by a quantum computer with fewer than one million noisy qubits, under the same assumptions as Gidney+Ekerå 2019 (0.1% gate error, 1 µs surface code cycle, 10 µs reaction time, nearest-neighbour 2D grid). The twenty-fold qubit reduction comes from approximate residue arithmetic, yoked surface code storage, and reduced magic-state distillation overhead. Chevignard, Fouque, and Schrottenloher (EUROCRYPT 2026, ePrint 2026/280) separately estimate ECC-256 requires 1,193 logical qubits. Both are preprint or conference results; independent replication of the full resource counts has not been published.'
  verified: '2026-08-08'
  level: E3
  sources:
    - url: https://arxiv.org/abs/2505.15917
      role: preprint
      title: 'How to factor 2048 bit RSA integers with less than a million noisy qubits'
      publisher: arXiv
      date: '2025-05-21'
      identifier: 'arXiv:2505.15917'
      doi: 10.48550/arXiv.2505.15917
      accessed: '2026-08-08'
      note: 'Craig Gidney, Google Quantum AI. Not peer-reviewed as of access date. CC BY 4.0.'
    - url: https://eprint.iacr.org/2026/280
      role: corroborating
      title: 'Reducing the Number of Qubits in Quantum Discrete Logarithms on Elliptic Curves'
      publisher: 'IACR ePrint / EUROCRYPT 2026'
      date: '2026-03-01'
      identifier: 'ePrint 2026/280'
      accessed: '2026-08-08'
      note: 'Chevignard, Fouque, Schrottenloher (Inria/Univ Rennes). Peer-reviewed at EUROCRYPT 2026. ECC-256 at 1193 logical qubits.'
confidence: high
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agentMergedOn: '2026-08-08'
  agent: sourcer
  note: 'restored after an accidental bulk confirmation'
---

Gidney (Google Quantum AI, May 2025) showed that the physical-qubit cost of breaking RSA-2048 is under one million — twenty times lower than the 2019 benchmark — through algorithmic improvements requiring no new hardware. Chevignard et al. (EUROCRYPT 2026) extended the same approach to ECC-256, reaching 1,193 logical qubits. Both results are theoretical estimates; no machine capable of running these circuits exists.
