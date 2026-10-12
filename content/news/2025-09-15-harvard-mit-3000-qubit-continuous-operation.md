---
schema: news/v1
id: 2025-09-15-harvard-mit-3000-qubit-continuous-operation
headline: Harvard and MIT solve the atom-loss bottleneck, demonstrating continuous operation of a 3,000-qubit neutral-atom system for over two hours
pillar: quantum
date: '2025-09-15'
plain: Neutral-atom quantum computers lose atoms during computation, forcing them to restart every 60 seconds or so. Harvard and MIT demonstrated a continuous reloading architecture — using optical lattice conveyor belts to replenish the array — that keeps a 3,000-qubit system running coherently for over two hours. This removes one of the practical barriers to running deep quantum circuits on large neutral-atom arrays.
significance: notable
source:
  url: https://www.nature.com/articles/s41586-025-09596-6
  kind: paper
  title: Continuous operation of a coherent 3,000-qubit system
  publisher: Nature
  date: '2025-09-15'
  doi: 10.1038/s41586-025-09596-6
validation:
  status: verified
  checks:
    - Nature paper opened; title and abstract directly state continuous operation of a 3,000-qubit system for more than two hours
    - Reloading rate of up to 300,000 atoms per second stated in paper and confirmed in APS abstract
    - Harvard and MIT affiliations confirmed from author list
about:
  - arch-neutral-atom
  - qec-ftqc-neutral-atom
establishedBy:
  - url: https://doi.org/10.1038/s41586-025-09596-6
    title: Continuous operation of a coherent 3,000-qubit system
    relation: reports
    date: '2025-09-15'
    doi: 10.1038/s41586-025-09596-6
actors:
  - Harvard University
  - Massachusetts Institute of Technology
country:
  - US
measurements:
  - kind: physical-qubits
    value: 3000
    unit: qubits
    qualifier: physical, continuously operated
    modality: neutral-atom
    note: Paper states array of over 3,000 atoms maintained for more than 2 hours. 3000 used as the floor value; paper does not give a precise upper count.
    crossChecks: arch-neutral-atom
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-10-12'
status: published
added: '2026-10-12'
---

Atom loss has been a fundamental constraint on neutral-atom quantum computing: tweezers hold atoms for roughly 60 seconds, after which the array must be reloaded from scratch, limiting circuit depth and continuous operation. The Harvard-MIT team used dual optical lattice conveyor belts to transport cold atom reservoirs continuously into the science region, replenishing tweezers at up to 300,000 atoms per second without disturbing qubits already in storage. The result is continuous coherent operation for over two hours — more than seven times the prior trap lifetime limit. The paper does not report gate fidelities for circuits run across the full array during continuous operation; the result is architectural rather than a fidelity benchmark.
