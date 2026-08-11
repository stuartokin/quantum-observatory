---
schema: frontier/v1
id: comms-quantum-repeater
title: Quantum repeaters
summary: 'Quantum repeaters extend entanglement over long fibre distances by heralded entanglement swapping through intermediate nodes. A 2026 Nature Photonics experiment achieved the first metropolitan-scale demonstration with certified Bell non-locality at 14.5 km.'
plain: 'Optical fibre loses photons exponentially with distance, so direct quantum communication cannot reach beyond roughly 100 km without repeaters. A quantum repeater breaks the path into segments, creates entanglement across each segment, and then swaps those entangled pairs together — effectively teleporting entanglement over the full distance without any photon travelling the whole way. In 2026 a Chinese team demonstrated this over 14.5 km of city-scale fibre with solid-state quantum memories, generating Bell-entangled pairs with 78.6% fidelity and confirming the non-classical nature of the entanglement by violating a Bell inequality. This is the first metropolitan-scale repeater demonstration to pass that certification.'
pillar: quantum
readiness: demonstrated
constellation: communications
cluster: quantum-networks
actors:
  - University of Science and Technology of China
  - Hefei National Laboratory
country:
  - CN
metrics:
  - name: entanglement distribution distance
    value: '14.5'
    unit: km
    note: 'fibre-based, solid-state quantum memories'
  - name: Bell state fidelity
    value: '78.6'
    unit: '%'
    note: '± 2.0%, reported in Nature Photonics 2026'
  - name: CHSH violation
    value: '3.7'
    unit: 'standard deviations'
    note: 'first Bell non-locality certification at metropolitan scale'
  - name: entanglement distribution rate
    value: '0.94'
    unit: Hz
    note: 'highest reported among surveyed metropolitan-scale demonstrations per supplementary table; achieved at 0.606 fidelity. Main Bell-test result achieves 0.47 Hz at 78.6% fidelity.'
priority: P1
qdayImpact: 0
qdayReasoning: ''
horizon: 2
novelty: major breakthrough
evidence:
  claim: 'Nature Photonics 2026: a multiplexed quantum repeater protocol (MQR-TM) achieves heralded entanglement between two solid-state quantum memories over 14.5 km, generating a Bell state with 78.6% ± 2.0% fidelity and a CHSH-Bell inequality violation of 3.7 standard deviations — the first certification of Bell non-locality in a metropolitan-scale quantum repeater.'
  verified: '2026-08-08'
  level: E4
  sources:
    - url: https://www.nature.com/articles/s41566-026-01911-5
      role: primary
      title: A metropolitan-scale multiplexed quantum repeater with Bell non-locality
      publisher: Nature Photonics
      date: '2026-05-07'
      identifier: 'Nature Photonics 20, 812 (2026)'
      doi: 10.1038/s41566-026-01911-5
      accessed: '2026-08-11'
      note: 'Zhu, Zhang, Ou et al.; USTC / Hefei National Laboratory. Peer-reviewed. Received 15 Oct 2025, accepted 6 Apr 2026, published 7 May 2026 per Crossmark. 78.6%±2.0% fidelity and 3.7σ CHSH violation confirmed from nature.com abstract. EDR 0.94 Hz is highest in supplementary comparison table but at 0.606 fidelity; main Bell-test result achieves 0.47 Hz at 78.6% fidelity.'
    - url: https://arxiv.org/abs/2508.17940
      role: preprint
      title: A Metropolitan-scale Multiplexed Quantum Repeater with Bell Nonlocality
      publisher: arXiv
      date: '2025-08-25'
      identifier: arXiv:2508.17940
      accessed: '2026-08-08'
      note: 'Submitted August 25, 2025 (v1); revised April 15, 2026 (v2, accepted version). Published in Nature Photonics as s41566-026-01911-5. Lead author Tian-Xiang Zhu et al.'
links:
  - to: comms-quantum-memory
    relation: depends-on
  - to: entanglement-distribution
    relation: enables
  - to: comms-quantum-internet
    relation: enables
confidence: high
status: published
origin: agent
added: '2026-08-08'
moved:
  from: experimental
  on: '2026-08-08'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-08'
  reviewedOn: '2026-08-11'
  note: 'Nature Photonics DOI confirmed via nature.com and USTC faculty page (Zhou group). 78.6%±2.0% and 3.7σ CHSH confirmed from abstract. EDR metric note clarified: 0.94 Hz is the highest value in supplementary comparison table but achieved at 0.606 fidelity; the main Bell-test result achieves 0.47 Hz at 78.6% fidelity. Both values appear in the paper; metric note now distinguishes them. No level or readiness change.'
---

Quantum repeaters are the missing infrastructure for long-distance quantum networks. By combining heralded entanglement generation with entanglement swapping at intermediate nodes, they circumvent the exponential photon-loss barrier of optical fibre. The 2026 Nature Photonics result from USTC is the first metropolitan-scale demonstration that certifies the non-classical quality of the distributed entanglement through a Bell inequality violation, closing a loophole in earlier demonstrations that produced entanglement too noisy to certify.
