---
schema: frontier/v1
id: arch-topological
title: Majorana-based topological qubits
summary: 'Microsoft''s InAs-Al hybrid approach to hardware-protected qubits. Contested: Nature''s own peer-review notes state the results do not evidence Majorana zero modes. Independent Matters Arising critique published in Nature June 2026.'
plain: 'An approach where the qubit is stored in a property that local disturbances cannot easily change — like a knot that survives being jostled. If it worked it would need far less error correction. Microsoft has pursued it for two decades. The central physics claim remains disputed: the journal that published the 2025 result attached a note saying it does not demonstrate the effect it was looking for, and a peer-reviewed Matters Arising article published in Nature in June 2026 argues the topological gap protocol used is not a reliable diagnostic. In June 2026 Microsoft announced Majorana 2 at Build 2026 with a preprint claiming ~1000x coherence improvement, though Legg and independent researchers maintain the underlying physics dispute is unresolved.'
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
  claim: 'Microsoft Azure Quantum (Nature 638, 651-655, February 2025; arXiv:2401.09549) reports interferometric single-shot parity measurement of fermion parity in InAs-Al heterostructures — described as a step toward topological qubits using Majorana zero modes. The paper achieves quantum-capacitance bimodality with SNR of 1 in 3.6 µs. However, Nature''s accompanying peer-review notes state that the results do not constitute evidence for the presence of Majorana zero modes. An independent critique (Legg, arXiv:2503.08944, March 2025; published Nature Matters Arising, Nature 654 E22-E26, June 24 2026) demonstrates that the topological gap protocol used can report the same device region as both gapped and gapless depending on analysis parameters — challenging the reliability of the diagnostic. Microsoft disputes the critique; Nayak et al. were granted a right of reply in the same Nature issue. The claim of topological qubits rests on a contested measurement protocol; the underlying physics is unresolved.'
  verified: '2026-08-17'
  level: E2
  sources:
    - url: 'https://www.nature.com/articles/s41586-024-08445-2'
      role: primary
      title: 'Interferometric single-shot parity measurement in InAs-Al hybrid devices'
      publisher: Nature
      date: '2025-02-19'
      identifier: 'Nature 638, 651-655 (2025)'
      doi: 10.1038/s41586-024-08445-2
      accessed: '2026-08-17'
      note: 'Microsoft Azure Quantum. Nature peer-review notes state results do not prove MZMs. E2 ceiling: vendor-led, contested by peer-reviewed Matters Arising critique.'
    - url: 'https://arxiv.org/abs/2401.09549'
      role: preprint
      title: 'Interferometric Single-Shot Parity Measurement in an InAs-Al Hybrid Device'
      publisher: arXiv
      date: '2024-01-17'
      identifier: 'arXiv:2401.09549'
      accessed: '2026-08-17'
      note: 'Preprint version of the Nature paper; freely accessible.'
    - url: 'https://arxiv.org/abs/2503.08944'
      role: corroborating
      title: 'Comment on "Interferometric single-shot parity measurement in InAs-Al hybrid devices", Microsoft Quantum, Nature 638, 651-655 (2025)'
      publisher: 'Nature (Matters Arising) / arXiv'
      date: '2026-06-24'
      identifier: 'arXiv:2503.08944; Nature 654, E22-E26 (2026)'
      doi: 10.1038/s41586-026-10567-8
      accessed: '2026-08-17'
      note: 'Henry F. Legg, Univ. St Andrews / Univ. Basel. Peer-reviewed Matters Arising published Nature June 24 2026. Shows TGP can report same device region as gapped or gapless depending on parameters. Microsoft Nayak et al. rebuttal in same issue. Frolov (Univ. Pittsburgh) stated in press the paper has no scientific value as evidence for Majorana modes. DOI and Nature 654 volume/pages confirmed from secondary sources.'
origin: agent
added: '2026-08-09'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-09'
  reviewedOn: '2026-08-17'
  note: 'Source note for Legg Matters Arising updated: Nature 654, E22-E26 (DOI 10.1038/s41586-026-10567-8) confirmed from Spanish-language secondary source and quantumzeitgeist. Majorana 2 (Build 2026 preprint, claimed 1000x coherence, revised 2029 FT target) exists but is preprint-only and Legg disputes physics continuity with Majorana 1. E2/confidence-low/readiness-emerging all correct and unchanged. Majorana 2 flagged for Scout.'
---

Topological quantum computing aims to store information in global, topologically protected properties of a physical system — properties that local noise cannot easily disturb. The promise is hardware-level error resistance, reducing the need for expensive error-correcting codes.

Microsoft published a Nature paper in February 2025 reporting interferometric parity measurement in indium arsenide-aluminium semiconductor-superconductor heterostructures, positioned as evidence toward topological qubits based on Majorana zero modes. The device achieves single-shot quantum-capacitance measurement with a signal-to-noise ratio of 1 in 3.6 microseconds.

**Critical context:** Nature's own peer-review notes, published alongside the paper, state that the results do not constitute evidence for the presence of Majorana zero modes. An independent critique by Henry Legg (University of St Andrews), published as a peer-reviewed Matters Arising article in Nature 654, E22-E26 on 24 June 2026 (DOI: 10.1038/s41586-026-10567-8), demonstrates that the topological gap protocol used to qualify devices can report the same device region as both gapped and gapless depending on analysis parameters — challenging the reliability of the diagnostic. Microsoft's team (Nayak et al.) was granted a right of reply in the same Nature issue. Independent physicist Sergey Frolov (University of Pittsburgh) stated to Scientific American that the Matters Arising makes it "painfully apparent" the underlying Nature paper has no scientific value as evidence for Majorana modes.

In June 2026, Microsoft announced Majorana 2 at Build 2026, claiming ~1000x coherence improvement, though this exists only as a preprint. Legg has publicly stated the physics dispute is unresolved and applies to the new device as well. The board's confidence setting of low and readiness of emerging are both correct.
