---
schema: news/v1
id: 2026-01-22-zhejiang-bivariate-bicycle-qldpc-nature-physics
headline: 'Zhejiang University team runs bivariate bicycle qLDPC codes on a superconducting processor for the first time, published in Nature Physics'
pillar: quantum
date: '2026-01-22'
plain: 'A team at Zhejiang University and Tsinghua used a 32-qubit superconducting processor called Kunlun — built with overlapping long-range couplers — to run two bivariate bicycle qLDPC codes: a distance-4 code encoding four logical qubits, and a distance-3 code encoding six. Bivariate bicycle codes promise far fewer physical qubits per logical qubit than surface codes, but they require non-local qubit connectivity that standard superconducting chips lack. Kunlun was built to provide that connectivity. The codes demonstrated simultaneous measurement of all non-local weight-6 stabilizers. Logical error rates (around 8-9% per cycle) were not below the physical error rate, so this is not yet breakeven error correction — but it is the first demonstration that bivariate bicycle codes can be run on a superconducting device, expanding the set of hardware platforms where this code family is experimentally accessible beyond neutral atoms.'
significance: notable
source:
  url: https://www.nature.com/articles/s41567-025-03157-4
  kind: paper
  title: 'Demonstration of low-overhead quantum error correction codes'
  publisher: Nature Physics
  date: '2026-01-22'
  doi: 10.1038/s41567-025-03157-4
corroboration:
  - url: https://www.amanchourasia.in/2026/01/low-overhead-quantum-error-correction.html
    publisher: amanchourasia.in
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature Physics DOI 10.1038/s41567-025-03157-4 opened; paper confirmed at Nat. Phys. 22, 308-314 (2026); metadata page carries January 22, 2026 date'
    - 'arXiv preprint 2505.09684 (May 2025) confirmed as the same paper — the preprint predates the journal publication; journal paper is the citable record'
    - 'Quantum Zeitgeist guide to qLDPC codes independently identifies this as the first bivariate bicycle code run on real superconducting qubits, published in Nature Physics in January 2026'
    - 'Error correction zoo entry (errorcorrectionzoo.org) independently cites Wang et al. Nature Physics 2026 for this [[18,4,4]] BB code implementation'
    - 'Logical error rate figures confirmed in the arXiv preprint text: 8.91% and 7.77% per cycle respectively — not yet at breakeven, correctly stated in plain field'
about:
  - qec-qldpc-bivariate-bicycle
  - arch-superconducting
establishedBy:
  - url: https://arxiv.org/abs/2308.07915
    title: 'High-threshold and low-overhead fault-tolerant quantum memory'
    relation: builds-on
    date: '2023-08'
  - url: https://www.nature.com/articles/s41567-025-03157-4
    title: 'Demonstration of low-overhead quantum error correction codes'
    relation: reports
    date: '2026-01-22'
    doi: 10.1038/s41567-025-03157-4
actors: ['Zhejiang University', 'Tsinghua University']
country: [CN]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The Kunlun processor was specifically designed with overlapping long-range couplers to provide the degree-6 qubit connectivity that bivariate bicycle codes require — connectivity not present in standard two-dimensional transmon layouts. This is the architecture investment that makes the experiment possible, and it is worth noting for readers tracking hardware roadmaps: IBM has made the same architectural bet with its Loon chip (November 2025), and neutral-atom platforms achieve this connectivity through reconfigurability.

The experiment demonstrates syndrome extraction, not logical computation, and the error rates (8.91% and 7.77% per logical qubit per cycle) are above the physical qubit error rate, meaning the code is not yet protecting against errors on net. The significance is platform verification: bivariate bicycle codes are no longer exclusively a neutral-atom or theoretical result.
