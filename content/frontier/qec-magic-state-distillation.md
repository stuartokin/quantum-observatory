---
schema: frontier/v1
id: qec-magic-state-distillation
title: Magic state distillation on logical qubits
summary: 'Magic state cultivation demonstrated on superconducting hardware, cutting errors 40-fold and achieving >=99.99% fidelity. Cultivation grows T states inside a protected qubit, reducing the resource overhead for non-Clifford gates in fault-tolerant computation.'
plain: 'Fault-tolerant quantum computers need a special type of quantum state called a magic state to perform the full range of calculations required to break encryption or simulate chemistry. The standard method — distillation — is extremely expensive in hardware, requiring many extra qubits acting as factories. Cultivation is an alternative: it cleans up a noisy magic state directly inside a protected qubit rather than running a separate factory. Google demonstrated cultivation on its Willow superconducting processor in a paper published in Science on 15 October 2026, cutting errors by a factor of 40 and achieving at least 99.99% state fidelity, though only about 8% of attempts produce a state that passes verification. This is a meaningful step toward practical fault-tolerant quantum computers, because magic state production is one of the largest known resource bottlenecks on the path to cryptographically relevant machines.'
pillar: quantum
readiness: experimental
constellation: error-correction
cluster: magic-states
actors:
  - Google Quantum AI
country:
  - US
metrics:
  - name: error reduction factor
    value: '40'
    note: Cultivation vs. no cultivation baseline, Willow superconducting processor
  - name: state fidelity lower bound
    value: '0.9999'
    unit: dimensionless
    note: 'At least 0.9999(1), retaining 8% of attempts'
  - name: yield
    value: '8'
    unit: percent
    note: Fraction of cultivation attempts retained after fault-tolerant verification
priority: P1
qdayImpact: 0
qdayReasoning: 'Magic state cultivation reduces the hardware overhead for producing non-Clifford gates in a fault-tolerant machine. It does not alter the cryptanalytic circuit structure or independently reduce the qubit count needed to break RSA-2048 or ECC. Gidney (arXiv:2505.15917, 2025) resource estimates account for magic state costs; cultivation would reduce distillation overhead within those estimates but does not change the threat metric absent a full resource re-estimation.'
horizon: 2
novelty: 'major breakthrough — first hardware demonstration of magic state cultivation'
links:
  - to: qec-below-threshold-surface-code
    relation: depends-on
  - to: qec-logical-fidelity
    relation: evidence-for
  - to: algo-resource-estimation
    relation: enables
confidence: medium
status: draft
origin: agent
added: '2026-10-19'
evidence:
  level: E4
  claim: 'Rosenfeld et al. (Google Quantum AI), Science 15 October 2026, DOI 10.1126/science.aee7961: cultivation demonstrated on Willow superconducting processor. Cultivation reduces the error by a factor of 40, with a state fidelity of at least 0.9999(1), retaining 8% of attempts. The experiment implements cultivation with code-switching into a surface code and a fault-tolerant measurement protocol to bound magic state fidelity. The USTC/Pan group (Chen, Chen, Lu, Pan) published a peer-reviewed theoretical protocol for cultivation on the RP2 code in PRX Quantum 7, 010315 (2026), DOI 10.1103/9kys-3whh — independent peer-reviewed work from a separate group, though not a hardware experiment.'
  verified: '2026-10-19'
  sources:
    - url: https://www.science.org/doi/10.1126/science.aee7961
      role: primary
      title: Magic state cultivation on a superconducting quantum processor
      publisher: Science
      date: '2026-10-15'
      identifier: 'Science (2026), DOI 10.1126/science.aee7961'
      doi: 10.1126/science.aee7961
      accessed: '2026-10-19'
      note: 'Peer-reviewed publication in Science, 15 October 2026. Rosenfeld et al., Google Quantum AI. Demonstrates cultivation on Willow; 40x error reduction, >=99.99% fidelity, 8% yield.'
    - url: https://arxiv.org/abs/2512.13908
      role: preprint
      title: Magic state cultivation on a superconducting quantum processor
      publisher: arXiv
      date: '2025-12-15'
      identifier: arXiv:2512.13908
      accessed: '2026-10-19'
      note: 'Preprint version of the Rosenfeld et al. result; now published in Science (DOI 10.1126/science.aee7961, 2026-10-15). Peer-reviewed as of 15 October 2026. Retained for traceability.'
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-10-19'
  note: 'Focus run issue #192. Updated corroborating source arXiv:2512.13908 to Science journal record DOI 10.1126/science.aee7961, published 2026-10-15; note updated from preprint-unreviewed to peer-reviewed. Evidence level held at E4 per focus instruction. Chen et al. PRX Quantum 7, 010315 escalated — theoretical protocol paper, not hardware experiment; adding as corroborating source is upward correction, deferred to human.'
---

## What happened

Magic states are required for universal fault-tolerant quantum computation: they provide the non-Clifford (T) gates that give a fault-tolerant computer its full computational power. The standard route — *distillation* — runs many noisy copies through a purification circuit to yield one high-fidelity state, and is one of the largest known resource costs in estimates for machines capable of breaking RSA or simulating complex molecules.

*Cultivation*, proposed theoretically by Gidney, Shutty, and Jones (2024), is an alternative that grows and cleans a magic state directly inside a logical qubit via code-switching, without a separate factory. The USTC/Pan group (Chen et al.) published a peer-reviewed protocol for cultivation on the RP² topological code in PRX Quantum 7, 010315 (2026), one of several independent theoretical elaborations.

Rosenfeld et al. (Google Quantum AI) published the first hardware demonstration in *Science* on 15 October 2026 (DOI: 10.1126/science.aee7961). On the Willow superconducting processor, cultivation achieved a state fidelity of at least 0.9999(1) — a factor-of-40 improvement over the uncultivated baseline — though only 8% of attempts pass the fault-tolerant verification filter.

## Why it matters

Magic state production is consistently the largest single overhead in fault-tolerant resource estimates. Demonstrating cultivation on real hardware establishes it as a viable path that could substantially reduce the qubit and time costs of fault-tolerant machines, without changing the physical qubit requirements of the error-correction layer itself.

## Limitations

8% yield is too low for production throughput at scale. The result is on superconducting hardware only; no independent hardware replication from a different group or platform has been reported, so E5 is not warranted. The Chen et al. PRX Quantum paper is a theoretical protocol paper — peer-reviewed, independent, and from a leading group — but not an independent hardware experiment.

## What would change this assessment

An independent hardware demonstration of cultivation on a different platform (neutral atom, trapped ion, photonic) would support moving toward E5. Improved yield and integration into a full fault-tolerant computation stack would support moving readiness from experimental to demonstrated.
