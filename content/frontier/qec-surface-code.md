---
schema: frontier/v1
id: qec-surface-code
title: Surface code
summary: 'The dominant quantum error-correcting code: a 2D lattice of qubits with nearest-neighbour interactions only, error threshold ~1%, and ~1000:1 physical-to-logical qubit overhead. Defined in the Fowler et al. 2012 PRA blueprint; basis of almost every fault-tolerant result on this board.'
plain: 'The best-understood scheme for turning unreliable qubits into a reliable one. It only needs neighbouring qubits to talk to each other, which makes it easy to build, but it is greedy: roughly a thousand physical qubits for one useful one. The 2012 Fowler-Martinis paper is the canonical blueprint — 54 pages showing how to lay out the qubits, measure errors, and run a universal quantum computer. Every major below-threshold demonstration on this board (Google Willow, Quantinuum Helios, IBM gross code) builds on or competes with this foundation.'
pillar: quantum
constellation: error-correction
readiness: demonstrated
actors:
  - University of Melbourne
  - University of California Santa Barbara
country:
  - AU
  - US
metrics:
  - name: Typical physical-to-logical overhead
    value: '~1000'
    unit: 'physical qubits per logical qubit'
    note: 'At code distance sufficient to suppress errors to useful levels; exact figure depends on physical error rate'
  - name: Error threshold
    value: '~1'
    unit: '%'
    note: 'Fowler et al. 2012 estimate; physical gate error must be below this for the code to help'
links:
  - to: qec-qldpc-bivariate-bicycle
    relation: competes-with
  - to: qec-below-threshold-surface-code
    relation: evidence-for
  - to: qec-colour-code
    relation: competes-with
priority: P1
horizon: 2
qdayImpact: 0
qdayReasoning: ''
confidence: high
status: published
novelty: incremental
evidence:
  claim: 'Fowler, Mariantoni, Martinis and Cleland (Physical Review A 86, 032324, 2012; arXiv:1208.0928) provide the field-defining blueprint for surface code quantum computing on a 2D nearest-neighbour qubit lattice. The paper estimates size and speed of a surface code quantum computer, derives the ~1% error threshold, and describes the full gate set including logical qubit movement, braid transformations, and T-gate magic state injection. It is the primary reference for surface code architecture and is cited as foundation by every major QEC result on this board.'
  verified: '2026-08-09'
  level: E4
  sources:
    - url: 'https://arxiv.org/abs/1208.0928'
      role: primary
      title: 'Surface codes: Towards practical large-scale quantum computation'
      publisher: 'Physical Review A'
      date: '2012-08-04'
      identifier: 'Phys. Rev. A 86, 032324 (2012); arXiv:1208.0928'
      doi: 10.1103/PhysRevA.86.032324
      accessed: '2026-08-09'
      note: 'Fowler, Mariantoni, Martinis, Cleland. University of Melbourne and UCSB. 54-page blueprint; freely accessible on arXiv. The canonical surface code reference.'
origin: agent
added: '2026-08-09'
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-09'
  note: 'Sourced from Fowler et al. 2012 PRA. Evidence raised from placeholder E1 to E4. Confidence raised from low to high. Status changed from draft to published. The prior source (NIST PQC project page) was not a source for the surface code and has been replaced.'
---

The surface code is the workhorse of quantum error correction: a 2D lattice of data and ancilla qubits where each qubit only needs to interact with its four nearest neighbours. Error information is extracted by repeatedly measuring the ancillas; a minimum-weight matching decoder then corrects errors. The code tolerates physical gate error rates up to roughly 1% — high enough that the best superconducting and trapped-ion hardware today can operate below threshold.

Fowler, Mariantoni, Martinis and Cleland (Physical Review A, 2012) provided the field-defining blueprint: qubit layout, syndrome extraction circuits, logical qubit movement via braiding, and the full universal gate set including T-gate magic state distillation. Every major fault-tolerant result on this board — Google Willow below threshold, IBM gross code, Quantinuum logical qubit scaling — either builds on this architecture or explicitly positions itself against it.

The main drawback is overhead: roughly 1,000 physical qubits per logical qubit at error rates achievable today. This is why IBM's bivariate bicycle codes (which cut overhead tenfold) and cat qubit approaches (which suppress one error type intrinsically) are active competitors.
