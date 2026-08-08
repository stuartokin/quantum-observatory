---
schema: frontier/v1
id: enable-control-electronics
title: Cryogenic control electronics
summary: Integrated circuits — primarily cryo-CMOS — designed to operate inside the cryostat alongside qubits, replacing or augmenting room-temperature rack-based electronics to reduce wiring bottlenecks.
plain: |
  Today's quantum processors live inside refrigerators cooled to near absolute zero, but their control electronics sit in warm racks outside and connect via thousands of cables. Each cable carries heat into the fridge and limits how many qubits can be controlled. Cryogenic control electronics — chips built to work at 4 degrees above absolute zero — move that control circuitry inside the fridge, drastically reducing the number of cables needed and making it plausible to scale to millions of qubits.
pillar: quantum
readiness: experimental
constellation: enabling
actors:
  - IBM Research
  - Imec
  - Intel
country:
  - US
  - BE
horizon: 2
priority: P1
metrics:
  - name: Power dissipation per qubit at 4K
    value: "23"
    unit: mW per qubit under active control
    note: 14-nm FinFET cryo-CMOS ASIC, IBM — Underwood et al. arXiv:2302.11538
  - name: Gate demonstrated
    value: "two-qubit cross-resonance gate"
    note: Achieved with cryogenic ASIC anchored at 4K stage
evidence:
  claim: >-
    Underwood et al. (2023) demonstrated a 14-nm FinFET cryo-CMOS ASIC anchored at the 4 K stage of a dilution refrigerator that generated qubit control waveforms and realised a two-qubit cross-resonance gate between fixed-frequency transmons, consuming 23 mW per qubit under active control.
  level: E3
  verified: '2026-08-08'
  sources:
    - url: https://arxiv.org/abs/2302.11538
      role: preprint
      title: Using Cryogenic CMOS Control Electronics To Enable A Two-Qubit Cross-Resonance Gate
      publisher: arXiv
      date: '2023-02-22'
      identifier: arXiv:2302.11538
      accessed: '2026-08-08'
      note: IBM Research. 14-nm FinFET ASIC at T=4K stage. Published in Physical Review Applied.
    - url: https://arxiv.org/abs/2410.15895
      role: corroborating
      title: Cryogenic Control and Readout Integrated Circuits for Solid-State Quantum Computing
      publisher: arXiv
      date: '2024-10-21'
      identifier: arXiv:2410.15895
      accessed: '2026-08-08'
      note: Comprehensive review of cryo-CMOS and RSFQ approaches for solid-state quantum computing control.
links:
  - to: arch-superconducting
    relation: enables
  - to: enable-cryogenics
    relation: depends-on
  - to: qec-realtime-decoding
    relation: enables
qdayImpact: 1
qdayReasoning: >-
  Cryogenic control electronics are a necessary scaling enabler — without them the wiring bottleneck prevents reaching the qubit counts required for a CRQC. Progress here modestly accelerates the path to cryptographically relevant scales, but is not the binding constraint today.
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

Scaling superconducting quantum computers beyond a few hundred qubits is blocked by the wiring problem: each qubit needs control and readout lines, and running thousands of coaxial cables into a millikelvin refrigerator is prohibitive. Cryo-CMOS moves the classical control layer into the cryostat at the 4 K stage. The IBM 2023 demonstration of a cross-resonance gate using a 14-nm FinFET ASIC at 4 K is the clearest published experimental milestone. The field is squarely experimental: prototypes work, but power dissipation, noise performance, and integration with large qubit arrays remain active research problems.
