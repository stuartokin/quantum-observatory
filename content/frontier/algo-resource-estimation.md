---
schema: frontier/v1
id: algo-resource-estimation
title: Cryptanalytic resource estimation
summary: 'Theoretical estimates of the quantum resources needed to break RSA and ECC at cryptographic scale, tracking algorithmic improvements over time.'
plain: 'Resource estimation asks: how large a quantum computer would actually be needed to crack today''s encryption? Researchers calculate the number of physical qubits and runtime required. The best 2025 estimate (Gidney, Google) puts RSA-2048 factoring within reach of under one million noisy qubits in under a week — down from 20 million qubits in 2021. These are theoretical calculations, not hardware demonstrations.'
pillar: quantum
constellation: algorithms
readiness: demonstrated
cluster: cryptanalysis
actors:
  - 'Google Quantum AI'
  - 'Iceberg Quantum'
country:
  - US
  - AU
horizon: 2
novelty: major reduction in estimated qubit requirements
priority: P1
qdayImpact: 2
qdayReasoning: 'Algorithmic resource estimates for RSA-2048 factoring have fallen by 95% between 2021 and 2025 (from 20 million to under 1 million noisy qubits) without any change in hardware assumptions. The Pinnacle architecture (2026) reduces this further to ~100,000 qubits using qLDPC codes. Falling estimates accelerate the plausible timeline for a CRQC, though no hardware capable of these computations yet exists. The impact is on threat forecasting, not on cryptographic capability today.'
metrics:
  - name: 'Physical qubits for RSA-2048 (Gidney 2021)'
    value: '20000000'
    unit: 'qubits'
    note: 'Peer-reviewed 2021 baseline; 8-hour runtime'
  - name: 'Physical qubits for RSA-2048 (Gidney 2025)'
    value: '<1000000'
    unit: 'qubits'
    note: 'Preprint; less than 1 week runtime; same hardware assumptions'
  - name: 'Physical qubits for RSA-2048 (Pinnacle 2026)'
    value: '<100000'
    unit: 'qubits'
    note: 'Preprint; uses qLDPC codes; Iceberg Quantum'
links:
  - to: algo-shor
    relation: evidence-for
  - to: crqc
    relation: evidence-for
  - to: qec-qldpc-bivariate-bicycle
    relation: depends-on
evidence:
  claim: 'Gidney (2025) estimates RSA-2048 can be factored in under a week by a quantum computer with fewer than one million noisy qubits, reducing the 2021 estimate of 20 million qubits by over 95%. Improvements derive from approximate residue arithmetic, yoked surface codes, and magic state cultivation. Webster et al. (2026) reduce this further to ~100,000 qubits using qLDPC codes.'
  level: E3
  verified: '2026-08-08'
  sources:
    - url: https://arxiv.org/abs/2505.15917
      role: primary
      title: 'How to factor 2048 bit RSA integers with less than a million noisy qubits'
      publisher: arXiv
      date: '2025-05-21'
      identifier: 'arXiv:2505.15917'
      doi: 10.48550/arXiv.2505.15917
      accessed: '2026-08-08'
      note: 'Preprint only as of verification date; Craig Gidney, Google Quantum AI'
    - url: https://doi.org/10.22331/q-2021-04-15-433
      role: corroborating
      title: 'How to factor 2048 bit RSA integers in 8 hours using 20 million noisy qubits'
      publisher: Quantum
      date: '2021-04-15'
      identifier: 'Quantum 5, 433 (2021)'
      doi: 10.22331/q-2021-04-15-433
      accessed: '2026-08-08'
      note: 'Peer-reviewed 2021 baseline by Gidney and Ekerå; superseded quantitatively by 2025 preprint'
    - url: https://arxiv.org/abs/2602.11457
      role: corroborating
      title: 'The Pinnacle Architecture: Reducing the cost of breaking RSA-2048 to 100 000 physical qubits using quantum LDPC codes'
      publisher: arXiv
      date: '2026-02-12'
      identifier: 'arXiv:2602.11457'
      doi: 10.48550/arXiv.2602.11457
      accessed: '2026-08-08'
      note: 'Preprint; Iceberg Quantum; extends Gidney 2025 with qLDPC codes'
confidence: high
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

Resource estimation is the discipline of calculating how many qubits and how much time a fault-tolerant quantum computer would actually need to break real-world encryption. The numbers have fallen sharply. In 2021, Gidney and Ekerå estimated RSA-2048 required 20 million noisy qubits running for 8 hours. By May 2025, Gidney revised this to under 1 million qubits in under a week, exploiting three algorithmic improvements. In February 2026, the Pinnacle Architecture from Iceberg Quantum pushed the estimate to under 100,000 qubits using quantum LDPC codes. None of these are hardware demonstrations — they are calculations of what would be needed.
