---
schema: frontier/v1
id: enable-benchmarking
title: Cross-platform quantum benchmarking
summary: Standardised protocols for measuring and comparing the capability of quantum processors across different hardware platforms and vendors.
plain: |
  Before you can say one quantum computer is better than another, you need agreed-upon tests. Cross-platform benchmarking is the work of designing those tests — things like randomised benchmarking, quantum volume, and mirror circuits — so that engineers, customers, and researchers can make fair comparisons between machines built in entirely different ways. Without good benchmarks, vendors can cherry-pick metrics that make their hardware look best. With them, real progress becomes measurable.
pillar: quantum
readiness: emerging
constellation: enabling
actors:
  - Sandia National Laboratories
country:
  - US
horizon: 2
priority: P2
metrics:
  - name: Coverage
    value: "4"
    unit: benchmark families surveyed
    note: Randomised benchmarking, quantum volume, XEB, and application benchmarks reviewed in Proctor et al. 2025
evidence:
  claim: >-
    Proctor et al. (2025) survey the state of quantum computer benchmarking in a Nature Reviews Physics perspective, distinguishing good benchmarks that empower understanding from bad ones that misdirect research, and identifying open questions on the road to quantum utility.
  level: E4
  verified: '2026-08-08'
  sources:
    - url: https://www.nature.com/articles/s42254-024-00796-z
      role: primary
      title: Benchmarking quantum computers
      publisher: Nature Reviews Physics
      date: '2025-01-07'
      identifier: 'Nat Rev Phys 7, 105–118 (2025)'
      doi: 10.1038/s42254-024-00796-z
      accessed: '2026-08-08'
      note: Authors at Sandia National Laboratories Quantum Performance Laboratory. OSTI open-access copy available.
links:
  - to: arch-superconducting
    relation: enables
  - to: arch-trapped-ion
    relation: enables
  - to: arch-neutral-atom
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

Cross-platform benchmarking provides the shared language for evaluating quantum computing progress. Without agreed protocols, vendors optimise for whatever metric makes their machine look best. The Proctor et al. 2025 Nature Reviews Physics perspective is the field's most comprehensive recent survey, covering randomised benchmarking, quantum volume, cross-entropy benchmarking, and application-oriented benchmarks, and explicitly distinguishing what makes a benchmark useful versus misleading.
