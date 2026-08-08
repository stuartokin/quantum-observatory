---
schema: frontier/v1
id: sense-inertial-navigation
title: Quantum inertial navigation
summary: Cold-atom accelerometer-gyroscope systems demonstrate sub-μg acceleration bias stability and 700 ppm gyroscope scale factor stability, with hybrid classical-quantum sensors showing 100-fold stability improvement.
plain: Ordinary inertial navigation systems drift over time because their gyroscopes and accelerometers have small but accumulating errors. Cold-atom sensors measure acceleration and rotation using matter-wave interference — a quantum effect — and can correct the drift of classical sensors. A 2024 ONERA result demonstrated a compact magnetically-launched atom interferometer that improved accelerometer stability 100-fold when hybridised with a classical sensor.
pillar: quantum
readiness: experimental
constellation: sensing
actors:
  - ONERA
country:
  - France
metrics:
  - name: Acceleration bias stability (cold-atom sensor alone)
    value: '7e-7'
    unit: m/s²
    note: Reached after 2 days of integration.
  - name: Rotation rate bias stability (cold-atom sensor alone)
    value: '4e-7'
    unit: rad/s
    note: Reached after 2 days of integration.
  - name: Gyroscope scale factor stability
    value: '700'
    unit: ppm
    note: Over 1 day.
  - name: Accelerometer stability improvement (hybrid vs classical)
    value: '100'
    unit: fold
    note: Classical sensor corrected using cold-atom sensor.
horizon: 2
priority: P2
qdayImpact: 0
evidence:
  level: E4
  claim: ONERA demonstrated a compact cold-atom accelerometer-gyroscope with 700 ppm gyroscope scale factor stability and 100-fold accelerometer stability improvement when hybridised with a classical sensor — published in Science Advances (2024).
  verified: '2026-08-08'
  sources:
    - url: https://www.science.org/doi/10.1126/sciadv.adq4498
      role: primary
      title: Quantum sensing of acceleration and rotation by interfering magnetically launched atoms
      publisher: Science Advances
      date: '2024-10-30'
      identifier: Sci. Adv. 10, eadq4498 (2024)
      doi: 10.1126/sciadv.adq4498
      accessed: '2026-08-08'
      note: Open access. arXiv preprint at arXiv:2405.13689.
    - url: https://arxiv.org/abs/2405.13689
      role: preprint
      title: Quantum sensing of acceleration and rotation by interfering magnetically-launched atoms
      publisher: arXiv
      date: '2024-05-22'
      identifier: arXiv:2405.13689
      accessed: '2026-08-08'
links:
  - to: sense-gravimetry
    relation: depends-on
  - to: sense-optical-clock
    relation: depends-on
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

Quantum inertial navigation exploits the extreme stability of cold-atom interferometers to correct the drift of classical inertial measurement units. The magnetically-launched architecture demonstrated by ONERA in 2024 is scalable to a full six-axis unit and operates without the large physical separation required by traditional atom fountains, making it a candidate for vehicle-mounted navigation in GPS-denied environments.
