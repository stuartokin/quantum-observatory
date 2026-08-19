---
schema: frontier/v1
id: qec-magic-state-distillation
title: Magic state distillation on logical qubits
summary: Non-Clifford gates produced entirely inside the protected layer.
plain: Error correction protects a limited set of operations easily; one crucial type has to be produced separately by a purification process. Until this, that purification was done on raw, unprotected hardware — a weak link in an otherwise protected chain. Doing it entirely inside the protected layer completes the toolkit for running whole programs on reliable qubits.
pillar: quantum
constellation: error-correction
readiness: experimental
actors: [QuEra Computing, Harvard University, MIT]
metrics:
  - name: Protocol
    value: 5-to-1 distillation
    note: QuEra/Harvard/MIT, Nature 645, 620-625 (2025)
  - name: Code distances
    value: d=3 and d=5
    note: colour-code logical qubits, neutral atom platform
  - name: Platform
    value: neutral atom
    note: QuEra Gemini
  - name: Cultivation error reduction vs injection (superconducting experimental)
    value: '40'
    unit: x
    note: Rosenfeld et al. arXiv:2512.13908 (Dec 2025, preprint). Fidelity 0.9999(1), 8% of attempts retained. Google Quantum AI.
  - name: Cultivation overhead reduction vs distillation (theoretical)
    value: ~10
    unit: x fewer qubit-rounds
    note: Gidney, Shutty, Jones arXiv:2409.17595 (Sep 2024). Cultivation fits inside a surface code patch; roughly as many physical gates as a lattice surgery CNOT of equivalent reliability.
evidence:
  claim: 'QuEra/Harvard/MIT (Nature 645, 620-625, Jul 2025) demonstrated the first experimental magic state distillation performed entirely on logical qubits: a 5-to-1 protocol on d=3 and d=5 colour-code qubits on a neutral-atom processor produced output fidelity exceeding all input states. Gidney, Shutty, and Jones (arXiv:2409.17595, Sep 2024) introduced magic state cultivation, which grows a T state inside a single surface code patch using roughly the same number of physical gates as a lattice surgery CNOT gate of equivalent reliability — an order of magnitude fewer qubit-rounds than prior distillation protocols. Cultivation is the key technique enabling the 20x qubit reduction in Gidney''s 2025 RSA-2048 estimate (arXiv:2505.15917), where six parallel factory modules of Gidney+Ekerå 2019 were replaced by cultivation in a smaller area. Rosenfeld et al. (Google Quantum AI, arXiv:2512.13908, Dec 2025) experimentally demonstrated cultivation on a superconducting processor: error reduced by a factor of 40, state fidelity 0.9999(1), retaining 8% of attempts. This is a preprint; no peer-reviewed publication confirmed as of 2026-08-19.'
  verified: '2026-08-19'
  level: E4
  sources:
    - url: https://www.nature.com/articles/s41586-025-09367-3
      role: primary
      title: Experimental demonstration of logical magic state distillation
      publisher: Nature
      date: '2025-07-14'
      identifier: Nature 645, 620-625 (2025)
      doi: 10.1038/s41586-025-09367-3
      accessed: '2026-08-19'
      note: QuEra / Harvard / MIT. First demonstration of magic state distillation entirely on logical qubits. 5-to-1 protocol on d=3 and d=5 colour-code qubits on QuEra Gemini neutral-atom platform.
    - url: https://arxiv.org/abs/2409.17595
      role: corroborating
      title: 'Magic state cultivation: growing T states as cheap as CNOT gates'
      publisher: arXiv
      date: '2024-09-26'
      identifier: arXiv:2409.17595
      doi: 10.48550/arXiv.2409.17595
      accessed: '2026-08-19'
      note: Gidney, Shutty, Jones (Google Quantum AI). Preprint. Cultivation fits inside a surface code patch and uses ~same physical gates as a CNOT of equivalent reliability; order of magnitude fewer qubit-rounds than distillation. Used in Gidney 2025 (arXiv:2505.15917) RSA-2048 estimate replacing parallel factory modules.
    - url: https://arxiv.org/abs/2512.13908
      role: corroborating
      title: Magic state cultivation on a superconducting quantum processor
      publisher: arXiv
      date: '2025-12-15'
      identifier: arXiv:2512.13908
      doi: 10.48550/arXiv.2512.13908
      accessed: '2026-08-19'
      note: 'Rosenfeld, Gidney et al. (Google Quantum AI; 295 authors). Preprint; not peer-reviewed as of 2026-08-19. Cultivation on superconducting processor: 40x error reduction, fidelity 0.9999(1), 8% of attempts retained. E3 individually.'
links:
  - to: qec-below-threshold-surface-code
    relation: depends-on
  - to: arch-neutral-atom
    relation: depends-on
  - to: qec-colour-code
    relation: depends-on
moved:
  from: emerging
  'on': '2026-07-14'
priority: P1
horizon: 2
qdayImpact: 1
qdayReasoning: 'Completes the logical gate set, removing one of the remaining unknowns in fault-tolerant operation.'
country: [US]
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-19'
  note: 'Focus run 2026-08-19. Added metrics for both the logical distillation result (Nature 645) and cultivation: 40x error reduction on superconducting hardware (Rosenfeld et al. arXiv:2512.13908, preprint E3) and ~10x overhead reduction vs distillation (Gidney et al. arXiv:2409.17595, preprint). Cultivation is the mechanism behind the factory-count reduction in Gidney 2025 RSA-2048 estimate. Evidence level held at E4 on strength of peer-reviewed Nature 645 primary source.'
confidence: high
status: published
added: '2026-08-04'
origin: human
---
