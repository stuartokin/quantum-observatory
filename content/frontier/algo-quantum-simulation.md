---
schema: frontier/v1
id: algo-quantum-simulation
title: Quantum simulation of materials
summary: 'Using quantum processors to simulate quantum systems — magnetic materials, spin glasses, molecular energies — where classical methods scale exponentially.'
plain: 'Quantum computers are naturally good at simulating other quantum systems — a point Feynman made in 1982. In 2025, D-Wave published the first peer-reviewed result claiming that a quantum annealer solved a physically relevant spin-glass simulation problem faster than the Frontier supercomputer could, with results in close agreement with exact quantum-mechanical solutions. The result is contested (debate over whether improved classical algorithms close the gap) but it is published in Science and is the strongest claim of practical quantum advantage for a scientifically meaningful problem to date.'
pillar: quantum
readiness: experimental
constellation: algorithms
cluster: simulation
actors:
  - D-Wave Quantum
  - University of British Columbia
  - Jagiellonian University
country:
  - Canada
  - Poland
metrics:
  - name: Processor size
    value: '5000'
    unit: qubits
    note: 'D-Wave Advantage2 prototype, superconducting annealer'
  - name: Classical comparator
    value: 'Frontier supercomputer (Oak Ridge NL)'
    unit: ''
    note: 'Tensor-network and neural-network methods could not match annealer accuracy within comparable time'
links:
  - to: arch-annealing
    relation: depends-on
evidence:
  claim: 'King et al. (2025) demonstrate that D-Wave superconducting quantum annealers generate samples in close agreement with Schrödinger-equation solutions for spin-glass quench dynamics, with area-law entanglement scaling, in a regime where leading classical tensor-network and neural-network methods cannot match the accuracy within a reasonable time frame.'
  verified: '2026-08-08'
  level: E4
  sources:
    - url: https://www.science.org/doi/10.1126/science.ado6285
      role: primary
      title: 'Beyond-classical computation in quantum simulation'
      publisher: Science
      date: '2025-03-14'
      identifier: 'Science 388(6743), ado6285'
      doi: 10.1126/science.ado6285
      accessed: '2026-08-08'
      note: 'Led by D-Wave; majority of authors are D-Wave employees or shareholders. Classical simulability debate is active — see Tindall et al. arXiv:2503.05693.'
confidence: medium
status: published
priority: P1
qdayImpact: 0
qdayReasoning: ''
horizon: 2
novelty: 'first peer-reviewed beyond-classical claim for scientifically meaningful simulation'
origin: agent
added: '2026-08-08'
review:
  state: reviewed
  by: human
  'on': '2026-08-08'
  agentMergedOn: '2026-08-08'
  agent: sourcer
---

The most valuable early application of quantum computers is expected to be simulating quantum physics itself — chemistry, materials, and condensed matter — where the quantum state space grows exponentially and classical computers must approximate. D-Wave published the first result in a high-profile peer-reviewed venue (Science, 2025) claiming that their annealing processor outperforms the world-class Frontier supercomputer on a specific spin-glass simulation relevant to magnetic materials research. The classical-simulability debate remains open, and all authors are D-Wave affiliated, which limits the independence of the result. Confidence is set to medium for that reason; readiness stays at experimental until independent replication.
