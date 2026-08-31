---
schema: frontier/v1
id: arch-annealing
title: Quantum annealing
summary: Analogue quantum optimisation via adiabatic evolution of a programmable spin Hamiltonian. D-Wave 2025 Science paper claimed beyond-classical reach; a 2026 Science paper by Tindall et al. showed classical BP-TNS methods match in 2D and 3D regimes. D-Wave disputes the scope.
plain: 'A quantum annealer is a special-purpose quantum computer that encodes an optimisation problem as a network of interacting magnets (spins), then lets quantum tunnelling find the lowest-energy — i.e. best — solution. D-Wave has shipped cloud-accessible annealers with thousands of qubits. A 2025 Science paper claimed the system outpaced the world fastest classical supercomputer on a physics simulation task. A 2026 Science paper by Tindall et al. at the Flatiron Institute showed classical tensor-network methods using belief propagation can match D-Wave results on two- and three-dimensional spin-glass geometries. D-Wave disputes the scope: they argue Tindall did not attempt the most complex lattice geometry, the largest 3D simulations, the low-precision ensembles where correlations grow fastest, or the fourth-order observables. The scientific question of whether the original advantage claim survives is unresolved. Readiness moves to experimental pending resolution.'
pillar: quantum
readiness: experimental
constellation: architectures
cluster: analogue
actors:
  - D-Wave Quantum
  - Oak Ridge National Laboratory
  - Jagiellonian University
country:
  - CA
  - US
  - PL
metrics:
  - name: qubits (Advantage2 prototype)
    value: '5000'
    unit: physical qubits
    note: Pegasus graph topology
  - name: task
    value: spin-glass quench dynamics
    note: two-, three-, and infinite-dimensional models
  - name: classical comparison
    value: Frontier supercomputer (ORNL)
    note: MPS and PEPS tensor-network methods could not match annealer accuracy within reasonable time (King et al. 2025); BP-TNS methods did match in 2D/3D regimes (Tindall et al. 2026)
links:
  - to: algo-quantum-simulation
    relation: enables
  - to: arch-superconducting
    relation: competes-with
evidence:
  claim: 'King et al. (Science 2025, DOI 10.1126/science.ado6285) demonstrate that D-Wave superconducting quantum annealers generate samples in close agreement with Schrodinger-equation solutions for spin-glass quench dynamics, outpacing tensor-network and neural-network classical methods within a reasonable time frame. Tindall et al. (Science 2026, DOI 10.1126/science.adx2728; preprint arXiv:2503.05693) subsequently showed that belief-propagation tensor-network (BP-TNS) classical methods can simulate the same spin-glass dynamics in 2D and 3D lattice geometries with state-of-the-art accuracy using modest computational resources. D-Wave disputes the scope of Tindall et al.: their comment (arXiv:2504.06283) states Tindall did not attempt the most complex lattice geometry, did not reproduce the largest 3D simulations, did not simulate low-precision ensembles where correlations grow fastest, and did not produce full-state or fourth-order observables. The classical-simulability question remains scientifically unresolved. Readiness moved from demonstrated to experimental pending independent resolution of the scope dispute.'
  verified: '2026-08-09'
  level: E4
  sources:
    - url: https://www.science.org/doi/10.1126/science.ado6285
      role: primary
      title: Beyond-classical computation in quantum simulation
      publisher: Science
      date: '2025-04-11'
      identifier: 'Science 388, 6743 (2025)'
      doi: 10.1126/science.ado6285
      accessed: '2026-08-09'
      note: 'Lead author A.D. King and most co-authors are D-Wave employees or shareholders; independent academic collaborators from Jagiellonian University and UBC participated. Preprint arXiv:2403.00910.'
    - url: https://www.science.org/doi/10.1126/science.adx2728
      role: corroborating
      title: Dynamics of disordered quantum systems with two- and three-dimensional tensor networks
      publisher: Science
      date: '2026-05-22'
      identifier: 'Science 392, 6800: 868 (2026)'
      doi: 10.1126/science.adx2728
      accessed: '2026-08-09'
      note: 'Tindall, Mello, Fishman, Stoudenmire, Sels; Flatiron Institute and Boston University. Peer-reviewed rebuttal showing BP-TNS matches D-Wave in 2D/3D regimes. Confirmed published May 2026. D-Wave disputes scope via arXiv:2504.06283.'
confidence: medium
status: published
moved:
  from: demonstrated
  on: '2026-08-09'
priority: P2
qdayImpact: 0
horizon: 2
novelty: beyond-classical demonstration on physics simulation (contested)
origin: agent
added: '2026-08-08'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-09'
  reviewedOn: '2026-08-31'
  note: Science 392, 868-872 (Tindall et al., adx2728) confirmed peer-reviewed. D-Wave response confirmed active (LinkedIn post 'Still beyond classical' May 26 2026; D-Wave press release same date per arXiv:2606.20187 references). E4 correct for two peer-reviewed Science papers as primary and corroborating. No corrections.
---

Quantum annealing encodes combinatorial optimisation and physics-simulation problems as an Ising Hamiltonian and exploits quantum tunnelling to search the energy landscape. D-Wave has operated cloud-accessible superconducting annealers commercially since 2011, scaling to ~5,000 qubits on the Advantage and Advantage2 systems.

A 2025 Science paper by King et al. showed that the Advantage2 prototype generates samples of spin-glass quench dynamics in close agreement with Schrödinger-equation solutions across two-, three- and infinite-dimensional geometries — a regime where leading tensor-network and neural-network methods could not match the annealer's accuracy within a practical time budget. The classical benchmark was run on Frontier, the ORNL petascale supercomputer.

A 2026 Science paper by Tindall et al. (Flatiron Institute / Boston University) showed that belief-propagation tensor-network (BP-TNS) methods can match D-Wave results on the 2D and 3D lattice geometries, achieving state-of-the-art accuracy with modest computational resources. D-Wave disputes the scope: their published comment (arXiv:2504.06283) argues Tindall did not attempt the most complex lattice geometry, the largest 3D simulations, low-precision ensembles where quantum correlations grow fastest, or the fourth-order observables that the annealer produces.

**Status:** The scientific question is unresolved. Both the King et al. claim and the Tindall et al. response are peer-reviewed and published in Science. Readiness is moved from demonstrated to experimental pending independent resolution of the scope dispute. Confidence remains medium.
