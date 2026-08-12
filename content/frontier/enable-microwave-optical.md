---
schema: frontier/v1
id: enable-microwave-optical
title: 'Microwave-to-optical quantum transduction for superconducting network links'
summary: 'Converting quantum information between microwave (used by superconducting qubits) and optical frequencies (used for long-distance fibre transmission) is a key bottleneck for modular and networked quantum computing. Optomechanical systems now reach 93% internal efficiency; electro-optic devices approach 99.5% internal efficiency at millikelvin temperatures. System efficiency and noise remain the open problems.'
plain: 'Superconducting quantum computers operate at microwave frequencies — the same band as Wi-Fi, but at temperatures near absolute zero. Optical fibres carry information at light frequencies, which can travel kilometres without loss. To connect two superconducting quantum processors across a building — let alone across a city — you need a transducer: a device that converts a single quantum of microwave energy into a single quantum of light, without adding noise or losing the quantum state. This is the microwave-to-optical transduction problem. Three main approaches exist: mechanical (use a tiny vibrating object that couples to both microwave and light), electro-optic (use a crystal whose optical properties change with electric field), and magneto-optic (use spin waves in a magnetic material). This review covers progress from 2014 to 2026. Optomechanical systems have reached 93% internal phonon-to-photon efficiency; electro-optic devices based on lithium niobate have reached internal efficiencies approaching 99.5% at millikelvin temperatures. The bottleneck is no longer conversion efficiency in isolation — it is operating these devices without adding thermal noise that destroys the quantum state, and integrating them into working quantum network links.'
pillar: quantum
constellation: enabling
cluster: networking
readiness: experimental
horizon: 2
priority: P1
actors:
  - 'Multiple academic groups (survey)'
country:
  - US
  - Europe
metrics:
  - name: 'Optomechanical internal efficiency'
    value: '93'
    unit: '%'
    note: 'Internal phonon-to-photon efficiency at millikelvin temperatures; sub-quantum added noise of 0.25 quanta'
  - name: 'Electro-optic internal efficiency'
    value: '~99.5'
    unit: '%'
    note: 'LiNbO3 and AlN devices at millikelvin; system efficiency much lower due to coupling and other losses'
novelty: 'Electro-optic transduction now approaches near-unity internal efficiency; noise, bandwidth and system integration remain open'
links:
  - to: arch-superconducting
    relation: enables
  - to: comms-quantum-internet
    relation: enables
  - to: qec-modular-architecture
    relation: enables
evidence:
  claim: 'A review of microwave-to-optical quantum transduction from 2014 to 2026 reports: optomechanical systems achieve 93% internal phonon-to-photon efficiency with 0.25 quanta added noise at millikelvin; electro-optic devices (LiNbO3 and AlN) have advanced from room-temperature efficiencies below 1% to millikelvin internal efficiencies approaching 99.5%. The review identifies added noise, bandwidth, and system-level integration (not internal conversion efficiency) as the remaining barriers. This is a review article; individual experimental results supporting each metric are cited within it.'
  verified: '2026-08-12'
  level: E3
  sources:
    - url: 'https://arxiv.org/abs/2605.26976'
      role: primary
      title: 'Toward Scalable Heterogeneous Quantum Networks: Microwave-Optical Transduction Across Platforms'
      publisher: arXiv
      date: '2026-05-26'
      identifier: 'arXiv:2605.26976'
      accessed: '2026-08-12'
      note: 'Review article covering 2014–2026 progress across optomechanical, electro-optic and magneto-optic platforms. E3 as a review; individual experimental papers cited within reach E4. Preprint, not peer-reviewed.'
qdayImpact: 0
qdayReasoning: 'Transduction enables networked quantum computing; no direct cryptanalytic relevance at current efficiency and noise levels.'
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

Microwave-to-optical quantum transduction converts single quanta of energy between the microwave frequencies used by superconducting qubits (~5 GHz) and the optical frequencies used in telecommunications fibres (~200 THz). This is a fundamental requirement for networking superconducting quantum processors, because microwave signals attenuate completely over even short cable runs at room temperature.

Three physical approaches have been developed since 2014:
- **Optomechanical**: a nano-mechanical resonator couples to both a microwave cavity (via radiation pressure) and an optical cavity (via radiation pressure). Internal efficiencies of 93% have been demonstrated.
- **Electro-optic**: a crystal (LiNbO₃, AlN) changes its optical properties when an electric field is applied. Room-temperature efficiencies below 1% have grown to internal efficiencies approaching 99.5% at millikelvin temperatures.
- **Magneto-optic**: spin waves (magnons) in a ferromagnetic material couple to both microwave and optical fields. Efficiency and noise remain lower than the other approaches.

## Why it matters

Without high-efficiency, low-noise transduction, superconducting quantum computers cannot be networked into larger systems and cannot communicate with quantum repeater chains. This is one of the named enabling gaps on the board. Progress here has been faster than widely appreciated: internal conversion efficiency is no longer the blocking problem in at least two approaches. The blocking problem is now noise: the optical pump required to drive the transduction heats the device, adding thermal photons that destroy the quantum state. Solving the noise problem is the current frontier.

## Previous state of the art

In 2020, the first transduction of entangled microwave-optical states was demonstrated (Sahu et al., Science 2023). By 2024, individual demonstrations had reached tens-of-percent internal efficiency. The 2026 review documents the jump to near-unity internal efficiency in two platforms, repositioning the bottleneck from conversion efficiency to noise and system integration.

## Limitations

Review article (E3). Individual experimental claims cited within it should be checked for replication status before moving this item above E3. System efficiency — which includes all coupling and propagation losses, not just the transducer itself — remains well below internal efficiency in all implementations. The pump-heating problem is not solved; the pump-free scheme (arXiv:2512.05096) is theoretical.

## What would change this assessment

A peer-reviewed demonstration of quantum-coherent transduction (not just efficient photon conversion) at system efficiency sufficient for entanglement distribution; demonstration in a working network link between two separate quantum processors.
