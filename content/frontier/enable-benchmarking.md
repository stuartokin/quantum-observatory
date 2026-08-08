---
schema: frontier/v1
id: enable-benchmarking
title: Cross-platform benchmarking
summary: Standardised methods to measure and compare quantum computer performance across different hardware platforms and vendors.
plain: Before you can say one quantum computer is better than another, you need agreed tests that work on any machine. Cross-platform benchmarking is the effort to build those tests — things like quantum volume, mirror circuits, and layer fidelity — so that a number from one lab means the same thing as a number from another.
pillar: quantum
readiness: emerging
constellation: enabling
actors:
  - Sandia National Laboratories
  - IBM
  - Quantinuum
country:
  - US
horizon: 2
priority: P2
qdayImpact: 0
evidence:
  claim: No cross-platform benchmark standard has been formally agreed. Multiple competing frameworks (quantum volume, mirror circuits, volumetric benchmarks, layer fidelity) exist; Proctor et al. 2025 surveys them and identifies open research questions including how to benchmark utility-scale systems.
  level: E4
  verified: '2026-08-08'
  sources:
    - url: https://www.nature.com/articles/s42254-024-00796-z
      role: primary
      title: Benchmarking quantum computers
      publisher: Nature Reviews Physics
      date: '2025-01-07'
      identifier: 'Nat. Rev. Phys. 7, 105–118 (2025)'
      doi: 10.1038/s42254-024-00796-z
      accessed: '2026-08-08'
      note: Peer-reviewed perspective by Proctor, Young, Baczewski, Blume-Kohout (Sandia/SNL). Principal survey of the field; identifies lack of agreed cross-platform standard as an open problem.
metrics:
  - name: Citations within 6 months
    value: '79'
    note: As reported by Nature Reviews Physics article page, accessed 2026-08-08
links:
  - to: arch-superconducting
    relation: enables
  - to: arch-trapped-ion
    relation: enables
  - to: arch-neutral-atom
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

Cross-platform benchmarking provides the measurement science needed to compare quantum processors honestly. Without it, vendors publish incomparable numbers and users cannot choose between systems. The 2025 Nature Reviews Physics survey by Proctor et al. (Sandia National Laboratories) is the field's current reference: it classifies benchmarks by what they actually measure, critiques existing approaches, and maps the open problems. No formal standard body has yet ratified a cross-platform benchmark suite.
