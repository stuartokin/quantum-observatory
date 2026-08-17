---
schema: news/v1
id: 2026-04-30-quantinuum-qec-molecular-energy-prx-yamamoto
headline: 'Quantinuum publishes peer-reviewed partially fault-tolerant molecular energy computation on trapped-ion hardware in PRX Quantum'
pillar: quantum
date: '2026-04-30'
plain: 'The preprint of this result (May 2025) was already recorded on this board. The peer-reviewed version in PRX Quantum is now the citable record. Yamamoto et al. at Quantinuum ran a ground-state energy calculation for a hydrogen molecule on 23 trapped-ion qubits using noise-aware calibration, logical rotation gates, and real-time error correction gadgets. This is a modest molecule and an early result — hydrogen is the simplest chemistry problem — but the full stack (algorithm, compiler, error correction, hardware) was co-designed and validated end-to-end on real hardware, which is what distinguishes it from prior partial demonstrations.'
significance: routine
source:
  url: https://journals.aps.org/prxquantum/abstract/10.1103/m7j3-5sk6
  kind: paper
  title: 'Quantum Error-Corrected Computation of Molecular Energies'
  publisher: PRX Quantum
  date: '2026-04-30'
  doi: 10.1103/m7j3-5sk6
corroboration:
  - url: https://physics.aps.org/articles/v19/s52
    publisher: APS Physics
    kind: journalism
validation:
  status: verified
  checks:
    - 'PRX Quantum abstract confirmed at DOI 10.1103/m7j3-5sk6; published in PRX Quantum Vol 7, Issue 2 (April-June 2026)'
    - 'APS Physics summary article corroborates result: 23-qubit trapped-ion calculation with continuous error correction, hydrogen molecule ground state'
    - 'This is the peer-reviewed journal publication of the work whose preprint (arXiv:2505.09133) was recorded as 2025-05-14-quantinuum-h2-qec-molecular-energy-preprint. The items are correctly distinct: this is the journal record, the prior item is the preprint.'
    - 'Authors (Yamamoto et al., Quantinuum) confirmed across both sources'
    - 'No contradicting report found'
about:
  - app-quantum-chemistry-catalyst
  - qec-realtime-decoding
  - arch-trapped-ion
establishedBy:
  - url: https://arxiv.org/abs/2505.09133
    title: 'Quantum Error-Corrected Computation of Molecular Energies'
    relation: reports
    date: '2025-05'
actors: [Quantinuum]
country: [US, GB]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-17'
status: published
added: '2026-08-17'
---

The work closes the loop on a preprint recorded in May 2025. The peer-reviewed publication is the citable record and supersedes the preprint as the evidential reference for this result.

Yamamoto and colleagues used 23 trapped-ion qubits on Quantinuum hardware. They applied noise-aware calibration, logical rotation gates, and quantum error-correction gadgets (not a full surface code) to reduce the impact of physical errors on a variational phase estimation algorithm. The result is a partial fault-tolerant calculation: the error correction is real and active, but the system is not operating fully below the fault-tolerant threshold.

The molecule is hydrogen — the smallest possible chemistry problem. The significance is not the molecule; it is the full-stack co-design, end-to-end on hardware, as a validated blueprint for scaling to harder problems.
