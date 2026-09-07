---
schema: news/v1
id: 2025-09-15-harvard-mit-3000-qubit-continuous-operation
headline: Harvard and MIT solve the atom-loss bottleneck, demonstrating continuous operation of a 3,000-qubit neutral-atom system for over two hours
pillar: quantum
date: '2025-09-15'
plain: Neutral-atom quantum computers have been limited to short bursts because atoms leak from optical traps — once lost, a qubit is gone and the run must restart. Harvard and MIT''s group solved this by building two optical conveyor belts that reload atoms from a reservoir at 300,000 atoms per second, replacing losses without disturbing qubits already in the array. The result is a 3,000-qubit system that ran continuously for more than two hours — in principle indefinitely. The immediate value is not the qubit count but the removal of a hard restart constraint that has limited every neutral-atom processor built so far.
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
  - url: https://pmc.ncbi.nlm.nih.gov/articles/PMC12571880/
    publisher: PubMed Central
    kind: paper
validation:
  status: verified
  checks:
    - 'Nature paper opened; abstract states over 3,000 atoms maintained for more than 2 hours'
    - 'NSF PAR full text confirms reloading rate of 300,000 atoms per second and >3,000-atom array'
    - 'PubMed Central open-access record confirms DOI and publication date'
    - 'phys.org report corroborates the figure independently'
    - 'No contradicting claim found'
about:
  - arch-neutral-atom
  - qec-ftqc-neutral-atom
establishedBy:
  - url: https://www.nature.com/articles/s41586-025-09596-6
    title: 'Continuous operation of a coherent 3,000-qubit system'
    doi: 10.1038/s41586-025-09596-6
    date: '2025-09-15'
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
    qualifier: 'trapped in tweezer array, not error-corrected'
    modality: neutral-atom
    note: 'Array maintained continuously for >2 hours via optical conveyor belt reloading. Over 50 million atoms cycled through during the 2-hour run.'
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-09-07'
status: published
added: '2026-09-07'
---
