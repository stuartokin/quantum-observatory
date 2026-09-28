---
schema: news/v1
id: 2025-09-15-harvard-mit-3000-qubit-continuous-operation
headline: Harvard and MIT solve the atom-loss bottleneck, demonstrating continuous operation of a 3,000-qubit neutral-atom system for over two hours
pillar: quantum
date: '2025-09-15'
plain: 'Neutral-atom quantum computers have been limited by atom loss — once atoms leave the trap, the qubit is gone and the run must restart. Harvard and MIT demonstrated a reloading architecture that replenishes lost atoms at 300,000 per second without disturbing stored qubits, keeping an array of more than 3,000 atoms alive and coherent for over two hours. In theory the system can run indefinitely. This removes a fundamental barrier to fault-tolerant operation at scale: a machine that must restart every 60 seconds cannot run the deep circuits that error correction requires.'
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
  - url: https://postquantum.com/quantum-research/harvard-mit-continuous-3000-qubit/
    publisher: postquantum.com
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature paper opened at DOI 10.1038/s41586-025-09596-6; >3,000 qubits and >2 hours stated in abstract and confirmed in NSF PAR full text'
    - 'PMC full text confirms published online 15 September 2025, Nature Vol 646'
    - 'phys.org and postquantum.com independently report the same figures'
    - 'QuEra co-founders (Greiner, Vuletic, Lukin) are authors; this is a Harvard/MIT primary result with QuEra affiliation declared as competing interest'
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
    unit: 'qubits'
    qualifier: 'trapped in tweezer array, not error-corrected'
    modality: neutral-atom
    note: 'Paper states assembly and maintenance of array of over 3,000 atoms for more than 2 hours. Continuous operation duration has no matching measurement kind in schema.'
    crossChecks: arch-neutral-atom
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-09-28'
status: published
added: '2025-09-15'
---

The bottleneck the paper addresses is atom loss: typical neutral-atom arrays can sustain a trap for about 60 seconds before enough atoms have been lost that the array is no longer usable. Prior work had demonstrated atom reloading in optical lattices, but not while preserving the coherence of qubits already stored nearby.

The new architecture separates the loading and storage zones. Atoms are laser-cooled, imaged and initialised in a loading zone, then transported via conveyor belt into a storage zone where dynamical decoupling maintains coherence. The storage zone is shielded from scattered cooling light by geometry and spectral shifting. Lost qubits are replaced without disrupting neighbours.

Over the two-hour demonstration, more than 50 million atoms cycled through the system. The reloading rate of 300,000 atoms per second means the array can be refilled faster than it empties under normal operating conditions. The authors note that qubits can be reloaded in either a spin-polarised (Z-basis) or coherent superposition (X-basis) state, which is necessary for mid-circuit operations in error-correcting codes.

The result does not demonstrate error correction or logical qubits — it demonstrates that the physical substrate can be kept alive long enough to run them. That is a necessary but not sufficient condition for fault tolerance.
