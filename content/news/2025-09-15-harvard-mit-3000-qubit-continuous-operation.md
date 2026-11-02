---
schema: news/v1
id: 2025-09-15-harvard-mit-3000-qubit-continuous-operation
headline: 'Harvard and MIT solve the atom-loss bottleneck, demonstrating continuous operation of a 3,000-qubit neutral-atom system for over two hours'
pillar: quantum
date: '2025-09-15'
plain: 'Neutral-atom quantum computers have previously been limited to short bursts: atoms are lost during operation and the whole system must be restarted, capping how deep a computation can run. This Harvard-MIT result demonstrates continuous reloading at 300,000 atoms per second, keeping a 3,000-qubit array running coherently for more than two hours. That removes a practical ceiling that had restricted neutral atoms to circuits of limited depth, and is a precondition for the long-running error-corrected computations fault-tolerant quantum computing requires.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-025-09596-6
  kind: paper
  title: 'Continuous operation of a coherent 3,000-qubit system'
  publisher: Nature
  date: '2025-09-15'
  doi: 10.1038/s41586-025-09596-6
corroboration:
  - url: https://phys.org/news/2025-09-physicists-quantum-bit-capable.html
    publisher: Phys.org
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature paper confirmed: DOI 10.1038/s41586-025-09596-6, Nature 646:1075-1080, published 15 September 2025. PubMed PMID 40953821 and OSTI 3376337 corroborate.'
    - 'APS Global Physics Summit 2026 abstract confirms >3,000 atoms maintained for more than 2 hours with reloading rate up to 300,000 atoms/second.'
    - 'Phys.org independently reports the 3,000-qubit continuous operation result citing the Nature paper.'
    - 'No contradicting result found.'
about:
  - arch-neutral-atom
  - qec-ftqc-neutral-atom
establishedBy:
  - url: https://doi.org/10.1038/s41586-025-09596-6
    title: 'Continuous operation of a coherent 3,000-qubit system'
    publisher: Nature
    date: '2025-09-15'
    doi: 10.1038/s41586-025-09596-6
    relation: reports
  - url: https://arxiv.org/abs/2506.20660
    title: 'Continuous operation of a coherent 3,000-qubit system (preprint)'
    date: '2025-06'
    relation: reports
actors:
  - Harvard University
  - Massachusetts Institute of Technology
  - QuEra Computing
country:
  - US
measurements:
  - kind: physical-qubits
    value: 3000
    qualifier: 'physical, not error-corrected'
    modality: neutral-atom
    note: 'Paper title and abstract use 3,000-qubit; APS abstract states over 3,000 atoms maintained continuously for more than 2 hours. Figure is the steady-state array size during continuous operation.'
    crossChecks: arch-neutral-atom
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-11-02'
status: published
added: '2025-09-15'
---
