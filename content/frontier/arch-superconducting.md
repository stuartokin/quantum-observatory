---
schema: frontier/v1
id: arch-superconducting
title: Superconducting transmon
summary: Lithographed circuits at millikelvin. Fast gates and mature fabrication; needs large dilution refrigerators.
plain: Tiny circuits printed on a chip and chilled to a hundredth of a degree above absolute zero, where they behave as artificial atoms. Fast, and built with adapted semiconductor manufacturing, which is why it scaled quickest. The cost is enormous refrigeration and a dense forest of wiring.
pillar: quantum
constellation: architectures
readiness: adopted
actors: [IBM, Google Quantum AI]
metrics:
  - name: Nighthawk qubits
    value: '120'
    note: with 218 tunable couplers
  - name: Willow distance
    value: '7'
    note: 101 qubits, below threshold
evidence:
  claim: Google demonstrated below-threshold surface code memory on a superconducting processor; IBM has shipped successive transmon processors on a published roadmap.
  verified: '2026-08-04'
  level: E4
  sources:
    - url: https://www.nature.com/articles/s41586-024-08449-y
      role: primary
      publisher: Nature
      date: '2025'
      identifier: Nature 638, 920–926 (2025)
links:
  - to: arch-trapped-ion
    relation: competes-with
  - to: qec-below-threshold-surface-code
    relation: evidence-for
  - to: enable-cryogenics
    relation: depends-on
  - to: enable-control-electronics
    relation: depends-on
priority: P1
horizon: 1
country: [US]
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-08'
  reviewedOn: '2026-08-10'
  note: 'Nature 638, 920-926 opened; Λ=2.14, 0.143% per cycle, 2.4× breakeven confirmed against paper. E4 correct for the Google Willow result. Note: IBM Nighthawk metrics (120 qubits, 218 couplers) appear in metrics but no IBM source is listed in evidence.sources — IBM portion of the claim rests on vendor announcements not captured here. No level change: E4 is defensible for the Google result, which is the primary evidence. IBM roadmap statement is background context. Prior human review noted; amending only the reviewedOn date and adding this note.'
confidence: high
status: published
added: '2026-08-04'
origin: human
---
