---
schema: frontier/v1
id: app-pdt-ftqc-algorithms
title: 'Fault-tolerant quantum algorithms for photosensitizer design in cancer therapy'
summary: 'Xanadu preprint proposes three FTQC algorithms to compute absorption spectra and intersystem crossing rates for PDT photosensitizers, with resource estimates of 180–350 logical qubits for clinically relevant BODIPY molecules.'
plain: 'Photodynamic therapy (PDT) kills tumour cells using light-activated chemicals called photosensitizers. Designing better ones requires simulating quantum-mechanical properties — how much light they absorb, and how efficiently they generate reactive oxygen species — that are hard for classical computers at useful accuracy. This Xanadu preprint lays out three fault-tolerant quantum algorithms for exactly these properties, and estimates the hardware needed: 180 to 350 logical qubits and Toffoli gate depths of 10^7 to 10^9 for the BODIPY molecules tested. No quantum hardware was used; this is an algorithm design and resource estimation study.'
pillar: quantum
readiness: emerging
constellation: applications
cluster: drug-discovery
actors:
  - 'Xanadu (Toronto, Canada)'
country:
  - CA
horizon: 2
priority: P2
qdayImpact: 0
novelty: 'First FTQC resource estimate for PDT photosensitizer simulation'
metrics:
  - name: 'logical qubits (BODIPY, 11–45 orbitals)'
    value: '180–350'
    unit: 'logical qubits'
    note: 'Resource estimates using PennyLane; no hardware run'
  - name: 'Toffoli gate depth'
    value: '1e7–1e9'
    unit: 'Toffoli gates'
    note: 'Varies by molecule size and algorithm choice'
links:
  - to: app-pdt-qb-dmrg
    relation: competes-with
  - to: algo-resource-estimation
    relation: depends-on
  - to: qec-magic-state-distillation
    relation: depends-on
evidence:
  claim: 'Zhou et al. (Xanadu, arXiv:2512.15889, December 2025) propose three fault-tolerant quantum algorithms — threshold projection (using qubitization with low-rank tensor hypercontraction and quantum signal processing), evolution-proxy, and vibronic dynamics — to compute cumulative absorption within the therapeutic window and singlet-triplet intersystem crossing rates for BODIPY photosensitizer derivatives. Resource estimates for systems of 11 to 45 spatial orbitals give 180 to 350 logical qubits and Toffoli gate depths between 10^7 and 10^9. The paper presents algorithm design, circuit decomposition, and classical resource estimation; no quantum hardware was used. Still a preprint as of 2026-08-16 with no confirmed journal record.'
  verified: '2026-08-16'
  level: E3
  sources:
    - url: 'https://arxiv.org/abs/2512.15889'
      role: preprint
      title: 'Quantum Algorithms for Photoreactivity in Cancer-Targeted Photosensitizers'
      publisher: arXiv
      date: '2025-12-17'
      identifier: 'arXiv:2512.15889'
      accessed: '2026-08-16'
      note: 'All authors at Xanadu, Toronto. Preprint only; no peer-reviewed version confirmed as of access date. Resource estimates computed with PennyLane on BODIPY derivatives including heavy-atom and transition-metal-substituted systems.'
confidence: medium
status: draft
origin: agent
added: '2026-08-16'
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-16'
---

## What happened

Xanadu's quantum algorithms group (Zhou et al., December 2025) published a preprint laying out three fault-tolerant quantum algorithms specifically designed to compute the two properties that most determine whether a photosensitizer will work in cancer photodynamic therapy: how much light it absorbs in the therapeutic window, and how efficiently it converts that absorbed energy into reactive oxygen species that kill tumour cells.

The algorithms — threshold projection (novel), evolution-proxy, and vibronic dynamics — are applied to BODIPY derivatives, a clinically active class of photosensitizers that classical methods handle poorly because of strong spin-orbit coupling and multi-reference electronic structure. The paper provides full resource estimates: 180–350 logical qubits and Toffoli gate depths of 10^7 to 10^9 for systems of 11–45 spatial orbitals.

## Why it matters

The applications constellation currently has no item covering fault-tolerant quantum algorithm design with explicit resource targets for a medical application. This paper names a concrete target (BODIPY photosensitizers), a concrete regime (logical qubit counts compatible with mid-term FTQC hardware), and a concrete clinical problem (PDT drug discovery). It is the clearest example on the board of the chain from algorithm → resource estimate → clinical use case.

## Previous state of the art

The existing board item `app-pdt-qb-dmrg` covers a different algorithmic approach (quantum-boosted DMRG) at E2 (vendor claim). This paper is E3 (preprint) and uses a fully fault-tolerant approach rather than a near-term hybrid. The two items address the same clinical problem by different computational routes.

## Limitations

No quantum hardware was used. All resource estimates are classical projections using PennyLane. The work has not been peer-reviewed. It comes from a single group (Xanadu); no independent replication exists. The resource estimates assume fault-tolerant hardware that does not yet exist at this scale.

## What would change this assessment

Peer review in a chemistry or quantum computing journal would raise to E4. Independent replication of the resource estimates by a group not affiliated with Xanadu would raise confidence. Demonstration on actual FTQC hardware — even at reduced problem size — would move readiness to experimental.
