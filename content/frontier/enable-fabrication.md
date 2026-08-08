---
schema: frontier/v1
id: enable-fabrication
title: Qubit fabrication yield
summary: 'Industrial-scale fabrication of superconducting qubits with high yield and uniformity, demonstrating that quantum processors can be manufactured using standard semiconductor foundry processes.'
plain: 'Making quantum computers at scale requires producing hundreds or thousands of identical, high-quality qubits on a single chip. Until recently, qubit fabrication relied on laboratory techniques poorly suited to mass production. Imec (2024) demonstrated superconducting transmon qubits made on 300 mm silicon wafers using standard CMOS foundry equipment — the same tools used for ordinary computer chips — achieving 98.25% yield and coherence times over 100 microseconds, performance comparable to research-grade devices.'
pillar: quantum
constellation: enabling
readiness: demonstrated
cluster: hardware-stack
actors:
  - Imec
  - 'KU Leuven'
country:
  - BE
horizon: 2
novelty: 'first 300 mm CMOS foundry fabrication of high-coherence superconducting qubits'
priority: P1
qdayImpact: 1
qdayReasoning: 'High-yield industrial fabrication is a necessary precondition for scaling quantum computers to millions of qubits. Without it, production bottlenecks constrain the path to a CRQC. This result demonstrates the feasibility of the manufacturing supply chain, but does not by itself advance Q-Day.'
metrics:
  - name: 'Wafer diameter'
    value: '300'
    unit: 'mm'
  - name: 'Qubit yield'
    value: '98.25'
    unit: '%'
    note: '393 of 400 qubits functional across wafer'
  - name: 'Median relaxation time'
    value: '75'
    unit: 'µs'
    note: 'Time-averaged median across wafer'
  - name: 'Coherence time'
    value: '>100'
    unit: 'µs'
    note: 'Relaxation and coherence times exceeding 100 µs'
links:
  - to: arch-superconducting
    relation: enables
  - to: enable-cryogenics
    relation: depends-on
evidence:
  claim: 'Van Damme et al. (2024) at Imec demonstrated superconducting transmon qubits manufactured in a 300 mm CMOS pilot line using industrial methods (optical lithography and reactive-ion etching), achieving relaxation and coherence times exceeding 100 µs and a yield of 98.25% (393 of 400 qubits functional) across the wafer. Performance was comparable to laboratory-fabricated devices.'
  level: E4
  verified: '2026-08-08'
  sources:
    - url: https://www.nature.com/articles/s41586-024-07941-9
      role: primary
      title: 'Advanced CMOS manufacturing of superconducting qubits on 300 mm wafers'
      publisher: Nature
      date: '2024-09-18'
      identifier: 'Nature 634, 74-79 (2024)'
      doi: 10.1038/s41586-024-07941-9
      accessed: '2026-08-08'
      note: 'Van Damme et al.; Imec and KU Leuven, Belgium; open access via PMC'
confidence: high
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agentMergedOn: '2026-08-08'
  agent: sourcer
  note: 'restored after an accidental bulk confirmation'
---

Building quantum computers at the scale required for fault-tolerant computation will require manufacturing millions of qubits reliably and cheaply. Imec, Belgium's leading semiconductor research centre, demonstrated in 2024 that superconducting transmon qubits can be made on 300 mm silicon wafers in a standard CMOS foundry — the same industrial equipment used for modern microchips. The result: 98.25% of qubits worked correctly, with coherence times over 100 microseconds, matching what smaller research laboratories achieve with bespoke techniques. This is a significant step toward industrial quantum computing supply chains.
