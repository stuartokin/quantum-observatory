---
schema: news/v1
id: 2025-09-15-harvard-mit-3000-qubit-continuous-operation
headline: Harvard and MIT solve the atom-loss bottleneck, demonstrating continuous operation of a 3,000-qubit neutral-atom system for over two hours
pillar: quantum
date: '2025-09-15'
plain: Neutral-atom quantum computers lose atoms from their traps within roughly sixty seconds, forcing restarts and limiting circuit depth. Harvard and MIT demonstrated a reloading architecture that replaces lost atoms mid-operation without disturbing stored quantum states, keeping a 3,000-qubit array running coherently for more than two hours. More than 50 million atoms cycled through the system in that window. The result addresses a fundamental scaling bottleneck and, in principle, allows indefinite continuous operation — relevant both to deep fault-tolerant circuits and to atomic clock and sensing applications.
significance: notable
source:
  url: https://www.nature.com/articles/s41586-025-09596-6
  kind: paper
  title: 'Continuous operation of a coherent 3,000-qubit system'
  publisher: Nature
  date: '2025-09-15'
  doi: 10.1038/s41586-025-09596-6
validation:
  status: verified
  checks:
    - 'Nature paper opened; over 3,000 atoms maintained for more than 2 hours stated in abstract and NSF PAR full text'
    - 'PMC full-text record confirms Harvard and MIT authorship and the reloading rate figure of 300,000 atoms per second'
    - 'Multiple independent sources (phys.org, postquantum.com, mappingignorance.org) corroborate the result citing the DOI'
about:
  - arch-neutral-atom
  - qec-ftqc-neutral-atom
establishedBy:
  - url: https://www.nature.com/articles/s41586-025-09596-6
    title: 'Continuous operation of a coherent 3,000-qubit system'
    publisher: Nature
    date: '2025-09-15'
    doi: 10.1038/s41586-025-09596-6
    relation: reports
actors:
  - Harvard University
  - Massachusetts Institute of Technology
country:
  - US
measurements:
  - kind: physical-qubits
    value: 3000
    unit: qubits
    qualifier: 'continuously operated, not error-corrected'
    modality: neutral-atom
    note: 'Paper states over 3,000 atoms maintained for more than 2 hours via continuous reloading. Array is physical, not logical.'
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-31'
status: published
added: '2025-09-15'
---
