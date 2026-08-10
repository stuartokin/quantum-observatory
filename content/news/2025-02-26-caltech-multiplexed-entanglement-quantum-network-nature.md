---
schema: news/v1
id: 2025-02-26-caltech-multiplexed-entanglement-quantum-network-nature
headline: 'Caltech demonstrates first entanglement multiplexing between individual spin qubits across a quantum network node pair'
pillar: quantum
date: '2025-02-26'
plain: 'Quantum networks face a rate problem: entangling two distant nodes one pair at a time is slow, which limits the usefulness of any repeater network. Caltech''s Faraon group embedded ytterbium rare-earth ions in nanophotonic crystals, allowing multiple qubits in each node to emit entangled photons in parallel. This multiplexed approach is the first demonstration of parallel entanglement generation between individual spin qubits — not atomic ensembles — in a quantum network, and the team describes it as a significant boost to entanglement generation rate. Higher rates are a prerequisite before quantum repeater networks become practical for connecting processors or users over real distances.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-024-08537-z
  kind: paper
  title: 'Multiplexed entanglement of multi-emitter quantum network nodes'
  publisher: Nature
  date: '2025-02-26'
  doi: 10.1038/s41586-024-08537-z
corroboration:
  - url: https://www.caltech.edu/about/news/multiplexing-entanglement-in-a-quantum-network
    publisher: California Institute of Technology
    kind: authority
  - url: https://phys.org/news/2025-02-multiplexing-entanglement-quantum-network.html
    publisher: phys.org
    kind: press
validation:
  status: verified
  checks:
    - 'Nature paper DOI 10.1038/s41586-024-08537-z confirmed; volume 639, pages 54-59; publication date February 26, 2025'
    - 'Official Caltech news page opened; confirms publication date, result, and lead author Andrei Faraon'
    - 'phys.org independently covers the same paper with consistent details including the ytterbium-in-crystal platform'
    - 'Claimed as first-ever demonstration of entanglement multiplexing in a network of individual spin qubits by the authors'
    - 'Distinct from ensemble-based multiplexing and from the USTC metropolitan repeater item already on the board'
about:
  - comms-quantum-memory
  - comms-quantum-repeater
  - entanglement-distribution
establishedBy:
  - url: https://www.nature.com/articles/s41586-024-08537-z
    title: 'Multiplexed entanglement of multi-emitter quantum network nodes'
    relation: reports
    date: '2025-02-26'
    doi: 10.1038/s41586-024-08537-z
actors: [California Institute of Technology]
country: [US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The two network nodes each contain ytterbium atoms (Yb3+) embedded in yttrium orthovanadate crystals coupled to nanophotonic optical cavities. Each atom emits a photon entangled with it; photons from both nodes travel to a central beamsplitter where coincidence detection heralds entanglement between the emitting atoms. Because individual ytterbium atoms within a crystal have slightly different optical frequencies due to crystal imperfections, the team could address them selectively — overcoming the inhomogeneous broadening that had previously made individual-emitter multiplexing impractical.

The nodes are bench-scale and laboratory-separated, not metropolitan-range. The result is a proof of principle: the multiplexing protocol works, entanglement rate scales with the number of emitters used in parallel, and the ytterbium-in-crystal platform has the spectral properties needed for this approach. The authors note the path toward networks with hundreds of qubits per node, though that scale has not been demonstrated.
