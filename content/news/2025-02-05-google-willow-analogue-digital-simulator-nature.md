---
schema: news/v1
id: 2025-02-05-google-willow-analogue-digital-simulator-nature
headline: 'Google Quantum AI publishes 69-qubit analogue-digital hybrid simulator in Nature with beyond-classical benchmarking performance'
pillar: quantum
date: '2025-02-05'
plain: 'Most quantum simulators are either digital (programmable but error-prone) or analogue (precise but limited to one type of physics). Google Quantum AI combined both modes in a single 69-qubit superconducting device, demonstrated performance beyond classical simulation in benchmarking tests, and used it to study how quantum systems reach thermal equilibrium in the 2D XY spin model. The physics studied — thermal equilibration and phase transitions — is genuinely open science, though not currently commercially relevant. The result extends what hybrid quantum simulation hardware can do, complementing earlier demonstrations on neutral atoms and trapped ions.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-024-08460-3
  kind: paper
  title: 'Thermalization and criticality on an analogue-digital quantum simulator'
  publisher: Nature
  date: '2025-02-05'
  doi: 10.1038/s41586-024-08460-3
corroboration:
  - url: https://pmc.ncbi.nlm.nih.gov/articles/PMC11798852/
    publisher: PubMed Central
    kind: paper
validation:
  status: verified
  checks:
    - 'Nature paper DOI 10.1038/s41586-024-08460-3 confirmed; volume 638, pages 79-85; epub February 5, 2025'
    - 'PMC full text opened; confirms 69-qubit figure, beyond-classical cross-entropy benchmarking result, and Kibble-Zurek and Kosterlitz-Thouless physics'
    - 'Author list (Andersen, Astrakhantsev, Karamlou et al.) confirmed as Google Quantum AI with academic collaborators at University of Maryland, Caltech, EPFL'
    - 'This is a different paper from the Google Willow QEC below-threshold result (Nature 638, 920-926); the simulator paper is pages 79-85 of the same volume'
    - 'Beyond-classical claim is for analogue simulation benchmarking, not for cryptographically relevant computation; no threat to encryption'
about:
  - algo-quantum-simulation
  - arch-superconducting
establishedBy:
  - url: https://arxiv.org/abs/2412.07935
    title: 'Thermalization and criticality on an analogue-digital quantum simulator'
    relation: reports
    date: '2024-12'
actors: [Google Quantum AI]
country: [US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The device runs in two modes: digital (gates between any pair of qubits) and analogue (continuous Hamiltonian evolution under a programmable interaction). The hybrid capability allows flexible state preparation via digital circuits followed by time evolution under a tunable analogue Hamiltonian, then measurement — more flexible than purely analogue quantum simulators.

The physics studied: thermal equilibration in the 2D XY model (a model of phase ordering, relevant to superconductors and magnetic systems). The team observed a breakdown of Kibble-Zurek scaling predictions when coarsening is present — a long-standing theoretical prediction that does not hold in this regime — and signatures of the Kosterlitz-Thouless phase transition.

The beyond-classical claim rests on cross-entropy benchmarking, which compares device output to ideal quantum predictions. This metric has known limitations as a proxy for computational utility: it measures how quantum the output is, not whether the computation is useful. The simulation results themselves (the physics findings) are the more substantive claim.
