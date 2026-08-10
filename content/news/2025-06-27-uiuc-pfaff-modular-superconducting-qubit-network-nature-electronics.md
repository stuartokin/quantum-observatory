---
schema: news/v1
id: 2025-06-27-uiuc-pfaff-modular-superconducting-qubit-network-nature-electronics
headline: 'University of Illinois demonstrates interchangeable superconducting qubit modules connected at 99% SWAP fidelity'
pillar: quantum
date: '2025-06-27'
plain: 'Separate superconducting qubit devices have been connected using a low-loss detachable coaxial cable and made to exchange quantum states at close to 99% fidelity in under 100 nanoseconds. A distributed logical dual-rail qubit was also operated across the two modules. This addresses a practical limit of today''s monolithic superconducting processors: you cannot add more qubits without rebuilding the whole chip. A modular approach would let smaller, higher-quality devices be manufactured and tested separately, then connected as needed. The current demonstration involves two modules; whether this scales to tens or hundreds while maintaining fidelity is the open question the team is now pursuing.'
significance: notable
source:
  url: https://www.nature.com/articles/s41928-025-01404-3
  kind: paper
  title: 'A high-efficiency elementary network of interchangeable superconducting qubit devices'
  publisher: Nature Electronics
  date: '2025-06-27'
  doi: 10.1038/s41928-025-01404-3
corroboration:
  - url: https://phys.org/news/2025-07-modular-network-fault-tolerant-scaling.html
    publisher: phys.org
    kind: journalism
  - url: https://techxplore.com/news/2025-07-modular-approach-scalable-quantum.html
    publisher: TechXplore
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature Electronics paper opened; DOI 10.1038/s41928-025-01404-3 confirmed; publication date 27 June 2025'
    - 'Paper reports approximately 99% intermodule SWAP efficiency using a fast pump scheme on low-loss detachable cable; a distributed logical dual-rail qubit is operated across the two modules'
    - 'Nature Electronics editorial note in vol 8, July 2025 issue explicitly references this paper and its findings'
    - 'Two independent journalism outlets (phys.org, TechXplore) reported the result in July 2025 with consistent technical detail'
    - 'No contradicting result found; claims are about a two-module prototype, appropriately scoped'
about:
  - arch-superconducting
  - qec-modular-architecture
establishedBy:
  - url: https://www.nature.com/articles/s41928-025-01404-3
    title: 'A high-efficiency elementary network of interchangeable superconducting qubit devices'
    relation: reports
    date: '2025-06-27'
    doi: 10.1038/s41928-025-01404-3
actors: ['University of Illinois Urbana-Champaign']
country: ['US']
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The Pfaff group at Illinois connected two superconducting transmon qubit devices using a custom low-loss detachable coaxial cable. By applying a fast pump scheme to overcome residual cable loss, intermodule SWAP operations reached approximately 99% efficiency in under 100 nanoseconds. The team used the interconnect to generate high-fidelity entanglement across the two modules and to operate a distributed logical dual-rail qubit — a logical encoding that spans both devices.

The significance is architectural. Monolithic superconducting processors are difficult to scale because fabrication yield and coherence degrade with chip size. A modular approach would allow smaller, higher-quality chips to be fabricated independently and connected, enabling reconfiguration and incremental scaling without redesigning the whole system. The system demonstrated here contains two modules. The team is actively working on expanding the network to more devices while maintaining fidelity and exploring compatibility with quantum error correction.
