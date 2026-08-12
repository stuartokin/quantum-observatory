---
schema: frontier/v1
id: arch-ion-tweezer
title: 'Ion-in-tweezer quantum computer architecture'
summary: 'Architectural proposal combining trapped-ion coherence with optical tweezer reconfigurability, using state-dependent dipole forces to mediate temperature-robust entangling gates on barium ions.'
plain: 'Standard trapped-ion computers confine ions in radio-frequency traps and move them along fixed rail structures — a process called QCCD shuttling — to bring pairs close enough to interact. Neutral-atom computers use optical tweezers (tightly focused laser beams) to hold atoms anywhere in a 2D plane and move them freely, but the Rydberg interactions used to entangle them suffer from spontaneous emission that limits gate quality. This proposal takes the best of both: ions, which have long coherence times and high-fidelity gates, are held in optical tweezers rather than fixed traps, giving free 2D repositioning. Entangling gates are generated not by motional modes along a rail but by temporarily exciting an ion into an auxiliary state, creating an effective electric dipole, and letting two such dipoles interact via the Coulomb force. Because the gate is mediated by long-lived metastable levels rather than Rydberg states, spontaneous emission errors are suppressed by many orders of magnitude. The gate is designed to be temperature-robust — it does not require ions to be cooled to their motional ground state first, which is a practical advantage. A concrete implementation using barium ions exploiting their state-selective polarizability is analysed, and the architecture is shown to support transversal gates, which are the parallel operations needed for efficient quantum error correction. The paper is a theoretical proposal; no device has been built.'
pillar: quantum
readiness: emerging
constellation: architectures
cluster: trapped-ion
actors:
  - Max-Planck-Institut fuer Quantenoptik
  - Duke University
  - IonQ
  - University of Innsbruck
metrics:
  - name: gate mechanism
    value: 'Coulomb interaction between state-dependent effective electric dipoles'
    note: 'Temperature-robust closure of motional trajectories; no residual qubit-motion entanglement'
  - name: target ion species
    value: barium
    note: 'Exploits state-selective polarizability for dipole engineering'
  - name: gate parallelism
    value: 'transversal gates studied'
    note: 'Cross-talk suppression during parallel execution analysed'
links:
  - to: arch-trapped-ion
    relation: competes-with
  - to: arch-neutral-atom
    relation: competes-with
  - to: arch-ion-tweezer-gate-exp
    relation: depends-on
  - to: qec-surface-code
    relation: enables
  - to: crqc
    relation: evidence-for
evidence:
  claim: 'Schiffer, Monroe, Zoller, and Cirac propose a quantum computer architecture in which ions are confined in optical tweezer arrays. Selected ions are transported to local interaction zones where excitation to an auxiliary state generates a controllable effective electric dipole; entangling gates are mediated by the Coulomb interaction between such dipoles and shown to be temperature-robust, leaving no residual entanglement between qubits and motion. A concrete implementation with barium ions is outlined, and suppression of cross-talk during parallel gate execution is studied, with relevance to transversal gates in quantum error correction.'
  verified: '2026-08-12'
  level: E3
  sources:
    - url: 'https://arxiv.org/abs/2606.27249'
      role: preprint
      title: 'Quantum computer architecture with ions in tweezer arrays'
      publisher: arXiv
      date: '2026-06-25'
      identifier: 'arXiv:2606.27249'
      doi: '10.48550/arXiv.2606.27249'
      accessed: '2026-08-12'
      note: 'Submitted 25 June 2026. Authors at MPQ Munich, Duke University / IonQ, University of Innsbruck. Not yet peer-reviewed. Rated E3 as preprint.'
confidence: medium
status: draft
origin: agent
priority: P1
qdayImpact: 0
qdayReasoning: 'Ion-in-tweezer is an early-stage architectural proposal. It addresses scalability and gate parallelism in trapped-ion systems, but the machine required to break RSA-2048 is orders of magnitude beyond anything this or any other current architecture describes. No effect on Q-Day timing.'
country:
  - DE
  - US
  - AT
novelty: 'New architecture combining trapped-ion fidelity with tweezer reconfigurability via effective dipole gate mechanism'
horizon: 2
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-12'
  reviewedOn: '2026-08-12'
  note: 'First reviewer pass. arXiv:2606.27249 confirmed as preprint submitted June 2026, authors at MPQ Munich / Duke / IonQ / Innsbruck. E3 correct for preprint. Architecture proposal (theoretical), readiness emerging correct. Not a duplicate of arch-ion-tweezer-gate-exp (which is the experimental gate paper by Schwerdt et al., PRL 2026) or arch-rf-trap-optical-segmentation (different architecture). No changes.'
---

## What happened

Schiffer, Monroe, Zoller, and Cirac (MPQ Munich, Duke/IonQ, Innsbruck) posted arXiv:2606.27249 on 25 June 2026 proposing a new trapped-ion architecture that replaces fixed radio-frequency trap rails with optical tweezer arrays. Ions are repositioned freely in 2D, analogous to neutral-atom platforms, but entanglement uses a new mechanism: a state-dependent displacement of the tweezer potential creates a large effective electric dipole on demand. Two such dipoles interact via the Coulomb force to generate the gate, with the motional trajectory analytically closed so that no residual ion-motion entanglement remains at the end — making the gate temperature-robust without requiring ground-state cooling.

## Why it matters

Trapped-ion QCCD (the current `arch-trapped-ion` entry) faces a connectivity and parallelism bottleneck: ions must be physically shuttled along fixed structures, limiting the rate at which gates can be applied across the register. Neutral-atom Rydberg platforms have excellent reconfigurability but their gate mechanism involves electronically excited states with sub-millisecond lifetimes, setting a floor on spontaneous-emission error. Ion-in-tweezer addresses both: the 2D reconfigurability removes the QCCD bottleneck, and the metastable auxiliary levels used for the dipole have lifetimes orders of magnitude longer than Rydberg states, suppressing spontaneous emission. The explicit analysis of cross-talk suppression during parallel gate execution addresses a known obstacle to transversal error-correction gates.

## Previous state of the art

Earlier proposals for using tweezers in trapped-ion systems (Mazzanti et al. 2021, PRL 127, 260502; Schwerdt et al. 2024, PRX 14, 041017) used tweezers for motional engineering within existing RF traps. This paper proposes tweezers as the primary confinement mechanism, a qualitatively different architecture.

## Limitations

This is a theoretical proposal; no device has been built. The effective dipole mechanism requires selective excitation of metastable states whose properties must be precisely controlled. Crosstalk from tweezer beams on neighbouring ions is identified as a challenge and analysed but not experimentally characterised. Readiness is `emerging` because there is no experimental replication of the specific gate mechanism in this regime.

## What would change the assessment

A laboratory demonstration of the effective-dipole gate in a tweezer-confined ion (as opposed to a tightly focused beam on an ion in an RF trap) would move readiness to `experimental`. Peer review of this preprint would raise evidence to E4.
