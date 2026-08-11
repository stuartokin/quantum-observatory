---
schema: frontier/v1
id: qec-error-correction-threshold
title: Error correction threshold
summary: 'Below-threshold QEC demonstrated on superconducting hardware (Google Willow, Nature Dec 2024) and independently confirmed by He et al. (PRL Dec 2025) and Bluvstein et al. on neutral-atom hardware (Nature Jan 2026). Three independent demonstrations across two modalities.'
plain: 'Quantum computers make errors constantly. Error correction fixes this by spreading one logical qubit across many physical ones — but it only helps if the physical error rate is already below a critical value called the threshold. Above it, adding more qubits makes things worse. In December 2024, Google''s Willow chip was the first to clearly cross below this threshold on a superconducting processor, halving the logical error rate with each step up in code size. A second independent group (He et al.) confirmed below-threshold operation in December 2025 using a different leakage-suppression technique on superconducting hardware. A third group (Bluvstein et al., Harvard/MIT) confirmed it in January 2026 on a completely different hardware platform — neutral atoms held in optical tweezers instead of superconducting circuits. This is a foundational milestone: without it, scaling to fault-tolerant quantum computers is mathematically impossible.'
pillar: quantum
readiness: demonstrated
constellation: error-correction
cluster: surface-code
actors:
  - 'Google Quantum AI'
  - 'Harvard University'
  - 'MIT'
country:
  - US
metrics:
  - name: 'Logical error suppression factor (Google Willow)'
    value: '2.14'
    unit: 'Lambda per two steps of code distance'
    note: 'Distance-7 surface code, 101 qubits, 0.143% error per correction cycle'
  - name: 'Logical vs physical qubit lifetime'
    value: '2.4'
    unit: 'times'
    note: 'Logical memory exceeds best physical qubit lifetime by factor 2.4 +/- 0.3'
priority: P0
qdayImpact: 2
qdayReasoning: 'Below-threshold operation is a necessary prerequisite for scalable fault-tolerant quantum computation. Demonstrating it on multiple platforms removes a foundational uncertainty. It does not imply a CRQC is near — millions of physical qubits and many further engineering steps remain. But it moves Q-Day forecasts from speculative to physically grounded. Score 2: meaningfully tightens the credible lower bound on Q-Day timelines without resolving the vast gap between current demonstrated scale and what a CRQC requires.'
horizon: 2
novelty: 'Below-threshold QEC confirmed across superconducting and neutral-atom platforms by three independent groups'
moved:
  from: emerging
  on: '2026-08-08'
evidence:
  claim: 'Google Quantum AI demonstrated two below-threshold surface code memories on the Willow superconducting processor (Nature 638, December 2024). A distance-7 code on 101 qubits achieved logical error suppression factor Lambda=2.14+/-0.02 per two steps of code distance, with 0.143% error per cycle, exceeding the best physical qubit lifetime by 2.4+/-0.3x. He et al. demonstrated below-threshold operation on a distance-7 surface code using all-microwave leakage suppression, achieving Lambda=1.40+/-0.06 (Physical Review Letters 135, 260601, December 2025). Bluvstein et al. (Harvard/MIT/Caltech/Maryland, Nature 649, 39-46, January 2026) independently confirmed below-threshold surface code operation on neutral-atom hardware — a different platform, different institution, and different error model — achieving Lambda=2.14(13)x below-threshold performance. Three independent demonstrations across two hardware modalities establish below-threshold QEC as a platform-agnostic result.'
  verified: '2026-08-11'
  level: E4
  sources:
    - url: 'https://www.nature.com/articles/s41586-024-08449-y'
      role: primary
      title: 'Quantum error correction below the surface code threshold'
      publisher: Nature
      date: '2024-12-09'
      identifier: 'Nature 638, 920-926 (2025)'
      doi: '10.1038/s41586-024-08449-y'
      accessed: '2026-08-11'
      note: 'Google Willow 105-qubit processor; distance-7 surface code on 101 qubits; real-time decoder; peer-reviewed.'
    - url: 'https://arxiv.org/pdf/2408.13687'
      role: preprint
      title: 'Quantum error correction below the surface code threshold'
      publisher: arXiv
      date: '2024-08-27'
      identifier: 'arXiv:2408.13687'
      accessed: '2026-08-08'
      note: 'Preprint version of the Nature paper.'
    - url: 'https://link.aps.org/doi/10.1103/rqkg-dw31'
      role: corroborating
      title: 'Experimental Quantum Error Correction below the Surface Code Threshold via All-Microwave Leakage Suppression'
      publisher: 'Physical Review Letters'
      date: '2025-12-22'
      identifier: 'Phys. Rev. Lett. 135, 260601 (2025)'
      doi: '10.1103/rqkg-dw31'
      accessed: '2026-08-11'
      note: 'Tan He et al. Independent below-threshold demonstration using all-microwave leakage suppression on distance-7 surface code; Lambda=1.40+/-0.06. PRL Editors'' Suggestion. Published 22 December 2025.'
    - url: 'https://www.nature.com/articles/s41586-025-09848-5'
      role: corroborating
      title: 'A fault-tolerant neutral-atom architecture for universal quantum computation'
      publisher: Nature
      date: '2026-01-01'
      identifier: 'Nature 649, 39-46 (2026)'
      doi: 10.1038/s41586-025-09848-5
      accessed: '2026-08-11'
      note: 'Bluvstein, Geim, Li, Evered et al.; Harvard / MIT / Caltech / Maryland. Independently confirms Lambda=2.14(13)x below-threshold on neutral-atom platform — different institution, different modality, different error model from Google Willow. Establishes platform-agnostic replication. Publisher correction Nature 650, E3 (2026) was label-only; results unchanged.'
links:
  - to: qec-below-threshold-surface-code
    relation: evidence-for
  - to: qec-logical-fidelity
    relation: enables
  - to: crqc
    relation: enables
confidence: high
status: published
origin: human
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-11'
  note: 'Added Bluvstein et al. Nature 649, 39-46 (2026) as corroborating source. This paper appeared in the claim text of prior versions but was absent from evidence.sources. Updated claim to reflect three independent demonstrations across two modalities. Evidence level held at E4 — the primary source remains Google Willow; the E5 promotion is carried by qec-below-threshold-surface-code. Updated summary, plain, and novelty fields. actors expanded to include Harvard/MIT.'
---

The error correction threshold is the boundary below which quantum error correction actually helps. Google Willow crossed it in 2024 on superconducting hardware. He et al. confirmed it in December 2025 on superconducting hardware using a different leakage-suppression technique. Bluvstein et al. (Harvard/MIT) confirmed it in January 2026 on neutral-atom hardware. Three independent demonstrations across two hardware modalities establish below-threshold QEC as a reproducible, platform-agnostic milestone.
