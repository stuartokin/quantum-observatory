---
schema: news/v1
id: 2025-09-15-harvard-mit-3000-qubit-continuous-operation
headline: Harvard and MIT solve the atom-loss bottleneck, demonstrating continuous operation of a 3,000-qubit neutral-atom system for over two hours
pillar: quantum
date: '2025-09-15'
plain: 'Neutral-atom quantum computers have been limited by atom loss — each time an atom escapes the trap, a qubit disappears and the computation must restart. A Harvard-led team solved this by building a conveyor-belt reloading system that replenishes lost atoms at 300,000 per second without disturbing the qubits already computing. The result is a 3,000-qubit array that ran continuously for over two hours; in principle it could run indefinitely. This removes a fundamental scaling barrier: fault-tolerant computation requires long circuit depths, and a system that stops every 60 seconds cannot support them.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-025-09596-6
  kind: paper
  title: 'Continuous operation of a coherent 3,000-qubit system'
  publisher: Nature
  date: '2025-09-15'
  doi: 10.1038/s41586-025-09596-6
corroboration:
  - url: https://phys.org/news/2025-09-qubit-neutral-atom-array-reloads.html
    publisher: phys.org
    kind: journalism
  - url: https://postquantum.com/quantum-research/harvard-mit-continuous-3000-qubit/
    publisher: postquantum.com
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature paper opened; >3,000 qubits operated continuously for >2 hours stated in abstract and results'
    - 'DOI confirmed: 10.1038/s41586-025-09596-6, Nature vol 646 pp 1075-1080'
    - 'PMC full-text record confirms Harvard and MIT authorship'
    - 'Corroborated by phys.org and postquantum.com reports citing the paper directly'
about:
  - arch-neutral-atom
  - qec-ftqc-neutral-atom
establishedBy:
  - url: https://doi.org/10.1038/s41586-025-09596-6
    title: 'Continuous operation of a coherent 3,000-qubit system'
    relation: reports
    date: '2025-09-15'
    doi: 10.1038/s41586-025-09596-6
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
    note: 'Stated as over 3,000 atoms maintained continuously for over 2 hours. 3000 is the stated lower bound.'
    crossChecks: arch-neutral-atom
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-24'
status: published
added: '2026-08-24'
---
