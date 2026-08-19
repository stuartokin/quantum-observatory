---
schema: news/v1
id: 2026-08-10-quera-96-logical-qubits-nature-neutral-atom
headline: 'QuEra demonstrates 96 error-corrected logical qubits from 448 physical neutral atoms in Nature'
pillar: quantum
date: '2026-01-19'
plain: 'QuEra and Harvard published the largest verified logical-qubit count to date in Nature, encoding 96 logical qubits from 448 physical atoms using a high-rate [[16,6,4]] qLDPC code with below-threshold error suppression. This doubles the prior 48-qubit record and runs error-corrected gates across all 96 logical qubits simultaneously — the first time any team has demonstrated this many algorithmically usable, error-corrected qubits. The encoding ratio of roughly 4.7:1 (physical to logical) is more efficient than surface codes, which typically require tens to hundreds of physical qubits per logical qubit at this code distance.'
significance: headline
source:
  url: https://www.nature.com/articles/s41586-025-09848-5
  kind: paper
  title: 'Logical quantum processor based on reconfigurable atom arrays'
  publisher: Nature
  date: '2026-01-19'
  doi: 10.1038/s41586-025-09848-5
validation:
  status: verified
  checks:
    - 'Nature paper DOI 10.1038/s41586-025-09848-5 confirmed; 96 logical qubits from 448 physical atoms using [[16,6,4]] high-rate code stated in the abstract and results'
    - 'Figures corroborated by multiple independent secondary sources including Quantum Computing Report and ScienceDaily'
    - 'Below-threshold error suppression confirmed in paper'
about:
  - qec-logical-qubit-scaling
  - arch-neutral-atom
  - qec-qldpc-bivariate-bicycle
establishedBy:
  - url: https://arxiv.org/abs/2412.14189
    title: 'Logical quantum processor based on reconfigurable atom arrays'
    relation: reports
    date: '2024-12'
actors: [QuEra Computing, Harvard University]
country: [US]
measurements:
  - kind: logical-qubits
    value: 96
    modality: neutral-atom
    qualifier: 'error-corrected, high-rate code'
    note: '[[16,6,4]] qLDPC code, below-threshold error suppression. All 96 logical qubits operated simultaneously.'
    crossChecks: qec-logical-qubit-scaling
  - kind: physical-qubits
    value: 448
    modality: neutral-atom
    qualifier: 'trapped in tweezer array, not error-corrected'
    note: 'Physical atom count supporting 96 logical qubits; encoding ratio ~4.7:1 physical-to-logical.'
    crossChecks: arch-neutral-atom
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-19'
status: published
added: '2026-08-10'
---

QuEra and Harvard demonstrated 96 algorithmically usable, error-corrected logical qubits on a 448-atom neutral-atom processor, doubling the prior record of 48. The [[16,6,4]] high-rate qLDPC code encodes six logical qubits from sixteen physical qubits, achieving a 4.7:1 encoding ratio that is substantially more efficient than surface codes at comparable code distances. Error suppression operates below threshold, meaning logical error rates improve as the code grows — the defining criterion for scalable fault-tolerant computing.

What this is not: the code distance is low (d=4), the logical qubits are not yet capable of running Shor's algorithm at cryptographic scale, and the result is a memory and gate demonstration rather than a useful computation. The count is climbing fast; what it is for remains the open question.
