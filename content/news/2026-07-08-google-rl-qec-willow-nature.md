---
schema: news/v1
id: 2026-07-08-google-rl-qec-willow-nature
headline: Google publishes reinforcement-learning continuous calibration of a surface-code processor in Nature
pillar: quantum
date: '2026-07-08'
plain: 'Every superconducting quantum processor drifts — materials age and control electronics shift — so current machines must stop and recalibrate, interrupting any computation in progress. Google Quantum AI and DeepMind have demonstrated that a reinforcement-learning agent can read the error-detection events that quantum error correction already produces and use them to keep the processor calibrated while it runs, without stopping. On a 105-qubit Willow chip running a distance-7 surface code, the approach set a new record logical error rate of 7.72 × 10⁻⁴ per cycle and held performance 3.5 times more stable under hardware drift than conventional calibration. The practical implication is that future long computations will not need to be halted for tune-up passes. Caveat: continuous steering of a single logical computation was demonstrated in numerical simulation, not on hardware; the experimental demonstration used repeated short memory circuits.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-026-10759-2
  kind: paper
  title: Reinforcement learning control of quantum error correction
  publisher: Nature
  date: '2026-07-08'
  doi: 10.1038/s41586-026-10759-2
corroboration:
  - url: https://research.google/blog/towards-a-quantum-computer-that-learns-from-its-errors/
    publisher: Google Quantum AI
    kind: vendor
  - url: https://postquantum.com/quantum-research/reinforcement-learning-quantum-error-correction/
    publisher: postquantum.com
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature abstract page opened; doi 10.1038/s41586-026-10759-2 confirmed. Volume 655 pages 879–884.'
    - 'arXiv preprint 2511.08493 opened and confirmed as the underlying work, posted November 2025 and peer-reviewed by June 2026.'
    - 'Google Quantum AI blog post corroborates the July 8 publication date and confirms Willow hardware.'
    - 'postquantum.com analysis confirms the caveat that full single-computation steering was demonstrated only in simulation, not on hardware.'
    - 'No contradicting report found.'
about:
  - arch-superconducting
  - qec-surface-code
  - qec-realtime-decoding
  - qec-logical-fidelity
establishedBy:
  - url: https://arxiv.org/abs/2511.08493
    title: Reinforcement Learning Control of Quantum Error Correction
    relation: reports
    date: '2025-11'
actors: [Google Quantum AI, Google DeepMind]
country: [US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The paper addresses what the authors call a fundamental incompatibility between long future quantum computations and the current practice of halting everything for recalibration. The RL agent manages more than 1,000 analog control parameters by repurposing the syndrome data QEC already collects — no additional sensing is required. The scaling simulations suggest convergence speed independent of system size out to distance-15 and roughly 40,000 parameters, which is the deepest claim in the paper; it is, however, a simulated result. Google states the technique was already running in its earlier magic-state cultivation experiment.
