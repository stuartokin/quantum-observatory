---
schema: frontier/v1
id: qec-magic-state-distillation
title: Magic state distillation on logical qubits
summary: 'Cultivation demonstrated on superconducting hardware: 40-fold error reduction, 99.99% fidelity, 8% yield. Independent theoretical protocol from USTC on RP² code.'
pillar: quantum
readiness: experimental
constellation: error-correction
cluster: magic-states
actors:
  - Google Quantum AI
  - USTC / Jian-Wei Pan group
metrics:
  - name: error reduction factor
    value: '40'
    unit: 'x'
    note: Cultivation vs. no cultivation on Willow superconducting processor
  - name: magic state fidelity
    value: '0.9999(1)'
    unit: ''
    note: Lower bound on fidelity; retaining 8% of attempts
  - name: yield (attempts retained)
    value: '8'
    unit: '%'
    note: Most stringent experimental runs; throughput bottleneck at scale
country:
  - US
  - CN
links:
  - to: qec-below-threshold-surface-code
    relation: depends-on
  - to: qec-surface-code
    relation: depends-on
  - to: qec-logical-fidelity
    relation: evidence-for
  - to: enable-compilers
    relation: depends-on
evidence:
  claim: >-
    Rosenfeld et al. (Google Quantum AI) demonstrated magic state cultivation on the Willow superconducting processor, published in Science 15 October 2026 (DOI 10.1126/science.aee7961). Cultivation reduces the magic state error by a factor of 40, achieving a fidelity of at least 0.9999(1) while retaining 8% of attempts. Code-switching into a surface code was implemented alongside a fault-tolerant measurement protocol to bound magic state fidelity. Separately, Chen et al. (USTC / Jian-Wei Pan group) published a peer-reviewed theoretical protocol for cultivation on the RP² topological code in PRX Quantum 7, 010315 (2026); this is a numerical analysis paper, not a hardware experiment, and does not constitute independent physical replication.
  level: E4
  verified: '2026-10-26'
  sources:
    - url: https://www.science.org/doi/10.1126/science.aee7961
      role: primary
      title: 'Magic state cultivation on a superconducting quantum processor'
      publisher: Science
      date: '2026-10-15'
      identifier: 'Science (2026)'
      doi: 10.1126/science.aee7961
      note: >-
        Peer-reviewed experimental paper. Demonstrates cultivation on Willow superconducting processor. 40-fold error reduction, fidelity ≥ 0.9999(1), 8% yield. Previously arXiv:2512.13908 (preprint, December 2025); now published.
      accessed: '2026-10-26'
    - url: https://arxiv.org/abs/2512.13908
      role: preprint
      title: 'Magic state cultivation on a superconducting quantum processor'
      publisher: arXiv
      date: '2025-12-15'
      identifier: 'arXiv:2512.13908'
      note: >-
        Original preprint submission. Published as Science (2026), DOI 10.1126/science.aee7961. Cite the journal version as primary.
      accessed: '2026-10-26'
    - url: https://journals.aps.org/prxquantum/abstract/10.1103/9kys-3whh
      role: corroborating
      title: 'Efficient magic state cultivation on RP²'
      publisher: PRX Quantum
      date: '2026-01-22'
      identifier: 'PRX Quantum 7, 010315 (2026)'
      doi: 10.1103/9kys-3whh
      note: >-
        Peer-reviewed theoretical and numerical protocol paper from USTC (Zi-Han Chen, Ming-Cheng Chen, Chao-Yang Lu, Jian-Wei Pan). Proposes cultivation on the RP² topological code. No hardware experiment reported. Does not constitute independent physical replication; does not support E5. Corroborates the theoretical viability of cultivation from an independent group.
      accessed: '2026-10-26'
confidence: medium
status: draft
origin: agent
added: '2026-10-26'
priority: P1
qdayImpact: 0
qdayReasoning: 'Cultivation reduces the overhead for non-Clifford gate production, a known bottleneck in fault-tolerant architectures. This matters for the resource costs of running Shor''s algorithm at cryptographic scale, but does not change the fundamental qubit or gate count estimates directly. The 8% yield means the technique requires significant repetition overhead at scale. No change to Q-Day timing from this result alone.'
horizon: 2
novelty: 'First hardware demonstration of magic state cultivation; 40-fold error reduction'
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-10-26'
  note: >-
    Focus run issue #192. Updated Rosenfeld et al. source from preprint to Science journal record (DOI 10.1126/science.aee7961, published 2026-10-15). Added Chen et al. PRX Quantum 7, 010315 (2026) as corroborating theoretical source; confirmed it is a numerical protocol paper, not a hardware experiment. Evidence level held at E4. E5 escalated to human: independent theoretical validation from USTC does not alone constitute physical replication per decisions file.
---

## What happened

Google Quantum AI demonstrated magic state cultivation on the Willow superconducting processor. Rather than distilling high-fidelity magic states from many low-fidelity ones (the standard resource-intensive approach), cultivation refines a noisy magic state directly within a protected qubit. The result: a 40-fold reduction in error rate, achieving a state fidelity of at least 99.99%, while retaining 8% of attempts in the most stringent experimental runs.

## Why it matters

Non-Clifford gates — specifically T gates — are the most expensive resource in fault-tolerant quantum computing. Magic state distillation, the previous standard approach, consumes large amounts of physical qubit overhead. Cultivation is proposed as a more efficient alternative. This experiment is the first to test cultivation assumptions on real hardware, demonstrating it is physically viable at small scale.

## Previous state of the art

Magic state distillation had been demonstrated on logical qubits but at high overhead. Cultivation had been proposed theoretically (Gidney, Shutty, and Jones, arXiv:2409.17595, 2024) but never demonstrated on hardware.

## Independent theoretical work

Chen, Chen, Lu, and Pan (USTC / Jian-Wei Pan group) published a peer-reviewed protocol for cultivation on the RP² topological code in PRX Quantum 7, 010315 (2026). This is a theoretical and numerical paper — no hardware experiment is reported. It provides independent theoretical corroboration of the cultivation approach from a separate group, but does not constitute physical replication.

## Limitations

The 8% yield means only about 1 in 12 attempts produces a usable magic state, creating a throughput bottleneck at scale. Code-switching into the surface code introduced additional errors. Scaling to the qubit counts required for cryptographically relevant computation remains undemonstrated.

## What would change the assessment

An independent hardware demonstration of cultivation on a different physical platform (neutral atoms, trapped ions) at comparable or better fidelity and yield would strengthen the case for E5. Improved yield above 50% and demonstration in a larger fault-tolerant context would support moving toward `demonstrated`.
