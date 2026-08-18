---
schema: frontier/v1
id: algo-trapped-ion-gate-compilation
title: 'Polynomial-time multiqubit gate design for large-scale trapped-ion systems'
summary: 'Peleg et al. (Weizmann, PRX Quantum 2026) introduce a polynomial-time algorithm for designing fast, robust multiqubit entanglement gates in trapped-ion chains of hundreds of qubits, replacing an NP-hard optimisation. Gate duration scales linearly with qubit count.'
plain: 'Trapped-ion quantum computers can run a single large gate on many qubits at once by exploiting long-range interactions, rather than decomposing it into a long sequence of two-qubit gates. The obstacle has been that designing such a gate for hundreds of ions required solving an NP-hard optimisation problem — computationally intractable for large systems. Peleg and colleagues at the Weizmann Institute introduce an algorithm that solves the design problem in polynomial time, meaning effort grows manageably as the ion chain gets longer. They show that gate duration scales linearly with qubit count. This is a theoretical and algorithmic result: validated numerically, not on hardware.'
pillar: quantum
constellation: algorithms
cluster: circuit-compilation
actors:
  - Weizmann Institute of Science
country:
  - IL
readiness: emerging
horizon: 2
priority: P2
qdayImpact: 0
novelty: 'Polynomial-time solution to NP-hard trapped-ion gate design; linear gate-duration scaling with qubit count.'
metrics:
  - name: gate-duration scaling
    value: 'O(N)'
    unit: 'with qubit count N'
    note: 'Analytical result; simultaneous entanglement operations scale as N-squared'
  - name: target system size
    value: 'hundreds'
    unit: ions
    note: 'Design regime claimed; not demonstrated on hardware at this scale'
links:
  - to: arch-trapped-ion
    relation: enables
  - to: enable-compilers
    relation: enables
evidence:
  level: E1
  claim: 'Peleg et al. (PRX Quantum 7, 033021, 2026; preprint arXiv:2307.09566, 2023) introduce a polynomial-time algorithm for designing multiqubit entanglement gates in trapped-ion chains of hundreds of qubits. The design problem had been classified as NP-hard. Gate duration is shown to scale as N (linear in qubit count) while simultaneous entanglement operations scale as N-squared. Drive-power requirements and noise susceptibility are analysed numerically. No hardware measurements are reported. Per the decisions file, a peer-reviewed theoretical paper is E1 regardless of journal venue.'
  verified: '2026-08-17'
  sources:
    - url: https://journals.aps.org/prxquantum/abstract/10.1103/r78y-3q89
      role: primary
      title: 'Fast Design and Scaling of Multiqubit Gates in Large-Scale Trapped-Ion Quantum Computers'
      publisher: 'PRX Quantum'
      date: '2026-07-31'
      identifier: 'PRX Quantum 7, 033021 (2026)'
      doi: 10.1103/r78y-3q89
      accessed: '2026-08-17'
      note: 'Peer-reviewed theoretical and algorithmic paper. No hardware measurements. Preprint arXiv:2307.09566 submitted July 2023. Confirmed via APS PRX Quantum listing (Published 31 July 2026) and Weizmann Ozeri Lab publications page.'
    - url: https://arxiv.org/abs/2307.09566
      role: preprint
      title: 'Fast design and scaling of multi-qubit gates in large-scale trapped-ion quantum computers'
      publisher: arXiv
      date: '2023-07-14'
      identifier: arXiv:2307.09566
      accessed: '2026-08-17'
      note: 'Preprint version submitted July 2023; published in PRX Quantum July 2026.'
confidence: medium
status: draft
origin: agent
added: '2026-08-17'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-17'
  reviewedOn: '2026-08-18'
  note: 'PRX Quantum 7, 033021 confirmed via APS listing (31 July 2026) and Weizmann Ozeri Lab page. Peleg, Schwerdt, Nemirovsky, Shapira, Akerman, Stern, Ben Kish, Ozeri — all Weizmann. Theoretical paper, no hardware measurements confirmed. E1 correct per decisions file (peer-reviewed theoretical paper). No changes.'
---

## What happened

Peleg and colleagues at the Weizmann Institute of Science (PRX Quantum, July 2026; preprint July 2023) introduce a polynomial-time algorithm for designing multiqubit entanglement gates in trapped-ion crystals of hundreds of qubits. The design problem had previously been NP-hard, making it computationally intractable for large systems. The algorithm exploits the structure of long-range Coulomb interactions between ions and shows that gate duration scales as *N* (linearly with qubit count) while the number of simultaneous entanglement operations scales as *N*².

## Why it matters

Scaling trapped-ion quantum computers to hundreds of qubits faces two obstacles: physical (trap design, heating, control electronics) and conceptual (gate design and compilation). This paper addresses the conceptual one. If large multiqubit gates can be designed efficiently, fewer gate decompositions are needed, circuit depth falls, and accumulated error is reduced — directly relevant to the fault-tolerant regime. It also extends naturally to the `enable-compilers` item as a trapped-ion-specific compilation advance.

## Previous state of the art

Designing multiqubit gates for large ion crystals required NP-hard optimisation, practically limiting gate design to smaller systems or falling back to sequences of two-qubit gates.

## Limitations

This is a theoretical and algorithmic result. No hardware demonstration is reported; claims rest on numerical simulations. The gap between a polynomial-time design algorithm and a demonstrated high-fidelity gate on hundreds of physical ions remains large. The same Weizmann group has separate experimental work (optical tweezer gates, January 2026, already on the board as arch-ion-tweezer-gate-exp), but this paper is distinct from that.

## What would change the assessment

An experimental demonstration of a gate designed by this method on a large ion chain with measured fidelity would move this to E4 and readiness to `experimental`. Adoption by a commercial trapped-ion compiler stack would move it toward `demonstrated`.
