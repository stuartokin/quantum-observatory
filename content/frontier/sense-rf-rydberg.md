---
schema: frontier/v1
id: sense-rf-rydberg
title: Rydberg RF sensing
summary: Atoms excited to high-energy Rydberg states in vapour cells provide SI-traceable, self-calibrating electric field measurements from DC to THz, demonstrated in laboratory settings by NIST and others.
plain: A Rydberg atom has been excited to a very high energy level where it becomes extremely sensitive to electric fields. Vapour cells containing such atoms can detect radio-frequency signals across an enormous frequency range — from near-DC up to terahertz — without needing an antenna, and the measurement is directly traceable to fundamental physical constants. Current laboratory devices act as quantum spectrum analysers; they are not yet deployed products.
pillar: quantum
readiness: experimental
constellation: sensing
actors:
  - NIST (National Institute of Standards and Technology)
country:
  - US
metrics:
  - name: Sensitivity (homodyne readout)
    value: '~3'
    unit: μV/cm/√Hz
    note: Photon shot-noise limited in frequency-modulated spectroscopy; demonstrated at NIST.
  - name: Frequency coverage
    value: 'DC to THz'
    unit: ''
    note: Broad coverage demonstrated using different Rydberg states and vapour cell configurations.
horizon: 2
priority: P2
qdayImpact: 0
evidence:
  level: E4
  claim: NIST demonstrated Rydberg-atom electrometry in room-temperature vapour cells as SI-traceable field probes covering DC to THz; reviewed in Nature Reviews Physics (2024).
  verified: '2026-08-08'
  sources:
    - url: https://www.nature.com/articles/s42254-024-00756-7
      role: primary
      title: Rydberg states of alkali atoms in atomic vapour as SI-traceable field probes and communications receivers
      publisher: Nature Reviews Physics
      date: '2024-09-16'
      identifier: Nat. Rev. Phys. 6, 606–620 (2024)
      doi: 10.1038/s42254-024-00756-7
      accessed: '2026-08-08'
      note: Technical review by NIST authors; free-access PDF at tsapps.nist.gov/publication/get_pdf.cfm?pub_id=958010.
links:
  - to: quantum-sensing-grid
    relation: enables
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

Rydberg RF sensing uses electromagnetically induced transparency (EIT) to read out the spin state of highly excited atoms in a glass vapour cell. The cell acts as an all-dielectric, self-calibrating receiver whose sensitivity is tied to fundamental atomic transition frequencies rather than to an engineered antenna. NIST's 2024 review covers SI traceability, sensitivity limits, and applications including voltage standards and communications receivers, consolidating work from multiple experimental groups.
