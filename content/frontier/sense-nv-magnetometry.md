---
schema: frontier/v1
id: sense-nv-magnetometry
title: NV-centre magnetometry
summary: Nitrogen-vacancy centres in diamond enable room-temperature magnetic field sensing at sub-10 pT/√Hz sensitivity, approaching the sensitivity needed for brain imaging.
plain: Diamond contains defects called nitrogen-vacancy centres whose quantum spin states are sensitive to magnetic fields. By shining laser light on these defects and reading out their fluorescence, you can measure magnetic fields at room temperature without the cryogenic cooling required by older high-sensitivity magnetometers. A 2024 result reached sub-10 picotelsa sensitivity — fine enough to detect signals from the human brain.
pillar: quantum
readiness: experimental
constellation: sensing
actors:
  - Tokyo Institute of Technology
  - National Institute for Materials Science (NIMS)
  - National Institutes for Quantum Science and Technology (QST)
  - University of Tokyo
country:
  - Japan
metrics:
  - name: DC magnetic field sensitivity (5–100 Hz)
    value: '9.4 ± 0.1'
    unit: pT/√Hz
    note: CW-ODMR ensemble NV sensor along [111] direction; sub-pT detectable with long integration.
  - name: Sub-pT field detectability (Allan deviation)
    value: '0.3'
    unit: pT
    note: Achieved after a few thousand seconds of integration.
horizon: 2
priority: P2
qdayImpact: 0
evidence:
  level: E4
  claim: Tokyo Tech group demonstrated a diamond NV-centre magnetometer with 9.4 pT/√Hz DC sensitivity at 5–100 Hz and sub-pT detectability with integration, at room temperature without magnetic shielding — published in Physical Review Applied (2024).
  verified: '2026-08-08'
  sources:
    - url: https://link.aps.org/doi/10.1103/PhysRevApplied.21.064010
      role: primary
      title: Diamond quantum magnetometer with dc sensitivity of sub-10 pT toward measurement of biomagnetic field
      publisher: Physical Review Applied
      date: '2024-06-05'
      identifier: Phys. Rev. Applied 21, 064010 (2024)
      doi: 10.1103/PhysRevApplied.21.064010
      accessed: '2026-08-08'
      note: Peer-reviewed; arXiv preprint at arXiv:2309.04093.
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
  agentMergedOn: '2026-08-08'
  agent: sourcer
  note: 'restored after an accidental bulk confirmation'
---

Nitrogen-vacancy (NV) centres in diamond are point defects whose electron spin states can be initialised and read out optically at room temperature. The spin transition frequency shifts with magnetic field, making them compact, calibration-free magnetic sensors. The 2024 Tokyo Tech result achieved the highest reported room-temperature sensitivity for an NV ensemble without magnetic flux concentrators, opening a path toward ambient-condition magnetoencephalography (brain imaging).
