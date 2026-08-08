---
schema: frontier/v1
id: comms-satellite-qkd
title: Satellite QKD
summary: 'Quantum key distribution from a low-Earth-orbit satellite to ground stations, achieving kilohertz key rates over distances up to 1,200 km — far beyond the range of fibre-based QKD.'
plain: 'Quantum key distribution (QKD) uses the laws of physics to create encryption keys that cannot be intercepted without detection. Doing this through optical fibre only works up to a few hundred kilometres before signal loss kills the rate. The Micius satellite, launched by China in 2016, solved this by sending quantum-encoded light pulses from orbit to ground receivers — photons lose far less energy crossing empty space than they do in glass fibre. The first published result achieved a usable key rate over 1,200 km. A 2024 microsatellite follow-on reduced the hardware mass by more than an order of magnitude and demonstrated the same capability with portable ground stations, pointing toward eventual satellite constellations for global quantum-secure links.'
pillar: quantum
readiness: demonstrated
constellation: communications
cluster: qkd
actors:
  - 'University of Science and Technology of China (USTC)'
  - 'Chinese Academy of Sciences'
country:
  - CN
metrics:
  - name: Maximum distance
    value: '1200'
    unit: km
    note: Satellite-to-ground decoy-state QKD, Micius LEO satellite, Liao et al. 2017
  - name: Key rate at 1200 km
    value: '>1'
    unit: kbps
    note: Liao et al. 2017
  - name: Secure keys per pass (microsatellite)
    value: '0.59'
    unit: Mbits
    note: 23 kg microsatellite payload, arXiv 2408.10994 (2024)
horizon: 2
qdayImpact: 0
links:
  - to: quantum-key-distribution
    relation: evidence-for
  - to: entanglement-distribution
    relation: enables
novelty: first satellite-to-ground QKD at intercontinental distances
priority: P2
evidence:
  claim: 'Liao et al. (2017) report decoy-state QKD from the Micius LEO satellite to a ground station at Xinglong, achieving a key rate exceeding 1 kbps over distances up to 1,200 km — 20 orders of magnitude more channel-efficient than the equivalent fibre link at that distance. A 2024 preprint (arXiv 2408.10994) demonstrates the same capability on a 23 kg microsatellite payload with portable ground stations, generating up to 0.59 Mbit of secure key per pass.'
  level: E4
  verified: '2026-08-08'
  sources:
    - url: https://www.nature.com/articles/nature23655
      role: primary
      title: Satellite-to-ground quantum key distribution
      publisher: Nature
      date: '2017-09-07'
      identifier: 'Nature 549, 43-47 (2017)'
      doi: 10.1038/nature23655
      accessed: '2026-08-08'
    - url: https://arxiv.org/abs/2408.10994
      role: corroborating
      title: Microsatellite-based real-time quantum key distribution
      publisher: arXiv
      date: '2024-08-20'
      identifier: arXiv:2408.10994
      accessed: '2026-08-08'
      note: Demonstrates miniaturised payload (23 kg) and portable ground station (100 kg), achieving 0.59 Mbit secure key per pass.
confidence: high
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

The Micius satellite (launched August 2016, ~500 km LEO) was the first platform to demonstrate QKD across intercontinental distances. Liao et al. (2017) showed decoy-state QKD to the Xinglong ground station over distances from 645 km to 1,200 km, with key rates exceeding 1 kbps — vastly more efficient than any fibre alternative at those distances. The experiment ran on 23 different days, confirming operational reliability across varied atmospheric conditions.

A 2024 microsatellite result (arXiv 2408.10994) extends the work: a 23 kg quantum payload on a small satellite, paired with ~100 kg portable ground stations, achieved up to 0.59 Mbit of secure key during a single satellite pass, with real-time key distillation.

The readiness is **demonstrated**: QKD from orbit to ground works at useful key rates and has been independently operated across multiple ground stations. Scaling to a constellation remains an engineering and cost challenge, not a scientific one.
