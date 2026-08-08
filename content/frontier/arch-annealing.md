---
schema: frontier/v1
id: arch-annealing
title: Quantum annealing
summary: Analogue quantum optimisation via adiabatic evolution of a programmable spin Hamiltonian, demonstrated beyond classical reach for spin-glass simulation.
plain: A quantum annealer is a special-purpose quantum computer that encodes an optimisation problem as a network of interacting magnets (spins), then lets quantum tunnelling find the lowest-energy — i.e. best — solution. D-Wave has shipped cloud-accessible annealers with thousands of qubits. A 2025 Science paper showed the system outpacing the world's fastest classical supercomputer on a physics simulation task, though only for that narrow problem class.
pillar: quantum
readiness: demonstrated
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
    value: "5000"
    unit: physical qubits
    note: Pegasus graph topology
  - name: task
    value: spin-glass quench dynamics
    note: two-, three-, and infinite-dimensional models
  - name: classical comparison
    value: Frontier supercomputer (ORNL)
    note: MPS and PEPS tensor-network methods could not match annealer accuracy within reasonable time
links:
  - to: algo-quantum-simulation
    relation: enables
  - to: arch-superconducting
    relation: competes-with
evidence:
  claim: King et al. (Science 2025) demonstrate that D-Wave superconducting quantum annealers rapidly generate samples in close agreement with Schrödinger-equation solutions for spin-glass quench dynamics, outpacing tensor-network and neural-network classical methods within a reasonable time frame.
  verified: '2026-08-08'
  level: E4
  sources:
    - url: https://www.science.org/doi/10.1126/science.ado6285
      role: primary
      title: Beyond-classical computation in quantum simulation
      publisher: Science
      date: '2025-04-11'
      identifier: Science 388, 6743 (2025)
      doi: 10.1126/science.ado6285
      accessed: '2026-08-08'
      note: arXiv preprint 2403.00910. Lead author A.D. King and most co-authors are D-Wave employees or shareholders; independent academic collaborators from Jagiellonian University and UBC participated.
confidence: high
status: published
moved:
  from: adopted
  on: '2026-08-08'
priority: P2
qdayImpact: 0
horizon: 2
novelty: beyond-classical demonstration on physics simulation
origin: agent
added: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agentMergedOn: '2026-08-08'
  agent: sourcer
  note: 'restored after an accidental bulk confirmation'
---

Quantum annealing encodes combinatorial optimisation and physics-simulation problems as an Ising Hamiltonian and exploits quantum tunnelling to search the energy landscape. D-Wave has operated cloud-accessible superconducting annealers commercially since 2011, scaling to ~5,000 qubits on the Advantage and Advantage2 systems.

A 2025 Science paper by King et al. showed that the Advantage2 prototype generates samples of spin-glass quench dynamics in close agreement with Schrödinger-equation solutions across two-, three- and infinite-dimensional geometries — a regime where leading tensor-network and neural-network methods could not match the annealer's accuracy within a practical time budget. The classical benchmark was run on Frontier, the ORNL petascale supercomputer.

**Caveats.** The result is specific to spin-glass simulation; it does not establish general quantum advantage for combinatorial optimisation. Most co-authors are D-Wave employees. Independent replication has not yet been published, which is why the item sits at E4 rather than E5.
