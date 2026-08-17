---
schema: frontier/v1
id: app-infleqtion-argonne-nuclear-circuit-ai
title: 'AI-optimised quantum circuit design for nuclear physics: Argonne–Infleqtion'
summary: 'DOE Genesis Mission Phase I project: an AI agent using reinforcement learning to automate quantum circuit synthesis for nuclear structure and scattering problems, using Infleqtion Superstaq. Framework development only; no experimental output yet.'
plain: 'Designing a quantum circuit to simulate a nuclear physics problem requires choosing how to encode the problem, which algorithm to use, and how to map it to hardware — decisions that currently require expert effort and often produce suboptimal circuits. This project funds Argonne National Laboratory and Infleqtion to build an AI agent that automates those choices using reinforcement learning, targeting nuclear structure and scattering problems. The agent will be tested against performance metrics such as gate count and circuit depth. It is Phase I work: the AI framework is being built and demonstrated, not yet applied to produce physics results.'
pillar: quantum
readiness: emerging
constellation: applications
cluster: nuclear-physics
actors:
  - Argonne National Laboratory
  - Infleqtion
  - Northwestern University
  - Dakota State University
metrics:
  - name: phase
    value: 'Phase I'
    note: 'Framework development and demonstration; no results published'
  - name: target problems
    value: 'nuclear structure and scattering'
    note: 'Per Argonne project page'
links:
  - to: app-nqac-nuclear-reactor-optimization
    relation: competes-with
  - to: algo-trapped-ion-gate-compilation
    relation: competes-with
  - to: enable-compilers
    relation: depends-on
  - to: app-infleqtion-encode-grid-optimization
    relation: evidence-for
country:
  - US
origin: agent
added: '2026-08-17'
priority: P2
qdayImpact: 0
qdayReasoning: 'Circuit compilation automation for nuclear physics does not affect the resources needed to break RSA-2048 or deployed elliptic-curve cryptography.'
novelty: 'national-lab industry collaboration on AI-driven circuit synthesis for physics'
horizon: 2
confidence: low
evidence:
  level: E2
  verified: '2026-08-17'
  claim: 'Argonne National Laboratory and Infleqtion were awarded a DOE Genesis Mission Phase I project to develop an AI agent using reinforcement learning to automate quantum circuit design for nuclear structure and scattering problems. Lead PI is Dr. Anna McCoy (Argonne); partners include Infleqtion, Northwestern University, and Dakota State University (Dr. Peng Guo). The agent will explore encoding schemes, algorithmic strategies, and hardware configurations, evaluating circuits against gate count, circuit depth, and expected accuracy. Infleqtion contributes its Superstaq compilation platform. No experimental output or preprint exists as of 2026-08-17; this describes the planned Phase I framework. The Argonne project page (anl.gov) is the primary technical description available.'
  sources:
    - url: 'https://www.anl.gov/genesis-mission/projects/ai-enabled-optimization-of-quantum-circuit-design-for-realistic-nuclear-problems'
      role: vendor
      title: 'AI-Enabled Optimization of Quantum Circuit Design for Realistic Nuclear Problems'
      publisher: Argonne National Laboratory
      date: '2026-07-22'
      accessed: '2026-08-17'
      note: 'National laboratory project page describing the Phase I scope, methodology and goals. Programme description, not an experimental result. Treated as E2: authoritative programme statement, no measured output. Lead PI Dr. Anna McCoy named; partners Infleqtion, Northwestern University, Dakota State University confirmed.'
    - url: 'https://ir.infleqtion.com/news-events/press-releases/detail/196/infleqtion-secures-three-genesis-mission-projects-from-u-s-department-of-energy'
      role: vendor
      title: 'Infleqtion Secures Three Genesis Mission Projects from U.S. Department of Energy'
      publisher: Infleqtion investor relations
      date: '2026-07-22'
      accessed: '2026-08-17'
      note: 'Vendor press release. E2 by rule. Corroborates Argonne project page on scope and partnership.'
status: draft
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-17'
  note: 'Focus run 2026-08-17: searched arXiv quant-ph and nucl-th August 2026 listings and targeted author/project searches; no preprint found. Project announced July 22, 2026; Phase I framework work. Additional partners confirmed: Northwestern University and Dakota State University (Dr. Peng Guo joined ~August 13, 2026). Lead PI confirmed as Dr. Anna McCoy. Actors field updated. Verified date advanced. E2 and readiness emerging unchanged.'
---

## What happened

On 22 July 2026, Infleqtion announced three DOE Genesis Mission Phase I awards. One is a collaboration with Argonne National Laboratory to build an AI agent that automates quantum circuit design for nuclear physics. The Argonne project page describes the technical scope: the agent will use reinforcement learning to navigate the space of encoding schemes, algorithmic strategies, and hardware configurations, evaluating outputs against gate count, circuit depth, and accuracy. Infleqtion contributes its Superstaq compilation platform. Phase I focuses on nuclear structure and scattering problems. Lead PI is Dr. Anna McCoy (Argonne); confirmed partners include Infleqtion, Northwestern University, and Dakota State University.

## Why it matters

Quantum circuit design for first-principles nuclear simulation is currently a specialist bottleneck: choosing encoding, algorithm, and hardware mapping requires expertise across quantum computing and nuclear physics simultaneously, and manual design is slow. Automating this with reinforcement learning, if it works, would lower the barrier to running nuclear physics calculations on quantum hardware and could accelerate the path from problem specification to executable circuit. This is distinct from the NQAC fuel-assembly item (`app-nqac-nuclear-reactor-optimization`), which addresses combinatorial optimisation of reactor fuel loading — an engineering scheduling problem. This work targets quantum simulation of nuclear structure at the level of encoding and circuit synthesis.

## Previous state of the art

Quantum circuit compilation for chemistry and materials exists (see `enable-compilers`, `enable-nqac-hamiltonian-compiler-drug-design`), but automated circuit design combining AI-driven algorithm selection, encoding choice, and hardware mapping for nuclear physics problems specifically has not previously appeared on this board. The NQAC Hamiltonian compiler item is the closest analogue.

## Limitations

This is Phase I framework work. No quantum circuit has been designed, no nuclear physics result has been produced, and no preprint exists. The evidence is entirely programmatic — a national laboratory project description and a vendor press release. The item is placed at `emerging` and E2 accordingly. The AI approach (reinforcement learning over a large design space) may encounter performance and scalability barriers that are not yet visible.

## What would change the assessment

A preprint on arXiv (quant-ph or nucl-th) reporting the AI framework design, benchmark circuits, or Phase I results would raise this to E3. An independent experimental result or peer-reviewed paper would raise it further. If Phase I concludes without publication, the item should be reassessed.
