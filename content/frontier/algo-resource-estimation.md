---
schema: frontier/v1
id: algo-resource-estimation
title: Cryptanalytic resource estimation
summary: 'Formal methods for estimating the physical and logical resources a fault-tolerant quantum computer would need to break real cryptographic targets — RSA, ECC, AES. Informs NIST security category definitions and migration urgency.'
plain: 'Before spending billions building a quantum computer to break encryption, you need to know exactly how big it has to be. Resource estimation answers that question — it works out the number of qubits, the number of operations, and the time required to crack specific cryptographic targets like RSA-2048 or AES-256. These estimates drive the NIST post-quantum security levels and tell policymakers whether Q-Day is plausible within a given window. The estimates have fallen steadily: the 2019 figure for cracking RSA-2048 was 20 million qubits; the 2025 figure is under one million.'
pillar: quantum
readiness: demonstrated
constellation: algorithms
actors:
  - 'Microsoft Research'
  - 'University of Oxford'
  - 'Royal Holloway University of London'
  - 'Google Quantum AI'
country:
  - UK
  - US
metrics:
  - name: 'AES-128 Grover key search quantum circuit T-gate count'
    value: '~2^86'
    note: 'From Jaques et al. EUROCRYPT 2020, depth-restricted model; sets NIST Category 1 baseline'
  - name: 'RSA-2048 physical qubit estimate (2025 best)'
    value: '<1000000'
    unit: physical qubits
    note: 'Gidney arXiv:2505.15917; 20× reduction from 2019 estimate of 20M qubits'
priority: P1
qdayImpact: 1
qdayReasoning: 'Resource estimation papers directly set the engineering target for CRQC development. Successive reductions in qubit estimates (from billions in 2012 to under 1M in 2025) make Q-Day more plausible within regulatory migration windows. Each reduction is itself evidence that algorithmic progress may continue to lower the bar, increasing urgency for PQC migration.'
horizon: 1
novelty: 'Systematic gate-level circuit design for cryptanalytic Grover oracles'
evidence:
  claim: 'Jaques, Naehrig, Roetteler and Virdia (EUROCRYPT 2020) designed concrete quantum circuits implementing Grover oracles for AES-128, AES-192, and AES-256 key search under depth restrictions, providing the gate counts that define NIST post-quantum security categories 1, 3, and 5. The 2025 Gidney preprint (arXiv:2505.15917) updated the RSA-2048 factoring estimate to fewer than one million physical qubits, a 20× reduction from the same author''s 2019 baseline of 20 million qubits.'
  level: E3
  verified: '2026-08-08'
  sources:
    - url: 'https://arxiv.org/abs/1910.01700'
      role: primary
      title: 'Implementing Grover oracles for quantum key search on AES and LowMC'
      publisher: 'Springer / EUROCRYPT 2020'
      date: '2020-05-10'
      identifier: 'EUROCRYPT 2020, LNCS 12106, pp. 280-310'
      doi: 10.1007/978-3-030-45724-2_10
      accessed: '2026-08-08'
      note: 'Peer-reviewed. Defines gate costs used in NIST PQC security category definitions.'
    - url: 'https://arxiv.org/abs/2505.15917'
      role: corroborating
      title: 'How to factor 2048 bit RSA integers with less than a million noisy qubits'
      publisher: 'arXiv'
      date: '2025-05-21'
      identifier: 'arXiv:2505.15917'
      accessed: '2026-08-08'
      note: 'Gidney 2025 preprint; most recent RSA-2048 resource estimate as of verification date.'
links:
  - to: algo-grover
    relation: depends-on
  - to: crqc
    relation: evidence-for
  - to: algo-shor
    relation: depends-on
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

Cryptanalytic resource estimation translates the theoretical threat of quantum algorithms into concrete engineering targets. For AES, the benchmark is Grover key search: Jaques et al. (EUROCRYPT 2020) designed depth-restricted quantum circuits for AES-128/192/256 that define the T-gate counts underpinning NIST's post-quantum security categories 1, 3, and 5 — still the operative baseline for PQC standardisation.

For RSA factoring, the Gidney-Ekerå 2019 estimate of 20 million physical qubits was the field benchmark until the May 2025 Gidney preprint reduced this to under one million by combining approximate residue arithmetic, yoked surface codes, and magic-state cultivation. This sequence of estimates — from billions of qubits in 2012 to under one million in 2025 — demonstrates that algorithmic progress is a material driver of Q-Day timelines, independent of hardware advances.
