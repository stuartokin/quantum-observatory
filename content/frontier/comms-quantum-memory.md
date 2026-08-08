---
schema: frontier/v1
id: comms-quantum-memory
title: Quantum memory for networks
summary: 'Optical quantum memories store and release quantum states on demand, enabling synchronisation in quantum repeaters. A 2025 peer-reviewed experiment demonstrated quantum memory integrated into a complete cryptography protocol for the first time.'
plain: 'A quantum memory does for a quantum network what a buffer does in a classical one: it holds a quantum state until the network is ready to use it. Without this, quantum repeaters cannot synchronise, and long-distance quantum communication stays impractical. In 2025, a Paris team showed that a cold-atom optical memory could meet the strict efficiency and noise requirements of a real cryptographic protocol — the first time a quantum memory was embedded in a complete quantum cryptography application rather than tested in isolation. The platform used a cold-atom ensemble with near-unity storage efficiency and extremely low noise, meeting thresholds that earlier devices had missed.'
pillar: quantum
readiness: experimental
constellation: communications
cluster: quantum-repeater
actors:
  - 'Laboratoire Kastler Brossel'
  - 'Sorbonne Universite'
  - 'CNRS'
  - 'ENS-Universite PSL'
country:
  - FR
metrics:
  - name: 'Storage efficiency'
    value: 'near-unity'
    unit: ''
    note: 'Cold-atom EIT-based memory; described as near-unity efficiency with extremely low noise in Science Advances 2025'
horizon: 2
novelty: 'First quantum memory integrated into a complete cryptographic protocol'
evidence:
  claim: 'Mamann et al. (Science Advances, September 2025, DOI 10.1126/sciadv.adx3223) demonstrated the first integration of an optical quantum memory into a complete cryptography protocol. A high-efficiency cold-atom-based memory using electromagnetically-induced transparency stored polarisation-encoded weak coherent states, meeting the stringent efficiency and noise thresholds required by Wiesner''s unforgeable quantum money primitive. The paper states this is the first time a quantum memory has been integrated into a complete cryptography protocol. This is peer-reviewed experimental work demonstrating that quantum memories now satisfy the requirements of demanding quantum networking applications.'
  verified: '2026-08-08'
  level: E4
  sources:
    - url: 'https://www.science.org/doi/10.1126/sciadv.adx3223'
      role: primary
      title: 'Quantum cryptography integrating an optical quantum memory'
      publisher: 'Science Advances'
      date: '2025-09-19'
      identifier: 'Sci. Adv. 11, eadx3223 (2025)'
      doi: '10.1126/sciadv.adx3223'
      accessed: '2026-08-08'
      note: 'First quantum memory integrated into a complete cryptographic protocol. Cold-atom EIT memory, Laboratoire Kastler Brossel, Sorbonne/CNRS Paris. Open access.'
confidence: high
status: published
links:
  - to: comms-quantum-repeater
    relation: enables
  - to: comms-quantum-internet
    relation: enables
  - to: entanglement-distribution
    relation: enables
origin: human
review:
  state: agent-merged
  by: agent
  agentMergedOn: '2026-08-08'
  agent: sourcer
  note: 'restored after an accidental bulk confirmation'
---

Quantum memories are essential nodes in any quantum repeater architecture. The 2025 Science Advances result is the first time a quantum memory met the noise and efficiency requirements of a real cryptographic primitive, not just a laboratory benchmark.
