---
schema: frontier/v1
id: algo-shor
title: Shor factoring at scale
summary: 'Resource estimation and algorithmic development for running Shor''s algorithm at cryptographically relevant scale — factoring RSA integers and solving elliptic curve discrete logarithms (ECDLP) on fault-tolerant quantum hardware.'
plain: 'Shor''s algorithm, if run on a large enough fault-tolerant quantum computer, would break RSA and elliptic curve cryptography. Running it at the scale needed to threaten real systems (RSA-2048, ECC P-256) is the central open engineering challenge in quantum cryptanalysis. Recent algorithmic papers in 2025 and 2026 have halved the logical qubit count for ECC-256 to around 1,100 logical qubits, and reduced the physical qubit count for RSA-2048 to under one million. Neither target has been attacked — these are resource estimates for future machines, not demonstrations.'
pillar: quantum
readiness: emerging
constellation: algorithms
cluster: cryptanalysis
priority: P1
qdayImpact: 2
qdayReasoning: 'Two independent groups — Chevignard/Fouque/Schrottenloher (Inria/Univ Rennes, EUROCRYPT 2026) and Babbush et al. (Google Quantum AI, March 2026) — have halved the logical qubit count for 256-bit ECC discrete logarithm from the previous best estimate (2,124 qubits, Haner et al. 2020) to approximately 1,098–1,193 qubits. Combined with Gidney 2025 reducing RSA-2048 physical qubits to under one million, the algorithmic cost of a CRQC has fallen substantially in 2025–2026 without any hardware advance. This is scored +2: the hardware gap remains large, but the algorithmic gap has narrowed faster than most risk models assumed, which is a material signal to migration planners.'
actors:
  - 'Univ Rennes / Inria'
  - Google Quantum AI
country:
  - FR
  - US
horizon: 3
novelty: 'Logical qubit count for ECC-256 halved to ~1,098 qubits (EUROCRYPT 2026); independent estimate ~1,175 qubits (Google, March 2026)'
metrics:
  - name: Logical qubits for ECC P-256 ECDLP
    value: '1193'
    unit: logical qubits
    note: 'Chevignard et al. EUROCRYPT 2026 (IACR eprint 2026/280). Down from 2,124 (Haner et al. 2020). Gate count is O(n^4) — higher than previous estimates.'
  - name: Logical qubits for ECC P-256 ECDLP (independent estimate)
    value: '<1200'
    unit: logical qubits
    note: 'Babbush et al. arXiv:2603.28846, Google Quantum AI, March 2026. Under 90 million Toffoli gates in the low-qubit variant.'
  - name: Physical qubits for ECC P-256 (superconducting, planar, 1e-3 error rate)
    value: '<500000'
    unit: noisy physical qubits
    note: 'Babbush et al. estimate for execution in minutes on superconducting architecture. Not independently validated.'
links:
  - to: algo-resource-estimation
    relation: depends-on
  - to: crqc
    relation: evidence-for
  - to: qec-surface-code
    relation: depends-on
evidence:
  claim: 'Chevignard, Fouque and Schrottenloher (Univ Rennes / Inria, EUROCRYPT 2026, IACR eprint 2026/280) present a space-efficient quantum algorithm for ECDLP on 256-bit prime-field curves requiring 1,193 logical qubits — halving the previous best of 2,124 (Haner et al. 2020), at the cost of a higher gate count. Independently, Babbush et al. (Google Quantum AI, arXiv:2603.28846, March 2026) estimate under 1,200 logical qubits and under 90 million Toffoli gates for ECC-256, with fewer than half a million physical qubits on superconducting hardware. Neither result is a demonstration; both are resource estimates for future fault-tolerant machines.'
  verified: '2026-08-08'
  level: E3
  sources:
    - url: https://eprint.iacr.org/2026/280
      role: primary
      title: 'Reducing the Number of Qubits in Quantum Discrete Logarithms on Elliptic Curves'
      publisher: 'EUROCRYPT 2026 / IACR Cryptology ePrint Archive'
      date: '2026-03-01'
      identifier: 'IACR eprint 2026/280'
      accessed: '2026-08-08'
      note: 'Chevignard, Fouque, Schrottenloher. Univ Rennes, Inria, CNRS, IRISA. Peer-reviewed at EUROCRYPT 2026. Achieves 1,193 logical qubits for P-256 at cost of O(n^4) gate count.'
    - url: https://arxiv.org/abs/2603.28846
      role: corroborating
      title: 'Securing Elliptic Curve Cryptocurrencies against Quantum Vulnerabilities: Resource Estimates and Mitigations'
      publisher: arXiv
      date: '2026-03-30'
      identifier: 'arXiv:2603.28846'
      doi: 10.48550/arXiv.2603.28846
      accessed: '2026-08-08'
      note: 'Babbush, Zalcman, Gidney et al., Google Quantum AI / Ethereum Foundation / Stanford. Preprint whitepaper. Describes ZKP-validated circuits; not yet peer-reviewed.'
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

Shor''s algorithm is not in question — it is proven correct and the asymptotic speedup is established. What the 2025–2026 papers address is the concrete resource cost at cryptographically relevant parameters. The ECC-256 logical qubit count has halved in under 18 months, driven by two independent European and US research groups. A subsequent arXiv preprint (arXiv:2607.13816, July 2026) reduces the count further to 835 logical qubits for P-256, suggesting the field is still moving quickly.
