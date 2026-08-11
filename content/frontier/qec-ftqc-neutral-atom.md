---
schema: frontier/v1
id: qec-ftqc-neutral-atom
title: 'Complete FTQC architecture on neutral atoms: surface codes, gates, surgery, teleportation'
summary: 'Bluvstein et al. (Nature 649, 2026) assembled all key FTQC primitives on 448 rubidium atoms: surface code QEC, transversal gates, lattice surgery, and transversal teleportation for universality.'
plain: 'Fault-tolerant quantum computing requires several distinct ingredients to work together: a way to detect and correct errors continuously, logic operations that do not spread those errors, a method to connect logical qubits, and a trick to unlock operations that error-correction codes normally forbid. This experiment at Harvard used 448 neutral rubidium atoms in a reconfigurable optical array to demonstrate all of these on a single device. The experiment ran surface codes showing error suppression 2.14x below the fault-tolerance threshold, used transversal gates and lattice surgery to create and manipulate entangled logical qubits, and used teleportation through a three-dimensional code to achieve universality without compromising error protection. Earlier work demonstrated some of these pieces individually or on fewer atoms. This paper assembles the whole architecture and measures how each component works and how they interact. The device is not yet at a scale useful for real computations, but it is the clearest demonstration to date that all the required pieces can coexist and function together on a single platform.'
pillar: quantum
readiness: experimental
constellation: error-correction
cluster: 'fault-tolerant architecture'
actors:
  - Harvard University
  - MIT
  - NIST/University of Maryland
metrics:
  - name: 'Below-threshold factor'
    value: '2.14'
    unit: 'x below threshold'
    note: 'Four-round surface code circuit; atom loss detection and ML decoding'
  - name: 'Physical qubits'
    value: '448'
    unit: 'neutral atoms'
    note: 'Reconfigurable rubidium-87 Rydberg tweezer array'
links:
  - to: arch-neutral-atom
    relation: evidence-for
  - to: qec-surface-code
    relation: depends-on
  - to: qec-magic-state-distillation
    relation: depends-on
  - to: qec-logical-fidelity
    relation: evidence-for
  - to: qec-below-threshold-surface-code
    relation: evidence-for
evidence:
  claim: 'Bluvstein et al. used reconfigurable arrays of up to 448 neutral atoms to implement the key elements of a universal fault-tolerant quantum processing architecture. The paper reports 2.14(13)x below-threshold performance in a four-round surface code characterisation circuit using atom loss detection and machine learning decoding. Logical entanglement was demonstrated via transversal gates and lattice surgery; universality was extended via transversal teleportation with three-dimensional [[15,1,3]] code blocks. The authors report orders-of-magnitude reductions in space and time overhead from three design choices: ML decoding for surface codes, teleportation-based universality, and targeted syndrome measurements. Published Nature 649, 39-46, 1 January 2026. A publisher correction (figure label only) appeared in Nature 650, E3 (2026).'
  verified: '2026-08-11'
  level: E4
  sources:
    - url: 'https://www.nature.com/articles/s41586-025-09848-5'
      role: primary
      title: 'A fault-tolerant neutral-atom architecture for universal quantum computation'
      publisher: Nature
      date: '2026-01-01'
      identifier: 'Nature 649, 39-46 (2026)'
      doi: 10.1038/s41586-025-09848-5
      accessed: '2026-08-11'
      note: 'Peer-reviewed. Epub 2025-11-10. Publisher correction (figure label only) in Nature 650, E3 (doi:10.1038/s41586-026-10108-3). PMC open-access (PMID 41214350).'
confidence: high
status: draft
priority: P1
qdayImpact: 0
qdayReasoning: 'This result advances the state of FTQC architecture on neutral atoms but does not change the resources, engineering difficulty, or timeline needed to break RSA-2048 or deployed elliptic-curve cryptography. The experiment demonstrates that architectural components of a universal fault-tolerant computer can be assembled on a single neutral-atom device at 448 physical qubits. It does not demonstrate an operation that directly threatens cryptographic keys. The machine would need to scale by several orders of magnitude and sustain demonstrated error rates across far larger circuits before any cryptanalytic relevance arises. The 2.14x below-threshold factor is a characterisation result, not a computation. Q-Day impact is 0.'
country:
  - US
novelty: 'first experimental assembly of complete FTQC primitive stack on a single neutral-atom device'
horizon: 2
added: '2026-08-11'
origin: agent
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-11'
---

## What happened

Bluvstein et al. at Harvard (with MIT and NIST/Maryland collaborators) demonstrated that all key building blocks of a fault-tolerant universal quantum computer can be assembled and measured on a single neutral-atom device. Using up to 448 rubidium-87 atoms in a reconfigurable Rydberg tweezer array, the team ran four distinct experiments: (1) repeated surface code error correction, showing 2.14x below-threshold performance using atom-loss detection and ML decoding; (2) logical entanglement via transversal gates; (3) multi-qubit logical operations via lattice surgery; (4) transversal teleportation through a [[15,1,3]] code to achieve universality without violating fault-tolerance constraints on transversal gates.

## Why it matters

No previous experiment had assembled the full set of FTQC primitives on a single device. The board already carries arch-neutral-atom and qec-below-threshold-surface-code as separate items; this result is what those items were pointing toward — the demonstration that the architecture coheres as a system. The paper also reports orders-of-magnitude reductions in space and time overhead from three architectural choices.

## Previous state of the art

The same group (Nature 626, 2024) demonstrated a logical processor on reconfigurable atom arrays without assembling the full FTQC primitive stack. Surface code below-threshold performance had been demonstrated by Google (Nature 638, 2025). Transversal gates and lattice surgery had been demonstrated separately on trapped ions and superconducting devices. The novelty here is integration.

## Limitations

The system operates at 448 physical atoms, far below the millions needed for cryptographically relevant computation. The experiment characterises individual primitives and their combination; it does not run an end-to-end fault-tolerant algorithm. Error rates and circuit depths are sufficient to demonstrate the architecture, not to run useful algorithms.

## What would change this assessment

Replication of the integrated architecture at another laboratory would raise this to E5. Demonstration of a complete logical algorithm rather than characterisation circuits would support moving toward demonstrated readiness.
