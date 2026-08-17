---
schema: frontier/v1
id: enable-nqac-hamiltonian-compiler-drug-design
title: 'NQAC: Hamiltonian simulation compiler for drug design and materials discovery'
summary: 'Northwestern (Hardavellas, dos Reis), IBM and AbbVie awarded NQAC Grand Challenges funding to build a Hamiltonian simulation compiler lowering the barrier for domain scientists to run quantum molecular simulations.'
plain: 'Writing quantum programmes for molecular simulation requires deep expertise in quantum computing. This project aims to build a compiler layer that lets chemists and drug-design researchers describe a molecule mathematically and have the software translate that into quantum circuits automatically, without needing to understand quantum hardware. The project is at the funded-research stage: no technical output has been published yet.'
pillar: quantum
readiness: emerging
constellation: enabling
cluster: compilers
actors:
  - 'Nikos Hardavellas, Northwestern University'
  - 'Roberto dos Reis, Northwestern University'
  - IBM
  - AbbVie
country:
  - US
horizon: 2
priority: P2
novelty: 'Domain-scientist-facing Hamiltonian compiler bridging quantum software and pharma/materials end-users'
qdayImpact: 0
evidence:
  level: E2
  claim: 'Northwestern Engineering professors Hardavellas and dos Reis, in collaboration with IBM and AbbVie, received a 2026 NQAC Grand Challenges award to develop a Hamiltonian simulation compiler for drug design and materials discovery. The project aims to allow scientists outside quantum computing to input molecular Hamiltonians and receive executable quantum circuits. Award announced 24 April 2026; no preprint or technical document has been published as of August 2026.'
  verified: '2026-08-17'
  sources:
    - url: 'https://www.mccormick.northwestern.edu/news/articles/2026/04/hardavellas-and-dos-reis-named-awardees-of-nqac-quantum-grand-challenges-program/'
      role: vendor
      title: 'Hardavellas and dos Reis Named Awardees of NQAC Quantum Grand Challenges Program'
      publisher: 'Northwestern McCormick School of Engineering'
      date: '2026-04-28'
      accessed: '2026-08-17'
      note: 'Institutional news announcement. Describes the award and project goals but contains no technical claims or metrics. E2: institutional announcement of a funded project.'
    - url: 'https://iqmp.org/news/national-quantum-algorithm-center-at-the-iqmp-announces-grand-challenges-awards/'
      role: corroborating
      title: 'National Quantum Algorithm Center at the IQMP Announces Grand Challenges Awards'
      publisher: 'Illinois Quantum and Microelectronics Park (IQMP)'
      date: '2026-04-24'
      accessed: '2026-08-17'
      note: 'Awarding body announcement confirming the five 2026 Grand Challenges awards including the Northwestern Hamiltonian compiler project.'
    - url: 'https://quantum.northwestern.edu/news-and-stories/2026/hardavellas-earns-nqac-grand-challenges-award-for-quantum-software-project.html'
      role: corroborating
      title: 'Hardavellas, dos Reis earn NQAC Grand Challenges Award for quantum software project'
      publisher: 'Northwestern Institute for Quantum Information Research and Engineering (INQUIRE)'
      date: '2026-05-01'
      accessed: '2026-08-17'
      note: 'Northwestern institute news page. Adds context on the compiler design goal: researchers describe a system as a Hamiltonian and the compiler infrastructure handles quantum circuit generation.'
links:
  - to: enable-compilers
    relation: competes-with
  - to: app-nqac-chemistry-benchmarking
    relation: enables
  - to: app-hybrid-protein-simulation
    relation: enables
  - to: app-quantum-chemistry-catalyst
    relation: enables
confidence: low
status: draft
origin: agent
added: '2026-08-17'
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-17'
  note: 'Focus run. No preprint found on arXiv or DBLP as of 17 Aug 2026. Rated E2 per board decisions: institutional award announcement is not a technical document. Confidence low: this is a funded project with no results yet. Flag for Q4 2026 sweep once postdoc output is expected.'
---

## What happened

On 24 April 2026, the National Quantum Algorithm Center (NQAC) at the Illinois Quantum and Microelectronics Park announced five Grand Challenges awards. One went to Northwestern Engineering professors Nikos Hardavellas (computer science, compiler architecture) and Roberto dos Reis (materials science), collaborating with IBM and AbbVie, to build a Hamiltonian simulation compiler for drug design and materials discovery.

The stated goal is a compiler layer that accepts a molecular Hamiltonian — the standard mathematical description of a quantum system — as input and generates executable quantum circuits, without requiring the end user to understand quantum hardware or circuit design. The target users are pharmaceutical and materials scientists, not quantum computing specialists.

## Why it matters

A usable Hamiltonian-to-circuit compiler would lower one of the practical barriers separating quantum algorithms from domain application. Most quantum chemistry workflows today require manual circuit construction or expert adaptation of existing packages. An automated, hardware-aware compiler for this class of problem would make the applications constellation more legible: the question shifts from "can a quantum computer run this in principle" to "can a scientist who is not a quantum expert run it in practice".

Hardavellas brings prior compiler work on chiplet-based quantum architectures (arXiv:2501.08478, 2025); dos Reis brings materials and nanoscale characterisation expertise. IBM provides hardware access and software stack; AbbVie provides the pharmaceutical end-user perspective and target molecules.

## Previous state of the art

Existing Hamiltonian simulation compilers (e.g. 2QAN, Kernpiler, Trotterization-based tools) are research artefacts requiring quantum expertise to operate. General-purpose compilation stacks (Qiskit, Pytket) provide primitives but not end-to-end domain-scientist-facing pipelines for molecular simulation.

## Limitations

No technical output exists. This item rests entirely on award announcements and project descriptions, all E2. The claim is about what the project intends to build, not what it has built. Readiness is `emerging` and confidence is `low` until a preprint appears.

## What would change the assessment

A preprint on arXiv describing the compiler architecture, with circuit reduction metrics or fidelity benchmarks on target molecules, would raise this to E3 and readiness remains `emerging` until an independent group uses the tool. A published benchmark against existing workflows would be the signal that this is producing real results.
