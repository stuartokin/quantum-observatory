---
schema: news/v1
id: 2025-09-24-caltech-6100-qubit-neutral-atom-array
headline: 'Caltech Endres Lab publishes 6,100-qubit neutral-atom array in Nature with record coherence, leaping prior arrays by an order of magnitude'
pillar: quantum
date: '2025-09-24'
plain: 'Caltech assembled 6,100 cesium atoms in optical tweezers across roughly 12,000 sites — the largest qubit array ever built — while simultaneously setting coherence and imaging-fidelity records. The qubits maintain superposition for 12.6 seconds, nearly ten times longer than previous tweezer systems, and individual operations achieve 99.98% accuracy. Scaling to thousands of qubits did not degrade quality: that combination of quantity and coherence is what fault-tolerant error correction will eventually require. This is a storage and control demonstration, not a computation — entangling gates and error correction are the next steps.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-025-09641-4
  kind: paper
  title: 'A tweezer array with 6100 highly coherent atomic qubits'
  publisher: Nature
  date: '2025-09-24'
  doi: 10.1038/s41586-025-09641-4
corroboration:
  - url: https://www.caltech.edu/about/news/caltech-team-sets-record-with-6100-qubit-array
    publisher: Caltech
    kind: authority
  - url: https://quantumcomputingreport.com/caltech-team-sets-record-with-6100-qubit-neutral-atom-array/
    publisher: Quantum Computing Report
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature paper DOI 10.1038/s41586-025-09641-4 opened; 6100-qubit figure, 12.6 s coherence time, and 99.98952% imaging survival all appear in the paper abstract and results (confirmed via arXiv preprint text arXiv:2403.12021)'
    - 'Caltech institutional press release corroborates the figures'
    - 'Quantum Computing Report independently covers the result with matching figures'
    - 'No contradicting report found'
about:
  - arch-neutral-atom
  - qec-logical-qubit-scaling
establishedBy:
  - url: https://arxiv.org/abs/2403.12021
    title: 'A tweezer array with 6100 highly coherent atomic qubits'
    relation: reports
    date: '2024-03'
actors: [California Institute of Technology, Manuel Endres]
country: [US]
measurements:
  - kind: physical-qubits
    value: 6100
    modality: neutral-atom
    qualifier: 'trapped in tweezer array, not error-corrected'
    note: 'Cesium atoms trapped across ~12,000 sites. No entangling gates demonstrated in this paper; coherence and imaging fidelity only.'
    crossChecks: arch-neutral-atom
  - kind: coherence-time
    value: 12.6
    unit: s
    modality: neutral-atom
    qualifier: 'trapped in tweezer array, not error-corrected'
    note: 'Record for hyperfine qubits in an optical tweezer array; nearly 10x longer than prior tweezer systems.'
  - kind: single-qubit-fidelity
    value: 0.9998
    modality: neutral-atom
    qualifier: 'trapped in tweezer array, not error-corrected'
    note: '99.98% imaging survival (99.98952% exact). Individual qubit control accuracy at this scale.'
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-19'
status: published
added: '2025-09-24'
---

The Caltech Endres Lab assembled the largest qubit array ever built: 6,100 cesium atoms trapped individually in optical tweezers across roughly 12,000 sites. The key result is that scale did not come at the expense of quality. Previous records for tweezer arrays were in the hundreds of qubits; those systems achieved coherence of roughly 1–2 seconds. The Caltech system reached 12.6 seconds — a record for hyperfine qubits in an optical tweezer array — while maintaining 99.98% individual qubit accuracy across all 6,100 qubits.

This is not a quantum computer: no entangling gates are demonstrated, no algorithms are run. It is a demonstration that the storage substrate for a future large-scale neutral-atom processor can be built and controlled at this scale without quality degradation. Entanglement and error correction — which require two-qubit gates — are explicitly identified as next steps.
