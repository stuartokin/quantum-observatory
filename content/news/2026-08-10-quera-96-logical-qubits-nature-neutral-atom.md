---
schema: news/v1
id: 2026-08-10-quera-96-logical-qubits-nature-neutral-atom
headline: 'QuEra demonstrates 96 error-corrected logical qubits from 448 physical atoms in Nature'
pillar: quantum
date: '2026-01-19'
plain: 'A neutral-atom processor has now produced more verified logical qubits than any other platform at the time of publication. QuEra, with Harvard and MIT collaborators, encoded 96 logical qubits from 448 physical atoms using high-rate [[16,6,4]] codes — a 4.7-to-1 physical-to-logical ratio — and demonstrated below-threshold error suppression across all of them simultaneously. This matters because previous demonstrations topped out at 48 logical qubits (Quantinuum''s Helios). The result does not mean a useful quantum computer exists: 96 logical qubits at current fidelity cannot run any commercially relevant algorithm. But it establishes that neutral-atom hardware can encode logical qubits at scale with improving rather than worsening error rates, which is the condition fault-tolerant computing requires.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-025-09848-5
  kind: paper
  title: 'A fault-tolerant neutral-atom architecture for universal quantum computation'
  publisher: Nature
  date: '2026-01-19'
  doi: 10.1038/s41586-025-09848-5
corroboration:
  - url: https://entangledfuture.com/company/quera-computing/
    publisher: Entangled Future
    kind: journalism
  - url: https://www.techtimes.com/articles/318329/20260613/quantum-error-correction-validated-nature-microsoft-quantinuum-log-800-fold-improvement.htm
    publisher: TechTimes
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature paper opened at doi:10.1038/s41586-025-09848-5; Nature volume 649 pp 39-46 confirmed; 448-atom array and 96 logical qubits appear in abstract and results'
    - 'Multiple independent sources cite the same DOI and figure'
    - 'Entangled Future independently describes below-threshold error suppression result'
    - 'No contradicting peer-reviewed report found'
about:
  - qec-logical-qubit-scaling
  - arch-neutral-atom
  - qec-error-correction-threshold
establishedBy:
  - url: https://www.nature.com/articles/s41586-025-09848-5
    title: 'A fault-tolerant neutral-atom architecture for universal quantum computation'
    relation: reports
    date: '2026-01-19'
    doi: 10.1038/s41586-025-09848-5
actors: [QuEra Computing, Harvard University, MIT]
country: [US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The result uses [[16,6,4]] high-rate codes, encoding six logical qubits per 16 physical atoms. The architecture is reconfigurable: atoms are rearranged between operations, enabling the long-range connectivity that the code requires without additional wiring. The paper demonstrates below-threshold error suppression, meaning logical error rates fall as code distance increases — the essential property for fault-tolerant scaling. At the time of publication this was the highest verified logical qubit count on any quantum hardware platform. Quantinuum's Helios system, running 48 logical qubits, held the prior record.
