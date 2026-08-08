---
schema: frontier/v1
id: algo-shor
title: 'Shor factoring at scale'
summary: 'Shor''s algorithm breaks RSA and ECC on a sufficiently powerful quantum computer. No machine has run it at cryptographic scale. As of 2025–2026, resource estimates place the requirement below one million physical qubits for RSA-2048 and at 1,193 logical qubits for ECC-256.'
plain: 'Shor''s algorithm, proposed in 1994, would break RSA and elliptic-curve cryptography on a large enough quantum computer. The machine required has been getting progressively smaller in specification: in 2019 it needed 20 million noisy physical qubits to factor RSA-2048; by 2025 that estimate was below one million, a twenty-fold reduction driven by algorithmic improvements. A 2026 paper from French researchers at Inria reduced the logical-qubit requirement for ECC-256 to 1,193. Neither circuit has been run on any real machine. Current systems operate with a few dozen logical qubits at the required error rates — far short of what these attacks need. The gap is narrowing on the algorithm side but remains very large on the hardware side.'
pillar: quantum
readiness: emerging
constellation: algorithms
cluster: cryptanalysis
actors:
  - 'Craig Gidney'
  - 'Google Quantum AI'
  - 'Clémence Chevignard'
  - 'Pierre-Alain Fouque'
  - 'André Schrottenloher'
  - 'Inria / Univ Rennes'
country:
  - US
  - FR
metrics:
  - name: 'Physical qubits for RSA-2048'
    value: '<1000000'
    unit: physical qubits
    note: 'Gidney arXiv:2505.15917 (May 2025). Assumes 0.1% gate error, 1 µs surface code cycle.'
  - name: 'Logical qubits for ECC-256'
    value: '1193'
    unit: logical qubits
    note: 'Chevignard et al., EUROCRYPT 2026, ePrint 2026/280. Width-optimised; high gate count.'
links:
  - to: algo-resource-estimation
    relation: depends-on
  - to: crqc
    relation: evidence-for
  - to: qec-surface-code
    relation: depends-on
priority: P1
qdayImpact: 1
qdayReasoning: 'Shor''s algorithm is the theoretical basis for Q-Day but has been known since 1994; it does not itself move the date. What matters is resource estimation showing how powerful a machine must be. The 2025–2026 wave of estimates (Gidney RSA, Chevignard ECC) narrows the hardware gap on the algorithm side alone. Impact +1 rather than +2 because these are estimates, not demonstrations; the hardware gap is still multiple orders of magnitude in error rate, qubit count, and sustained runtime.'
horizon: 2
novelty: 'Resource ceiling for Shor at cryptographic scale now below one million physical qubits (RSA) and ~1200 logical qubits (ECC)'
evidence:
  claim: 'No quantum computer has run Shor''s algorithm at cryptographic scale. The resource frontier as of 2025–2026: Gidney (arXiv:2505.15917, Google Quantum AI, May 2025) estimates RSA-2048 factoring requires fewer than one million noisy physical qubits; Chevignard, Fouque, and Schrottenloher (EUROCRYPT 2026, ePrint 2026/280) estimate ECC-256 requires 1,193 logical qubits with a space-efficient algorithm variant. Both are theoretical estimates. No independent replication of the full resource counts has been published.'
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
      note: 'Craig Gidney, Google Quantum AI. RSA-2048 resource estimate under surface-code assumptions. Not peer-reviewed.'
    - url: https://eprint.iacr.org/2026/280
      role: corroborating
      title: 'Reducing the Number of Qubits in Quantum Discrete Logarithms on Elliptic Curves'
      publisher: 'IACR ePrint / EUROCRYPT 2026'
      date: '2026-03-01'
      identifier: 'ePrint 2026/280'
      accessed: '2026-08-08'
      note: 'Chevignard, Fouque, Schrottenloher (Inria/Univ Rennes). ECC-256 at 1193 logical qubits. Peer-reviewed at EUROCRYPT 2026.'
confidence: medium
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

Shor''s algorithm breaks RSA and ECC in theory; the hardware to run it at cryptographic scale does not exist. Resource estimates as of 2025–2026 place the bar below one million physical qubits for RSA-2048 and at roughly 1,200 logical qubits for ECC-256 — substantially lower than five years ago, driven by algorithmic rather than hardware advances.
