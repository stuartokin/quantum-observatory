---
schema: frontier/v1
id: arch-ion-tweezer-gate-exp
title: 'Optical tweezer-controlled entangling gates demonstrated in trapped-ion chain'
summary: 'First experimental demonstration of a tweezer-controlled entangling gate in a trapped-ion chain: a three-ion controlled Molmer-Sorensen operation analogous to a Toffoli gate, from Weizmann Institute.'
plain: 'In standard trapped-ion computers, entangling gates work by coupling ion qubits through their shared vibrational motion. An optical tweezer — a tightly focused laser beam — focused on one ion shifts its motional frequency based on the ion''s internal quantum state. This state-dependent frequency shift can be used to make one ion''s internal state control whether an entangling interaction happens between two others, creating a three-qubit controlled gate (analogous to a Toffoli gate) in a single pulse rather than a sequence of two-qubit operations. The Weizmann Institute group demonstrated this experimentally on a three-ion calcium chain in a cryogenic microfabricated Paul trap. They verified that the optical tweezer itself does not degrade gate fidelity compared to standard operation without a tweezer, and developed a compensation method for crosstalk from the tweezer beam on neighbouring ions. This is relevant both as a route to simpler compilation of multi-qubit operations and as an enabling demonstration for more ambitious ion-in-tweezer architectures.'
pillar: quantum
readiness: experimental
constellation: architectures
cluster: trapped-ion
actors:
  - Weizmann Institute of Science
metrics:
  - name: ion species
    value: calcium-40
    note: 'S_1/2 and D_5/2 electronic states used as qubit'
  - name: chain size
    value: '3'
    unit: ions
    note: 'Three-ion chain; tweezer on central ion, entangling gate on outer pair'
  - name: gate type demonstrated
    value: 'controlled Molmer-Sorensen (Toffoli-analogue)'
    note: 'Single-pulse implementation; state-dependent motional frequency shift mediates control'
  - name: crosstalk
    value: 'comparable fidelity with and without tweezer'
    note: 'Presence of tweezer does not significantly impact gate fidelity with compensation applied'
links:
  - to: arch-trapped-ion
    relation: enables
  - to: arch-ion-tweezer
    relation: enables
  - to: qec-surface-code
    relation: enables
evidence:
  claim: 'Schwerdt et al. (Weizmann Institute) experimentally demonstrated an entanglement protocol where an ion illuminated by an optical tweezer serves as a control qubit. The proposal was implemented as a controlled Molmer-Sorensen operation on a three-ion chain, analogous to the Toffoli gate, in a single driving pulse. Gate fidelity with tweezer-based control was comparable to standard operation without tweezers, and a crosstalk compensation method was developed and validated. The paper states this is the first experimental realization of an entangling gate mediated by an optical tweezer in a trapped-ion system.'
  verified: '2026-08-12'
  level: E4
  sources:
    - url: 'https://link.aps.org/doi/10.1103/h4c6-463f'
      role: primary
      title: 'Optical Tweezer-Controlled Entanglement Gates with Trapped-Ion Qubits'
      publisher: Physical Review Letters
      date: '2026-01-15'
      identifier: 'Phys. Rev. Lett. 136, 020604 (2026)'
      doi: '10.1103/h4c6-463f'
      accessed: '2026-08-12'
      note: 'Peer-reviewed experimental result, PRL, published 15 January 2026. Weizmann Institute, Israel. Preprint arXiv:2506.08565 submitted June 2025. Rated E4 as peer-reviewed experimental paper from an independent research group.'
    - url: 'https://arxiv.org/abs/2506.08565'
      role: preprint
      title: 'Optical tweezer-controlled entanglement gates with trapped ion qubits'
      publisher: arXiv
      date: '2025-06-10'
      identifier: 'arXiv:2506.08565'
      accessed: '2026-08-12'
      note: 'Preprint version; journal publication is PRL 136, 020604 (2026).'
confidence: high
status: draft
origin: agent
priority: P1
qdayImpact: 0
qdayReasoning: 'An experimental gate technique for trapped-ion systems. Does not affect the machine resources needed to break RSA-2048 or ECC.'
country:
  - IL
novelty: 'First experimental demonstration of a tweezer-controlled entangling gate in a trapped-ion system'
horizon: 2
review:
  state: agent-merged
  by: agent
  agent: Scout
  agentMergedOn: '2026-08-12'
---

## What happened

Schwerdt et al. at the Weizmann Institute of Science demonstrated experimentally that an optical tweezer focused on a central ion in a three-ion calcium chain can act as a quantum control qubit: its internal state shifts the chain''s motional frequency, gating whether an entangling interaction occurs between the outer two ions. This produces a controlled Molmer-Sorensen operation — equivalent to a Toffoli gate — in a single pulse. The work was published in Physical Review Letters (136, 020604) in January 2026.

## Why it matters

The Toffoli gate normally requires a sequence of two-qubit gates, adding circuit depth and accumulating errors. A single-pulse implementation reduces overhead directly. More broadly, this is the first peer-reviewed experimental evidence that a tweezer beam can serve as an active gate element in a trapped-ion processor, not merely as a spectroscopy or reconfiguration tool. It provides direct experimental support for the gate mechanism proposed in the Schiffer et al. architecture (arXiv:2606.27249).

## Previous state of the art

Earlier work (Mazzanti et al., PRL 2021; Schwerdt et al., PRX 2024) used tweezers for motional mode engineering in RF traps. The present paper is the first to demonstrate a tweezer-controlled *entangling* gate experimentally.

## Limitations

Demonstrated on a three-ion chain only. The control qubit was limited to computational basis states rather than superpositions, due to dephasing from tweezer beam intensity fluctuations — identified by the authors as the main remaining challenge. Scaling to longer chains or 2D arrays is not demonstrated.

## What would change the assessment

Demonstration in superposition (resolving the intensity-noise limitation) would raise the maturity. Replication by an independent group, or demonstration in a 2D tweezer architecture, would move readiness toward `demonstrated` and evidence toward E5.
