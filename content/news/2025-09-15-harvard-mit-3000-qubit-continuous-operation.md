---
schema: news/v1
id: 2025-09-15-harvard-mit-3000-qubit-continuous-operation
headline: Harvard and MIT solve the atom-loss bottleneck, demonstrating continuous operation of a 3,000-qubit neutral-atom system for over two hours
pillar: quantum
date: '2025-09-15'
plain: Neutral-atom quantum computers have been limited to pulsed operation of about 60 seconds because atoms are lost during computation and cannot be replaced without disrupting the processor. Harvard and MIT solved this by building a dual optical-lattice conveyor belt that continuously feeds fresh atoms into the array at up to 300,000 atoms per second, maintaining a coherent 3,000-qubit system for more than two hours. Continuous operation removes the circuit-depth ceiling imposed by atom loss and is a prerequisite for running the deep error-correction circuits that fault-tolerant quantum computing requires.
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
    - 'Nature paper DOI 10.1038/s41586-025-09596-6 confirmed via PubMed (PMID 40953821) and OSTI (ID 3376337); >3000-qubit continuous operation for >2 hours stated in abstract'
    - 'Phys.org and ResearchGate records corroborate independently'
    - 'No contradicting report found'
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
actors: [Harvard University, MIT]
country: [US]
measurements:
  - kind: physical-qubits
    value: 3000
    unit: qubits
    qualifier: 'trapped in tweezer array, not error-corrected'
    modality: neutral-atom
    note: 'Paper states ''more than 3,000 atoms''; 3000 is the floor stated. Operated continuously for more than 2 hours using optical lattice conveyor belt reloading.'
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-10-26'
status: published
added: '2026-10-26'
---
