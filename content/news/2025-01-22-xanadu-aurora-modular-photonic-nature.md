---
schema: news/v1
id: 2025-01-22-xanadu-aurora-modular-photonic-nature
headline: 'Xanadu publishes first modular networked photonic quantum computer in Nature, demonstrating room-temperature rack-to-rack scalable architecture'
pillar: quantum
date: '2025-01-22'
plain: 'Photonic quantum computers promise scalability because photons travel through fibre at room temperature, avoiding cryogenics. Xanadu has now built Aurora — four interconnected server racks containing 35 photonic chips and 13 km of fibre — and published the result in Nature. The machine entangles cluster states across separate racks and runs a distance-2 repetition code with real-time decoding. It is explicitly sub-performant: optical loss is too high for fault-tolerant operation. But the architecture is the first to demonstrate that modular photonic racks can be networked and operated together, and the paper quantifies exactly how much loss reduction is needed to cross the fault-tolerant threshold. This is an architecture demonstration with a clear engineering target, not a working fault-tolerant computer.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-024-08406-9
  kind: paper
  title: 'Scaling and networking a modular photonic quantum computer'
  publisher: Nature
  date: '2025-01-22'
  doi: 10.1038/s41586-024-08406-9
corroboration:
  - url: https://www.prnewswire.com/news-releases/xanadu-introduces-aurora-worlds-first-scalable-networked-and-modular-quantum-computer-302355496.html
    publisher: Xanadu
    kind: vendor
  - url: https://phys.org/news/2025-01-world-scalable-photonic-quantum-prototype.html
    publisher: phys.org
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature paper opened; DOI 10.1038/s41586-024-08406-9 confirmed; Nature vol 638 pp 912-919; announced January 22, 2025'
    - 'Paper describes 35 photonic chips, 84 squeezers, 36 photon-number-resolving detectors, and 86.4 billion entangled cluster-state modes — figures confirmed in abstract and results sections'
    - 'Paper explicitly states the system is sub-performant and identifies optical loss as the dominant barrier to fault-tolerance — this is not a fault-tolerant demonstration'
    - 'Xanadu press release dated January 22, 2025 corroborates the Nature publication date and architecture description'
    - 'phys.org report independently confirms the DOI and the 12-qubit, 35-chip architecture'
    - 'No contradicting technical report found'
about:
  - arch-photonic
  - qec-modular-architecture
establishedBy:
  - url: https://www.nature.com/articles/s41586-024-08406-9
    title: 'Scaling and networking a modular photonic quantum computer'
    relation: reports
    date: '2025-01-22'
    doi: 10.1038/s41586-024-08406-9
actors: [Xanadu]
country: [CA]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

Aurora consists of four rack-deployed modules connected by fibre-optic links, each rack containing photonic chips fabricated using standard foundry processes and running at room temperature. The only cryogenic component is the photon-number-resolving detector array. The system synthesises an 86.4-billion-mode cluster state entangled across physically separate racks, and implements a foliated distance-2 repetition code with real-time decoding.

The central finding is architectural rather than computational: the paper proves that modular rack-to-rack photonic networking is achievable, and it measures optical loss tolerances precisely enough to specify what chip and fabrication improvements are needed before the fault-tolerant threshold can be crossed. The authors identify optical loss — not qubit count — as the binding constraint.

What this is not: a fault-tolerant quantum computer, a demonstration of quantum advantage, or a machine capable of running useful algorithms. The 12 physical qubit modes per clock cycle are far below what error correction requires at useful scale. The significance is that the scalability question — how to connect many photonic racks — now has a concrete, published, tested architecture with a quantified engineering target.
