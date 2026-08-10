---
schema: news/v1
id: 2026-04-21-ionq-walking-cat-ftqc-blueprint
headline: 'IonQ publishes a complete end-to-end fault-tolerant trapped-ion architecture using LDPC codes'
pillar: quantum
date: '2026-04-21'
plain: 'A fault-tolerant quantum computer requires not just good qubits but a complete engineering specification: compiler, error-correction protocol, hardware micro-architecture, and a decoder fast enough to run in real time. IonQ has published all of that in a single 110-page preprint. The design uses low-density parity-check codes — the same code family driving recent reductions in qubit-overhead estimates — and exploits the ability to physically transport ions across the chip to implement non-local operations that fixed-wired architectures cannot. The paper is a blueprint, not a built machine: it specifies what to build and estimates the resources required for specific computations. The hardware capabilities it requires — better than 99.99% two-qubit gate fidelity and reliable ion transport — have been demonstrated on IonQ hardware; the full integrated system has not.'
significance: notable
source:
  url: https://arxiv.org/abs/2604.19481
  kind: preprint
  title: 'Fault-Tolerant Quantum Computing with Trapped Ions: The Walking Cat Architecture'
  publisher: arXiv
  date: '2026-04-21'
  doi: 10.48550/arXiv.2604.19481
corroboration:
  - url: https://quantumcomputingreport.com/ionq-details-walking-cat-blueprint-for-fault-tolerant-trapped-ion-systems/
    publisher: 'Quantum Computing Report'
    kind: journalism
  - url: https://postquantum.com/quantum-research/ionq-walking-cat-trapped-ion-ftqc/
    publisher: postquantum.com
    kind: journalism
validation:
  status: single-source
  checks:
    - 'arXiv abstract opened directly (arXiv:2604.19481, submitted April 21 2026): blueprint confirmed as LDPC-based, 18 IonQ-affiliated authors, no external institution co-authors'
    - 'IonQ announcement on April 22 2026 confirms this is a vendor preprint'
    - 'Quantum Computing Report and postquantum.com provide independent technical summaries confirming key figures: dense instance uses a [[102,22,9]] code; 10,000 physical qubits estimated for a 100-site Heisenberg model simulation taking approximately one month'
    - 'Classified single-source: all authors are IonQ employees, paper is not peer-reviewed, and the independent summaries are technical analyses rather than experimental replications'
    - 'No contradicting technical claim found'
  note: 'The walking cat architecture is notable for its completeness and specificity. The hardware capabilities it requires have been independently measured on IonQ devices. The integrated system has not been assembled.'
about:
  - arch-trapped-ion
  - qec-modular-architecture
  - qec-qldpc-bivariate-bicycle
  - enable-compilers
establishedBy:
  - url: https://arxiv.org/abs/2604.19481
    title: 'Fault-Tolerant Quantum Computing with Trapped Ions: The Walking Cat Architecture'
    relation: reports
    date: '2026-04-21'
actors: [IonQ]
country: [US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The architecture uses ion transport across a QCCD chip to implement non-local LDPC codes — specifically generalised bicycle and cyclic hypergraph product codes. A cat factory distributes multi-qubit entangled states throughout the machine to perform logical operations.

Key instances described: a simple single-code architecture; a fast architecture using a [[70,6,9]] code; and a dense architecture using a [[102,22,9]] code encoding 22 logical qubits per memory block. For a 100-site Heisenberg model simulation, the dense instance requires an estimated 10,000 physical qubits and approximately one month of execution time.

This paper arrived in a period of active FTQC architecture publication. Within months, Oratomic/Caltech published a neutral-atom LDPC blueprint (March 31), this trapped-ion LDPC blueprint appeared (April 21), and the Pinnacle architecture from Iceberg Quantum (February 2026) proposed a superconducting LDPC approach. The convergence on LDPC codes across modalities is a notable pattern independent of any single vendor.
