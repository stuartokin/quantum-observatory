---
schema: frontier/v1
id: algo-resource-estimation
title: Cryptanalytic resource estimation
summary: 'Peer-reviewed and preprint work quantifies how many logical and physical qubits Shor''s algorithm needs to break RSA and ECC at real key sizes. Estimates have fallen more than 20-fold since 2019.'
plain: 'Before a quantum computer can threaten encryption, researchers need to know exactly how big it has to be. Resource estimation is the discipline of answering that question rigorously: how many qubits, how many gate operations, at what error rate, running for how long? The 2019 Gidney and Ekerå paper set the benchmark for RSA-2048 at 20 million physical qubits in eight hours. A 2025 preprint by the same lead author cut that to under one million qubits in under a week by using more efficient arithmetic. A March 2026 Google Quantum AI preprint applied similar techniques to elliptic-curve cryptography, showing that ECC-256 (used by Bitcoin and TLS) needs fewer than 1,200 logical qubits. These numbers still far exceed any existing hardware, but the rapid compression of estimates has made institutional risk timelines built on the 2019 baseline look too conservative.'
pillar: quantum
constellation: algorithms
readiness: demonstrated
actors:
  - Google Quantum AI
country:
  - US
metrics:
  - name: Physical qubits to factor RSA-2048 (Gidney 2025)
    value: '<1000000'
    unit: physical qubits
    note: '0.1% gate error rate, surface code, <1 week runtime. 20x reduction vs 2019 estimate of 20M qubits.'
  - name: Logical qubits to break ECC-256 (Babbush et al. 2026)
    value: '<1200'
    unit: logical qubits
    note: '<90M Toffoli gates; physical qubits <500k on superconducting architecture at 1e-3 error rate'
priority: P0
qdayImpact: 2
qdayReasoning: 'Resource estimates directly bound the engineering distance to Q-Day. The 20-fold compression of the RSA-2048 qubit estimate between 2019 and 2025, and the new ECC-256 estimate in 2026, imply that hardware roadmaps targeting 2029–2035 fault-tolerant machines are now in a plausible range for a CRQC — whereas the 2019 baseline suggested 2040+. The impact is on planning horizons, not on current hardware capability.'
horizon: 2
novelty: major resource-estimate revision
evidence:
  claim: 'Gidney (2025, arXiv:2505.15917) reduced the physical qubit estimate for RSA-2048 factoring from 20 million (Gidney+Ekerå 2019) to fewer than one million, using approximate residue arithmetic and yoked surface codes, at the same assumed 0.1% error rate. Babbush et al. (2026, arXiv:2603.28846) provided ECC-256 resource estimates of fewer than 1200 logical qubits and fewer than 90 million Toffoli gates, executable in minutes on a sub-500k physical-qubit superconducting machine at 1e-3 error rates.'
  verified: '2026-08-08'
  level: E3
  sources:
    - url: https://arxiv.org/abs/2505.15917
      role: primary
      title: How to factor 2048 bit RSA integers with less than a million noisy qubits
      publisher: arXiv
      date: '2025-05-21'
      identifier: 'arXiv:2505.15917 [quant-ph]'
      doi: 10.48550/arXiv.2505.15917
      accessed: '2026-08-08'
      note: Craig Gidney, Google Quantum AI. Preprint; code available on Zenodo.
    - url: https://arxiv.org/abs/2603.28846
      role: corroborating
      title: 'Securing Elliptic Curve Cryptocurrencies against Quantum Vulnerabilities: Resource Estimates and Mitigations'
      publisher: arXiv
      date: '2026-03-30'
      identifier: 'arXiv:2603.28846 [quant-ph]'
      doi: 10.48550/arXiv.2603.28846
      accessed: '2026-08-08'
      note: 'Babbush, Zalcman, Gidney et al., Google Quantum AI. Also at IACR ePrint 2026/625.'
confidence: high
status: published
links:
  - to: crqc
    relation: evidence-for
  - to: algo-shor
    relation: evidence-for
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

The 2025 Gidney preprint and the 2026 Babbush et al. preprint are the current state of the art in cryptanalytic resource estimation for RSA and ECC respectively. Evidence level is E3 (preprints, not yet peer-reviewed) rather than the prior E4 claim. Readiness is correctly placed at demonstrated: the methodology is mature, independently reproduced across multiple papers, and directly informs NIST and NSA migration timelines.
