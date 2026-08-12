---
schema: frontier/v1
id: app-quantum-chemistry-catalyst
title: 'Quantum simulation of catalysts for nitrogen fixation and carbon capture'
summary: 'Fault-tolerant quantum computers are the most credible near-term application target in quantum chemistry: simulating the electronic structure of strongly correlated catalysts such as the FeMo-cofactor (nitrogen fixation) and cytochrome P450 (drug metabolism) that are beyond reliable classical reach at full accuracy. Resource estimates place this application in the range of 100–200 logical qubits and billions of Toffoli gates — requiring a fault-tolerant machine beyond any demonstrated today, but within Horizon 2.'
plain: 'Quantum computers are natural simulators of quantum systems — including the electrons in molecules. Several chemical reactions of enormous industrial and biological importance depend on catalysts whose electronic structure is so complex that classical computers cannot simulate them accurately. The most studied example is the FeMo-cofactor of nitrogenase, an enzyme that converts nitrogen gas into ammonia (fertiliser) at room temperature and ambient pressure. Industrial nitrogen fixation (the Haber-Bosch process) uses roughly 1–2% of global energy, and is one of the most emissions-intensive industrial processes on Earth. Understanding the FeMoco catalytic mechanism precisely enough to design synthetic mimics could enable ambient-temperature nitrogen fixation. Similar arguments apply to cytochrome P450 enzymes (critical to drug metabolism), ruthenium-based carbon-capture catalysts, and battery electrolyte molecules. Fault-tolerant quantum computers could simulate these systems using quantum phase estimation, a method that extracts exact ground-state energies without the approximations that limit classical methods. Resource estimates place the computation in the range of 100–200 logical qubits. Note: in January 2026, the standard FeMoco model was solved classically by Zhai et al. (arXiv:2601.04621), which shifts the quantum target to larger, more realistic chemical representations — but does not eliminate the application.'
pillar: quantum
constellation: applications
cluster: chemistry
readiness: emerging
horizon: 2
priority: P1
actors:
  - 'Multiple academic and industrial groups'
country:
  - US
  - Germany
  - UK
metrics:
  - name: 'Estimated logical qubits (FeMoco)'
    value: '100-200'
    unit: 'logical qubits'
    note: 'For ground-state energy of the standard active-space model; estimates vary across algorithm variants'
  - name: 'Estimated Toffoli gates (FeMoco)'
    value: '~10^9 to 10^10'
    unit: 'Toffoli gates'
    note: 'State-of-the-art algorithm resource estimates after overhead reductions in 2024-2025'
novelty: 'First applications-constellation item; anchors chemistry application case with resource estimates'
links:
  - to: algo-quantum-simulation
    relation: depends-on
  - to: algo-resource-estimation
    relation: depends-on
  - to: qec-magic-state-distillation
    relation: depends-on
  - to: algo-classical-femoco
    relation: evidence-for
evidence:
  claim: 'Multiple peer-reviewed papers establish resource estimates for fault-tolerant quantum simulation of industrially relevant catalysts. For the FeMoco nitrogen-fixation cofactor: approximately 100–200 logical qubits and 10^9–10^10 Toffoli gates using state-of-the-art algorithms (DFTHC representation with spectrum amplification). For cytochrome P450: similar resource range. For Li-ion battery electrolyte molecules: resource estimates published by Xanadu and collaborators (Delgado et al. Phys. Rev. A 106, 032428, 2022) using fault-tolerant quantum phase estimation. The classical solution of the standard FeMoco model (Zhai et al. 2026, arXiv:2601.04621) shifts the quantum target to larger, more realistic representations but does not eliminate the application case. Readiness placed at emerging because no demonstrated quantum computation of a chemically useful result exists; the application relies on hardware not yet built.'
  verified: '2026-08-12'
  level: E3
  sources:
    - url: 'https://journals.aps.org/pra/abstract/10.1103/PhysRevA.106.032428'
      role: primary
      title: 'Simulating key properties of lithium-ion batteries with a fault-tolerant quantum computer'
      publisher: 'Physical Review A'
      date: '2022-09-21'
      identifier: 'Phys. Rev. A 106, 032428 (2022)'
      doi: '10.1103/PhysRevA.106.032428'
      accessed: '2026-08-12'
      note: 'Delgado, Casares, dos Reis et al.; Xanadu and collaborators. Peer-reviewed in Physical Review A, September 2022. Preprint version at arXiv:2204.11890. End-to-end quantum algorithm for battery electrolyte simulation with resource estimates. FLAGGED: this source is peer-reviewed (E4 individually); the overall item evidence level is E3 because the application claim spans multiple unpeer-reviewed estimates. A person should confirm whether to raise the item level to E4 — see review note.'
    - url: 'https://arxiv.org/abs/2601.04621'
      role: corroborating
      title: 'Classical solution of the FeMo-cofactor model to chemical accuracy and its implications'
      publisher: arXiv
      date: '2026-01-08'
      identifier: 'arXiv:2601.04621'
      accessed: '2026-08-12'
      note: 'Shifts the quantum target: the standard model is now classically tractable; larger systems remain the application frontier.'
