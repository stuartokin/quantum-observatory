---
schema: frontier/v1
id: arch-topological
title: Topological qubits
summary: 'Error resistance built into the physics rather than added by code. Microsoft published an InAs-Al hybrid parity measurement in Nature (Feb 2025), but Nature''s own reviewers stated this does not constitute evidence for Majorana zero modes. Physics remains contested.'
plain: 'An approach where the information is stored in a property of the system that local disturbances cannot easily change — like a knot that survives being jostled. If it worked, it would need far less error correction. Microsoft published a Nature paper in February 2025 claiming a key step toward topological qubits in semiconductor-superconductor devices. However, Nature''s own peer-review notes stated the result does not prove the existence of the Majorana particles needed, and independent researchers have challenged the diagnostic test used. Two decades of promise, still contested physics.'
pillar: quantum
constellation: architectures
readiness: emerging
actors:
  - Microsoft Azure Quantum
country:
  - US
metrics:
  - name: Parity measurement SNR
    value: '1'
    unit: 'in 3.6 µs'
    note: 'Microsoft Azure Quantum Nature 638 (2025); quantum-capacitance measurement of fermion parity in InAs-Al device'
links:
  - to: qec-surface-code
    relation: competes-with
priority: P3
horizon: 3
qdayImpact: -1
qdayReasoning: 'Two decades of promise without a settled result is weak evidence for the fast paths.'
confidence: low
status: draft
novelty: new architecture
evidence:
  claim: 'Microsoft Azure Quantum (Nature 638, 651-655, February 2025; arXiv:2401.09549) reports interferometric single-shot parity measurement of fermion parity in InAs-Al heterostructures — described as a step toward topological qubits using Majorana zero modes. The paper achieves quantum-capacitance bimodality with SNR of 1 in 3.6 µs. However, Nature''s accompanying peer-review notes state that the results do not constitute evidence for the presence of Majorana zero modes. An independent critique (Legg, arXiv:2503.08944, March 2025) shows the topological gap protocol used is not a reliable diagnostic. The claim of topological qubits rests on a contested measurement protocol; the underlying physics is unresolved.'
  verified: '2026-08-09'
  level: E2
  sources:
    - url: 'https://www.nature.com/articles/s41586-024-08445-2'
      role: primary
      title: 'Interferometric single-shot parity measurement in InAs-Al hybrid devices'
      publisher: Nature
      date: '2025-02-19'
      identifier: 'Nature 638, 651-655 (2025)'
      doi: 10.1038/s41586-024-08445-2
      accessed: '2026-08-09'
      note: 'Microsoft Azure Quantum. Nature peer-review notes state results do not prove MZMs. E2 ceiling: vendor-led, contested by independent critique arXiv:2503.08944.'
    - url: 'https://arxiv.org/abs/2401.09549'
      role: preprint
      title: 'Interferometric Single-Shot Parity Measurement in an InAs-Al Hybrid Device'
      publisher: arXiv
      date: '2024-01-17'
      identifier: 'arXiv:2401.09549'
      accessed: '2026-08-09'
      note: 'Preprint version of the Nature paper; freely accessible.'
origin: agent
added: '2026-08-09'
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-09'
  note: 'Replaced NIST PQC placeholder with Microsoft Nature 638 (2025) paper. Evidence set to E2: vendor-led result, peer-review notes contest the topological claim, independent critique challenges the diagnostic protocol. Readiness, confidence and priority unchanged from human review — all correctly set low.'
---

Topological quantum computing aims to store information in global, topologically protected properties of a physical system — properties that local noise cannot easily disturb. The promise is hardware-level error resistance, reducing the need for expensive error-correcting codes.

Microsoft published a Nature paper in February 2025 reporting interferometric parity measurement in indium arsenide-aluminium semiconductor-superconductor heterostructures, positioned as evidence toward topological qubits based on Majorana zero modes. The device achieves single-shot quantum-capacitance measurement with a signal-to-noise ratio of 1 in 3.6 microseconds.

**Critical context:** Nature's own peer-review notes, published alongside the paper, state that the results do not constitute evidence for the presence of Majorana zero modes. An independent preprint (Legg, arXiv:2503.08944, March 2025) demonstrates that the topological gap protocol used to qualify devices can report the same device region as both gapped and gapless depending on analysis parameters — challenging the reliability of the diagnostic. The board's confidence setting of low and readiness of emerging are both correct.
