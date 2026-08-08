---
schema: frontier/v1
id: algo-shor
title: Shor factoring at scale
summary: 'Shor''s algorithm factors large integers and solves discrete logarithms exponentially faster than classical methods, threatening RSA and ECC. A 2025 preprint by Google Quantum AI reduces the estimated physical qubit cost for factoring RSA-2048 to under one million.'
plain: 'Shor''s algorithm is the reason post-quantum cryptography exists. Run on a large enough quantum computer, it can crack the RSA and elliptic-curve encryption that protects most of the internet today. It has never been run at a scale that threatens real cryptography — current machines are thousands of times too small — but a 2025 estimate from Google Quantum AI shows the hardware barrier may be lower than previously thought: under one million physical qubits rather than 20 million, at the cost of running for about a week rather than eight hours.'
pillar: quantum
readiness: emerging
constellation: algorithms
actors:
  - 'Google Quantum AI'
country:
  - US
metrics:
  - name: 'Estimated physical qubits to factor RSA-2048'
    value: '<1000000'
    unit: qubits
    note: 'Assumes surface code, 0.1% gate error rate, 1 µs cycle time; runtime under one week'
  - name: 'Estimated runtime'
    value: '<7'
    unit: days
    note: 'Gidney 2025 estimate at <1M qubits; 2019 baseline was 8 hours at 20M qubits'
priority: P0
qdayImpact: 2
qdayReasoning: 'The 20× reduction in estimated qubit count from the 2025 Gidney preprint moves the CRQC bar from 20M to under 1M physical qubits. This does not change Q-Day imminence — current machines field hundreds of physical qubits with relevant error rates, not millions — but it updates the engineering target significantly and raises urgency for PQC migration by making the threshold more plausible within the 2030-2035 regulatory window.'
horizon: 3
novelty: '20× reduction in estimated qubit count for RSA-2048 factoring'
evidence:
  claim: 'Gidney (Google Quantum AI, 2025) estimates that a 2048-bit RSA integer could be factored in under one week by a quantum computer with fewer than one million noisy physical qubits. This is a 20× reduction from the 2019 Gidney-Ekerå estimate of 20 million qubits. The reduction comes from approximate residue arithmetic (Chevignard et al. 2024), yoked surface codes for idle qubit storage, and magic state cultivation. No machine of this scale exists; this is a theoretical resource estimate, not a demonstration.'
  level: E3
  verified: '2026-08-08'
  sources:
    - url: 'https://arxiv.org/abs/2505.15917'
      role: preprint
      title: 'How to factor 2048 bit RSA integers with less than a million noisy qubits'
      publisher: 'arXiv'
      date: '2025-05-21'
      identifier: 'arXiv:2505.15917'
      accessed: '2026-08-08'
      note: 'Craig Gidney, Google Quantum AI. Preprint; not yet peer-reviewed as of 2026-08-08.'
links:
  - to: crqc
    relation: evidence-for
  - to: qec-below-threshold-surface-code
    relation: depends-on
  - to: algo-resource-estimation
    relation: depends-on
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

Shor's 1994 algorithm factors integers and computes discrete logarithms in polynomial time, breaking RSA and elliptic-curve cryptography in principle. It has not been demonstrated at cryptographically relevant scale — current machines are orders of magnitude too small and error-prone.

The most significant 2025 development is a preprint by Craig Gidney (Google Quantum AI) reducing the estimated physical qubit requirement for factoring RSA-2048 from approximately 20 million (the 2019 baseline) to under one million, at the cost of a longer runtime (under one week versus eight hours). The reduction uses approximate residue arithmetic, more efficient qubit storage, and improved magic-state generation. This is a resource estimation result, not a demonstration — the hardware does not yet exist.
