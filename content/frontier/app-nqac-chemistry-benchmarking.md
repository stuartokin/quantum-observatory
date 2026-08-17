---
schema: frontier/v1
id: app-nqac-chemistry-benchmarking
title: 'NQAC: open benchmarking suite for quantum chemistry on industrial molecules'
summary: 'NQAC Grand Challenges project building an open, reproducible benchmark suite comparing quantum chemistry algorithms on industrially relevant molecules specified by BP, pairing Clark group (UIUC) with qBraid.'
plain: 'Many quantum computing algorithms for simulating molecules have been published, but there is no agreed standard for comparing them on molecules that actually matter to industry. This project, funded through the US National Quantum Algorithm Center, pairs Prof. Bryan Clark (University of Illinois) with quantum cloud platform qBraid and energy company BP. BP specifies the target molecules — hydrocarbons and CO2 central to fuels chemistry — and the team will build an open-source, automatically executable benchmark suite that compares algorithms honestly on those targets. The outcome would be a shared, reproducible yardstick allowing hardware developers and industrial users to measure real progress in quantum chemistry. No technical output exists yet — this is an active postdoc position announced April 2026.'
pillar: quantum
readiness: emerging
constellation: applications
cluster: chemistry
actors:
  - 'Clark Group, University of Illinois Urbana-Champaign'
  - qBraid
  - BP
  - 'National Quantum Algorithm Center (NQAC), IQMP'
priority: P2
qdayImpact: 0
confidence: low
novelty: 'Industry-specified open benchmarking program for quantum chemistry; no results yet'
country:
  - US
evidence:
  level: E2
  claim: 'NQAC Grand Challenges announcement states that Clark (UIUC), qBraid, and BP will develop an open reproducible benchmark suite for quantum chemistry algorithms on industrially relevant molecules including hydrocarbons and CO2 for the fuels sector. DPI announcement (May 2026) confirms BP specifies target molecules and the output is automatically executable open-source benchmarks. No preprint or technical output published as of August 2026.'
  verified: '2026-08-17'
  sources:
    - url: 'https://iqmp.org/news/national-quantum-algorithm-center-at-the-iqmp-announces-grand-challenges-awards/'
      role: vendor
      title: National Quantum Algorithm Center at the IQMP Announces Grand Challenges Awards
      publisher: 'Illinois Quantum and Microelectronics Park (IQMP)'
      date: '2026-04-24'
      accessed: '2026-08-17'
      note: 'Full project title: Benchmarking Quantum Computing Algorithms for Quantum Chemistry on Industrially Relevant Molecules. E2 ceiling: institutional funding announcement, not a research result.'
    - url: 'https://dpi.illinois.edu/news/bryan-clark-grand-challenge-awards-2026'
      role: corroborating
      title: Bryan Clark receives DPI first-ever grant for quantum research
      publisher: 'Discovery Partners Institute, University of Illinois'
      date: '2026-05-07'
      accessed: '2026-08-17'
      note: 'Confirms scope: open reproducible benchmarks executable automatically, comparing core algorithmic pieces for quantum chemistry. BP supplies molecules including hydrocarbons and CO2.'
links:
  - to: app-nqac-nuclear-reactor-optimization
    relation: evidence-for
  - to: algo-classical-femoco
    relation: competes-with
  - to: algo-classical-fe4s4-advantage
    relation: competes-with
  - to: app-quantum-chemistry-catalyst
    relation: enables
status: draft
origin: agent
added: '2026-08-17'
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-17'
---

## What happened

The National Quantum Algorithm Center awarded one of its five 2026 Grand Challenges grants to Prof. Bryan Clark (UIUC) in collaboration with quantum cloud platform qBraid and energy company BP. Clark's group develops quantum simulation algorithms, and the project will build an open-source, automatically executable benchmark suite comparing quantum chemistry algorithms on molecules selected by BP: hydrocarbons and CO₂ central to fuels chemistry.

## Why it matters

The board already tracks classical algorithms narrowing quantum chemistry advantage (algo-classical-femoco, algo-classical-fe4s4-advantage), but has no item addressing the infrastructure question: how would anyone know if a quantum algorithm had beaten classical methods on an industrially relevant molecule? Existing benchmarks use researcher-chosen systems; BP specifying the targets changes the comparison from academic to operational. An agreed, open benchmark suite would make quantum chemistry advantage claims falsifiable for the first time on industry-specified molecules.

## Previous state of the art

Benchmarking efforts have focused on researcher-chosen molecules (FeMoco, Fe4S4, chromium dimer) or relied on abstract complexity arguments. The DARPA Quantum Benchmarking (QB) program addresses similar questions at a US national level, but at a higher level of abstraction. This project is narrower and more immediately executable: a specific molecule set, a specific industrial end-user, open-source code.

## Limitations

No technical output exists. Announced April 2026 as a postdoc position. Evidence is E2 from two institutional announcements. Readiness is emerging and confidence is low. Building the benchmark framework may take 12–18 months before any algorithm comparison is run against it.

## What would change this assessment

A preprint describing the benchmark framework design, the molecule set, and initial algorithm comparisons would raise this to E3 and warrant a substantive readiness and confidence review. Publication of the open-source framework itself — even before results — would be meaningful evidence of progress.
