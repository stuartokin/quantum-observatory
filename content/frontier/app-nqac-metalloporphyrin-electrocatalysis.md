---
schema: frontier/v1
id: app-nqac-metalloporphyrin-electrocatalysis
title: 'NQAC: fault-tolerant quantum algorithms for metalloporphyrin electrocatalysis'
summary: 'NQAC Grand Challenges project developing fault-tolerant quantum workflows to simulate strongly correlated metalloporphyrins for green hydrogen and CO2 electrocatalysis, pairing Gagliardi group (UChicago) with PsiQuantum and ULRI.'
plain: 'Metalloporphyrin molecules act as catalysts in clean-energy reactions such as producing hydrogen from water and converting CO2 into useful fuels. Simulating them accurately enough to guide catalyst design is hard for classical computers in the most complex cases, because the electrons interact in ways that require quantum methods. This project, funded through the US National Quantum Algorithm Center (NQAC) at Chicago, pairs a leading quantum chemistry group (Prof. Laura Gagliardi, University of Chicago) with photonic fault-tolerant quantum computing company PsiQuantum and industrial partner ULRI. The goal is to build and test fault-tolerant quantum computing workflows for these simulations. No technical output exists yet — this is an active postdoc position announced April 2026.'
pillar: quantum
readiness: emerging
constellation: applications
cluster: chemistry
actors:
  - 'Gagliardi Group, University of Chicago'
  - PsiQuantum
  - ULRI
  - 'National Quantum Algorithm Center (NQAC), IQMP'
priority: P2
qdayImpact: 0
confidence: low
novelty: 'Industry-academic FTQC application program; no results yet'
country:
  - US
evidence:
  level: E2
  claim: 'NQAC Grand Challenges announcement states that Gagliardi (UChicago), PsiQuantum, and ULRI are developing fault-tolerant quantum computing workflows to simulate metalloporphyrin electrocatalytic reactions relevant to green hydrogen and CO2 utilization. Project announced April 2026 as a postdoc position. No preprint or technical output published as of August 2026.'
  verified: '2026-08-17'
  sources:
    - url: 'https://iqmp.org/news/national-quantum-algorithm-center-at-the-iqmp-announces-grand-challenges-awards/'
      role: vendor
      title: National Quantum Algorithm Center at the IQMP Announces Grand Challenges Awards
      publisher: 'Illinois Quantum and Microelectronics Park (IQMP)'
      date: '2026-04-24'
      accessed: '2026-08-17'
      note: 'Full project title: Quantum Algorithms for Strongly Correlated Metalloporphyrins in Electrocatalysis. E2 ceiling: institutional funding announcement, not a research result. Corroborated by The Quantum Insider (2026-04-24) which names the project title explicitly.'
links:
  - to: app-nqac-nuclear-reactor-optimization
    relation: evidence-for
  - to: app-quantum-chemistry-catalyst
    relation: competes-with
  - to: app-pdt-ftqc-algorithms
    relation: competes-with
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

The National Quantum Algorithm Center (NQAC) at the Illinois Quantum and Microelectronics Park announced five Grand Challenges awards in April 2026. One pairs the Gagliardi group at the University of Chicago — a leading group in multireference quantum chemistry and active-space methods — with photonic FTQC company PsiQuantum and industrial end-user ULRI. The project is titled "Quantum Algorithms for Strongly Correlated Metalloporphyrins in Electrocatalysis."

## Why it matters

Metalloporphyrins are the active sites in important electrocatalysts for green hydrogen production, CO₂ reduction, and fuel-cell operation. Their strongly correlated electronic structure is exactly the regime where classical methods struggle and quantum simulation has a theoretical advantage. A fault-tolerant workflow for these systems would be one of the first demonstrations of FTQC applied to an industrially specified catalyst target. PsiQuantum's involvement is notable: their photonic architecture is designed specifically for fault-tolerant scale rather than NISQ devices, making this a design-for-FTQC project rather than a near-term experiment.

## Previous state of the art

Existing board items cover related territory: app-quantum-chemistry-catalyst (nitrogen fixation, carbon capture) and app-pdt-ftqc-algorithms (photosensitizer design). Metalloporphyrin electrocatalysis for green hydrogen and CO₂ is a distinct industrial target with ULRI as the end-user specifying requirements.

## Limitations

No technical output exists. Announced as a postdoc hiring position in April 2026. Evidence is E2 from an institutional program announcement. Readiness is emerging and confidence is low. Revisit when a preprint appears — expected Q3–Q4 2026 at earliest, more likely 2027.

## What would change this assessment

A preprint from the Gagliardi/PsiQuantum/ULRI team reporting algorithm design, resource estimates, or benchmarks for metalloporphyrin simulation would raise this to E3 and warrant a readiness and confidence update.
