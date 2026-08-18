---
schema: frontier/v1
id: qec-below-threshold-surface-code
title: Below-threshold surface code memory
summary: 'The first superconducting demonstration that adding qubits makes a logical qubit better rather than worse — independently replicated on neutral-atom hardware by a different institution.'
plain: 'Qubits are extremely error-prone, so you combine many physical ones into a single reliable "logical" one. For years, adding more physical qubits added more errors than it fixed. Google Willow was the first clear demonstration of the opposite on superconducting hardware: build it bigger and it gets better. Harvard and MIT then independently confirmed the same result on a completely different hardware platform — neutral atoms instead of superconducting circuits — showing the effect is real and not platform-specific. That crossing point is what makes a useful quantum computer conceivable at all.'
pillar: quantum
constellation: error-correction
readiness: demonstrated
actors:
  - Google Quantum AI
  - Harvard University
  - MIT
  - Caltech
  - University of Maryland
metrics:
  - name: Error suppression factor (Google Willow, superconducting)
    value: '2.14'
    note: 'Lambda per two units of code distance, +/- 0.02; distance-7 surface code, 101 physical qubits'
  - name: Error suppression factor (Bluvstein et al., neutral atom)
    value: '2.14'
    unit: 'Lambda (times below threshold)'
    note: '+/- 0.13; four-round characterization circuit, 448 neutral atoms. Coincidence with Google figure: different code distances, error models, and qubit types — not a shared artefact.'
  - name: Code distance
    value: '7'
    note: '101 physical qubits (Google Willow)'
  - name: Logical error per cycle
    value: '0.143'
    note: 'per cent, +/- 0.003 (Google Willow)'
  - name: Beyond break-even
    value: '2.4x'
    note: 'versus best physical qubit lifetime, +/- 0.3 (Google Willow)'
evidence:
  claim: 'Below-threshold surface code memory has been demonstrated independently on two distinct hardware platforms by different institutions, meeting the E5 criterion. Google Quantum AI demonstrated two below-threshold surface code memories on the Willow superconducting processor (Nature 638, 920-926, 2025): the distance-7 code achieved logical error suppression factor Lambda=2.14+/-0.02 per two units of code distance, with 0.143% error per cycle, exceeding the best physical qubit lifetime by 2.4+/-0.3x. Bluvstein et al. (Harvard/MIT/Caltech/Maryland, Nature 649, 39-46, 2026) independently confirmed below-threshold surface code operation on a neutral-atom platform using reconfigurable arrays of up to 448 atoms, achieving Lambda=2.14(13)x below-threshold performance. The two Lambda values are numerically coincident but this is a coincidence across different code distances, error models, and qubit types — what is replicated is below-threshold operation itself, not the specific numerical factor. He et al. (PRL 135, 260601, 2025) provide a third independent below-threshold demonstration on superconducting hardware from a different institution (USTC/Jian-Wei Pan group, Zuchongzhi 3.2 processor, 97 qubits), achieving Lambda=1.40(6) using an all-microwave leakage suppression architecture on a distance-7 surface code. Three independent demonstrations across two hardware modalities from at least three separate institutions confirm that below-threshold QEC is a reproducible, platform-agnostic result.'
  verified: '2026-08-11'
  level: E5
  sources:
    - url: 'https://www.nature.com/articles/s41586-024-08449-y'
      role: primary
      title: Quantum error correction below the surface code threshold
      publisher: Nature
      date: '2025-01-01'
      identifier: 'Nature 638, 920-926 (2025)'
      doi: 10.1038/s41586-024-08449-y
      accessed: '2026-08-11'
      note: 'Google Quantum AI and Collaborators; Willow 105-qubit superconducting processor. Lambda=2.14+/-0.02, 0.143%+/-0.003% per cycle, 2.4+/-0.3x break-even confirmed.'
    - url: 'https://arxiv.org/pdf/2408.13687'
      role: preprint
      publisher: arXiv
      date: '2024-08-27'
      identifier: 'arXiv:2408.13687'
      accessed: '2026-08-08'
      note: 'Preprint version of the Nature paper.'
    - url: 'https://www.nature.com/articles/s41586-025-09848-5'
      role: corroborating
      title: A fault-tolerant neutral-atom architecture for universal quantum computation
      publisher: Nature
      date: '2026-01-01'
      identifier: 'Nature 649, 39-46 (2026)'
      doi: 10.1038/s41586-025-09848-5
      accessed: '2026-08-11'
      note: 'Bluvstein, Geim, Li, Evered et al.; Harvard / MIT / Caltech / Maryland. Independently demonstrates Lambda=2.14(13)x below-threshold performance on neutral-atom platform using surface codes. Different institution, different hardware modality, different error model from Google Willow — the coincidence of Lambda values is not a shared artefact. Publisher correction Nature 650, E3 (2026) was a figure-label correction only; results unchanged.'
    - url: 'https://link.aps.org/doi/10.1103/rqkg-dw31'
      role: corroborating
      title: 'Experimental Quantum Error Correction below the Surface Code Threshold via All-Microwave Leakage Suppression'
      publisher: Physical Review Letters
      date: '2025-12-22'
      identifier: 'Phys. Rev. Lett. 135, 260601 (2025)'
      doi: 10.1103/rqkg-dw31
      accessed: '2026-08-11'
      note: 'Tan He et al.; USTC / Jian-Wei Pan group (Zuchongzhi 3.2 processor, 97 qubits). Lambda=1.40(6); all-microwave leakage suppression architecture on distance-7 surface code. PRL Editors'' Suggestion. Third independent below-threshold demonstration. Institution confirmed via phys.org news report.'
