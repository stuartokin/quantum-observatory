---
schema: frontier/v1
id: enable-compilers
title: Fault-tolerant compilers
summary: Software that translates high-level quantum algorithms into the low-level surface-code lattice surgery operations a fault-tolerant quantum computer can execute.
plain: Running a quantum algorithm on a fault-tolerant machine is nothing like running it on today's noisy hardware. Every logical operation must be broken down into tiny, error-corrected steps called lattice surgery — a kind of quantum plumbing. Fault-tolerant compilers automate that translation. Without them, programming a fault-tolerant quantum computer would be like writing machine code by hand for every computation.
pillar: quantum
readiness: experimental
constellation: enabling
actors:
  - University of Melbourne
  - Macquarie University
  - Google Quantum AI
country:
  - AU
  - US
horizon: 2
priority: P1
qdayImpact: 1
qdayReasoning: Better compilers reduce the physical-qubit overhead needed to run Shor's algorithm, directly shrinking the gap between current hardware and a cryptographically relevant machine. Effect is real but secondary to hardware progress.
evidence:
  claim: Watkins et al. 2024 published the first high-performance compiler for very large-scale surface code computations, translating arbitrary logical circuits to lattice surgery schedules; demonstrated on circuits up to hundreds of logical qubits. Not yet independently replicated at scale.
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
      note: Peer-reviewed; open-access. First compiler targeting very large scale surface code. Widely cited as state of the art in subsequent 2025–2026 FTQC compilation papers.
metrics:
  - name: Compiler target
    value: 'Very large scale surface code (hundreds of logical qubits)'
    note: Paper describes translation from arbitrary logical circuit to lattice surgery schedule
links:
  - to: qec-surface-code
    relation: depends-on
  - to: qec-modular-architecture
    relation: enables
  - to: algo-resource-estimation
    relation: enables
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

Fault-tolerant compilers occupy a critical but often invisible layer of the quantum computing stack. Watkins et al. (2024) delivered the first compiler demonstrated on very large scale surface code problems, establishing that the translation from logical algorithm to physical lattice surgery schedule is tractable. Subsequent work (DASCOT 2025, C-Phase-Aware 2026) continues to improve scheduling efficiency, showing an active and accelerating research front.
