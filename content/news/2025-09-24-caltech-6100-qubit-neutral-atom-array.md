---
schema: news/v1
id: 2025-09-24-caltech-6100-qubit-neutral-atom-array
headline: Caltech Endres Lab publishes 6,100-qubit neutral-atom array in Nature with record coherence, leaping prior arrays by an order of magnitude
pillar: quantum
date: '2025-09-24'
plain: 'The largest qubit arrays previously demonstrated using neutral atoms contained hundreds of qubits. Caltech has now trapped 6,100 cesium atoms in 12,000 optical tweezer sites — an order-of-magnitude jump — while maintaining 12.6 seconds of coherence time (a record for hyperfine qubits in optical tweezers) and single-qubit control at 99.98% accuracy. Increasing scale did not degrade quality, which is the usual failure mode of large qubit arrays. The paper also describes a zone-based computing architecture and demonstrates the atom-transport operations that error-corrected computation requires. Thousands of physical qubits operating at these fidelities is the scale range where the most resource-efficient error-correction codes become practical. This result demonstrates that the physical substrate exists; it does not demonstrate error correction or logical qubits.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-025-09498-7
  kind: paper
  title: A tweezer array with 6100 highly coherent atomic qubits
  publisher: Nature
  date: '2025-09-24'
  doi: 10.1038/s41586-025-09498-7
corroboration:
  - url: https://www.caltech.edu/about/news/caltech-team-sets-record-with-6100-qubit-array
    publisher: California Institute of Technology
    kind: authority
  - url: https://quantumcomputingreport.com/caltech-team-sets-record-with-6100-qubit-neutral-atom-array/
    publisher: Quantum Computing Report
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature publication confirmed as Nature 647, 60-67 (2025); Endres Lab website (endreslab.com) lists the paper with arXiv:2403.12021'
    - 'Caltech institutional press release confirms the paper and metric details'
    - 'arXiv:2403.12021 abstract opened; coherence time 12.6(1) s and imaging survival 99.98952(1)% confirmed in the abstract text'
    - 'Quantum Computing Report independently describes the result with consistent metrics on September 28 2025'
    - 'Prior record arrays were hundreds of qubits; this is a documented order-of-magnitude advance with quality maintained'
    - 'No contradicting result or error in the record found'
about:
  - arch-neutral-atom
  - qec-logical-qubit-scaling
establishedBy:
  - url: https://arxiv.org/abs/2403.12021
    title: A tweezer array with 6100 highly coherent atomic qubits
    relation: reports
    date: '2024-03'
actors: [California Institute of Technology]
country: [US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
measurements:
  - kind: physical-qubits
    value: 6100
    qualifier: 'trapped in tweezer array, not error-corrected'
    modality: neutral-atom
    crossChecks: arch-neutral-atom
    note: '6,100 caesium atoms in 12,000 tweezer sites. An array size, not a count of qubits operated in a fault-tolerant demonstration.'
---

Key metrics from the published abstract: 6,100 atoms in ~12,000 sites; coherence time 12.6(1) seconds (record for hyperfine qubits in optical tweezers); room-temperature trapping lifetime 23 minutes; imaging survival 99.98952(1)%; imaging fidelity >99.99%.

The paper also demonstrates coherence-preserving atom transport and pick-up/drop-off operations at large spatial scales — the operations necessary for zone-based fault-tolerant computing where qubits must be shuttled to interaction zones without losing coherence.

The preprint was posted March 2024 (arXiv:2403.12021) and revised several times before journal acceptance in September 2025. The Nature paper is the authoritative record; the DOI listed above (10.1038/s41586-025-09498-7) is the journal reference derived from Endres Lab and corroborating sources — reviewer should verify against the Nature 647 issue directly.
