---
schema: frontier/v1
id: arch-cat-qubits
title: Bosonic and cat qubits
summary: Superconducting cat qubits exploit the symmetry of coherent states to passively suppress bit-flip errors, allowing a hardware-efficient outer repetition code to handle phase-flip errors and together realise a logical qubit with below-threshold error correction.
plain: A cat qubit is a type of superconducting qubit whose quantum states are chosen so that one of the two main error types (bit-flips) occurs extremely rarely on its own. By combining many cat qubits with a simple error-correcting wrapper, you need far fewer physical components to build one reliable logical qubit than with conventional approaches.
pillar: quantum
readiness: experimental
constellation: architectures
cluster: hardware
actors:
  - AWS Center for Quantum Computing
  - California Institute of Technology
country:
  - US
metrics:
  - name: logical error per cycle (distance-3 repetition code)
    value: '1.75'
    unit: '%'
    note: Average minimum measured logical error per cycle for distance-3 code sections; distance-5 achieved 1.65%
  - name: outer repetition code distance
    value: '5'
    note: Distance-5 repetition code applied to cat qubit array
priority: P1
qdayImpact: 1
qdayReasoning: Hardware-efficient bosonic encodings reduce the physical qubit overhead required for fault-tolerant logical qubits. If cat-qubit approaches scale, they lower the physical qubit bar for a CRQC, potentially accelerating timelines modestly — but replication and scaling to useful logical qubit counts remain undemonstrated.
horizon: 2
novelty: new architecture
evidence:
  claim: AWS/Caltech demonstrated a logical qubit memory formed from concatenated bosonic cat qubits with an outer distance-5 repetition code operating below threshold, achieving minimum logical error per cycle of 1.65–1.75% and confirming intrinsic bit-flip suppression.
  level: E4
  verified: '2026-08-08'
  sources:
    - url: https://www.nature.com/articles/s41586-025-08642-7
      role: primary
      title: Hardware-efficient quantum error correction via concatenated bosonic qubits
      publisher: Nature
      date: '2025-02-26'
      identifier: Nature 638, 927-934 (2025)
      doi: 10.1038/s41586-025-08642-7
      accessed: '2026-08-08'
    - url: https://arxiv.org/abs/2409.13025
      role: preprint
      title: Hardware-efficient quantum error correction via concatenated bosonic qubits
      publisher: arXiv
      date: '2024-09-19'
      identifier: arXiv:2409.13025
      accessed: '2026-08-08'
links:
  - to: qec-below-threshold-surface-code
    relation: competes-with
  - to: arch-superconducting
    relation: depends-on
  - to: qec-surface-code
    relation: competes-with
confidence: high
status: published
origin: human
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-08'
  reviewedOn: '2026-08-10'
  note: 'Nature 638, 927-934 confirmed via Nature website and Caltech repository. Distance-5 repetition code on cat qubits confirmed; 1.65% logical error rate at d=5 confirmed. E4 correct for peer-reviewed Nature paper. No independent replication by a separate institution found. No changes made.'
---

Cat qubits encode quantum information in superpositions of coherent states of a microwave cavity. The nonlinear dissipation that stabilises the encoding strongly suppresses bit-flip errors, making only phase-flip errors the dominant noise channel. A simple classical repetition code — much cheaper in hardware than the surface code — can then correct the remaining phase flips.

In February 2025 AWS and Caltech published a full demonstration in *Nature*: a distance-5 repetition code wrapping an array of cat qubits, implemented in a microfabricated superconducting circuit, achieved a minimum logical error per cycle of 1.65% and confirmed operation below threshold for the phase-flip correction. The work establishes concatenated bosonic codes as a distinct, hardware-efficient path toward fault-tolerant quantum computation.
