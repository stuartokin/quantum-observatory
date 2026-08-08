---
schema: frontier/v1
id: algo-quantum-simulation
title: Quantum simulation of materials
summary: 'Framework using reconfigurable neutral-atom processors to simulate strongly correlated spin Hamiltonians and extract molecular spectral properties via classical co-processing.'
plain: 'Simulating how electrons interact inside magnets, catalysts and battery materials requires tracking quantum correlations that overwhelm classical computers. Researchers at Harvard, MIT and LBNL demonstrated a framework that maps these interactions onto a programmable neutral-atom array, runs the time evolution on the quantum device, then extracts chemically relevant excitation energies and magnetic susceptibilities from the measurement record using ordinary computers. This is not yet a demonstration of quantum advantage — it is a working toolbox that makes such problems tractable on near-term hardware.'
pillar: quantum
readiness: experimental
constellation: algorithms
cluster: simulation
actors:
  - Harvard University
  - MIT
  - Lawrence Berkeley National Laboratory
  - University of Southern California
  - Rice University
country:
  - US
metrics:
  - name: simulation coherence time improvement
    value: 'up to 2 orders of magnitude'
    note: 'relative to Trotterised two-qubit-gate decomposition, from the paper'
priority: P1
qdayImpact: 1
qdayReasoning: 'Efficient simulation of strongly correlated materials could eventually narrow the gap between current NISQ devices and fault-tolerant quantum computers, accelerating hardware validation and algorithm development. The direct path to cryptographically relevant computation is indirect, so impact is scored +1.'
horizon: 2
novelty: new algorithm
evidence:
  claim: 'Nature Physics 2025: a digital-analogue simulation framework using reconfigurable qubit architectures simulates real-time dynamics of model spin Hamiltonians and extracts spectral properties including excitation energies and magnetic susceptibilities. The approach extends coherent simulation time by up to two orders of magnitude over Trotterised implementations.'
  verified: '2026-08-08'
  level: E4
  sources:
    - url: https://www.nature.com/articles/s41567-024-02738-z
      role: primary
      title: Programmable simulations of molecules and materials with reconfigurable quantum processors
      publisher: Nature Physics
      date: '2025-01-22'
      identifier: 'Nature Physics 21, 289-297 (2025)'
      doi: 10.1038/s41567-024-02738-z
      accessed: '2026-08-08'
links:
  - to: arch-neutral-atom
    relation: depends-on
  - to: crqc
    relation: evidence-for
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

A reconfigurable neutral-atom quantum processor is used to simulate spin Hamiltonians relevant to transition-metal catalysts and 2-D magnetic materials. The framework combines digital Floquet engineering with hardware-optimised multi-qubit gates, extending coherent simulation time by up to two orders of magnitude over standard Trotterised approaches. Spectral properties — excitation energies, finite-temperature susceptibilities — are then extracted by classical post-processing of quantum measurement snapshots. The work does not demonstrate quantum advantage over state-of-the-art classical methods, but establishes a hardware-efficient path toward it.
