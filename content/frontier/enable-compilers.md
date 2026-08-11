---
schema: frontier/v1
id: enable-compilers
title: Fault-tolerant compilers
summary: 'Software compilers that translate arbitrary quantum circuits into the physical gate sequences required by fault-tolerant quantum error correction architectures such as the surface code.'
plain: 'Running a useful algorithm on a fault-tolerant quantum computer requires translating the algorithm into thousands or millions of low-level physical operations specific to the error-correction scheme in use. Compilers do this translation automatically. Watkins et al. (2024) published the first compiler capable of handling very large surface code computations — compiling 80 million logical instructions for a 128-qubit quantum Fourier transform in seconds — fast enough for real-time operation.'
pillar: quantum
constellation: enabling
readiness: experimental
cluster: software-stack
actors:
  - 'Macquarie University'
  - 'Horizon Quantum Computing'
country:
  - AU
  - SG
horizon: 2
novelty: first high-performance surface code compiler at scale
priority: P1
qdayImpact: 1
qdayReasoning: 'Compilers are a necessary enabling technology for any fault-tolerant quantum computer. Better compilers reduce circuit overhead and thus the total qubit count required for a given computation, modestly accelerating the path to cryptographically relevant systems. The effect is indirect and cannot accelerate Q-Day on its own.'
metrics:
  - name: 'Logical instructions compiled'
    value: '80000000'
    unit: 'instructions'
    note: '128-qubit QFT compiled in seconds at streaming speed'
  - name: 'Target architecture'
    value: 'surface code (lattice surgery)'
links:
  - to: qec-surface-code
    relation: depends-on
  - to: qec-below-threshold-surface-code
    relation: depends-on
  - to: algo-resource-estimation
    relation: enables
evidence:
  claim: 'Watkins et al. (2024) present the first high-performance compiler for very large scale quantum error correction, translating arbitrary quantum circuits to surface code lattice-surgery operations. The compiler compiled 80 million logical surface code instructions for a 128-qubit QFT in seconds, at speeds compatible with real-time device operation. The compiler is open-source.'
  level: E4
  verified: '2026-08-08'
  sources:
    - url: https://quantum-journal.org/papers/q-2024-05-22-1354/
      role: primary
      title: 'A High Performance Compiler for Very Large Scale Surface Code Computations'
      publisher: Quantum
      date: '2024-05-22'
      identifier: 'Quantum 8, 1354 (2024)'
      doi: 10.22331/q-2024-05-22-1354
      accessed: '2026-08-08'
      note: 'Peer-reviewed; Watkins, Nguyen, Watkins, Pearce, Lau, Paler; open-source at github.com/latticesurgery-com'
confidence: high
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-08'
  reviewedOn: '2026-08-11'
  note: 'Quantum 8, 1354 (2024) confirmed via five independent citations in recent arXiv papers (arXiv:2511.20947, 2311.18042, 2410.14891, 2605.14042, and dl.acm.org). DOI 10.22331/q-2024-05-22-1354 resolves correctly. 80M instructions for 128-qubit QFT at streaming speed confirmed. E4 correct for peer-reviewed Quantum journal paper. No changes made.'
---

Fault-tolerant quantum computers must translate human-readable algorithms into millions of precise physical operations suited to the error-correction code they run. Compilers do this. Watkins et al. built and published the first compiler capable of handling very large surface-code computations using lattice surgery, processing 80 million logical instructions for a 128-qubit quantum Fourier transform in seconds — fast enough to keep pace with a real device. The compiler is open source and includes a resource estimator, making it a practical tool for planning future fault-tolerant systems.
