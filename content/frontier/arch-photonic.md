---
schema: frontier/v1
id: arch-photonic
title: Photonic quantum computing
summary: 'Quantum computing using photons as qubits. PsiQuantum demonstrated a manufacturable silicon-photonics platform in a commercial 300mm foundry in 2025, achieving >99% component fidelities. No fault-tolerant logical operations demonstrated.'
plain: 'Photonic quantum computers use particles of light (photons) as qubits instead of superconducting circuits or trapped atoms. Photons have a natural advantage: they barely interact with their environment, so they do not need to be cooled to near absolute zero to preserve quantum states. The challenge is that photons also barely interact with each other, making two-qubit gates hard without tricks involving measurement and feed-forward. In 2025, PsiQuantum published in Nature a manufacturable silicon-photonics chipset (called Omega) built in GlobalFoundries'' standard 300mm semiconductor fab, reporting component fidelities above 99%. This is a component-level demonstration in a commercial process — the milestone is manufacturability, not computation. A working fault-tolerant photonic quantum computer has not been demonstrated.'
pillar: quantum
readiness: experimental
constellation: architectures
cluster: qubit-modalities
actors:
  - PsiQuantum
  - GlobalFoundries
country:
  - US
metrics:
  - name: state preparation and measurement fidelity (dual-rail)
    value: '99.98'
    unit: percent
    note: 'PsiQuantum Omega chipset, conditional on photon detection; PsiQuantum Nature 2025'
  - name: two-qubit fusion gate fidelity
    value: '99.22'
    unit: percent
    note: 'Conditional on photon detection; PsiQuantum Nature 2025'
  - name: chip-to-chip interconnect fidelity (42 m fibre)
    value: '99.72'
    unit: percent
    note: 'Conditional on photon detection; PsiQuantum Nature 2025'
priority: P2
qdayImpact: 0
horizon: 3
novelty: 'First peer-reviewed manufacturable photonic quantum platform in commercial semiconductor foundry'
links:
  - to: arch-superconducting
    relation: competes-with
  - to: arch-neutral-atom
    relation: competes-with
evidence:
  claim: 'PsiQuantum published in Nature (May 2025) a manufacturable silicon-photonics platform for quantum computing, built at GlobalFoundries. The Omega chipset demonstrated >99% fidelities for state preparation, two-qubit fusion gates, and chip-to-chip interconnects over 42 m of fibre — all conditional on photon detection. This is a component-level milestone demonstrating manufacturability in a commercial 300mm process; fault-tolerant logical computation has not been demonstrated. A second Nature paper (Aghaee Rad et al., Nature 638, January 2025) reported scaling and networking of a modular photonic quantum computer.'
  level: E3
  verified: '2026-08-08'
  sources:
    - url: https://www.nature.com/articles/s41586-025-08820-7
      role: primary
      title: A manufacturable platform for photonic quantum computing
      publisher: Nature
      date: '2025-05-22'
      identifier: 'Nature 641, 876-883 (2025)'
      doi: 10.1038/s41586-025-08820-7
      accessed: '2026-08-08'
      note: 'PsiQuantum team. Component fidelities >99% conditional on photon detection. No independent replication at time of access.'
    - url: https://www.nature.com/articles/s41586-024-08406-9
      role: corroborating
      title: 'Scaling and networking a modular photonic quantum computer'
      publisher: Nature
      date: '2025-01-22'
      identifier: 'Nature 638, 912-919 (2025)'
      doi: 10.1038/s41586-024-08406-9
      accessed: '2026-08-08'
      note: 'Aghaee Rad et al. Modular photonic architecture with network interconnects; Xanadu.'
moved:
  from: experimental
  on: '2026-08-08'
confidence: medium
status: published
origin: agent
added: '2026-08-08'
review:
  state: reviewed
  by: human
  'on': '2026-08-08'
  agentMergedOn: '2026-08-08'
  agent: sourcer
---

Photonic quantum computing uses photons — particles of light — as qubits. Their insensitivity to thermal noise means no dilution refrigerator is needed, which matters enormously for scaling. The fundamental obstacle is that photons do not naturally interact, so entangling two photonic qubits requires probabilistic techniques or ancilla photons. PsiQuantum's May 2025 Nature paper reported the first manufacturable platform: a chipset built in GlobalFoundries' commercial 300mm silicon-photonics process, demonstrating component fidelities above 99% for single-qubit operations, fusion gates, and 42-metre chip-to-chip links. All fidelities are conditional on detecting a photon — optical loss remains the main engineering challenge for scale-up. The result is a component demonstration, not a working quantum processor; fault-tolerant logical computation in this modality has not yet been shown.
