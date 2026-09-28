---
schema: frontier/v1
id: arch-superconducting
title: Superconducting transmon
summary: Lithographed circuits at millikelvin. Fast gates and mature fabrication; needs large dilution refrigerators.
plain: Tiny circuits printed on a chip and chilled to a hundredth of a degree above absolute zero, where they behave as artificial atoms. Fast, and built with adapted semiconductor manufacturing, which is why it scaled quickest. The cost is enormous refrigeration and a dense forest of wiring.
pillar: quantum
constellation: architectures
readiness: adopted
actors:
  - IBM
  - Google Quantum AI
metrics:
  - name: Nighthawk qubits
    value: '120'
    note: 'with 218 tunable couplers; IBM vendor statement — no source in evidence.sources'
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
      identifier: 'Nature 638, 920-926 (2025)'
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
qdayImpact: 0
qdayReasoning: ''
country:
  - US
confidence: high
status: published
added: '2026-08-04'
origin: human
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-08'
  reviewedOn: '2026-09-28'
  note: No new peer-reviewed Google superconducting paper found; Willow (Nature 638, 920-926) remains primary E4 source. IBM Nighthawk metrics remain vendor-only with no independent source in evidence.sources — correctly flagged in metrics note. Google Quantum AI page as of Aug 2026 still spotlights Willow as flagship. E4 correct on Google result alone. No corrections.
---

Superconducting transmon qubits are lithographically patterned Josephson-junction circuits cooled to ~15 mK in dilution refrigerators, where they behave as artificial two-level atoms. The platform is the most mature and has scaled fastest: IBM and Google have both shipped successive generations on published roadmaps.

Google's Willow processor (Nature 638, 2025) demonstrated below-threshold surface code memory on 101 qubits at code distance 7, with logical error suppression factor Λ=2.14 and logical lifetime exceeding the best physical qubit by 2.4×. This is the primary evidence for the E4 rating and the readiness of `adopted`.

IBM's Nighthawk chip (120 qubits, 218 tunable couplers) represents the current roadmap frontier but is sourced from vendor announcements not yet captured in the evidence record here; it does not affect the evidence level.
