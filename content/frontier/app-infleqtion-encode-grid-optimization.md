---
schema: frontier/v1
id: app-infleqtion-encode-grid-optimization
title: 'ENCODE: quantum algorithms for energy grid optimisation on neutral-atom hardware'
summary: 'ARPA-E-funded programme developing quantum algorithms co-designed with neutral-atom hardware to outperform classical solvers for electricity grid unit-commitment problems. Partners include Argonne National Laboratory, EPRI and ComEd. Contract executed February 2026.'
plain: 'Running an electricity grid requires solving very large scheduling problems every few minutes: which generators to switch on, how much power to route where. Classical software (Gurobi, CPLEX) handles this today but is approaching its limits as grids grow more complex. This programme is testing whether quantum computers running on neutral-atom hardware can solve the same problems faster or more accurately. No quantum advantage has been demonstrated yet — the programme is in its development phase.'
pillar: quantum
readiness: emerging
constellation: applications
cluster: energy-optimisation
actors:
  - Infleqtion
  - Argonne National Laboratory
  - EPRI
  - ComEd
  - National Laboratory of the Rockies
country:
  - US
metrics:
  - name: Award value
    value: '6165189'
    unit: USD
    note: 'ARPA-E Vision OPEN 2024; contract executed February 2026'
  - name: Qubit array demonstrated
    value: '1600'
    unit: physical qubits
    note: 'Vendor claim; not the ENCODE experimental result'
priority: P2
qdayImpact: 0
horizon: 2
novelty: 'First DOE ARPA-E quantum award for energy grid optimisation'
links:
  - to: arch-neutral-atom
    relation: depends-on
  - to: quantum-sensing-grid
    relation: competes-with
evidence:
  claim: 'ARPA-E Vision OPEN 2024 project descriptions list Infleqtion (ColdQuanta Inc. DBA Infleqtion) as an awardee for Enhancing Neutral-atom Computers for Optimizing Delivery of Energy at $6,165,189. The stated goal is to deliver higher quality unit commitment solutions than achievable through classical methods, at scale and runtime consistent with energy-sector workflows. Contract execution was announced by Infleqtion on 9 February 2026. Partners are Argonne National Laboratory, National Laboratory of the Rockies, EPRI and ComEd. No experimental result or primary paper exists as of 2026-08-18. Evidence is capped at E2: the ARPA-E document is a funded-project listing describing intended work, not a demonstrated result.'
  level: E2
  verified: '2026-08-17'
  sources:
    - url: https://arpa-e.energy.gov/sites/default/files/2025-01/ARPA-E%20Vision%20OPEN_Project%20Descriptions_FINAL.pdf
      role: primary
      title: 'ARPA-E Vision OPEN 2024 Project Descriptions'
      publisher: 'U.S. Department of Energy Advanced Research Projects Agency-Energy'
      date: '2025-01'
      note: 'Official government document listing funded projects. Lists Infleqtion ENCODE at $6,165,189 with stated goal of superior unit-commitment solutions vs classical methods. Programme description, not an experimental result.'
      accessed: '2026-08-17'
    - url: https://infleqtion.com/infleqtion-advances-arpa-e-quantum-computing-grid-optimization-program/
      role: vendor
      title: 'Infleqtion Advances ARPA-E Quantum Computing Grid Optimization Program'
      publisher: Infleqtion
      date: '2026-02-09'
      note: 'Vendor press release announcing contract execution, February 2026. Names partners and describes technical approach. E2.'
      accessed: '2026-08-17'
confidence: low
status: draft
origin: agent
added: '2026-08-17'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-17'
  reviewedOn: '2026-08-18'
  note: 'ARPA-E Vision OPEN 2024 PDF confirmed via search: $6,165,189 for Infleqtion ENCODE confirmed. Contract execution February 2026 and first-ARPA-E-quantum-award claim confirmed from multiple press sources and ARPA-E PDF. Partners Argonne, NLR, EPRI, ComEd confirmed. E2 correct: programme description, no technical results. No changes.'
---

## What happened

In March 2025 ARPA-E awarded Infleqtion $6.17 million under its Vision OPEN 2024 programme — the first quantum technology award ARPA-E has made and the largest single OPEN grant that cycle. The contract was formally executed in February 2026, starting the development phase. The programme is called ENCODE (Enhancing Neutral-atom Computers for Optimizing Delivery of Energy).

The technical target is the electricity grid's **unit commitment problem**: deciding, typically hours ahead, which generators to commit, at what output, to meet forecast demand at minimum cost while respecting grid constraints. Classical solvers (Gurobi, CPLEX) handle this today but face growing complexity as grids incorporate more variable renewables and AI-driven load. The programme aims to show that quantum algorithms, co-designed with Infleqtion's neutral-atom hardware and Superstaq optimisation layer, can produce better solutions at operationally useful runtimes.

## Why it matters

The applications constellation is currently empty. This is a named, funded, multi-institution programme with a defined and measurable technical goal — outperforming a classical solver benchmark — rather than a vague aspiration. Argonne National Laboratory and EPRI are credible validation partners. If the programme produces a result, it will be traceable.

The question the board should track: does quantum optimisation produce materially better unit-commitment solutions than Gurobi or CPLEX at grid-relevant problem sizes, within grid-relevant runtimes?

## Previous state of the art

Quantum optimisation for power systems exists in the academic literature (QAOA applied to OPF variants) but at toy scale. No demonstration at operationally relevant grid size exists. Classical solvers are effective and well-integrated into grid operations.

## Limitations

No paper, preprint or experimental result exists. This is a funded programme in its development phase. The evidence ceiling is E2 and confidence is low. The 1,600-qubit array cited in Infleqtion's press materials is a physical qubit count on their hardware platform, not an ENCODE result. The programme's claim that quantum can outperform classical solvers at grid scale is the hypothesis under test, not a finding.

## What would change this assessment

A preprint reporting unit-commitment benchmark results on quantum hardware, with classical comparison at matched problem scale, would move this to E3 and potentially raise readiness to experimental. Demonstrated parity with Gurobi at any operationally relevant instance size would be significant. An independent replication would be E5 territory and would constitute a genuine application demonstration.
