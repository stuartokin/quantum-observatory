---
schema: news/v1
id: 2025-09-15-harvard-mit-3000-qubit-continuous-operation
headline: Harvard and MIT solve the atom-loss bottleneck, demonstrating continuous operation of a 3,000-qubit neutral-atom system for over two hours
pillar: quantum
date: '2025-09-15'
plain: Neutral-atom quantum computers have previously been limited to pulsed runs of about 60 seconds before atom loss ends the computation. Harvard and MIT demonstrated a reloading architecture that replenishes lost atoms without disturbing the quantum information already stored in the array, sustaining a 3,000-qubit system for more than two hours. This removes a fundamental ceiling on circuit depth for neutral-atom hardware and is a prerequisite for the long error-correction sequences that fault-tolerant computation requires.
significance: notable
source:
  url: https://www.nature.com/articles/s41586-025-09596-6
  kind: paper
  title: Continuous operation of a coherent 3,000-qubit system
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
    - Nature paper confirmed via DOI 10.1038/s41586-025-09596-6; PMC full text opened
    - Phys.org report corroborates 3,000-qubit count and >2 hour operation from independent coverage
    - OSTI record confirms journal and date
measurements:
  - kind: physical-qubits
    value: 3000
    unit: qubits
    qualifier: 'continuously operated, neutral-atom array'
    modality: neutral-atom
    crossChecks: arch-neutral-atom
    note: More than 3,000 physical qubits maintained for more than 2 hours via continuous reloading. Figure stated directly in Nature abstract.
about:
  - arch-neutral-atom
  - qec-ftqc-neutral-atom
establishedBy:
  - url: https://www.nature.com/articles/s41586-025-09596-6
    title: Continuous operation of a coherent 3,000-qubit system
    publisher: Nature
    date: '2025-09-15'
    doi: 10.1038/s41586-025-09596-6
    relation: reports
actors:
  - Harvard University
  - Massachusetts Institute of Technology
  - QuEra Computing
country:
  - US
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-11-09'
status: published
added: '2026-11-09'
---

The reloading architecture uses optical tweezers to extract atoms from a continuously replenished lattice reservoir at up to 300,000 atoms per second, assembling and maintaining an array of more than 3,000 atoms. New qubits can be introduced without destroying quantum information already encoded in existing qubits in the array. The result removes a hard ceiling on circuit depth in neutral-atom hardware and is a direct prerequisite for the sustained error-correction cycles fault-tolerant computation requires. The operation time of more than two hours far exceeds the prior typical trap lifetime of roughly 60 seconds.
