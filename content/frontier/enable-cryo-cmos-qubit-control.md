---
schema: frontier/v1
id: enable-cryo-cmos-qubit-control
title: 'Milli-kelvin CMOS chip for spin-qubit control'
summary: 'Bartee et al. (Nature 643, 2025) demonstrated milli-kelvin CMOS circuits integrated with silicon spin qubits, achieving gate fidelities comparable to room-temperature electronics while removing the wiring bottleneck that prevents scaling to millions of qubits.'
plain: 'Spin qubits in silicon are appealing for quantum computing because they are tiny — millions could fit on a fingernail-sized chip. The problem is control: every qubit needs multiple electrical connections to room-temperature electronics outside the refrigerator, and at millions of qubits, the number of wires becomes impossible to manage. The solution demonstrated here is to put the control chip inside the refrigerator, cooled to within a fraction of a degree of absolute zero (milli-kelvin temperatures), directly next to the qubits. Researchers at the University of Sydney and UNSW fabricated CMOS control circuits using standard semiconductor manufacturing and showed they can operate at those extreme temperatures without disrupting qubit performance. Two-qubit gate fidelities achieved with cryo-CMOS control were comparable to those using conventional room-temperature electronics on the same qubits. This removes a fundamental barrier to scaling spin-qubit systems: the wiring density problem that grows linearly with qubit count.'
pillar: quantum
readiness: experimental
constellation: enabling
cluster: 'control electronics'
actors:
  - University of Sydney
  - University of New South Wales
  - Emergence Quantum
metrics:
  - name: 'Operating temperature'
    value: '<20'
    unit: 'mK'
    note: 'Cryo-CMOS control circuits co-located with spin qubits at milli-kelvin'
  - name: 'Gate fidelity'
    value: 'comparable to room-temperature'
    unit: ''
    note: 'Two-qubit exchange-coupling gates matched room-temperature electronics on same QPU'
links:
  - to: arch-silicon-spin
    relation: enables
  - to: enable-control-electronics
    relation: enables
  - to: enable-fabrication
    relation: depends-on
evidence:
  claim: 'Bartee et al. benchmarked silicon MOS-style electron spin qubits controlled by heterogeneously integrated cryo-CMOS circuits at milli-kelvin temperatures. The paper demonstrates that CMOS control chips fabricated by standard processes can be co-located with spin qubits at milli-kelvin without degrading qubit performance, including two-qubit entangling gates based on exchange coupling. Each physical qubit requires multiple control lines; co-locating control electronics eliminates the extreme-density wiring required to connect qubits to room-temperature hardware. The authors identify this wiring density as a fundamental barrier to scaling toward the millions of qubits required for fault-tolerant algorithms.'
  verified: '2026-08-11'
  level: E4
  sources:
    - url: 'https://www.nature.com/articles/s41586-025-09157-x'
      role: primary
      title: 'Spin-qubit control with a milli-kelvin CMOS chip'
      publisher: Nature
      date: '2025-06-25'
      identifier: 'Nature 643, 382-387 (2025)'
      doi: 10.1038/s41586-025-09157-x
      accessed: '2026-08-11'
      note: 'PMC open-access (PubMed 40562920). ArXiv preprint at arXiv:2407.15151. Funded by Microsoft and Australian Research Council.'
    - url: 'https://arxiv.org/abs/2407.15151'
      role: preprint
      title: 'Spin Qubits with Scalable milli-kelvin CMOS Control'
      publisher: arXiv
      date: '2024-07-21'
      identifier: 'arXiv:2407.15151'
      accessed: '2026-08-11'
      note: 'Preprint version; journal record at doi above.'
confidence: high
status: draft
priority: P1
qdayImpact: 0
qdayReasoning: 'This result removes a wiring-density bottleneck in silicon spin-qubit systems. It does not change the timeline to break RSA-2048 or elliptic-curve cryptography: the limiting factors for cryptanalytic relevance are logical qubit count, error correction overhead, and algorithm compilation, none of which this paper addresses directly. Scaling spin qubits to millions of physical qubits remains a necessary but very long path to cryptographic relevance.'
country:
  - AU
novelty: 'first milli-kelvin CMOS qubit control matching room-temperature fidelity on a spin-qubit device'
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

Researchers at the University of Sydney and UNSW (supported by Microsoft and the Australian Research Council) built CMOS control chips using standard semiconductor processes and operated them at milli-kelvin temperatures, physically co-located with silicon spin qubits. Two-qubit gate fidelities achieved with the cryo-CMOS system were comparable to those obtained with conventional room-temperature electronics on the same device.

## Why it matters

The wiring density problem is one of the most discussed practical obstacles to scaling spin qubits. Every qubit needs several control lines; millions of qubits mean millions of wires penetrating a refrigerator that can only absorb microwatts of heat. Placing CMOS logic inside the refrigerator at the same temperature as the qubits removes the wire-count bottleneck. Standard semiconductor processes being sufficient means existing foundry infrastructure can be leveraged.

## Previous state of the art

CMOS-based cryogenic control at 4 K had been demonstrated (Xue et al., Nature 593, 2021). Operating at 4 K rather than milli-kelvin leaves a thermal gap that affects the most sensitive qubit operations. This paper is the first to demonstrate co-integrated milli-kelvin CMOS control without degrading spin-qubit two-qubit gate fidelity.

## Limitations

The demonstration covers a small number of qubits. Scaling the cryo-CMOS system to thousands of channels while staying within the cooling budget of a dilution refrigerator remains an open engineering problem. Heat and crosstalk from control chips are identified as risks for exchange-coupling gates at larger scale.

## What would change this assessment

Replication by a second independent group would raise this to E5. A demonstration controlling a multi-qubit register at comparable fidelity would support moving toward demonstrated readiness.
