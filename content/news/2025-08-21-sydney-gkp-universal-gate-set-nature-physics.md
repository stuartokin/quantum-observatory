---
schema: news/v1
id: 2025-08-21-sydney-gkp-universal-gate-set-nature-physics
headline: University of Sydney demonstrates first universal logical gate set for GKP bosonic qubits in a trapped ion
pillar: quantum
date: '2025-08-21'
plain: 'Gottesman–Kitaev–Preskill (GKP) codes store a logical qubit in the vibrational modes of a single ion rather than across many physical qubits. The Sydney team encoded two logical GKP qubits in a single ytterbium atom, then performed universal single-qubit gates and the first two-qubit entangling gate between them — the complete set needed to run any quantum algorithm. Fewer physical qubits per logical qubit is the central scaling problem; this result shows the bosonic route can support the operations a fault-tolerant computer requires.'
significance: notable
source:
  url: https://www.nature.com/articles/s41567-025-03002-8
  kind: paper
  title: 'Universal quantum gate set for Gottesman-Kitaev-Preskill logical qubits'
  publisher: Nature Physics
  date: '2025-08-21'
  doi: 10.1038/s41567-025-03002-8
corroboration:
  - url: https://quantumcomputingreport.com/university-of-sydney-researchers-demonstrate-gkp-logical-gate-set-on-a-single-trapped-ion/
    publisher: Quantum Computing Report
    kind: journalism
  - url: https://thequantuminsider.com/2025/08/21/university-of-sydney-team-demonstrates-compact-quantum-logic-gate-using-gkp-codes/
    publisher: The Quantum Insider
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature Physics paper opened; DOI 10.1038/s41567-025-03002-8 confirmed; Vol 21 pp. 1664-1669 (2025)'
    - 'Quantum Computing Report and The Quantum Insider both report independently confirming the first two-qubit GKP entangling gate'
    - 'ResearchGate PDF confirms the universal gate set claim and CZ logical gate are the central experimental results'
    - 'No contradicting report found; prior GKP work had single-qubit gates only'
about:
  - arch-trapped-ion
  - arch-cat-qubits
  - qec-logical-fidelity
establishedBy:
  - url: https://arxiv.org/abs/2507.15729
    title: 'Universal quantum gate set for Gottesman-Kitaev-Preskill logical qubits'
    relation: reports
    date: '2025-07'
actors: ['University of Sydney', 'Q-CTRL']
country: ['AU']
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The result advances bosonic error correction beyond single-qubit demonstrations. The team used laser-driven spin-dependent force interactions between the ion's spin and its two motional modes to implement a controlled-Z logical gate between two GKP qubits — neither qubit crosses to a separate physical ion. This hardware efficiency matters because scaling a fault-tolerant machine requires many logical qubits; if each occupies only one physical ion instead of dozens, the required hardware shrinks accordingly.

Funding came from the Australian Research Council, US Office of Naval Research, US Army Research Office, US Air Force Office of Scientific Research, and Lockheed Martin. Q-CTRL software was used for control.

The paper identifies charge noise and thermal excitation as dominant error sources, and readout error accounts for roughly a fifth of the total logical error. Both are improvable with existing techniques, so this is an early rather than final demonstration.
