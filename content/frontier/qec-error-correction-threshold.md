---
schema: frontier/v1
id: qec-error-correction-threshold
title: Error correction threshold
summary: 'The theoretical result that fault-tolerant quantum computation is possible if physical error rates fall below a critical constant threshold, regardless of circuit depth.'
plain: 'In 1996–1997, several groups proved that quantum computers do not need to be perfect — they just need to be good enough. If the probability of any gate going wrong is below a certain constant (the fault-tolerance threshold), then errors can be suppressed arbitrarily by encoding qubits in more physical qubits, at only a modest cost in extra operations. This theoretical result is the foundation of the entire error-correction field. The threshold for common surface-code schemes is around 1%, meaning that if every two-qubit gate has less than roughly 1 error in 100, a quantum computer can in principle run arbitrarily long computations. Demonstrating hardware below this threshold is a separate achievement, covered by qec-below-threshold-surface-code.'
pillar: quantum
readiness: emerging
constellation: error-correction
cluster: theory
actors:
  - Dorit Aharonov
  - Michael Ben-Or
  - Alexei Kitaev
  - Emanuel Knill
  - Raymond Laflamme
  - Wojciech Zurek
country:
  - US
  - Israel
  - Russia
metrics:
  - name: Surface-code circuit-level threshold (theoretical)
    value: '~1%'
    unit: physical error rate
    note: 'Exact value model-dependent; ~0.1% for depolarising noise in strict distance-d surface code'
links:
  - to: qec-surface-code
    relation: enables
  - to: qec-below-threshold-surface-code
    relation: enables
evidence:
  claim: 'Aharonov & Ben-Or (1997, published SIAM J. Comput. 2008) prove that quantum computation can be made robust against errors when the physical error rate is below a constant threshold, with only polylogarithmic overhead in space and time, for a general noise model including decoherence and depolarisation.'
  verified: '2026-08-08'
  level: E1
  sources:
    - url: https://arxiv.org/abs/quant-ph/9906129
      role: primary
      title: Fault-Tolerant Quantum Computation with Constant Error Rate
      publisher: SIAM Journal on Computing
      date: '1999-06-30'
      identifier: 'SIAM J. Comput. 38, 1207–1282 (2008); arXiv:quant-ph/9906129'
      accessed: '2026-08-08'
      note: 'Original 1997 STOC conference paper; arXiv version 1999; journal version 2008. Independent parallel results by Kitaev (1997) and Knill, Laflamme & Zurek (1996).'
confidence: high
status: published
priority: P2
qdayImpact: 0
qdayReasoning: ''
horizon: 3
novelty: 'foundational theoretical result'
origin: agent
added: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

The fault-tolerance threshold theorem is the theoretical bedrock of the entire quantum error correction effort. It says: if physical gates are accurate enough, scalable quantum computing is possible. Without this result there would be no reason to build error-corrected machines, because no amount of extra qubits would help. The threshold was proved independently by multiple groups in 1996–1997 (Aharonov & Ben-Or, Kitaev, Knill–Laflamme–Zurek). The readiness level of this item is correctly set at emerging/E1 — it is a theoretical proof, not a hardware demonstration. The demonstration that real hardware operates below the threshold is captured separately in qec-below-threshold-surface-code.
