---
schema: news/v1
id: 2025-09-15-harvard-mit-3000-qubit-continuous-operation
headline: 'Harvard and MIT solve the atom-loss bottleneck, demonstrating continuous operation of a 3,000-qubit neutral-atom system for over two hours'
pillar: quantum
date: '2025-09-15'
plain: 'Neutral-atom quantum computers lose atoms from their traps during operation, typically limiting runs to about 60 seconds. Harvard and MIT have solved this by continuously reloading atoms at 300,000 per second, keeping an array of more than 3,000 qubits coherent for over two hours — and in principle indefinitely. New atoms are inserted without disturbing the quantum state of qubits already in the array. This removes a fundamental pulsed-mode constraint that would otherwise cap the depth of error-corrected circuits on large neutral-atom systems.'
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
  - url: https://phys.org/news/2025-09-qubit-neutral-atom-array-reloads.html
    publisher: phys.org
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature paper opened at DOI 10.1038/s41586-025-09596-6; continuous operation of more than 3,000 qubits for more than 2 hours confirmed in abstract and full text'
    - 'PMC open-access full text confirms Harvard and MIT authorship (Lukin group, Vuletić group)'
    - 'phys.org and postquantum.com coverage independently corroborate the result'
    - 'Paper states reloading rate of 300,000 atoms per second and more than 50 million atoms cycled over the 2-hour run'
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
  - QuEra Computing
country:
  - US
measurements:
  - kind: physical-qubits
    value: 3000
    unit: qubits
    qualifier: 'trapped in tweezer array, not error-corrected'
    modality: neutral-atom
    note: 'Paper states more than 3,000; 3000 is the stated floor. Array maintained continuously for more than 2 hours via high-rate atom reloading.'
    crossChecks: arch-neutral-atom
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-09-14'
status: published
added: '2025-09-15'
---

Neutral-atom arrays have advanced rapidly as a quantum computing platform, but atom loss during circuit execution has constrained them to short, pulsed runs. This paper demonstrates that the constraint is not fundamental. By feeding two optical lattice conveyor belts into the science region, the Harvard-MIT team maintains a continuously replenished reservoir. New atoms are extracted into optical tweezers and inserted into the array without disturbing the coherent quantum state of stored qubits — the key technical achievement.

Over a two-hour demonstration, more than 50 million atoms cycled through the system. The approach is directly relevant to fault-tolerant quantum computing, where deep error-corrected circuits require sustained operation well beyond current trap lifetimes. Lukin's group notes that the continuous-operation capability may in practice matter more than a specific qubit count.
