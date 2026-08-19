---
schema: news/v1
id: 2025-12-22-ustc-zuchongzhi-32-below-threshold-surface-code
headline: 'USTC Zuchongzhi 3.2 demonstrates below-threshold surface-code QEC in Physical Review Letters, first peer-reviewed result outside the United States'
pillar: quantum
date: '2025-12-22'
plain: 'Google reached below-threshold quantum error correction in December 2024. A year later, USTC has published the same milestone in Physical Review Letters using a 107-qubit processor and a different technique. Their all-microwave leakage suppression architecture avoids the DC pulse wiring that Google uses, which the authors argue is simpler to calibrate at scale. The error suppression factor of 1.40 confirms operation below the threshold at which adding more qubits to an error-correcting code starts to reduce rather than increase error rates. This is a peer-reviewed result, an Editors'' Suggestion, and the first time a non-US group has published this milestone.'
significance: notable
source:
  url: https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.135.260601
  kind: paper
  title: 'Experimental Quantum Error Correction below the Surface Code Threshold'
  publisher: Physical Review Letters
  date: '2025-12-22'
  doi: 10.1103/PhysRevLett.135.260601
corroboration:
  - url: https://quantumcomputingreport.com/ustcs-zuchongzhi-3-2-achieves-below-threshold-qec-milestone/
    publisher: Quantum Computing Report
    kind: journalism
  - url: https://www.globaltimes.cn/page/202512/1351319.shtml
    publisher: Global Times
    kind: press
  - url: https://postquantum.com/quantum-research/zuchongzhi-3-2-belowthreshold/
    publisher: postquantum.com
    kind: journalism
validation:
  status: verified
  checks:
    - 'Physical Review Letters paper opened at DOI 10.1103/PhysRevLett.135.260601; date December 22, 2025 confirmed; published as PRL Editors'' Suggestion and cover article'
    - 'Error suppression factor Lambda = 1.40 plus-or-minus 0.06 on distance-7 surface code using 97 of 107 qubits confirmed in abstract'
    - 'All-microwave leakage suppression architecture confirmed as the novel technical contribution; distinct from Google Willow DC-pulse approach'
    - 'Three independent sources corroborate the publication and milestone claim'
    - 'Not to be confused with Zuchongzhi 3.0 PRL March 2025, which was a random circuit sampling result, not a QEC threshold result'
    - 'postquantum.com notes independent expert Joseph Emerson of University of Waterloo validated significance; this is journalism-level corroboration, not independent replication'
about:
  - qec-below-threshold-surface-code
  - qec-error-correction-threshold
  - arch-superconducting
establishedBy:
  - url: https://arxiv.org/abs/2505.01978
    title: 'Experimental Quantum Error Correction below the Surface Code Threshold'
    relation: reports
    date: '2025-05'
actors:
  - USTC
  - Pan Jianwei
  - Zhu Xiaobo
  - Peng Chengzhi
country:
  - CN
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
measurements:
  - kind: physical-qubits
    value: 107
    qualifier: 'processor size'
    modality: superconducting
    crossChecks: arch-superconducting
    note: 'Zuchongzhi 3.2, below-threshold surface code by all-microwave leakage suppression.'
---

Google's Willow below-threshold demonstration (December 2024, Nature) was the first experimental proof that a surface-code quantum error correction system could operate in the regime where adding more qubits to the code reduces logical error rates. For twelve months, no other group had published a peer-reviewed result reaching the same threshold on a superconducting processor.

The USTC paper is the second. The Zuchongzhi 3.2 processor uses an all-microwave approach to reset leakage states — qubits that have escaped the two-level computational subspace — without the DC pulse wiring that Google's architecture employs. The team argues this reduces calibration complexity and avoids some of the crosstalk challenges that arise when large systems are scaled.

The error suppression factor Λ = 1.40 ± 0.06 is lower than the values Google has reported for Willow but is definitively above 1.0, establishing threshold operation. The experiment used 97 qubits to implement a distance-7 surface code.

What remains unshown: this is a memory experiment, not an algorithmic one. The machine has not run useful computations on logical qubits, and the Λ value is modest by the standards that fault-tolerant algorithms will eventually require. The architectural claim — that all-microwave leakage suppression is easier to scale — is stated but not yet tested at larger system sizes.
