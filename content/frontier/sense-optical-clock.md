---
schema: frontier/v1
id: sense-optical-clock
title: Optical atomic clocks
summary: 'Optical lattice and laser-cooled-atom clocks achieve fractional frequency stabilities far beyond microwave standards. Mobile versions have now completed three weeks of unsupervised naval operation at sea.'
plain: 'Optical atomic clocks use a laser tuned to an atomic resonance — far more stable than the microwave transitions in GPS-grade caesium clocks. Until recently they were large, fragile laboratory instruments. A 2025 study ran three different mobile optical clock designs simultaneously aboard a Royal Australian Navy ship for three weeks with no human supervision, surviving waves, vibration, and temperature swings. All three outperformed the best available commercial timing hardware by orders of magnitude. This result matters for GPS-denied navigation, power-grid synchronisation, and precision geodesy.'
pillar: quantum
readiness: demonstrated
constellation: sensing
cluster: timing
actors:
  - University of Adelaide (IPAS)
  - Defence Science and Technology Group (Australia)
  - Blue Halo
  - Air Force Research Labs (USA)
country:
  - AU
  - US
metrics:
  - name: continuous unsupervised naval operation
    value: '3'
    unit: weeks
    note: 'Three independent clock designs operated simultaneously; RIMPAC exercise July-August 2022; reported Hilton et al. 2025'
evidence:
  claim: 'Hilton et al. demonstrated three mobile optical clocks based on different operating principles in three weeks of unsupervised naval operation at sea, with frequency stability orders of magnitude superior to best-in-class commercial solutions over short and medium timescales — the first sea demonstration of laser-cooled optical clocks.'
  level: E4
  verified: '2026-08-08'
  sources:
    - url: https://www.nature.com/articles/s41467-025-61140-2
      role: primary
      title: Demonstration of a mobile optical clock ensemble at sea
      publisher: Nature Communications
      date: '2025-07-02'
      identifier: 'Nat. Commun. 16, 6063 (2025)'
      doi: 10.1038/s41467-025-61140-2
      accessed: '2026-08-08'
      note: 'Three independent clock designs tested simultaneously; RIMPAC 2022; open access via PMC.'
confidence: high
status: published
qdayImpact: 0
horizon: 1
novelty: 'First sea trial of laser-cooled optical atomic clocks'
priority: P2
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

Optical atomic clocks achieve fractional frequency stabilities at the 10⁻¹⁷ level — roughly 100-fold superior to the microwave caesium standards that underpin GPS and telecommunications networks. The drawback has been size, complexity, and sensitivity to vibration. Hilton et al. (University of Adelaide / DSTG / AFRL, Nature Communications 2025) deployed three independent optical clock designs — each using different laser-cooling and atomic-transition principles — aboard a Royal Australian Navy vessel for three weeks of unsupervised operation during the RIMPAC 2022 international exercise in Hawaiian waters. All three provided stable outputs across optical, microwave, and radio-frequency domains, with performance orders of magnitude beyond the best commercial alternatives at short and medium timescales. This is the first sea demonstration of laser-cooled optical clocks and a direct step toward GPS-independent precision navigation, telecommunications synchronisation, and geodetic applications.
