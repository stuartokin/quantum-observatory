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
  - name: Magic state production fraction of RSA-2048 estimate (Gidney 2025)
    value: reduced
    unit: vs 2019 baseline
    note: 'arXiv:2505.15917: qubit reduction comes partly from ''allocating less space to magic state distillation by using magic state cultivation''. Longer runtime from ''using fewer magic state factories''. Cultivation replaces dedicated factory region with in-patch operations, eliminating the dominant space overhead of the 2019 estimate.'
evidence:
  claim: 'QuEra/Harvard/MIT (Nature 645, 620-625, Jul 2025) demonstrated the first experimental magic state distillation performed entirely on logical qubits: a 5-to-1 protocol on d=3 and d=5 colour-code qubits on a neutral-atom processor produced output fidelity exceeding all input states. Gidney, Shutty, and Jones (arXiv:2409.17595, Sep 2024) introduced magic state cultivation, which grows a T state inside a single surface code patch using roughly the same number of physical gates as a lattice surgery CNOT gate of equivalent reliability — an order of magnitude fewer qubit-rounds than prior distillation protocols. Cultivation is the key technique enabling the 20x qubit reduction in Gidney''s 2025 RSA-2048 estimate (arXiv:2505.15917), which explicitly states the reduction comes partly from ''allocating less space to magic state distillation by using magic state cultivation'', with the longer runtime due partly to ''using fewer magic state factories compared to Gidney+Ekerå 2019''. In the 2019 estimate, parallel distillation factory modules were the dominant physical-qubit overhead; cultivation replaces these with in-patch operations whose footprint is bounded by a single logical qubit patch. Rosenfeld et al. (Google Quantum AI, arXiv:2512.13908, Dec 2025) experimentally demonstrated cultivation on a superconducting processor: error reduced by a factor of 40, state fidelity 0.9999(1), retaining 8% of attempts. This is a preprint; no peer-reviewed publication confirmed as of 2026-08-19.'
  verified: '2026-08-19'
  level: E4
  sources:
    - url: https://www.nature.com/articles/s41586-025-09367-3
      role: primary
      title: Experimental demonstration of logical magic state distillation
      publisher: Nature
      date: '2025-07-14'
      identifier: 'Nature 645, 620-625 (2025)'
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
      note: Gidney, Shutty, Jones (Google Quantum AI). Preprint. Cultivation fits inside a surface code patch; ~same physical gates as a CNOT of equivalent reliability; ~10x fewer qubit-rounds than distillation. Used in Gidney 2025 RSA-2048 estimate replacing parallel factory modules.
    - url: https://arxiv.org/abs/2512.13908
      role: corroborating
      title: Magic state cultivation on a superconducting quantum processor
      publisher: arXiv
      date: '2025-12-15'
      identifier: arXiv:2512.13908
      doi: 10.48550/arXiv.2512.13908
      accessed: '2026-08-19'
      note: 'Rosenfeld, Gidney et al. (Google Quantum AI). Preprint; not peer-reviewed as of 2026-08-19. Cultivation on superconducting processor: 40x error reduction, fidelity 0.9999(1), 8% of attempts retained. E3 individually.'
    - url: https://arxiv.org/abs/2505.15917
      role: corroborating
      title: How to factor 2048 bit RSA integers with less than a million noisy qubits
      publisher: arXiv
      date: '2025-05-21'
      identifier: arXiv:2505.15917
      doi: 10.48550/arXiv.2505.15917
      accessed: '2026-08-19'
      note: Craig Gidney, Google Quantum AI. States qubit reduction comes from 'allocating less space to magic state distillation by using magic state cultivation'; longer runtime from 'using fewer magic state factories'. Establishes cultivation as the key change reducing the factory overhead that dominated the 2019 estimate.
links:
  - to: qec-below-threshold-surface-code
    relation: depends-on
  - to: arch-neutral-atom
    relation: depends-on
  - to: qec-colour-code
    relation: depends-on
moved:
  from: emerging
  on: '2026-07-14'
priority: P1
horizon: 2
qdayImpact: 1
qdayReasoning: 'Completes the logical gate set, removing one of the remaining unknowns in fault-tolerant operation.'
country: [US]
review:
  state: agent-reviewed
  by: agent
  agent: steward
  agentMergedOn: '2026-08-19'
  reviewedOn: '2026-08-19'
  note: 'Steward review 2026-08-19. Nature 645, 620-625 confirmed as E4 primary (peer-reviewed). Cultivation metrics from arXiv:2409.17595 (Gidney et al.) and arXiv:2505.15917 (Gidney 2025 RSA estimate) correctly attributed. Experimental cultivation result from arXiv:2512.13908 (Rosenfeld et al.) is a preprint, E3 individually — correctly noted in source note. Magic state production fraction metric correctly framed as reduced vs 2019 baseline with RSA-2048 sourcing. No corrections needed.'
confidence: high
status: published
added: '2026-08-04'
origin: human
---
