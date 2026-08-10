---
schema: news/v1
id: 2025-02-05-oxford-distributed-qc-optical-link
headline: Oxford demonstrates deterministic distributed quantum computing across a photonic link in Nature
pillar: quantum
date: '2025-02-05'
plain: 'Until this paper, every demonstration of distributing quantum gates across a network had been probabilistic — gates worked only some of the time, requiring post-selection. The Oxford group showed that two trapped-ion modules connected by optical fibre can perform deterministic, repeatable gate teleportation, then ran Grover''s search algorithm across the link — the first distributed quantum algorithm comprising multiple non-local two-qubit gates run deterministically. The result is a laboratory proof of concept at two metres of separation, not a deployable network. It validates the architecture that would allow quantum processors to be networked without the connectivity penalty that limits monolithic designs, which matters for both scaling quantum computers and for the eventual quantum internet.'
significance: headline
source:
  url: https://www.nature.com/articles/s41586-024-08404-x
  kind: paper
  title: Distributed quantum computing across an optical network link
  publisher: Nature
  date: '2025-02-05'
  doi: 10.1038/s41586-024-08404-x
corroboration:
  - url: https://www.physics.ox.ac.uk/research/group/ion-trap-quantum-computing/research-areas/quantum-networking
    publisher: University of Oxford Department of Physics
    kind: authority
validation:
  status: verified
  checks:
    - 'Nature paper opened; DOI 10.1038/s41586-024-08404-x confirmed; paper is Nature 638, 383-388 (2025)'
    - 'Oxford Ion Trap group publications page lists the paper with arXiv:2407.00835 and the Nature 638 reference'
    - 'Key result confirmed in paper abstract: deterministic CZ gate teleportation at 86% fidelity; Grover algorithm run across two modules at 71% success rate'
    - 'Paper states explicitly that prior demonstrations did not satisfy the requirement for deterministic and repeatable QGT'
    - 'No contradicting replication attempt or refutation found'
about:
  - arch-trapped-ion
  - qec-modular-architecture
  - comms-quantum-repeater
establishedBy:
  - url: https://arxiv.org/abs/2407.00835
    title: Distributed quantum computing across an optical network link
    relation: reports
    date: '2024-07'
actors: [University of Oxford]
country: [UK]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The critical novelty here is determinism. Previous photonic distributed gates required post-selection on measurement outcomes, meaning they worked only probabilistically. The Oxford team used heralded remote entanglement between network qubits to teleport a CZ gate between circuit qubits in separate modules with 86% fidelity, repeatable on demand. Grover's search algorithm was then run across the two-module system.

The modules are approximately two metres apart. No long-fibre demonstration was part of this work. The claim that the architecture extends to other physical platforms rests on the generality of photonic interconnects, not on demonstrated multi-platform performance.

What this does not show: fault-tolerance, error correction, or utility-scale computation. Gate fidelity of 86% is well below fault-tolerance thresholds. The result is an architectural proof of concept for modular quantum computing.
