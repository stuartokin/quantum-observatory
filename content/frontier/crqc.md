---
schema: frontier/v1
id: crqc
title: Cryptographically relevant quantum computer
summary: 'A CRQC is a fault-tolerant quantum computer capable of running Shor''s algorithm at key sizes used in real cryptography. None exists. The best current resource estimate (Gidney 2025) requires fewer than one million physical qubits for RSA-2048, down 20× from prior estimates.'
plain: 'A cryptographically relevant quantum computer — a CRQC — is the machine that could actually break the encryption protecting banks, governments, and the internet. It does not exist yet. The best estimate of what it would take has just fallen sharply: a 2025 analysis by a Google researcher suggests under one million quantum bits (qubits), where the previous estimate was 20 million. That is still far beyond anything built today, which fields hundreds of qubits with nowhere near the error rates needed. The risk is real, but the timeline remains years to decades away — long enough to migrate to quantum-resistant cryptography now.'
pillar: quantum
readiness: emerging
constellation: algorithms
actors:
  - 'Google Quantum AI'
country:
  - US
metrics:
  - name: 'Best-estimate physical qubits for RSA-2048'
    value: '<1000000'
    unit: physical qubits
    note: 'Gidney 2025 arXiv:2505.15917; assumes surface code at 0.1% error rate'
  - name: 'Estimated runtime at that qubit count'
    value: '<7'
    unit: days
    note: 'Gidney 2025 estimate; prior 2019 estimate was 8 hours at 20M qubits'
priority: P0
qdayImpact: 2
qdayReasoning: 'The 2025 Gidney preprint lowers the hardware threshold for a CRQC by 20× in qubit count. This makes the engineering challenge less abstract and raises the urgency of PQC migration. However, current machines are still 3-4 orders of magnitude short of the qubit count, error rate, and connectivity required. Q-Day remains beyond the 2030 regulatory window on current hardware trajectories, though algorithmic improvements could continue lowering the bar.'
horizon: 3
novelty: 'Updated resource estimate reduces qubit requirement 20× to under 1 million'
evidence:
  claim: 'Gidney (2025) estimates RSA-2048 factoring requires fewer than one million noisy physical qubits running under a week, assuming surface code error correction at 0.1% gate error rate. This is a theoretical resource estimation; no CRQC exists. Current quantum computers field physical qubit counts in the hundreds to low thousands, with error rates and connectivity far from sufficient. The gap between current hardware and a CRQC remains multiple engineering generations.'
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
      note: 'Craig Gidney, Google Quantum AI. Resource estimation preprint. Not peer-reviewed as of 2026-08-08. Sets current best-known lower bound on CRQC hardware requirements.'
links:
  - to: algo-shor
    relation: depends-on
  - to: qec-below-threshold-surface-code
    relation: depends-on
  - to: harvest-now-decrypt-later
    relation: enables
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

A cryptographically relevant quantum computer (CRQC) is defined by its ability to execute Shor's algorithm at the key sizes deployed in real cryptographic systems — RSA-2048, ECC-256, and similar. No such machine exists.

The 2025 Gidney preprint from Google Quantum AI is the current authoritative resource estimate, placing the hardware requirement below one million physical noisy qubits for RSA-2048 factoring — a 20× reduction from the 2019 baseline. The estimate assumes surface-code error correction, 0.1% gate error rate, and a runtime of under one week. Current state-of-the-art machines field hundreds of physical qubits with the relevant error rate; the gap to a CRQC remains multiple engineering generations. The significance of the updated estimate is that it brings the CRQC threshold within the range that could plausibly be reached before the 2035 regulatory migration deadline, increasing the urgency of PQC adoption now.
