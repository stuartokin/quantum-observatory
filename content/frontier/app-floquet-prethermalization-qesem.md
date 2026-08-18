---
schema: frontier/v1
id: app-floquet-prethermalization-qesem
title: 'Prethermal Floquet dynamics resolved beyond classical reach with QESEM error mitigation'
summary: 'Qedma QESEM on IBM Heron r3 resolves prethermal Floquet oscillations in a 74-qubit Ising magnet with percent-level precision in a regime where tensor-network and Pauli-path simulations on Fugaku fail to converge. Cross-platform checks on Quantinuum H2 and Helios support reliability.'
plain: 'A periodically driven quantum magnet was simulated on a 74-qubit IBM superconducting processor using Qedma''s QESEM error-reduction software. The simulation reached a regime where the best classical methods — including runs on the Fugaku supercomputer using more than 500,000 CPU-hours — could not produce reliable answers. Selected results were independently checked on two Quantinuum trapped-ion systems and agreed well. This demonstrates that commercially available near-term hardware plus software can explore physics that classical computers cannot currently reach reliably.'
pillar: quantum
constellation: applications
cluster: quantum-simulation
readiness: experimental
horizon: 2
priority: P1
qdayImpact: 0
qdayReasoning: 'This is a physics simulation result on a non-cryptographic problem (Floquet Ising magnetism). It does not reduce the qubit count, gate error requirements, or algorithmic resources needed to break RSA or ECC. Q-Day score 0.'
actors:
  - 'Qedma Quantum Computing'
  - 'IBM Quantum'
  - 'RIKEN Center for Computational Science'
  - 'BlueQubit'
  - 'Technion'
  - 'Hebrew University'
country:
  - IL
  - US
  - JP
metrics:
  - name: 'Maximum system size'
    value: '74'
    unit: qubits
    note: 'Heavy-hex ladder geometry on IBM Heron r3'
  - name: 'Floquet cycles measured'
    value: '30'
    unit: cycles
    note: 'Subharmonic prethermal oscillations resolved at up to 30 Floquet cycles'
  - name: 'Measurement precision'
    value: 'percent-level'
    unit: ''
    note: 'Stated in abstract; rigorous bounds from QESEM unbiased estimators'
  - name: 'Classical simulation effort'
    value: '>500000'
    unit: 'CPU-hours on Fugaku'
    note: 'Sparse Pauli-path simulations diverged from quantum results around cycle 15 at 51 qubits; tensor networks failed to converge'
novelty: 'Distinct physics result with multi-platform trust hierarchy; uses commercially deployed error mitigation'
links:
  - to: app-quantum-materials-advantage
    relation: competes-with
  - to: enable-compilers
    relation: depends-on
  - to: arch-superconducting
    relation: depends-on
  - to: arch-trapped-ion
    relation: evidence-for
evidence:
  level: E3
  claim: 'arXiv:2607.24937 reports that QESEM on an IBM Heron r3 processor resolved prethermal Floquet magnetization dynamics with percent-level precision in systems of up to 74 qubits and 30 Floquet cycles. Tensor-network simulations failed to converge; sparse Pauli-path simulations on Fugaku using more than 500,000 CPU-hours across ~12,888 nodes diverged from quantum results around cycle 15 at 51 qubits. At 74 qubits, no classical method tested produced reliable late-time results. Cross-platform corroboration used QESEM estimators on Quantinuum H2 and Helios trapped-ion processors at selected Floquet cycles, showing consistency with IBM results. The paper concludes that error-mitigated processors can function as quantitative scientific instruments for non-equilibrium quantum matter. This is a preprint; the Quantinuum checks are internal validation, not independent replication, so E3 is the correct level.'
  verified: '2026-08-17'
  sources:
    - url: 'https://arxiv.org/abs/2607.24937'
      role: preprint
      title: 'Resolving Structure in Prethermal Floquet Dynamics with Precision Quantum Computation'
      publisher: arXiv
      date: '2026-07-27'
      identifier: 'arXiv:2607.24937 [quant-ph]'
      accessed: '2026-08-17'
      note: 'Qedma, IBM, RIKEN, BlueQubit, Technion, Hebrew University. 74-qubit Floquet Ising magnet on IBM Heron r3 with QESEM; cross-platform checks on Quantinuum H2 and Helios at selected cycles. Not peer-reviewed.'
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
  note: arXiv:2607.24937 HTML and abstract opened. Lindner (Technion) and Aharonov (Hebrew University) confirmed in 41-author list — actors field correct. 74-qubit heavy-hex Floquet Ising on IBM Heron r3, QESEM, Fugaku Pauli-path divergence cycle 15 at 51 qubits, >500k CPU-hours across ~12,888 nodes, Quantinuum H2 and Helios cross-platform checks all confirmed. E3 correct for preprint. No changes.
---

## What happened

Qedma Quantum Computing, with IBM, RIKEN and BlueQubit, simulated a two-dimensional Floquet Ising magnet on an IBM Heron r3 superconducting processor. Using Qedma's QESEM error-mitigation software, the team measured magnetization dynamics with percent-level precision at system sizes up to 74 qubits and up to 30 Floquet cycles. The central physical result is that long-lived subharmonic prethermal oscillations persist in the thermodynamic limit of heavy-hex ladders — a question that could not be answered from classically accessible system sizes.

## Why it matters

The classical methods tested — two-dimensional tensor networks and sparse Pauli-path simulations run on Fugaku using more than 500,000 CPU-hours across nearly 13,000 nodes — failed to produce reliable answers at the scales reached by the quantum experiment. This is a credible near-term quantum advantage claim for many-body physics, distinct from random-circuit-sampling claims: the problem has physical content and the failure of classical methods is documented in detail against specific simulation strategies. QESEM is commercially available on the IBM Quantum Platform, so this result was achieved with deployed, not laboratory, software.

The cross-platform validation — selected Floquet cycles reproduced on Quantinuum H2 and Helios trapped-ion systems using QESEM — is a trust mechanism. The Quantinuum runs are internal to the paper's validation hierarchy, not an independent replication, but they are on a physically unrelated hardware platform and they agree. This is the kind of multi-platform consistency check that makes a result harder to dismiss as hardware artefact.

## Previous state of the art

Prior Floquet prethermalization experiments were limited to classically verifiable system sizes. The classical counter-result arXiv:2608.13110 (which simulated the IBM/UChicago doped-Clifford circuit in 37 minutes on 256 H100s) targets a different circuit family and does not apply here. No classical counter-simulation of this specific Floquet Ising circuit has appeared as of 2026-08-17.

## Limitations

This is a preprint (E3). Peer review has not occurred. The Quantinuum checks cover selected cycles only and should not be read as independent replication at scale. QESEM error bounds depend on its characterisation of the hardware noise model; independent verification of that characterisation has not been published separately. Confidence is medium pending peer review and independent classical simulation attempts.

## What would change the assessment

A classical simulation of this Floquet Ising circuit at 74 qubits achieving convergence would weaken or eliminate the advantage claim. Peer review and replication on an independent platform would raise confidence and evidence level to E4 or E5. Absence of a classical counter-result after peer review would significantly strengthen confidence.