links:
  - to: qec-qldpc-bivariate-bicycle
    relation: competes-with
  - to: qec-magic-state-distillation
    relation: enables
  - to: qec-surface-code
    relation: evidence-for
  - to: arch-superconducting
    relation: depends-on
  - to: qec-logical-fidelity
    relation: evidence-for
priority: P0
horizon: 2
qdayImpact: 2
qdayReasoning: 'Crossing the error-correction threshold on a scalable platform is a precondition for any cryptanalytic machine. Independent replication across two hardware modalities and three institutions removes the remaining uncertainty about whether this is a platform-specific artefact. Moves engineering feasibility forward, not the date directly.'
country:
  - US
confidence: high
status: published
added: '2026-08-04'
origin: human
novelty: 'Below-threshold QEC replicated across superconducting and neutral-atom platforms by independent institutions'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-11'
  reviewedOn: '2026-08-18'
  note: 'Nature 638, 920-926 re-confirmed via nature.com: Lambda=2.14+/-0.02, 101-qubit d=7 code, 0.143%/cycle, 2.4x break-even. All three sources verified this run. E5 correct — three independent institutions, two hardware modalities. No changes.'
---

Below-threshold surface code operation — where adding more physical qubits suppresses logical errors exponentially — has been confirmed independently across two hardware platforms and at least three research groups, meeting the E5 standard for independent replication.

**Google Willow (superconducting, 2025).** The 101-qubit distance-7 surface code on Google's Willow processor achieved logical error suppression factor Λ=2.14±0.02 per two units of code distance, with 0.143% error per cycle and a logical lifetime 2.4× that of the best physical qubit. Real-time decoding at distance-5 achieved 63 µs average latency.

**Bluvstein et al. (neutral atom, Harvard/MIT, 2026).** An independent team at Harvard and MIT, using reconfigurable arrays of up to 448 neutral atoms, demonstrated Λ=2.14(13)× below-threshold performance on a surface code. This is a different institution, a different hardware modality (neutral atoms, not superconducting circuits), and a different error model — erasure-based decoding with atom loss detection rather than Pauli noise with a minimum-weight matching decoder. The numerical coincidence Λ≈2.14 across both platforms is not a shared experimental artefact; it reflects independent physics operating below the threshold.

**He et al. (superconducting, USTC/Pan group, 2025).** A third group at the University of Science and Technology of China demonstrated below-threshold operation on a superconducting distance-7 surface code using all-microwave leakage suppression on a 97-qubit Zuchongzhi 3.2 processor, achieving Λ=1.40(6). Published in Physical Review Letters as an Editors' Suggestion.

Three independent demonstrations across two hardware modalities confirm that below-threshold QEC is reproducible and platform-agnostic. The remaining challenge is not whether the threshold can be crossed, but how to scale to the logical qubit counts and gate fidelities required for useful fault-tolerant algorithms.
