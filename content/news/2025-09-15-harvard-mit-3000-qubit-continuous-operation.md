---
schema: news/v1
id: 2025-09-15-harvard-mit-3000-qubit-continuous-operation
headline: Harvard and MIT solve the atom-loss bottleneck, demonstrating continuous operation of a 3,000-qubit neutral-atom system for over two hours
pillar: quantum
date: '2025-09-15'
plain: 'All neutral-atom quantum computers until this work shared the same bottleneck: atoms are lost from the trap during computation, forcing a stop-reload-restart cycle that limits how deep a quantum circuit can run. Harvard and MIT demonstrated a system that continuously feeds replacement atoms into the array without disturbing the qubits already computing — running 3,000 qubits coherently for over two hours, during which more than 50 million atoms cycled through. In principle the system could run indefinitely. Circuit depth, not qubit count, is the practical limit for most useful quantum algorithms; continuous reloading removes the depth ceiling that atom loss imposed. This is a hardware advance. No useful algorithm was run and error correction was not demonstrated in this paper.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-025-09596-6
  kind: paper
  title: Continuous operation of a coherent 3,000-qubit system
  publisher: Nature
  date: '2025-09-15'
  doi: 10.1038/s41586-025-09596-6
corroboration:
  - url: https://phys.org/news/2025-09-qubit-neutral-atom-array-reloads.html
    publisher: Phys.org
    kind: journalism
  - url: https://www.hpcwire.com/off-the-wire/harvard-achieves-milestone-in-neutral-atom-quantum-error-correction-with-new-nature-study/
    publisher: HPCwire
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature DOI 10.1038/s41586-025-09596-6 confirmed; PubMed record confirms Nature 646(8087):1075-1080, epub September 15 2025'
    - 'arXiv:2506.20660 is the preprint; journal record confirmed independently'
    - 'Phys.org article (September 28 2025) describes consistent result: 3,000+ qubits, 2+ hours, 50M atoms cycled'
    - 'Authors include Lukin, Greiner, Vuletić (Harvard-MIT-QuEra group); co-founders of QuEra are among authors'
    - 'No contradicting result found'
about:
  - arch-neutral-atom
  - qec-logical-qubit-scaling
establishedBy:
  - url: https://arxiv.org/abs/2506.20660
    title: Continuous operation of a coherent 3000-qubit system
    relation: reports
    date: '2025-06'
actors: [Harvard University, Massachusetts Institute of Technology, QuEra Computing]
country: [US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The system uses two optical lattice conveyor belts to transport reservoir atoms into the science region, where they are extracted into optical tweezers without disturbing nearby qubits. The coherence of in-use qubits is maintained while new physical qubits are introduced at the boundaries.

Over the two-hour run, more than 50 million atoms cycled through the system. The authors state the system could in principle run indefinitely, though this has not been demonstrated beyond two hours.

Lukin's comment in the coverage makes the practical significance explicit: continuous operation may matter more than any specific qubit count, because it is circuit depth — not qubit number — that currently constrains what useful quantum algorithms can do.
