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
    note: 'highest reported among surveyed metropolitan-scale demonstrations'
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
      doi: 10.1038/s41566-026-01911-5
      accessed: '2026-08-08'
    - url: https://arxiv.org/abs/2508.17940
      role: preprint
      title: A Metropolitan-scale Multiplexed Quantum Repeater with Bell Nonlocality
      publisher: arXiv
      date: '2026-04-16'
      identifier: arXiv:2508.17940
      accessed: '2026-08-08'
      note: 'Preprint version; published in Nature Photonics as s41566-026-01911-5'
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
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

Quantum repeaters are the missing infrastructure for long-distance quantum networks. By combining heralded entanglement generation with entanglement swapping at intermediate nodes, they circumvent the exponential photon-loss barrier of optical fibre. The 2026 Nature Photonics result from USTC is the first metropolitan-scale demonstration that certifies the non-classical quality of the distributed entanglement through a Bell inequality violation, closing a loophole in earlier demonstrations that produced entanglement too noisy to certify.
