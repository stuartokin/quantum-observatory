---
schema: frontier/v1
id: qec-error-correction-threshold
title: Error correction threshold
summary: 'Below-threshold QEC demonstrated on superconducting hardware. Google Willow (Nature, Dec 2024) achieved exponential logical-error suppression as code distance increases; a second independent team confirmed below-threshold operation in Dec 2025.'
plain: 'Quantum computers make errors constantly. Error correction fixes this by spreading one logical qubit across many physical ones — but it only helps if the physical error rate is already below a critical value called the threshold. Above it, adding more qubits makes things worse. In December 2024, Google''s Willow chip was the first to clearly cross below this threshold on a superconducting processor, halving the logical error rate with each step up in code size. A second independent group confirmed below-threshold operation in December 2025 using a different leakage-suppression technique. This is a foundational milestone: without it, scaling to fault-tolerant quantum computers is mathematically impossible.'
pillar: quantum
readiness: demonstrated
constellation: error-correction
cluster: surface-code
actors:
  - 'Google Quantum AI'
country:
  - US
metrics:
  - name: 'Logical error suppression factor'
    value: '2.14'
    unit: 'Lambda per two steps of code distance'
    note: 'Distance-7 surface code, 101 qubits, 0.143% error per correction cycle'
  - name: 'Logical vs physical qubit lifetime'
    value: '2.4'
    unit: 'times'
    note: 'Logical memory exceeds best physical qubit lifetime by factor 2.4 +/- 0.3'
priority: P0
qdayImpact: 2
qdayReasoning: 'Below-threshold operation is a necessary prerequisite for scalable fault-tolerant quantum computation. Demonstrating it removes a foundational uncertainty: that physical error rates might never reach the threshold. It does not imply a CRQC is near — millions of physical qubits and many further engineering steps remain. But it moves Q-Day forecasts from speculative to physically grounded. Score 2: meaningfully tightens the credible lower bound on Q-Day timelines without resolving the vast gap between current demonstrated scale and what a CRQC requires.'
horizon: 2
novelty: 'First below-threshold QEC on superconducting hardware; second independent confirmation Dec 2025'
moved:
  from: emerging
  on: '2026-08-08'
evidence:
  claim: 'Google Quantum AI demonstrated two below-threshold surface code memories on the Willow superconducting processor (Nature, December 2024). A distance-7 code on 101 qubits achieved logical error suppression factor Lambda = 2.14 +/- 0.02 per two steps of code distance, with 0.143% error per cycle, exceeding the best physical qubit lifetime by 2.4 +/- 0.3x. A second independent group demonstrated below-threshold operation on a distance-7 surface code using all-microwave leakage suppression, achieving Lambda = 1.40 +/- 0.06 (Physical Review Letters, December 2025).'
  verified: '2026-08-08'
  level: E4
  sources:
    - url: 'https://www.nature.com/articles/s41586-024-08449-y'
      role: primary
      title: 'Quantum error correction below the surface code threshold'
      publisher: Nature
      date: '2024-12-09'
      identifier: 'Nature 638, 920-926 (2025)'
      doi: '10.1038/s41586-024-08449-y'
      accessed: '2026-08-08'
      note: 'Google Willow 105-qubit processor; distance-7 surface code on 101 qubits; real-time decoder; peer-reviewed.'
    - url: 'https://arxiv.org/pdf/2408.13687'
      role: preprint
      title: 'Quantum error correction below the surface code threshold'
      publisher: arXiv
      date: '2024-08-27'
      identifier: 'arXiv:2408.13687'
      accessed: '2026-08-08'
      note: 'Preprint version of the Nature paper.'
    - url: 'https://physics.aps.org/featured-article-pdf/10.1103/rqkg-dw31'
      role: corroborating
      title: 'Experimental Quantum Error Correction below the Surface Code Threshold'
      publisher: 'Physical Review Letters'
      date: '2025-12-22'
      doi: '10.1103/rqkg-dw31'
      accessed: '2026-08-08'
      note: 'Independent below-threshold demonstration using all-microwave leakage suppression; Lambda = 1.40 +/- 0.06 on distance-7 surface code.'
confidence: high
status: published
links:
  - to: qec-below-threshold-surface-code
    relation: evidence-for
  - to: qec-logical-fidelity
    relation: enables
  - to: crqc
    relation: enables
origin: human
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

The error correction threshold is the boundary below which quantum error correction actually helps. Google Willow crossed it in 2024 on superconducting hardware; a second independent team confirmed it in 2025. Both use surface codes. The result is a necessary but far-from-sufficient step toward a fault-tolerant quantum computer.
