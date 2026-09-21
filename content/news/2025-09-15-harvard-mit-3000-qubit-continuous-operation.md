---
schema: news/v1
id: 2025-09-15-harvard-mit-3000-qubit-continuous-operation
headline: 'Harvard and MIT solve the atom-loss bottleneck, demonstrating continuous operation of a 3,000-qubit neutral-atom system for over two hours'
pillar: quantum
date: '2025-09-15'
plain: 'Neutral-atom quantum computers lose atoms over time, forcing restarts every ~60 seconds and making sustained operation impossible. A Harvard and MIT team solved this by replenishing lost atoms continuously at 300,000 atoms per second, keeping a 3,000-qubit array running coherently for over two hours — and in principle indefinitely. The atom-loss problem has been one of the clearest practical limits on neutral-atom scaling; removing it is a genuine architectural advance, separate from the qubit count itself.'
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
    publisher: phys.org
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature paper confirmed open-access via PMC and OSTI; >3,000 qubits and >2 hours operation stated in paper text'
    - 'Paper text states reloading rate of 300,000 atoms per second, and over 50 million atoms cycled over the 2-hour run'
    - 'Harvard Gazette and phys.org independently report the result'
    - 'No contradicting report found'
about:
  - arch-neutral-atom
  - qec-ftqc-neutral-atom
establishedBy:
  - url: https://www.nature.com/articles/s41586-025-09596-6
    title: 'Continuous operation of a coherent 3,000-qubit system'
    date: '2025-09'
    doi: 10.1038/s41586-025-09596-6
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
    unit: 'qubits'
    qualifier: 'trapped in tweezer array, not error-corrected'
    modality: neutral-atom
    note: 'Paper states array of over 3,000 atoms maintained for more than 2 hours via continuous reloading. Duration has no matching schema kind and is recorded here only.'
    crossChecks: arch-neutral-atom
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-09-21'
status: published
added: '2025-09-15'
---

The result demonstrated in this paper is architectural rather than a simple qubit-count record. Prior neutral-atom systems lost atoms irreversibly, limiting continuous operation to roughly 60 seconds. The Harvard and MIT team developed a reloading architecture in which new atoms are continuously injected from a reservoir at 300,000 atoms per second — fast enough to replace losses without disturbing the quantum state of atoms already in the storage zone. Over a 2-hour demonstration, more than 50 million atoms cycled through the system.

The >3,000 qubit figure is a physical qubit count in a non-error-corrected array. The paper does not claim fault-tolerant operation. The significance is that the atom-loss bottleneck, which had been the clearest practical ceiling on neutral-atom run times, is now resolved in principle.
