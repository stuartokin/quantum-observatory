---
schema: frontier/v1
id: entanglement-distribution
title: Long-range entanglement distribution
summary: 'Distributing quantum entanglement between separated nodes over optical fibre, enabling repeater-based quantum networks. Matter-to-matter entanglement demonstrated over 420 km by USTC in 2025/2026.'
plain: 'Entanglement is a property where two quantum particles share a joint state regardless of the distance between them. Distributing this property over long distances is the foundation of a quantum internet: it allows secure communication without a trusted relay, enables distributed quantum computing, and synchronises remote quantum clocks. The challenge is that optical fibres absorb photons rapidly — signal loss grows exponentially with distance. Researchers at the University of Science and Technology of China solved this for matter-based memories (stored quantum bits, not just photons) by converting the memory''s emitted light to a telecom wavelength where fibre loss is lowest, then using a central relay and phase-stabilisation techniques to herald successful entanglement. In 2025 they demonstrated this over 420 km — more than four times the previous record for memory-to-memory entanglement — laying a practical foundation for quantum repeaters.'
pillar: quantum
readiness: experimental
constellation: communications
cluster: quantum-network
actors:
  - 'University of Science and Technology of China (USTC)'
country:
  - CN
metrics:
  - name: Matter-to-matter entanglement distance
    value: '420'
    unit: km
    note: Atomic ensemble quantum memories, telecom S-band conversion, Luo et al. arXiv 2504.05660 / PRL 2026
  - name: Previous record
    value: '~100'
    unit: km
    note: Prior memory-memory demonstrations using quantum frequency conversion
horizon: 3
qdayImpact: 0
links:
  - to: comms-quantum-repeater
    relation: enables
  - to: comms-quantum-memory
    relation: depends-on
  - to: comms-quantum-internet
    relation: enables
novelty: '4x distance record for matter-to-matter entanglement in fiber'
priority: P2
moved:
  from: emerging
  on: '2026-08-08'
evidence:
  claim: 'Luo et al. (arXiv 2504.05660, published in Physical Review Letters 2026) report entanglement between two atomic ensemble quantum memories separated by 420 km of optical fibre. Photons from the memories are converted to telecom S-band (1,350 nm) via quantum frequency conversion to exploit low fibre loss (0.17 dB/km). Phase is stabilised using combined far-off-resonant and dual-band locking. The result exceeds the previous memory-memory entanglement record by more than four times and is published in a peer-reviewed journal, though not yet independently replicated.'
  level: E3
  verified: '2026-08-08'
  sources:
    - url: https://arxiv.org/abs/2504.05660
      role: preprint
      title: Entangling quantum memories over 420 km in fiber
      publisher: arXiv
      date: '2025-04-08'
      identifier: arXiv:2504.05660
      accessed: '2026-08-08'
      note: Published in Physical Review Letters 2026 (Luo et al.); preprint freely accessible.
    - url: https://www.nature.com/articles/s41467-022-33919-0
      role: corroborating
      title: Continuous entanglement distribution over a transnational 248 km fiber link
      publisher: Nature Communications
      date: '2022-10-17'
      identifier: 'Nat. Commun. 13, 6134 (2022)'
      doi: 10.1038/s41467-022-33919-0
      accessed: '2026-08-08'
      note: 248 km deployed-fibre photon entanglement (Austria-Slovakia), confirming feasibility at intercity scale for photon pairs.
confidence: medium
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agentMergedOn: '2026-08-08'
  agent: sourcer
  note: 'restored after an accidental bulk confirmation'
---

Distributing entanglement between nodes that store quantum states (memories) rather than merely detecting photons is the key step toward practical quantum repeaters. Earlier demonstrations extended memory-memory entanglement to tens of kilometres using quantum frequency conversion. The 420 km result from USTC (Luo et al., PRL 2026) crosses a threshold where direct photon transmission runs into fundamental rate limits, meaning repeater functionality is genuinely required.

The technique uses the DLCZ heralding scheme: photons emitted by laser-cooled rubidium atomic ensembles (Alice and Bob) are converted to 1,350 nm telecom S-band and routed to a central relay (Charlie), which performs a Bell-state measurement. Successful interference heralds that Alice and Bob are now entangled. Phase stability over 420 km is maintained by a two-stage locking scheme.

Readiness is set to **experimental** — the result is peer-reviewed and published in PRL but comes from a single group and has not yet been independently replicated. The prior board entry of 'emerging' (E1) understated a substantial experimental literature; the 420 km result itself is the strongest single data point.
