---
schema: frontier/v1
id: quantum-key-distribution
title: Quantum key distribution
summary: 'Cryptographic key exchange using individual photons, where eavesdropping is detectable by the laws of quantum mechanics. Formally standardised at the protection-profile level by ETSI in 2024.'
plain: 'Quantum key distribution (QKD) lets two parties share a secret encryption key using single photons over fibre or free-space links. If an eavesdropper intercepts the photons, they disturb the quantum states in a way the parties can detect, so they can discard the key and try again. Security rests on physics, not on the difficulty of a maths problem. QKD is already shipping in commercial products and deployed in national test networks. In January 2024, ETSI published the first Common Criteria-certified protection profile for QKD hardware — a formal security evaluation standard, not just a technical report — marking the technology as mature enough for regulated deployment.'
pillar: quantum
readiness: demonstrated
constellation: communications
cluster: qkd-protocols
actors:
  - ETSI ISG QKD
  - ID Quantique
  - Toshiba
country:
  - EU
  - JP
  - CN
metrics:
  - name: ETSI standard identifier
    value: 'GS QKD 016 V2.1.1'
    unit: ''
    note: 'Common Criteria Protection Profile for prepare-and-measure QKD; registered BSI-CC-PP-0120-2024'
evidence:
  claim: 'ETSI ISG QKD published GS QKD 016 V2.1.1 (January 2024), the first Common Criteria-registered protection profile for prepare-and-measure quantum key distribution modules, formally standardising security evaluation at EAL4 augmented level (AVA_VAN.5 and ALC_DVS.2).'
  level: E4
  verified: '2026-08-08'
  sources:
    - url: https://www.etsi.org/deliver/etsi_gs/QKD/001_099/016/02.01.01_60/gs_QKD016v020101p.pdf
      role: standard
      title: 'Quantum Key Distribution (QKD); Common Criteria Protection Profile - Pair of Prepare and Measure QKD Modules'
      publisher: ETSI
      date: '2024-01'
      identifier: 'ETSI GS QKD 016 V2.1.1 (2024-01)'
      accessed: '2026-08-08'
      note: 'Registered as BSI-CC-PP-0120-2024. First certified QKD protection profile; EAL4 augmented.'
links:
  - to: comms-mdi-qkd
    relation: competes-with
  - to: comms-satellite-qkd
    relation: enables
confidence: high
status: published
qdayImpact: 0
horizon: 1
novelty: 'First Common Criteria-certified protection profile for QKD modules'
priority: P2
review:
  state: reviewed
  by: human
  'on': '2026-08-08'
  agentMergedOn: '2026-08-08'
  agent: sourcer
---

Quantum key distribution encodes encryption keys in single photons whose quantum states cannot be copied without detection. The BB84 prepare-and-measure protocol remains the most widely deployed variant. QKD systems are shipping commercially and deployed in national test networks in China, Japan, and Europe. ETSI ISG QKD published GS QKD 016 V2.1.1 in January 2024 — the first QKD specification registered under Common Criteria (BSI-CC-PP-0120-2024), evaluated at EAL4 augmented with AVA_VAN.5 and ALC_DVS.2. This is a standardisation milestone that anchors the 'demonstrated' readiness rating. Note important limitations: QKD secures point-to-point links but requires trusted relay nodes over long distances and specialised optical hardware. It does not replace post-quantum cryptography for most use cases and is distinct from it.
