---
schema: frontier/v1
id: algo-shor
title: Shor factoring at scale
summary: 'Shor''s algorithm can factor RSA-2048 integers and solve P-256 discrete logarithms, but requires fault-tolerant hardware not yet built. Resource estimates have fallen two orders of magnitude since 2019.'
plain: 'Shor''s algorithm is a quantum recipe that can break the RSA and elliptic-curve encryption protecting most of the internet — but only if run on a very large, very reliable quantum computer. No such machine exists yet. What has changed rapidly is how large "very large" needs to be. In 2021, the best estimate required 20 million physical qubits. By May 2025, Craig Gidney (Google) cut that to under one million for a superconducting machine. In March 2026, a team at Oratomic and Caltech showed that a neutral-atom machine with as few as 10,000 physical qubits could in principle run the algorithm at cryptographically relevant scale, assuming engineering targets not yet demonstrated. These are theoretical resource estimates, not demonstrations of factoring large numbers.'
pillar: quantum
readiness: emerging
constellation: algorithms
cluster: cryptanalytic-threat
actors:
  - Oratomic
  - Caltech
  - UC Berkeley
  - Google Quantum AI
country:
  - US
metrics:
  - name: physical qubits for RSA-2048 (superconducting, surface code)
    value: '<1000000'
    unit: physical qubits
    note: Gidney 2025 estimate; assumes 0.1% gate error, 1 µs cycle time
  - name: physical qubits for P-256 ECDLP (neutral atom, high-rate codes)
    value: '~10000'
    unit: physical qubits
    note: Cain et al. 2026 theoretical minimum; runtime days at 26k qubits
  - name: estimated runtime for P-256 at 26k qubits
    value: 'few days'
    unit: runtime
    note: Cain et al. 2026, under plausible engineering assumptions
priority: P0
qdayImpact: 2
qdayReasoning: 'Resource estimates for cryptanalytically relevant Shor''s algorithm have fallen by two orders of magnitude in five years (20M qubits in 2021 → <1M in 2025 → ~10k for neutral atoms in 2026). Each reduction compresses the engineering gap between current hardware and a CRQC. The 2026 Cain et al. estimate assumes high-rate qLDPC codes and non-local connectivity not yet achieved at scale, so it is a theoretical floor rather than a near-term engineering target. The trajectory nonetheless materially shortens the credible timeline if hardware progress continues at recent rates. Impact scored +2 rather than +3 because the estimates remain theoretical — no large-number factoring has been demonstrated.'
horizon: 3
novelty: 'Resource estimates fell 2 orders of magnitude 2021–2026; 10k neutral-atom qubits proposed as theoretical minimum'
links:
  - to: crqc
    relation: evidence-for
  - to: arch-neutral-atom
    relation: depends-on
  - to: qec-qldpc-bivariate-bicycle
    relation: depends-on
evidence:
  claim: 'Gidney (arXiv:2505.15917, 2025) estimates RSA-2048 can be factored in under a week by a quantum computer with fewer than one million noisy superconducting qubits, reducing the 2021 estimate of 20 million by over 20x. Cain et al. (arXiv:2603.28627, 2026) show that by using high-rate qLDPC codes and non-local neutral-atom connectivity, the physical qubit minimum for cryptographically relevant Shor''s algorithm falls to approximately 10,000, with P-256 discrete logarithms solvable in days at 26,000 qubits. Both are theoretical resource estimates; no RSA-relevant factoring has been demonstrated on hardware.'
  level: E3
  verified: '2026-08-08'
  sources:
    - url: https://arxiv.org/abs/2505.15917
      role: primary
      title: 'How to factor 2048 bit RSA integers with less than a million noisy qubits'
      publisher: arXiv
      date: '2025-05-21'
      identifier: 'arXiv:2505.15917'
      accessed: '2026-08-08'
      note: 'Craig Gidney (Google). Updates Gidney+Ekerå 2021. Same hardware assumptions (0.1% error, 1 µs cycle), qubit count reduced 20x via approximate residue arithmetic and yoked surface codes.'
    - url: https://arxiv.org/abs/2603.28627
      role: preprint
      title: 'Shor''s algorithm is possible with as few as 10,000 reconfigurable atomic qubits'
      publisher: arXiv
      date: '2026-03-31'
      identifier: 'arXiv:2603.28627'
      accessed: '2026-08-08'
      note: 'Cain, Xu et al. (Oratomic/Caltech/UC Berkeley). Theoretical resource estimate using high-rate qLDPC codes and neutral-atom non-local connectivity. Not peer-reviewed at time of access.'
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

Shor's algorithm is the quantum procedure that would break RSA and elliptic-curve encryption if run at scale. The algorithm itself is proven; the question is how many physical qubits a machine needs. That number has fallen sharply: from an estimated 20 million in 2021, to under one million (Gidney, 2025) for a superconducting architecture, to a theoretical floor of roughly 10,000 for a neutral-atom machine using advanced error-correcting codes (Cain et al., 2026). Both the 2025 and 2026 figures are paper estimates against hardware that does not yet exist at that scale — no device has factored a number large enough to threaten real cryptography. The significance is the trajectory: engineering targets are moving closer to what current hardware can plausibly reach within a decade.
