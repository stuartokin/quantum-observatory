---
schema: frontier/v1
id: arch-topological
title: Majorana-based topological qubits
summary: 'Microsoft''s InAs-Al hybrid approach to hardware-protected qubits. Contested: Nature''s own peer-review notes state the results do not evidence Majorana zero modes. Independent Matters Arising critique published in Nature June 2026.'
plain: 'An approach where the qubit is stored in a property that local disturbances cannot easily change — like a knot that survives being jostled. If it worked it would need far less error correction. Microsoft has pursued it for two decades. The central physics claim remains disputed: the journal that published the 2025 result attached a note saying it does not demonstrate the effect it was looking for, and a peer-reviewed Matters Arising article published in Nature in June 2026 argues the topological gap protocol used is not a reliable diagnostic.'
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
  claim: 'Microsoft Azure Quantum (Nature 638, 651-655, February 2025; arXiv:2401.09549) reports interferometric single-shot parity measurement of fermion parity in InAs-Al heterostructures — described as a step toward topological qubits using Majorana zero modes. The paper achieves quantum-capacitance bimodality with SNR of 1 in 3.6 µs. However, Nature''s accompanying peer-review notes state that the results do not constitute evidence for the presence of Majorana zero modes. An independent critique (Legg, arXiv:2503.08944, March 2025; published Nature Matters Arising, June 24 2026) demonstrates that the topological gap protocol used can report the same device region as both gapped and gapless depending on analysis parameters — challenging the reliability of the diagnostic. Microsoft disputes the critique; Nayak et al. were granted a right of reply in the same Nature issue. The claim of topological qubits rests on a contested measurement protocol; the underlying physics is unresolved.'
  verified: '2026-08-11'
  level: E2
  sources:
    - url: 'https://www.nature.com/articles/s41586-024-08445-2'
      role: primary
      title: 'Interferometric single-shot parity measurement in InAs-Al hybrid devices'
      publisher: Nature
      date: '2025-02-19'
      identifier: 'Nature 638, 651-655 (2025)'
      doi: 10.1038/s41586-024-08445-2
      accessed: '2026-08-11'
      note: 'Microsoft Azure Quantum. Nature peer-review notes state results do not prove MZMs. E2 ceiling: vendor-led, contested by peer-reviewed Matters Arising critique.'
    - url: 'https://arxiv.org/abs/2401.09549'
      role: preprint
      title: 'Interferometric Single-Shot Parity Measurement in an InAs-Al Hybrid Device'
      publisher: arXiv
      date: '2024-01-17'
      identifier: 'arXiv:2401.09549'
      accessed: '2026-08-11'
      note: 'Preprint version of the Nature paper; freely accessible.'
    - url: 'https://arxiv.org/abs/2503.08944'
      role: corroborating
      title: 'Comment on "Interferometric single-shot parity measurement in InAs-Al hybrid devices", Microsoft Quantum, Nature 638, 651-655 (2025)'
      publisher: 'Nature (Matters Arising) / arXiv'
      date: '2026-06-24'
      identifier: 'arXiv:2503.08944; Nature Matters Arising, 24 June 2026'
      accessed: '2026-08-11'
      note: 'Henry F. Legg, Univ. St Andrews / Univ. Basel. Peer-reviewed Matters Arising published Nature June 24 2026 (Nature accepted April 20 2026). Shows TGP can report same device region as gapped or gapless depending on parameters — not a reliable diagnostic. Microsoft Nayak et al. rebuttal published in same issue. Previously logged as preprint only; now peer-reviewed.'
origin: agent
added: '2026-08-09'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-09'
  reviewedOn: '2026-08-11'
  note: 'Primary source Nature 638 confirmed via PubMed and nLab (Nature editorial note confirmed). Legg critique (arXiv:2503.08944) updated: published in Nature as Matters Arising on 24 June 2026 per quantumzeitgeist.com and theregister.com — it is now peer-reviewed, not only a preprint. Source note updated to reflect this. Microsoft issued right-of-reply in same Nature issue. E2 correct; confidence low correct; status draft correct.'
---

Topological quantum computing aims to store information in global, topologically protected properties of a physical system — properties that local noise cannot easily disturb. The promise is hardware-level error resistance, reducing the need for expensive error-correcting codes.

Microsoft published a Nature paper in February 2025 reporting interferometric parity measurement in indium arsenide-aluminium semiconductor-superconductor heterostructures, positioned as evidence toward topological qubits based on Majorana zero modes. The device achieves single-shot quantum-capacitance measurement with a signal-to-noise ratio of 1 in 3.6 microseconds.

**Critical context:** Nature's own peer-review notes, published alongside the paper, state that the results do not constitute evidence for the presence of Majorana zero modes. An independent critique by Henry Legg (University of St Andrews), published as a peer-reviewed Matters Arising article in Nature on 24 June 2026, demonstrates that the topological gap protocol used to qualify devices can report the same device region as both gapped and gapless depending on analysis parameters — challenging the reliability of the diagnostic. Microsoft's team (Nayak et al.) was granted a right of reply in the same Nature issue. The board's confidence setting of low and readiness of emerging are both correct.
