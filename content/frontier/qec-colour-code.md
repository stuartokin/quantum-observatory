---
schema: frontier/v1
id: qec-colour-code
title: Colour codes
summary: A family of topological quantum error-correcting codes that, unlike surface codes, support transversal implementation of a full set of Clifford gates, making them attractive for fault-tolerant computation with lower logical overhead.
plain: |
  The colour code is an alternative way to protect quantum information from errors. Its big advantage over the more common surface code is that it can perform certain logical operations — specifically a full set of Clifford gates — by acting on each physical qubit independently, rather than routing information around in complex patterns. This makes the code faster and more resource-efficient for many algorithms. The catch is that its error syndromes are harder to measure and decode, requiring more complex hardware and software.
pillar: quantum
readiness: demonstrated
constellation: error-correction
actors:
  - Google Quantum AI
country:
  - US
horizon: 2
priority: P1
metrics:
  - name: Logical error suppression factor (d=3 to d=5)
    value: "scaling demonstrated"
    note: Lacroix et al. 2025 Nature; first demonstration of colour code error suppression scaling with code distance on superconducting hardware
  - name: Transversal gate additional error rate
    value: "0.0027"
    unit: per operation
    note: Transversal Clifford gates, significantly below idling QEC cycle error — Lacroix et al. 2025
moved:
  from: experimental
  on: '2026-08-08'
evidence:
  claim: >-
    Lacroix et al. (Google Quantum AI, 2025) present a comprehensive demonstration of the colour code on a superconducting processor, achieving logical error suppression that scales with code distance and performing transversal Clifford gates with an additional error rate of 0.0027 per operation — the first demonstration of colour code performance scaling on any platform.
  level: E4
  verified: '2026-08-08'
  sources:
    - url: https://arxiv.org/abs/2412.14256
      role: preprint
      title: Scaling and logic in the color code on a superconducting quantum processor
      publisher: arXiv
      date: '2024-12-18'
      identifier: arXiv:2412.14256
      accessed: '2026-08-08'
      note: Published as Nature 645, 614 (2025), DOI 10.1038/s41586-025-09061-4. arXiv is open access.
    - url: https://www.nature.com/articles/s41586-025-09061-4
      role: primary
      title: Scaling and logic in the colour code on a superconducting quantum processor
      publisher: Nature
      date: '2025-01-01'
      identifier: 'Nature 645, 614 (2025)'
      doi: 10.1038/s41586-025-09061-4
      accessed: '2026-08-08'
      note: Google Quantum AI and collaborators. Peer-reviewed.
links:
  - to: qec-surface-code
    relation: competes-with
  - to: qec-magic-state-distillation
    relation: enables
  - to: arch-superconducting
    relation: depends-on
qdayImpact: 1
qdayReasoning: >-
  Colour codes enable more efficient logical gate sets than surface codes. If colour codes displace or complement surface codes in fault-tolerant architectures, they reduce the overhead per logical gate and therefore the total qubit cost of a CRQC. The effect is modest and indirect — scored +1.
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

Colour codes have long been theoretically attractive for their transversal gate set, but until late 2024 no demonstration had shown that their logical error rate actually decreases as code size grows (as it must for useful error correction). The Lacroix et al. 2025 Nature paper closes that gap: on a superconducting processor, they demonstrate code-distance scaling and transversal Clifford gates with very low additional error rates. This moves the readiness from experimental to demonstrated. The outstanding gap to adopted is that the colour code requires more complex stabiliser measurements and decoders than the surface code — currently the leading practical choice.
