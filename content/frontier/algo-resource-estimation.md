---
schema: frontier/v1
id: algo-resource-estimation
title: Cryptanalytic resource estimation
summary: 'Quantitative estimates of the physical-qubit cost to run Shor''s algorithm against deployed RSA and elliptic-curve key sizes at realistic error rates.'
plain: 'Before a quantum computer can threaten encryption, researchers need to know exactly how large and how accurate it would have to be. Resource estimation papers work through the engineering in detail: how many physical qubits, how long would it run, and what error rate is assumed. The headline figure dropped from 20 million noisy qubits (Gidney & Ekerå 2019) to under one million (Gidney 2025) for RSA-2048 — a 20× reduction in four years, driven mainly by algorithmic improvements rather than better hardware.'
pillar: quantum
readiness: demonstrated
constellation: algorithms
cluster: cryptanalysis
actors:
  - Google Quantum AI
country:
  - US
metrics:
  - name: Physical qubits to factor RSA-2048
    value: '<1 million'
    unit: noisy physical qubits
    note: 'Assumes 0.1% gate error rate, 1 µs surface-code cycle, <1 week runtime (Gidney 2025)'
  - name: Previous best estimate
    value: '20 million'
    unit: noisy physical qubits
    note: 'Gidney & Ekerå 2019, 8-hour runtime'
links:
  - to: algo-shor
    relation: evidence-for
  - to: crqc
    relation: enables
evidence:
  claim: 'Gidney (Google Quantum AI, May 2025) estimates RSA-2048 can be factored in under one week by a quantum computer with fewer than one million noisy physical qubits, a 20× reduction on the 2019 Gidney–Ekerå estimate of 20 million, achieved through approximate residue arithmetic and yoked surface codes.'
  verified: '2026-08-08'
  level: E3
  sources:
    - url: https://arxiv.org/abs/2505.15917
      role: preprint
      title: How to factor 2048 bit RSA integers with less than a million noisy qubits
      publisher: arXiv
      date: '2025-05-21'
      identifier: arXiv:2505.15917
      doi: 10.48550/arXiv.2505.15917
      accessed: '2026-08-08'
      note: 'Google Quantum AI, Craig Gidney. Not yet peer-reviewed at time of verification.'
    - url: https://research.google/pubs/how-to-factor-2048-bit-rsa-integers-with-less-than-a-million-noisy-qubits/
      role: corroborating
      title: How to factor 2048 bit RSA integers with less than a million noisy qubits
      publisher: Google Research
      date: '2025-05-21'
      accessed: '2026-08-08'
confidence: high
status: published
priority: P0
qdayImpact: 2
qdayReasoning: 'A 20× reduction in the physical qubit requirement for RSA-2048 factoring brings the engineering target meaningfully closer to what near-term fault-tolerant roadmaps project. This does not demonstrate a CRQC exists, but it lowers the bar significantly and compresses the remaining gap between demonstrated QEC hardware and the resource requirement. Combined with ongoing fabrication improvements, this accelerates credible Q-Day timelines.'
horizon: 2
novelty: 'major algorithmic reduction in CRQC resource estimate'
origin: agent
added: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

The dominant public estimate for how capable a quantum computer would need to be to break RSA-2048 encryption dropped by a factor of 20 in a single 2025 paper. Craig Gidney (Google Quantum AI) showed that, under the same physical assumptions as his 2019 paper, fewer than one million noisy qubits suffice — trading a longer runtime (under a week rather than 8 hours) for a dramatically smaller machine. The reduction comes from adopting approximate residue arithmetic (Chevignard et al. 2024) and more efficient qubit storage. This is still a preprint and the required machine does not exist, but the number matters: it tells policymakers and engineers what they are aiming to build against.
