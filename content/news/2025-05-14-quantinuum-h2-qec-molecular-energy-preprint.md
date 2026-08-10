---
schema: news/v1
id: 2025-05-14-quantinuum-h2-qec-molecular-energy-preprint
headline: 'Quantinuum posts first end-to-end error-corrected quantum chemistry calculation on H2-2 trapped-ion hardware'
pillar: quantum
date: '2025-05-14'
plain: 'Quantum phase estimation (QPE) for molecular energy is one of the most cited future use cases for fault-tolerant quantum computers. This preprint from Quantinuum is the first published demonstration of QPE run on error-corrected logical qubits — not just error-mitigated physical qubits — for a real chemistry problem. The team calculates the ground-state energy of molecular hydrogen (H2) on the H2-2 trapped-ion processor, encoding with the [[7,1,3]] color code and integrating real-time Steane QEC gadgets. Adding error correction measurably improved circuit performance despite the added complexity. The caveat is important: H2 in the STO-3G basis is the simplest possible molecular system and is solved exactly by classical methods. This is a methods demonstration, not a result beyond classical reach. The same team notes memory noise as the dominant remaining bottleneck.'
significance: notable
source:
  url: https://arxiv.org/abs/2505.09133
  kind: preprint
  title: 'Quantum Error-Corrected Computation of Molecular Energies'
  publisher: arXiv
  date: '2025-05-14'
corroboration:
  - url: https://thequantuminsider.com/2025/05/22/quantum-chemistry-gets-error-corrected-boost-from-quantinuums-trapped-ion-computer/
    publisher: The Quantum Insider
    kind: journalism
  - url: https://quantumzeitgeist.com/demonstrating-error-correction-in-quantum-computing-for-molecular-systems-using-quantinuum-h2-2/
    publisher: Quantum Zeitgeist
    kind: journalism
validation:
  status: single-source
  checks:
    - 'arXiv preprint 2505.09133v1 opened; the claim of first end-to-end QEC pipeline for molecular electronic structure appears in the abstract and is elaborated in the results section with 22-qubit circuits and up to 2185 two-qubit gates'
    - 'The Quantum Insider and Quantum Zeitgeist both report the preprint; neither adds independent experimental verification, only description of the Quantinuum-authored work'
    - 'Preprint later peer-reviewed and published in PRX Quantum (doi:10.1103/m7j3-5sk6, accepted by April 2026); dated here to the preprint, which is the event'
    - 'Status is single-source because the primary source is the vendor team''s own preprint, independently reported only by aggregators; no independent laboratory replication found'
  note: 'This is an announced research result at an early stage: only the simplest molecular system (H2, minimal basis) was computed, and that system is classically trivial. The value of the result is methodological — showing that QEC adds measurable benefit in a chemistry circuit — not scientific discovery beyond classical reach.'
about:
  - arch-trapped-ion
  - qec-logical-fidelity
  - qec-colour-code
establishedBy:
  - url: https://arxiv.org/abs/2505.09133
    title: 'Quantum Error-Corrected Computation of Molecular Energies'
    relation: reports
    date: '2025-05'
actors: [Quantinuum]
country: [US, UK]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The experiment uses 22 physical qubits on the H2-2 system, running circuits with up to 2,185 two-qubit physical gates and 760 mid-circuit measurements. The logical compilation targets the Clifford+RZ gate set using partially fault-tolerant techniques. Real-time Steane QEC gadgets are inserted to suppress errors during the QPE estimation sequence.

The energy error versus the full configuration interaction (FCI) reference is 0.018 hartree — respectable for a hardware demonstration, but H2 in STO-3G is routinely solved on a laptop. The team's numerical simulations identify memory noise (idling qubits) as the dominant error source, suggesting that future improvement lies in reducing memory error rates rather than gate errors.

This is an announced pilot-scale result from the vendor's own team, published as a preprint in May 2025 and later peer-reviewed. No molecule beyond classical reach has been simulated. The significance is that it is the first time active error correction has been shown to help rather than hurt in a chemistry QPE circuit — a prerequisite for scaling toward useful quantum chemistry.
