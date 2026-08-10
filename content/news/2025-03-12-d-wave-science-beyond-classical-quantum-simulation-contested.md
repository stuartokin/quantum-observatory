---
schema: news/v1
id: 2025-03-12-d-wave-science-beyond-classical-quantum-simulation-contested
headline: 'D-Wave publishes beyond-classical quantum simulation in Science; classical replication on a laptop immediately contested the claim'
pillar: quantum
date: '2025-03-12'
plain: 'D-Wave published in Science that its Advantage2 annealing processor — running over 5,000 qubits — simulated the non-equilibrium dynamics of a transverse-field Ising model in a way it claimed no classical computer could match, including Oak Ridge''s Frontier supercomputer. The day of publication, independent researchers disputed this, and by July 2026 a Flatiron Institute and Boston University team published in Science that a classical algorithm using 3D tensor networks matched D-Wave''s outputs on a laptop. D-Wave formally rebutted that claim, arguing the classical approach does not cover the largest 3D lattice geometries, the low-precision ensemble observables, or the hardest problem instances in the original paper. Both papers are now in Science; neither has been retracted; the dispute is live. This is a contested result: the original claim of beyond-classical advantage has not been withdrawn, but it has also not survived unchallenged peer review. A reader who needs to know whether quantum annealing has demonstrated practical advantage over classical simulation must read both papers.'
significance: notable
source:
  url: https://www.science.org/doi/10.1126/science.ado6285
  kind: paper
  title: 'Beyond-classical computation in quantum simulation'
  publisher: Science
  date: '2025-03-12'
  doi: 10.1126/science.ado6285
corroboration:
  - url: https://phys.org/news/2025-03-d-quantum-problem-scientific-relevance.html
    publisher: phys.org
    kind: journalism
  - url: https://ir.dwavequantum.com/news/news-details/2026/D-Waves-Quantum-Supremacy-Result-Stands/default.aspx
    publisher: D-Wave Quantum Inc.
    kind: vendor
validation:
  status: contested
  checks:
    - 'Science paper opened at doi:10.1126/science.ado6285; Science 388:199-204, March 12 2025 confirmed'
    - 'Phys.org independently reports D-Wave claim and immediate expert pushback on day of publication'
    - 'Flatiron Institute classical replication published in Science by July 2026 (Techtimes and Quantum Computing Report both reporting)'
    - 'D-Wave formal rebuttal published May 26, 2026, arguing classical paper does not cover hardest instances'
    - 'Neither paper has been retracted; the scientific dispute is live as of August 2026'
    - 'Contested status assigned: two credible parties disagree on whether the classical approach fully covers the quantum result'
  note: 'The core disagreement is about scope: the classical team claims to match D-Wave on the problem classes they tested; D-Wave claims those classes do not include the hardest instances where quantum advantage persists. Both claims may be simultaneously true.'
about:
  - algo-quantum-simulation
  - arch-annealing
establishedBy:
  - url: https://www.science.org/doi/10.1126/science.ado6285
    title: 'Beyond-classical computation in quantum simulation'
    relation: reports
    date: '2025-03'
actors: [D-Wave Quantum]
country: [CA, US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The D-Wave result is the latest in a series of D-Wave publications claiming quantum advantage in spin-glass simulation, following earlier work in Nature Physics (2022) and Nature (2023). Each prior claim was also contested, though none as directly as this one.

The Flatiron replication used a belief propagation tensor network (BP-TNS) algorithm. D-Wave's response identified four specific technical dimensions it argues the classical paper did not address: observables beyond two-point correlations, the largest 3D lattice topologies, low-precision ensembles, and the biclique graph geometry.

This dispute matters for the board because annealing quantum advantage on materials simulation problems is the primary claimed near-term application of quantum annealing. If classical simulation can efficiently cover the same problems, the practical case for annealing in materials science weakens. If D-Wave is right that the hardest instances remain beyond classical reach, the case survives — but only for those specific problem geometries.

The appropriate reading of this item is: quantum annealing has demonstrated something interesting in a specific simulation regime; whether that regime is beyond classical reach in any practical sense is not yet settled.
