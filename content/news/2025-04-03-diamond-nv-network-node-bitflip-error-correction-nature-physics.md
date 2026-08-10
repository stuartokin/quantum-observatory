---
schema: news/v1
id: 2025-04-03-diamond-nv-network-node-bitflip-error-correction-nature-physics
headline: 'Michigan team demonstrates diamond quantum network node with simultaneous photon entanglement and active bit-flip error correction'
pillar: quantum
date: '2025-04-03'
plain: 'A quantum network node must do two things that usually conflict: send quantum information to distant nodes via photons, and protect locally stored information from errors. The Duan group at Michigan have built a diamond colour-centre device that does both at once. Three nuclear spins encode a logical qubit via a repetition code; an electron spin both links that logical qubit to a flying photon and reads out error syndromes; active feedback corrects bit-flip errors in real time for up to twelve rounds. This is the first network node to combine photon entanglement with active error correction inside the node — a capability needed to build a quantum repeater chain that does not lose coherence as the network scales.'
significance: notable
source:
  url: https://www.nature.com/articles/s41567-025-02831-x
  kind: paper
  title: 'Hybrid entanglement and bit-flip error correction in a scalable quantum network node'
  publisher: Nature Physics
  date: '2025-04-03'
  doi: 10.1038/s41567-025-02831-x
corroboration:
  - url: https://www.researchgate.net/publication/390469126_Hybrid_entanglement_and_bit-flip_error_correction_in_a_scalable_quantum_network_node
    publisher: ResearchGate
    kind: paper
validation:
  status: verified
  checks:
    - 'Nature Physics paper abstract and partial text accessed: three nuclear spins in repetition code, electron spin as interface, up to twelve error-correction rounds confirmed'
    - 'Open access paper: full arXiv preprint (arXiv:2408.07752) accessed and consistent with journal version'
    - 'No contradicting report found; result is a first demonstration rather than a contested claim'
    - 'Checked against existing board items: not duplicated by any of the 75 existing headlines; the USTC repeater items cover network-level entanglement not node-level error correction'
about:
  - comms-quantum-repeater
  - comms-quantum-internet
  - comms-quantum-memory
  - qec-realtime-decoding
establishedBy:
  - url: https://arxiv.org/abs/2408.07752
    title: 'Hybrid entanglement and error correction in a scalable quantum network node'
    relation: reports
    date: '2024-08'
actors: [University of Michigan]
country: [US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The device uses a nitrogen-vacancy centre in diamond as the hub of a hybrid qubit system. The electron spin acts simultaneously as the interface between the node and the optical network (via photon entanglement) and as the ancilla qubit that reads out the error syndromes of the three nuclear spin memory qubits. The researchers demonstrated active bit-flip error correction for up to twelve rounds and showed improvement over the uncorrected baseline.

The result matters for the board because the bottleneck in scaling quantum repeater networks is not only transmission distance but node fidelity over time. A node that corrects errors locally, while remaining entangled with a remote photon, is a qualitatively different device from one that only distributes entanglement. Full phase-flip protection was not demonstrated in this work, and the repetition code used corrects only bit-flip errors — a distance-3 code for full protection would require more spins. This is an early but real step, not a complete solution.
