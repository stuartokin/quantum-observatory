---
schema: news/v1
id: 2025-01-09-nist-umd-2d-local-qldpc-prxquantum
headline: 'NIST and Maryland group publish 2D-local bilayer architecture for bivariate-bicycle qLDPC codes in PRX Quantum'
pillar: quantum
date: '2025-01-09'
plain: 'High-rate qLDPC codes — the leading candidate to replace surface codes for fault-tolerant computing — have required non-local connections between qubits, which most hardware cannot provide. A team from NIST and the University of Maryland, led by Daniel Gottesman and Alexey Gorshkov, now shows how to implement bivariate-bicycle codes on a two-layer architecture using only 2D local gates, with competitive error thresholds and low overhead. This is a theoretical result, not a hardware demonstration, but it resolves a long-standing practical obstacle and directly complements the first experimental demonstrations of bivariate-bicycle codes that appeared at the same time.'
significance: notable
source:
  url: https://journals.aps.org/prxquantum/abstract/10.1103/PRXQuantum.6.010306
  kind: paper
  title: 'Toward a 2D Local Implementation of Quantum Low-Density Parity-Check Codes'
  publisher: PRX Quantum
  date: '2025-01-09'
  doi: 10.1103/PRXQuantum.6.010306
corroboration:
  - url: https://www.nist.gov/publications/toward-2d-local-implementation-quantum-ldpc-codes
    publisher: NIST
    kind: authority
validation:
  status: verified
  checks:
    - 'PRX Quantum abstract opened directly; paper published January 9, 2025 confirmed'
    - 'NIST publication record corroborates the same DOI and date'
    - 'Authors are NIST/University of Maryland Joint Center for Quantum Information (QuICS); Gottesman is the originator of stabilizer codes — institutional credibility is high for a theoretical result'
    - 'This is a theoretical architecture, not an experiment; no independent experimental replication of this specific result found, but the codes themselves were experimentally demonstrated by Zhejiang University in the same month'
about:
  - qec-qldpc-bivariate-bicycle
  - qec-modular-architecture
  - enable-compilers
establishedBy:
  - url: https://arxiv.org/abs/2404.17676
    title: 'Toward a 2D Local Implementation of Quantum Low-Density Parity-Check Codes'
    relation: reports
    date: '2024-04'
actors:
  - NIST
  - University of Maryland
  - Los Alamos National Laboratory
country:
  - US
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-11'
status: published
added: '2026-08-11'
---

Bivariate-bicycle (BB) qLDPC codes encode more logical qubits per physical qubit than surface codes and have lower error-correction overhead, but their parity-check structure requires each qubit to interact with others that are not its immediate neighbours on a 2D grid — a hard constraint for most hardware platforms.

Berthusen et al. address this with a bilayer architecture: two offset copies of the 2D qubit array, where long-range interactions within each layer are replaced by short-range interactions between layers. Generators are measured at different frequencies to further reduce overhead. The result is that bivariate-bicycle codes become implementable on 2D-local hardware without sacrificing the threshold performance that makes them attractive.

The timing matters. Zhejiang University published the first experimental run of bivariate-bicycle codes on a superconducting processor in January 2025 (now in this archive). That paper demonstrated the codes work; this paper shows how to make them work on constrained hardware. The two results together constitute a coherent step toward qLDPC codes entering the hardware roadmap.

No hardware has yet implemented this bilayer architecture. The result remains theoretical; the gap between this design and a physical device is substantial.
