---
schema: frontier/v1
id: enable-compilers
title: Fault-tolerant compilers
summary: Software compilers that translate arbitrary quantum algorithms into the physical operations required by error-correcting codes such as the surface code, including magic state distillation and lattice surgery scheduling.
plain: |
  A fault-tolerant quantum computer cannot just run any program directly — its error correction layer demands that logical operations be decomposed into very specific low-level physical sequences. A fault-tolerant compiler does that translation automatically, similar to how a classical compiler turns high-level code into machine instructions. The challenge is that fault-tolerant sequences are enormously complex: a single logical gate may require millions of physical steps, and the compiler must schedule them without creating new errors.
pillar: quantum
readiness: experimental
constellation: enabling
actors:
  - Aalto University
  - Simon Fraser University
country:
  - FI
  - CA
horizon: 2
priority: P1
metrics:
  - name: Compilation throughput
    value: "80"
    unit: million logical surface code instructions compiled in seconds
    note: 128-qubit QFT in Clifford+T — Watkins et al. 2024
evidence:
  claim: >-
    Watkins et al. (2024) present the first high-performance compiler for very large scale surface code quantum error correction, translating arbitrary circuits to lattice-surgery operations; it compiled 80 million logical instructions for a 128-qubit QFT within seconds using a streaming pipeline.
  level: E4
  verified: '2026-08-08'
  sources:
    - url: https://quantum-journal.org/papers/q-2024-05-22-1354/
      role: primary
      title: A High Performance Compiler for Very Large Scale Surface Code Computations
      publisher: Quantum
      date: '2024-05-22'
      identifier: 'Quantum 8, 1354 (2024)'
      doi: 10.22331/q-2024-05-22-1354
      accessed: '2026-08-08'
      note: Open access. arXiv preprint at arXiv:2302.02459.
    - url: https://arxiv.org/abs/2302.02459
      role: preprint
      title: A High Performance Compiler for Very Large Scale Surface Code Computations
      publisher: arXiv
      date: '2023-02-05'
      identifier: arXiv:2302.02459
      accessed: '2026-08-08'
links:
  - to: qec-surface-code
    relation: depends-on
  - to: qec-magic-state-distillation
    relation: depends-on
  - to: algo-resource-estimation
    relation: enables
qdayImpact: 0
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

Fault-tolerant compilers sit between high-level quantum algorithms and the physical error-correction layer. The Watkins et al. 2024 compiler (open-sourced) is the first demonstrated at very large scale, processing millions of lattice-surgery instructions in a streaming pipeline. The field is at the experimental stage: working tools exist, but they have not been deployed against production-grade fault-tolerant hardware because no such hardware yet exists at scale.
