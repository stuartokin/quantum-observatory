---
schema: frontier/v1
id: algo-shor
title: Shor factoring at scale
summary: 'Shor''s algorithm breaks RSA and ECC in polynomial time on a fault-tolerant quantum computer. Published resource estimates (2021-2026) define the hardware threshold; experimental demonstrations remain limited to trivial problem sizes.'
plain: 'Shor''s algorithm, published in 1994, can factor large integers and solve the discrete logarithm problem exponentially faster than any known classical method. On a sufficiently powerful quantum computer it would break RSA, elliptic-curve cryptography, and Diffie-Hellman key exchange — the foundations of most internet security. The catch is the hardware requirement. Peer-reviewed estimates put the physical qubit count for breaking RSA-2048 at roughly 20 million (2021 baseline), revised down to under one million in 2025. Experimental demonstrations of Shor have factored only trivially small numbers (15, 21) on physical-qubit processors with no error correction. The gap between demonstrated and required scale is large; the algorithm''s cryptographic relevance depends entirely on fault-tolerant hardware that does not yet exist at the necessary scale.'
pillar: quantum
readiness: emerging
constellation: algorithms
cluster: cryptanalysis
actors:
  - Google Quantum AI
  - KTH Royal Institute of Technology
country:
  - US
  - SE
metrics:
  - name: Physical qubits for RSA-2048 (2021 peer-reviewed baseline)
    value: '20000000'
    unit: noisy physical qubits
    note: 'Gidney+Eker\u00e5, Quantum 5, 433 (2021). 0.1% gate error rate, 1 us surface code cycle, nearest-neighbour grid, 8-hour runtime.'
  - name: Physical qubits for RSA-2048 (2025 preprint revised estimate)
    value: '<1000000'
    unit: noisy physical qubits
    note: 'Gidney arXiv:2505.15917 (2025). Same physical assumptions. Runtime under one week. Reduction from approximate residue arithmetic and yoked surface codes.'
links:
  - to: algo-resource-estimation
    relation: depends-on
  - to: crqc
    relation: evidence-for
  - to: qec-surface-code
    relation: depends-on
  - to: qec-magic-state-distillation
    relation: depends-on
evidence:
  claim: 'Gidney and Eker\u00e5 (2021, Quantum 5, 433) provide the peer-reviewed baseline resource estimate: RSA-2048 factoring requires approximately 20 million noisy physical qubits in 8 hours, assuming a nearest-neighbour superconducting grid at 0.1% physical gate error rate with surface code error correction. This remains the most-cited published estimate. A 2025 preprint (Gidney, arXiv:2505.15917) reduces this to under one million qubits under identical physical assumptions. Large-scale experimental demonstration of Shor''s algorithm on cryptographically relevant integers has not been achieved on any platform.'
  verified: '2026-08-08'
  level: E3
  sources:
    - url: https://quantum-journal.org/papers/q-2021-04-15-433/
      role: primary
      title: 'How to factor 2048 bit RSA integers in 8 hours using 20 million noisy qubits'
      publisher: Quantum
      date: '2021-04-15'
      identifier: 'Quantum 5, 433 (2021)'
      doi: 10.22331/q-2021-04-15-433
      accessed: '2026-08-08'
      note: 'Gidney and Eker\u00e5. Peer-reviewed. The authoritative baseline resource estimate. E4-quality source for the 20-million-qubit figure.'
    - url: https://arxiv.org/abs/2505.15917
      role: preprint
      title: 'How to factor 2048 bit RSA integers with less than a million noisy qubits'
      publisher: arXiv
      date: '2025-05-21'
      identifier: 'arXiv:2505.15917 [quant-ph]'
      doi: 10.48550/arXiv.2505.15917
      accessed: '2026-08-08'
      note: 'Gidney, Google Quantum AI. Revises baseline downward by over 20x using approximate residue arithmetic and yoked surface codes. Preprint, not yet peer-reviewed.'
confidence: high
status: published
priority: P1
qdayImpact: 1
qdayReasoning: 'Shor''s algorithm is the core mechanism by which Q-Day would occur. The item itself does not move Q-Day — it is the algorithm description and resource estimation, not a hardware achievement. The qdayImpact of +1 reflects that progress in this item (improving resource estimates) is a necessary precondition for Q-Day but not sufficient without hardware at scale. The 2025 revision of the qubit estimate (see algo-resource-estimation) is where the impact properly sits.'
horizon: 2
novelty: incremental
origin: agent
added: '2026-08-08'
review:
  state: reviewed
  by: human
  'on': '2026-08-08'
  agentMergedOn: '2026-08-08'
  agent: sourcer
---

Shor''s algorithm (1994) solves integer factorisation and the discrete logarithm problem in polynomial quantum time, breaking RSA, ECC, and Diffie-Hellman key exchange on any sufficiently large fault-tolerant quantum computer. The peer-reviewed baseline resource estimate (Gidney+Ekerå, *Quantum* 5, 433, 2021) puts the requirement at approximately 20 million noisy physical qubits to factor RSA-2048 in 8 hours, under realistic superconducting hardware assumptions. A 2025 preprint from Google Quantum AI (Gidney, arXiv:2505.15917) revises this to under one million qubits — a 20-fold reduction from algorithmic improvements alone. Experimental demonstrations of Shor's algorithm remain limited to factoring small numbers (15, 21) without error correction; the algorithm has not been run on cryptographically relevant inputs on any platform.
