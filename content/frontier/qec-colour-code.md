---
schema: frontier/v1
id: qec-colour-code
title: Colour codes
summary: 'A topological error-correcting code offering transversal Clifford gates and efficient logical operations, demonstrated at scale on superconducting hardware in 2025.'
plain: 'The surface code — the workhorse of today''s quantum error correction — is reliable but has a problem: performing logical operations on it requires expensive magic-state distillation. Colour codes offer a shortcut: they allow transversal Clifford gates, meaning logical operations can be done directly across the encoded qubits with much lower overhead. Until 2025, colour codes had never been demonstrated with performance that improved as the code got bigger. The Google Quantum AI / ETH Zürich team changed that: they showed that scaling from code distance 3 to 5 suppresses logical errors by a factor of 1.56, injected magic states with over 99% fidelity, and teleported logical states between two colour-code qubits — all on a superconducting processor.'
pillar: quantum
readiness: experimental
constellation: error-correction
cluster: codes
actors:
  - Google Quantum AI
  - ETH Zürich
country:
  - US
  - Switzerland
metrics:
  - name: Logical error suppression factor (d3 to d5)
    value: '1.56'
    unit: 'Λ'
    note: 'Simulations indicate this is below the colour-code threshold'
  - name: Transversal Clifford gate error
    value: '0.0027'
    unit: per gate
    note: 'Substantially less than one idling error-correction cycle'
  - name: Magic state fidelity (post-selected)
    value: '>99%'
    unit: '%'
    note: 'Retaining approximately 75% of data'
links:
  - to: qec-surface-code
    relation: competes-with
  - to: qec-magic-state-distillation
    relation: enables
evidence:
  claim: 'Lacroix et al. (Google Quantum AI, Nature 2025) demonstrate the colour code on a superconducting processor, showing logical error suppression scaling with code distance, transversal Clifford gates with 0.0027 added error per gate, magic state injection exceeding 99% fidelity, and lattice-surgery state teleportation between distance-3 colour codes.'
  verified: '2026-08-08'
  level: E4
  sources:
    - url: https://arxiv.org/abs/2412.14256
      role: preprint
      title: Scaling and logic in the color code on a superconducting quantum processor
      publisher: arXiv
      date: '2024-12-18'
      identifier: arXiv:2412.14256
      doi: 10.48550/arXiv.2412.14256
      accessed: '2026-08-08'
      note: 'Preprint version; published as Nature 645, 614 (2025)'
    - url: https://www.nature.com/articles/s41586-025-09061-4
      role: primary
      title: Scaling and logic in the colour code on a superconducting quantum processor
      publisher: Nature
      date: '2025-09-18'
      identifier: 'Nature 645, 614–619 (2025)'
      doi: 10.1038/s41586-025-09061-4
      accessed: '2026-08-08'
      note: 'Google Quantum AI and ETH Zürich collaboration.'
confidence: high
status: published
priority: P1
qdayImpact: 0
qdayReasoning: ''
horizon: 2
novelty: 'first scaling demonstration of colour code on superconducting hardware'
origin: agent
added: '2026-08-08'
moved:
  from: experimental
  on: '2026-08-08'
review:
  state: reviewed
  by: human
  'on': '2026-08-08'
  agentMergedOn: '2026-08-08'
  agent: sourcer
---

Colour codes have been a theoretical favourite for years because they support transversal logical gates — a property the surface code lacks, making the surface code dependent on expensive magic-state factories for universal computation. The practical question was whether colour codes could actually be made to work on real hardware, and whether adding more physical qubits would actually suppress errors. Lacroix et al. answered both questions affirmatively in 2025. This does not mean colour codes will displace the surface code, but it establishes them as a credible competing architecture at the experimental level.
