---
schema: frontier/v1
id: comms-mdi-qkd
title: Measurement-device-independent QKD
summary: 'MDI-QKD removes all detector side-channel attacks by having both parties send photons to an untrusted relay. Demonstrated over 442 km of ultralow-loss fibre in 2023.'
plain: 'Standard QKD systems are vulnerable to attacks that target weaknesses in the single-photon detectors used to receive signals. Measurement-device-independent QKD (MDI-QKD) sidesteps this entirely: instead of receiving, both Alice and Bob send photons to a central relay (Charlie), which does the measurement. Even if Charlie is malicious, the protocol remains secure, because neither party reveals their key bits in the process. The technique has been demonstrated over 442 km of ultralow-loss optical fibre, setting a distance record for the MDI variant. At shorter distances it can coexist with standard classical traffic on the same fibre, making it practical for deployment in metropolitan networks.'
pillar: quantum
readiness: demonstrated
constellation: communications
cluster: qkd
actors:
  - 'University of Science and Technology of China (USTC)'
country:
  - CN
metrics:
  - name: Maximum demonstrated distance
    value: '442'
    unit: km
    note: Five-intensity decoy-state MDI-QKD over ultralow-loss fibre, Liu et al. PRA 2023
  - name: Prior record
    value: '404'
    unit: km
    note: Yin et al. PRL 2016
horizon: 2
qdayImpact: 0
links:
  - to: quantum-key-distribution
    relation: evidence-for
  - to: comms-quantum-repeater
    relation: depends-on
novelty: detector-side-channel-free QKD at record distance
priority: P2
evidence:
  claim: 'Liu et al. (2023, Phys. Rev. A 108, 022605) experimentally demonstrate five-intensity decoy-state MDI-QKD and achieve a positive secure key rate over 442 km of ultralow-loss optical fibre, surpassing the previous 404 km record and confirming that the five-intensity protocol outperforms four-intensity schemes in both distance and key rate.'
  level: E4
  verified: '2026-08-08'
  sources:
    - url: https://journals.aps.org/pra/abstract/10.1103/PhysRevA.108.022605
      role: primary
      title: Experimental demonstration of five-intensity measurement-device-independent quantum key distribution over 442 km
      publisher: Physical Review A
      date: '2023-08-09'
      identifier: 'Phys. Rev. A 108, 022605 (2023)'
      doi: 10.1103/PhysRevA.108.022605
      accessed: '2026-08-08'
    - url: https://www.nature.com/articles/s41534-021-00394-2
      role: corroborating
      title: Gigahertz measurement-device-independent quantum key distribution using directly modulated lasers
      publisher: npj Quantum Information
      date: '2021-04-08'
      identifier: 'npj Quantum Inf. 7, 58 (2021)'
      doi: 10.1038/s41534-021-00394-2
      accessed: '2026-08-08'
      note: Demonstrates 1 GHz clock-rate MDI-QKD, improving key rate by an order of magnitude over prior art.
confidence: high
status: published
origin: agent
added: '2026-08-08'
review:
  state: reviewed
  by: human
  'on': '2026-08-08'
  agentMergedOn: '2026-08-08'
  agent: sourcer
---

MDI-QKD closes the detector loophole that affected earlier QKD deployments. Rather than trusting the measurement apparatus, both communicating parties (Alice and Bob) send photons toward a central node (Charlie) that performs a Bell-state measurement. The result tells Alice and Bob whether their bits are correlated, but not what the values are — so a compromised or malicious Charlie learns nothing useful.

The protocol was first proposed in 2012 and initial proof-of-concept experiments appeared in 2013–2014. The key milestone for this board entry is Liu et al. (Phys. Rev. A, August 2023), which extends the secure distance to 442 km using an optimised five-intensity decoy-state method and ultralow-loss fibre (0.16 dB/km). Field demonstrations in metropolitan networks have also been reported, confirming coexistence with classical traffic at telecom wavelengths.

Readiness is **demonstrated**: MDI-QKD works at distances relevant for regional networks and has been tested in field conditions, not just the laboratory.
