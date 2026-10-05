---
schema: news/v1
id: 2025-09-15-harvard-mit-3000-qubit-continuous-operation
headline: 'Harvard and MIT solve the atom-loss bottleneck, demonstrating continuous operation of a 3,000-qubit neutral-atom system for over two hours'
pillar: quantum
date: '2025-09-15'
plain: 'Neutral-atom quantum computers have been limited to pulsed runs of roughly 60 seconds before atom loss degrades the array. This Harvard-MIT result uses dual optical-lattice conveyor belts to continuously reload atoms at 300,000 per second into the computing zone without disturbing stored quantum states — extending operation to over two hours with more than 3,000 qubits. Removing the pulsed-operation ceiling is a prerequisite for deep-circuit fault-tolerant computation and continuous atomic clocks; this is the first demonstration at useful scale.'
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
    publisher: Phys.org
    kind: journalism
  - url: https://phys.org/news/2025-09-physicists-quantum-bit-capable.html
    publisher: Phys.org
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature paper opened at DOI 10.1038/s41586-025-09596-6; title and abstract directly state continuous operation of a coherent 3,000-qubit system for more than two hours'
    - 'Phys.org and Harvard press coverage independently corroborate the result'
    - '>3,000 qubits is the paper''s stated figure; 3000 used as floor value in measurements'
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
    qualifier: 'operated continuously, >2 hours'
    modality: neutral-atom
    note: 'Paper states >3,000; 3000 is the floor value. Operated for more than 2 hours continuously.'
    crossChecks: arch-neutral-atom
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-10-05'
status: published
added: '2026-10-05'
---

The system uses dual optical-lattice conveyor belts to transport cold atoms from a reservoir into the science region, where atoms are extracted into optical tweezers at a rate of 300,000 atoms per second. New qubits are introduced without disturbing the quantum state of qubits already in the array — the key technical achievement that enables continuous rather than pulsed operation.

Prior trap lifetimes in optical tweezers were approximately 60 seconds, limiting circuit depth and ruling out the continuous operation needed for fault-tolerant deep circuits and continuously operated atomic clocks. This result removes that ceiling at the 3,000-qubit scale.
