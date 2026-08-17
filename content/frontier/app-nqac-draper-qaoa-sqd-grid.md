---
schema: frontier/v1
id: app-nqac-draper-qaoa-sqd-grid
title: 'NQAC Grand Challenges: warm-start QAOA with SQD for energy grid decentralisation'
summary: 'UIUC-led postdoctoral project applying QAOA warm-started with IBM SQD to power-grid decentralisation and renewables integration, with IBM and EPRI as partners, funded by the NQAC Grand Challenges programme.'
plain: 'Power grids are becoming harder to manage as renewable energy sources and AI data centres place unpredictable demands on them. This project asks whether a quantum optimisation algorithm (QAOA), seeded with a good starting point from a classical IBM technique called Sample-based Quantum Diagonalization (SQD), can help utilities solve large scheduling and reliability problems faster than classical tools alone. It is early-stage academic research — a postdoctoral project — not a deployed system.'
pillar: quantum
readiness: emerging
constellation: applications
cluster: energy grid
actors:
  - 'University of Illinois Urbana-Champaign (Prof. Patrick Draper)'
  - IBM
  - EPRI
country:
  - US
metrics:
  - name: 'Funding award'
    value: '~125000'
    unit: USD
    note: 'NQAC Grand Challenges postdoctoral award; funder is P33 / DPI / Northwestern. Exact per-project amount not publicly confirmed but consistent with programme structure.'
priority: P3
qdayImpact: 0
links:
  - to: app-infleqtion-encode-grid-optimization
    relation: competes-with
  - to: app-nqac-nuclear-reactor-optimization
    relation: competes-with
  - to: arch-superconducting
    relation: depends-on
novelty: 'incremental; distinct from ENCODE in hardware, algorithm and problem scope'
horizon: 2
confidence: low
origin: agent
status: draft
added: '2026-08-17'
evidence:
  level: E2
  claim: 'The NQAC Grand Challenges programme announced an award to Prof. Patrick Draper (UIUC) in collaboration with IBM and EPRI to investigate warm-starting QAOA with SQD for power-grid decentralisation, renewables integration, and reliability constraints. The source is an IQMP institutional press release (April 2026); no preprint or technical paper has been located. Evidence ceiling is E2.'
  verified: '2026-08-17'
  sources:
    - url: 'https://iqmp.org/news/national-quantum-algorithm-center-at-the-iqmp-announces-grand-challenges-awards/'
      role: vendor
      title: 'National Quantum Algorithm Center at the IQMP Announces Grand Challenges Awards'
      publisher: IQMP
      date: '2026-04-24'
      accessed: '2026-08-17'
      note: 'Institutional press release announcing five Grand Challenges awards. Names Draper, IBM, EPRI and describes the warm-start QAOA with SQD approach for grid decentralisation. No technical paper attached. E2 ceiling applies.'
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-17'
---

**What happened.** The National Quantum Algorithm Center (NQAC) at the Illinois Quantum and Microelectronics Park announced five Grand Challenges awards in April 2026. One went to Prof. Patrick Draper at the University of Illinois Urbana-Champaign, working with IBM and EPRI, to investigate whether QAOA warm-started with IBM's Sample-based Quantum Diagonalization (SQD) technique can deliver practical advantage on power-grid problems — specifically decentralisation, renewables integration, and reliability constraints.

**Why it matters.** Grid optimisation is one of the clearest near-term application candidates for quantum computing: the problems are combinatorially hard, commercially important, and well-understood enough to benchmark. This project is distinct from the existing ENCODE item (app-infleqtion-encode-grid-optimization) in three ways: it uses IBM superconducting hardware rather than Infleqtion neutral-atom arrays; it applies QAOA with SQD warm-starting rather than hardware-codesigned algorithms via Superstaq; and it targets grid decentralisation and renewables scheduling rather than unit commitment and contingency analysis.

**Previous state of the art.** Classical solvers (Gurobi, CPLEX) handle unit commitment at operational timescales but struggle as grid topology becomes more distributed. Quantum approaches to grid optimisation have been proposed but not demonstrated at scale. The ENCODE project is the most advanced funded programme in this space.

**Limitations.** This is a postdoctoral research award, not a deployed system. No preprint has been published. The source is a programme announcement; technical claims cannot be independently assessed. Readiness is emerging and confidence is low until a paper appears.

**What would change this assessment.** A preprint on arXiv showing circuit-level results or resource estimates for SQD-warmed QAOA on realistic grid instances would support a move to E3. Demonstrated advantage over a classical solver on a benchmark instance would support experimental.
