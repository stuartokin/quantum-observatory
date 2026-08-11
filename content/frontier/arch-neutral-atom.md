---
schema: frontier/v1
id: arch-neutral-atom
title: Neutral atom arrays
summary: 'Reconfigurable optical-tweezer arrays of neutral atoms demonstrate magic state distillation on logical qubits and a full fault-tolerant architecture. Two peer-reviewed Nature papers in 2025-2026 establish the platform as a leading contender for fault-tolerant quantum computation.'
plain: 'Uncharged atoms held in place by focused laser beams, like marbles in invisible tweezers. Because the tweezers can be moved during a calculation, the wiring diagram is rearranged on the fly rather than fixed at manufacture. That flexibility is a real advantage for error correction. In July 2025, a QuEra/Harvard/MIT team demonstrated the first-ever magic state distillation performed entirely on error-corrected logical qubits — closing the last major gap in the fault-tolerant toolbox on this platform. In January 2026, a Harvard/MIT team using up to 448 atoms demonstrated all the key elements of a universal fault-tolerant architecture: surface code operation 2.14 times below the error-correction threshold, transversal gates, lattice surgery, and state teleportation using 3D codes.'
pillar: quantum
constellation: architectures
readiness: experimental
actors:
  - QuEra Computing
  - Harvard University
  - MIT
  - Caltech
  - University of Maryland
country:
  - US
metrics:
  - name: Code distances (magic state distillation)
    value: 'd=3, d=5'
    note: 'Colour code on QuEra Gemini; 5-to-1 distillation protocol; output fidelity exceeds all inputs'
  - name: Atoms in fault-tolerant architecture demonstration
    value: '448'
    unit: atoms
    note: 'Bluvstein et al. Nature 649 (2026); reconfigurable neutral-atom array'
  - name: Surface code error suppression factor
    value: '2.14'
    unit: 'Λ (times below threshold)'
    note: 'Bluvstein et al. Nature 649, 39-46 (2026); ±0.13; independent of and matching Google Willow superconducting result'
links:
  - to: qec-magic-state-distillation
    relation: evidence-for
  - to: arch-trapped-ion
    relation: competes-with
priority: P1
qdayImpact: 1
qdayReasoning: 'Magic state distillation on logical qubits (QuEra/Harvard/MIT, Nature 2025) completes the fault-tolerant gate set for the neutral-atom platform, removing the last major gap in the technical roadmap. The 2.14(13)x below-threshold surface code performance (Bluvstein et al., Nature 2026) independently corroborates the Google Willow result on a different hardware modality, strengthening confidence that below-threshold QEC is not platform-specific. Together these results modestly accelerate the overall trajectory toward a fault-tolerant machine, though the hardware gap — tens of logical qubits demonstrated versus hundreds to thousands required for a CRQC — remains very large. Scored +1: necessary milestones achieved, not ones that change near-term Q-Day timelines.'
horizon: 2
novelty: 'First magic state distillation on logical qubits; independent below-threshold surface code confirmation on neutral-atom hardware'
evidence:
  claim: 'Logical magic state distillation was demonstrated on a neutral-atom processor using dynamically reconfigurable atom transport (QuEra/Harvard/MIT, Nature 645, 620-625, July 2025): the 5-to-1 distillation protocol on d=3 and d=5 colour-code qubits produced output fidelity exceeding all input states — the first time magic state distillation was performed entirely within the protected logical layer. A separate paper (Bluvstein et al., Nature 649, 39-46, January 2026) demonstrated all key elements of a universal fault-tolerant quantum processing architecture using up to 448 atoms, including surface code 2.14(13)x below-threshold performance, transversal gates, lattice surgery, and transversal teleportation with 3D [[15,1,3]] codes.'
  verified: '2026-08-11'
  level: E4
  sources:
    - url: https://www.nature.com/articles/s41586-025-09367-3
      role: primary
      title: Experimental demonstration of logical magic state distillation
      publisher: Nature
      date: '2025-07-14'
      identifier: 'Nature 645, 620-625 (2025)'
      doi: 10.1038/s41586-025-09367-3
      accessed: '2026-08-10'
      note: 'QuEra / Harvard / MIT. First demonstration of magic state distillation entirely on logical qubits. 5-to-1 protocol on d=3 and d=5 colour-code qubits on QuEra Gemini neutral-atom platform. Confirmed via nature.com and multiple secondary sources.'
    - url: https://www.nature.com/articles/s41586-025-09848-5
      role: corroborating
      title: A fault-tolerant neutral-atom architecture for universal quantum computation
      publisher: Nature
      date: '2026-01-01'
      identifier: 'Nature 649, 39-46 (2026)'
      doi: 10.1038/s41586-025-09848-5
      accessed: '2026-08-11'
      note: 'Bluvstein, Geim, Li, Evered et al.; Harvard / MIT / Caltech / Maryland. Reconfigurable arrays of up to 448 atoms. Surface code 2.14(13)x below-threshold, transversal gates, lattice surgery, transversal teleportation with 3D [[15,1,3]] codes. Confirmed via nature.com abstract, phys.org, postquantum.com. Publisher correction Nature 650, E3 (2026) — figure label in Fig 3d corrected from "corrected decoding" to "correlated decoding" only; results unchanged.'
confidence: high
status: published
added: '2026-08-04'
origin: human
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-08'
  reviewedOn: '2026-08-11'
  note: 'Both sources confirmed this run. Nature 645 (magic state distillation): confirmed via prior runs. Nature 649 (Bluvstein FTQC): confirmed via nature.com abstract (2.14(13)x below-threshold, 448 atoms, surface code). phys.org and postquantum.com confirm Bluvstein lead author and 448-atom system. Publisher correction Nature 650, E3 confirmed as label-only. E4 correct. No changes made.'
---

Neutral-atom arrays use optical tweezers — focused laser beams — to hold individual uncharged atoms in programmable 2D patterns. Unlike superconducting or silicon-spin qubits, the atoms can be physically moved mid-computation, allowing the connectivity graph to be reconfigured on the fly. Any atom can be brought next to any other, enabling the all-to-all entanglement operations that fault-tolerant protocols often require.

In July 2025, a QuEra/Harvard/MIT team published the first experimental demonstration of magic state distillation performed entirely on logical qubits. Using the QuEra Gemini processor, they applied a 5-to-1 distillation protocol across distance-3 and distance-5 colour-code logical qubits, producing output fidelity exceeding all input states. Magic states are required for universal quantum computation under most error-correcting codes, and until this result they had to be produced at the unprotected physical level — a weak link in an otherwise protected computation.

In January 2026, a Harvard/MIT team (Bluvstein et al., Nature 649) using up to 448 atoms demonstrated all key elements of a universal fault-tolerant architecture: surface code memory operating 2.14(13)× below the error-correction threshold, transversal logical Clifford gates, lattice surgery, and state teleportation using three-dimensional [[15,1,3]] codes. The Λ=2.14 figure matches the Google Willow superconducting result, providing independent cross-modality corroboration that below-threshold surface code operation is reproducible on fundamentally different hardware.
