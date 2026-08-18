---
schema: frontier/v1
id: app-hybrid-protein-simulation
title: 'Hybrid quantum-classical protein-ligand simulation at 12,635-atom scale'
summary: 'Merz et al. demonstrated a heterogeneous quantum-classical workflow computing electronic structure of protein-ligand complexes up to 12,635 atoms — the largest quantum-assisted simulation of a biologically relevant molecule. No quantum advantage over classical methods was claimed or demonstrated.'
plain: 'Classical computers struggle with very large chemistry simulations because computational cost grows exponentially with system size. One approach is to break a molecule into fragments, solve the hard local quantum-mechanical subproblems on a quantum processor, and stitch results back together on a classical supercomputer. Researchers from Cleveland Clinic, Michigan State University, RIKEN Japan and IBM did this for two protein-drug binding pairs, the larger containing 12,635 atoms — roughly 40 times larger than their previous quantum-assisted benchmark. IBM 156-qubit processors (using up to 94 qubits) ran 9,200 circuits over more than 100 hours; two Japanese supercomputers (Fugaku and Miyabi-G) handled classical assembly. This is not a quantum advantage result: there is no demonstrated speedup or accuracy gain over the best classical-only methods for this task. The Wellcome Leap Q4Bio program ran a competitive challenge specifically designed to test for provable quantum advantage with a $5 million grand prize; that prize was not awarded to any team. What was shown is that a hybrid approach can now tackle protein-scale molecules at chemically meaningful accuracy, establishing a credible engineering path toward future advantage.'
pillar: quantum
readiness: emerging
constellation: applications
cluster: drug-discovery
actors:
  - 'Cleveland Clinic'
  - 'Michigan State University'
  - RIKEN
  - 'IBM Quantum'
country:
  - US
  - JP
horizon: 2
priority: P1
novelty: 'Largest quantum-assisted protein-ligand simulation to date; no quantum advantage demonstrated; scale record for hybrid QC chemistry'
metrics:
  - name: largest system simulated
    value: '12635'
    unit: atoms
    note: 'T4 lysozyme complex; electronic structure via HQC embedding'
  - name: qubit count used
    value: '94'
    unit: qubits
    note: 'Up to 94 of 156 available qubits on ibm_cleveland and ibm_kobe'
  - name: circuits executed
    value: '9200'
    unit: circuits
    note: 'Over 100 hours of runtime across two IBM processors'
  - name: system size increase vs prior benchmark
    value: '>40'
    unit: x
    note: 'vs same team previous HQC chemistry demonstration'
qdayImpact: 0
confidence: medium
status: draft
origin: agent
added: '2026-08-16'
links:
  - to: algo-quantum-simulation
    relation: evidence-for
