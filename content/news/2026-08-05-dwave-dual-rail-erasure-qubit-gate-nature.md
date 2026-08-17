---
schema: news/v1
id: 2026-08-05-dwave-dual-rail-erasure-qubit-gate-nature
headline: 'D-Wave publishes first gate-model result in Nature: entangling gate for dual-rail erasure qubits with preserved error hierarchy'
pillar: quantum
date: '2026-08-05'
plain: 'Erasure qubits convert the most common error — a photon leaking out of the computational subspace — into a detectable flag rather than a silent corruption. The value of this architecture depends entirely on whether the error hierarchy (erasure errors most common, Pauli errors rare) survives the two-qubit gate. D-Wave''s Nature paper shows it mostly does: approximately 99.9% gate fidelity with an erasure rate of about 0.5% and residual Pauli errors below 0.1%. Surface code simulations using these measured error rates project error correction performance roughly double that of state-of-the-art depolarizing-noise gates — a projection, not yet an experimental demonstration of error-corrected logic.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-026-10822-y
  kind: paper
  title: 'An entangling gate for dual-rail erasure qubits'
  publisher: Nature
  date: '2026-08-05'
  doi: 10.1038/s41586-026-10822-y
corroboration:
  - url: https://postquantum.com/quantum-research/d-wave-dual-rail-erasure-qubit-nature/
    publisher: postquantum.com
    kind: journalism
  - url: https://quantumcomputingreport.com/d-wave-demonstrates-two-qubit-gate-breakthrough-for-dual-rail-erasure-qubits-in-nature/
    publisher: Quantum Computing Report
    kind: journalism
  - url: https://www.nextplatform.com/compute/2026/08/07/d-wave-intros-two-qubit-error-correcting-gate-for-its-dual-rail-quantum-architecture/5285007
    publisher: Next Platform
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature paper opened; DOI 10.1038/s41586-026-10822-y confirmed, published August 5, 2026, Nature vol. 656, pp. 47-53'
    - 'PubMed record 42557378 cross-references same DOI and confirms D-Wave affiliation'
    - 'Gate fidelity (~99.9%), erasure rate (~0.5%), residual Pauli error (<0.1%) confirmed from multiple independent reporters who read the paper'
    - 'Research predates the acquisition: preprint dated March 2025, manuscript received by Nature in May 2025 — this is Quantum Circuits Inc. work published under D-Wave affiliation after the $550M acquisition in January 2026'
    - 'QEC projections are simulations, not experimental demonstrations — flagged in plain text'
about:
  - arch-cat-qubits
  - qec-error-correction-threshold
  - qec-realtime-decoding
establishedBy:
  - url: https://www.nature.com/articles/s41586-026-10822-y
    title: 'An entangling gate for dual-rail erasure qubits'
    publisher: Nature
    date: '2026-08-05'
    doi: 10.1038/s41586-026-10822-y
    relation: reports
actors: [D-Wave Quantum, Quantum Circuits Inc.]
country: [US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-17'
status: published
added: '2026-08-17'
---

The research was conducted under the Quantum Circuits Inc. banner before D-Wave's $550 million acquisition in January 2026. The preprint appeared in March 2025 and Nature received the manuscript in May 2025. This is therefore the peer-reviewed publication of work from the acquired programme, now attributed to D-Wave.

The dual-rail architecture encodes one qubit across a pair of superconducting microwave cavities. Photon loss to the vacuum state deactivates the dispersive interaction, producing a detectable flag rather than a Pauli error. The gate operates in about 500 nanoseconds.

The measured Lambda (error-suppression factor per additional distance) from surface code simulations using the actual error profile is approximately 2, compared to typical values of 1.5 for conventional depolarising noise gates. The paper does not demonstrate a logical qubit or an error-corrected circuit — those remain next steps. D-Wave's roadmap targets 17 physical qubits (DR17) in 2026, scaling to 100 logical qubits by 2032; roadmap dates are commercial statements at E2.
