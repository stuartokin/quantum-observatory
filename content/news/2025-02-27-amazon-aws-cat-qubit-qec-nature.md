---
schema: news/v1
id: 2025-02-27-amazon-aws-cat-qubit-qec-nature
headline: 'Amazon AWS publishes first hardware-efficient QEC via concatenated bosonic cat qubits in Nature'
pillar: quantum
date: '2025-02-27'
plain: 'The qubit overhead of quantum error correction is the central obstacle to fault-tolerant computing. Amazon AWS''s hardware team demonstrated that concatenating cat qubits — which passively suppress bit-flip errors via two-photon dissipation — with an outer distance-5 repetition code achieves below-threshold phase-flip correction with substantially fewer physical qubits than a standalone surface code. This is the first major hardware result from Amazon''s own quantum programme and the first peer-reviewed evidence that the concatenated-bosonic approach is experimentally viable at this scale. It is one competing path to fault tolerance, not yet a comparison winner against surface codes or LDPC codes.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-025-08642-7
  kind: paper
  title: 'Hardware-efficient quantum error correction via concatenated bosonic qubits'
  publisher: Nature
  date: '2025-02-27'
  doi: 10.1038/s41586-025-08642-7
corroboration:
  - url: https://arxiv.org/abs/2409.13025
    publisher: arXiv
    kind: preprint
  - url: https://phys.org/news/2025-02-schrdinger-cat-quantum.html
    publisher: phys.org
    kind: press
validation:
  status: verified
  checks:
    - 'Nature paper DOI 10.1038/s41586-025-08642-7 confirmed; journal date February 27, 2025, volume 638, pages 927-934'
    - 'arXiv preprint 2409.13025 (Sep 2024) confirmed as underlying work; journal paper is the peer-reviewed record'
    - 'Lead author email in arXiv HTML is putterma@amazon.com confirming Amazon AWS affiliation'
    - 'phys.org independently confirms publication date and result with consistent details'
    - 'Result is distinct from Alice and Bob cat-qubit work (different hardware, superconducting circuit); no overlap with existing board items'
    - 'Minimum logical error per cycle 1.65% for distance-5 code; below-threshold operation confirmed in paper'
about:
  - arch-cat-qubits
  - qec-error-correction-threshold
  - qec-logical-fidelity
establishedBy:
  - url: https://arxiv.org/abs/2409.13025
    title: 'Hardware-efficient quantum error correction via concatenated bosonic qubits'
    relation: reports
    date: '2024-09'
actors: [Amazon Web Services]
country: [US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The device uses five cat-qubit data modes, each stabilised against bit-flip errors by two-photon dissipation in a superconducting microwave resonator. Ancilla transmons measure phase-flip syndromes via a repetition code. The key claim is that the phase-flip repetition code operates below threshold — meaning errors decrease as code distance grows — while the bosonic encoding handles bit flips passively, reducing the total qubit overhead compared with a code that must protect against both error types independently.

This is not a universal fault-tolerant logical qubit: the repetition code corrects only phase flips, and no universal gate set on the logical qubit was demonstrated. The result is a proof-of-principle that the concatenated-bosonic architecture scales correctly in the error direction, which is the prerequisite for a full fault-tolerant implementation.