qdayImpact: 0
qdayReasoning: 'Chemistry simulation applications have no direct cryptanalytic relevance.'
confidence: medium
status: draft
origin: agent
added: '2026-08-12'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-12'
  reviewedOn: '2026-08-12'
  note: 'Source correction: primary source was cited as arXiv:2204.11890 (preprint). This paper was published as Phys. Rev. A 106, 032428 (September 2022) — peer-reviewed in a Physical Review A journal. Source URL, role, publisher, date, identifier, and doi corrected to the published version; claim text updated accordingly. Evidence level remains E3 pending human decision: the PRA paper individually would be E4, but the item''s claim spans application-level resource estimates across multiple sources, some of which are not individually peer-reviewed. This is an upward level change that requires human confirmation. Escalated in needsHuman.'
---

## What this is

This is the first item in the applications constellation. The applications constellation exists to answer "how close is quantum computing to doing something genuinely useful" — a question the board currently cannot answer because the constellation is empty.

Quantum chemistry is the application area with the most concrete resource estimates and the clearest argument for why a quantum computer would help: strongly correlated molecular systems are exponentially expensive to simulate classically at full accuracy, and quantum computers represent their states directly.

## The application case

**Nitrogen fixation**: The Haber-Bosch process fixes nitrogen using iron catalysts at high temperature and pressure, consuming 1–2% of global energy. The nitrogenase enzyme does the same reaction at room temperature and pressure, using the FeMo-cofactor. Designing a synthetic FeMoco mimic — or understanding how to improve the biological process — requires precise knowledge of the electronic structure of FeMoco. Fault-tolerant quantum computation of the ground-state energy and reaction mechanism of realistic FeMoco models could provide this.

**Drug metabolism**: Cytochrome P450 enzymes process most drugs in the human liver. Their reactivity is governed by a strongly correlated iron centre that classical methods approximate poorly. Accurate simulation would improve drug design and toxicity prediction.

**Battery materials**: Li-ion battery electrolyte molecules have been studied using fault-tolerant resource estimates by Delgado et al. (Phys. Rev. A 106, 032428, 2022). The estimates are favourable relative to nitrogen fixation, but the classical approximations are less problematic for these systems.

## The state of the art in early 2026

The standard FeMoco benchmark (76 orbitals, 113 electrons) was solved classically by Zhai et al. in January 2026. This is important context: the quantum advantage claim must now be made for larger or more realistic models. Quantum algorithm papers from 2025 (Faster quantum chemistry simulations, arXiv:2501.06165) have reduced resource estimates by factors of 200–400 relative to 2017 estimates, making the hardware target more achievable — but no fault-tolerant quantum computer capable of any of these simulations exists.

## Why placed at emerging

No quantum computation of a chemically useful result exists. The application depends on hardware (100–200 logical qubits running billions of Toffoli gates fault-tolerantly) that is far beyond the current state of demonstrated systems. Readiness will move when a quantum computer simulates a molecule of genuine chemical interest beyond what classical computers can verify.

## What would change this assessment

A fault-tolerant quantum computation of any chemical property for a molecule of industrial relevance, verified against experiment rather than against a classical approximation.
