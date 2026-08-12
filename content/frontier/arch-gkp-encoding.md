---
schema: frontier/v1
id: arch-gkp-encoding
title: 'GKP bosonic encoding: entangled logical qubits on trapped ion'
summary: 'Gottesman-Kitaev-Preskill (GKP) encoding stores a qubit in the oscillatory motion of a trapped ion. ETH Zürich demonstrated entangled two-qubit GKP Bell states using a beamsplitter interaction, extending GKP from single-qubit error correction to multi-qubit logic.'
plain: 'Most quantum computers store a qubit in a two-level system — a spin, an energy level, a superconducting circuit. GKP encoding does something different: it stores the qubit in the continuous motion of a particle, as a grid pattern in phase space. The grid structure means small random kicks (the dominant error in oscillators) shift the grid but do not erase the logical information — the qubit can be recovered by measuring how far the grid has shifted. The practical advantage is that one physical oscillator replaces several discrete qubits in a standard error-correction scheme, potentially reducing the total hardware needed. Until recently, GKP qubits had only been demonstrated on single oscillators. This experiment, done at ETH Zürich using the motional modes of a single trapped calcium ion, generates entanglement between two GKP qubits by interfering them on a beamsplitter — a step required before GKP qubits can be used in a computation. All four Bell states were generated at an average fidelity of 69%, and error correction extended their lifetime. The fidelity is below what would be needed for fault-tolerant operation, but the experiment establishes that multi-qubit GKP operations are physically possible.'
pillar: quantum
constellation: architectures
cluster: bosonic
readiness: experimental
horizon: 2
priority: P1
actors:
  - 'ETH Zürich'
country:
  - Switzerland
metrics:
  - name: 'Bell state fidelity'
    value: '69'
    unit: '%'
    note: 'Average over all four Bell states; single GKP qubit error correction demonstrated simultaneously'
novelty: 'First multi-qubit entanglement of GKP logical qubits'
links:
  - to: arch-cat-qubits
    relation: competes-with
  - to: arch-trapped-ion
    relation: depends-on
  - to: qec-surface-code
    relation: depends-on
evidence:
  claim: 'Using two motional modes of a single 40Ca+ trapped ion, ETH Zürich generated all four GKP Bell states by interfering qunaught states on a beamsplitter interaction, achieving average fidelity of 69%. Quantum error correction subsequently extended the entangled state lifetime. This is a preprint; peer review outcome unknown.'
  verified: '2026-08-12'
  level: E3
  sources:
    - url: 'https://arxiv.org/abs/2605.08009'
      role: preprint
      title: 'Error Correction of Beamsplitter-Generated Entangled GKP States'
      publisher: arXiv
      date: '2026-05-08'
      identifier: 'arXiv:2605.08009'
      accessed: '2026-08-12'
      note: 'Submitted 8 May 2026 by ETH Zürich quantum electronics group. Preprint, not yet peer-reviewed.'
qdayImpact: 0
qdayReasoning: 'GKP encoding is a hardware efficiency technique for quantum error correction. Demonstrated at 69% fidelity on a single ion, it has no near-term cryptanalytic relevance.'
confidence: medium
status: draft
origin: agent
added: '2026-08-12'
review:
  state: agent-merged
  by: agent
  agent: Scout
  agentMergedOn: '2026-08-12'
---

## What happened

GKP (Gottesman-Kitaev-Preskill) encoding encodes a logical qubit into the continuous phase space of a harmonic oscillator — typically a microwave cavity or a motional mode of a trapped ion. The key advantage is hardware efficiency: small displacement errors (which are the dominant noise channel for oscillators) shift the GKP grid without destroying the logical information. A single oscillator can protect one logical qubit from the errors that would otherwise require several physical qubits in a standard code.

Single-qubit GKP codes have been demonstrated since 2020 (Campagne-Ibarcq et al., Nature 2020). The missing piece was multi-qubit entanglement: you cannot build a quantum computer from isolated, unentangled logical qubits.

This experiment, from the quantum electronics group at ETH Zürich, generates entanglement between two GKP qubits encoded in the two mechanical modes of a single Ca⁺ ion. The entangling operation is a beamsplitter — a linear coupling between the two modes analogous to a 50/50 optical beamsplitter. All four Bell states were prepared at an average fidelity of 69%, and error correction extended the entangled-state lifetime.

## Why it matters

This is the first demonstration that GKP qubits can be entangled using a fault-tolerant gate primitive. It moves GKP from a single-qubit error-correction tool to a potential multi-qubit architecture. The beamsplitter gate is native to oscillators and does not require the ancilla overhead that Clifford gates on discrete-variable qubits do, which is the core argument for GKP's overhead efficiency.

## Previous state of the art

Single GKP qubits: demonstrated in trapped ions and superconducting cavities. No prior demonstration of entangled GKP states using a fault-tolerant gate.

## Limitations

69% Bell-state fidelity is well below the fault-tolerance threshold. The experiment uses two motional modes of a single ion — scaling to many GKP qubits requires demonstrating the same operation across separate traps or cavities. The qunaught states used here carry no logical information by themselves; the logical operations needed for computation remain to be shown.

## What would change this assessment

Fidelity above the fault-tolerance threshold; demonstration on two separate physical systems (ions in separate traps); peer-reviewed publication confirming the preprint results.