evidence:
  level: E3
  claim: 'Merz et al. arXiv:2605.01138 (May 2026) reports a heterogeneous quantum-classical (HQC) workflow using quantum embedding to fragment two protein-ligand complexes. Fragment electronic configurations were sampled on two 156-qubit IBM processors using up to 94 qubits, running 9,200 circuits over more than 100 hours, collecting 1.3e9 measurement outcomes. Two complexes simulated: 11,608 atoms (trypsin-benzamidine) and 12,635 atoms (T4 lysozyme-n-butylbenzene), demonstrating greater than 40x increase in system size over a prior benchmark by the same team. The paper does not claim quantum advantage over classical methods. The Wellcome Leap Q4Bio program tested for provable quantum advantage competitively with a $5M grand prize; that prize was not awarded to any team. Algorithmiq won $2M for a scalable path to future advantage, not for demonstrated advantage. Nature news (d41586-026-01236-x) stated that quantum machines have no advantage over classical machines yet. The Nature Biotechnology item (10.1038/s41587-026-03233-x) citing these results is a 2-page unsigned editorial, not a research paper.'
  verified: '2026-08-16'
  sources:
    - url: https://arxiv.org/abs/2605.01138
      role: preprint
      title: 'Crossing the 12,000-atom barrier with heterogeneous quantum-classical supercomputing: quantum chemistry of protein-ligand complexes'
      publisher: arXiv
      date: '2026-05-01'
      identifier: 'arXiv:2605.01138'
      doi: '10.48550/arXiv.2605.01138'
      accessed: '2026-08-16'
      note: 'Primary experimental source. 24 authors; lead Kenneth M. Merz Jr. at Cleveland Clinic; RIKEN Japan and IBM Quantum co-institutions. Merz holds dual affiliation with MSU (adjunct) though paper lists Cleveland Clinic only. Preprint only as of 2026-08-18; no peer-reviewed journal version confirmed.'
    - url: https://www.nature.com/articles/s41587-026-03233-x
      role: corroborating
      title: 'Quantum computing in transition'
      publisher: 'Nature Biotechnology'
      date: '2026-07-06'
      identifier: 'Nat Biotechnol 44, 1065-1066 (2026)'
      doi: '10.1038/s41587-026-03233-x'
      accessed: '2026-08-16'
      note: 'Unsigned editorial citing Q4Bio results including Merz et al. States quantum computers are not yet able to address biological challenges independently. Not a research paper; corroborating context only.'
    - url: https://wellcomeleap.org/q4bio_prize_announcement/
      role: corroborating
      title: 'Wellcome Leap Announces $2 Million Prize in $50 Million Quantum for Bio Challenge Program'
      publisher: 'Wellcome Leap'
      date: '2026-04-16'
      accessed: '2026-08-16'
      note: '$5M grand prize for provable quantum advantage not awarded to any team. Algorithmiq won $2M for a scalable path to future advantage only.'
    - url: https://www.nature.com/articles/d41586-026-01236-x
      role: corroborating
      title: 'Quantum computers take on health care'
      publisher: Nature
      date: '2026-04-16'
      accessed: '2026-08-16'
      note: 'Independent characterisation. States quantum machines have no advantage over classical machines yet. Key corroboration that this is not an advantage result.'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-16'
  reviewedOn: '2026-08-18'
  note: 'arXiv:2605.01138 HTML opened: ibm_cleveland and ibm_kobe (156-qubit), up to 94 qubits, 9,200 circuits, >100 hours, 1.3e9 outcomes, 11,608 and 12,635 atoms, >40x increase confirmed. Merz: Cleveland Clinic primary in paper; MSU adjunct per Google Scholar and Merz lab page — actors field defensible. wellcomeleap.org: $5M prize unawarded, Algorithmiq sole $2M winner confirmed. E3 correct for preprint. No changes.'
---

## Hybrid quantum-classical protein-ligand simulation at 12,635-atom scale

**What happened.** Merz et al. (Cleveland Clinic, Michigan State, RIKEN Japan, IBM) used a quantum-centric supercomputing framework to simulate two protein-drug binding complexes: 11,608 atoms (trypsin-benzamidine) and 12,635 atoms (T4 lysozyme). The approach fragments the molecule classically via quantum embedding, runs local electronic structure on two IBM 156-qubit processors (up to 94 qubits, 9,200 circuits, over 100 hours), and assembles results on Fugaku and Miyabi-G supercomputers. This is the largest quantum-assisted simulation of a biologically relevant molecule to date.

**This is not a quantum advantage result.** The quantum processors handle subproblems within a classically orchestrated workflow. The authors make no claim that quantum processors outperform classical alternatives on those subproblems. The Wellcome Leap Q4Bio program — a $50M initiative testing for provable biological quantum advantage with a $5M grand prize — did not award that prize to any team. Nature news independently characterised the outcome: no advantage over classical machines demonstrated.

**Previous state of the art.** The same team had previously demonstrated a 300-atom quantum-assisted simulation; the 12,635-atom result is a greater-than-40x scale increase. The Q4Bio program also produced the Algorithmiq photodynamic therapy workflow (up to 100 qubits, $2M for a scalable path to future advantage — not achieved advantage).

**Limitations.** Preprint only; not peer reviewed. Runtime exceeds 100 hours of quantum processor time, far from any practical drug-discovery workflow. No head-to-head comparison with the best classical-only method at the same system size and accuracy target is provided. The Nature Biotechnology article that prompted this focus is an unsigned 2-page editorial, not a research paper authored by Q4Bio participants.

**What would change this assessment.** Peer review, a direct comparison showing the quantum subproblem solver outperforms the classical equivalent, or independent replication on non-IBM hardware would change the evidence level. A result demonstrating quantum speedup or accuracy gain for a specific subproblem class would change the readiness classification.
