---
schema: frontier/v1
id: app-nqac-nuclear-reactor-optimization
title: 'Quantum optimisation of nuclear reactor fuel-assembly designs: NQAC Grand Challenges'
summary: 'NQAC Grand Challenges award funds UChicago, Infleqtion, Constellation Energy and EPRI to apply quantum optimisation algorithms to nuclear reactor fuel-loading problems.'
plain: 'Loading nuclear fuel rods into a reactor core requires satisfying dozens of simultaneous physics, thermal, safety and cost constraints at once. Classical optimisers struggle with the combinatorial size of this problem. This project, funded by the National Quantum Algorithm Center at the Illinois Quantum and Microelectronics Park, pairs University of Chicago computer scientists with Infleqtion (quantum hardware), Constellation Energy and EPRI (nuclear operators) to develop quantum optimisation approaches for fuel-assembly design. No technical results have been published yet; the project is in early postdoctoral research execution.'
pillar: quantum
constellation: applications
cluster: energy
actors:
  - 'University of Chicago (Prof. Fred Chong, Dhirpal Shah)'
  - Infleqtion
  - 'Constellation Energy'
  - EPRI
readiness: emerging
horizon: 2
priority: P2
qdayImpact: 0
country:
  - US
novelty: 'First named industry-academic quantum optimisation programme for nuclear fuel loading'
metrics:
  - name: 'Award funding'
    value: 'Not publicly disclosed (programme funded by P33, Northwestern, DPI/UIUC)'
    note: 'Earlier programme round announced $125,000 per award; 2026 round funding not confirmed'
  - name: 'Partners'
    value: '4'
    note: 'UChicago, Infleqtion, Constellation Energy, EPRI'
links:
  - to: app-infleqtion-encode-grid-optimization
    relation: competes-with
  - to: algo-quantum-simulation
    relation: depends-on
confidence: low
status: draft
origin: agent
added: '2026-08-17'
evidence:
  level: E2
  claim: 'The NQAC at IQMP announced a Grand Challenges award to Prof Fred Chong (UChicago), Infleqtion, Constellation Energy and EPRI to apply quantum optimisation algorithms to nuclear reactor fuel-assembly designs. The IQMP blog describes the primary focus as optimising fuel loading and arrangement inside nuclear reactors, balancing physics, safety, operational objectives and cost. No technical results or preprint exist; the project is in early research execution by a postdoctoral researcher (Dhirpal Shah). This is a distinct programme from the ARPA-E ENCODE grid-optimisation project (app-infleqtion-encode-grid-optimization): different technical problem, lead institution, and funding vehicle.'
  verified: '2026-08-17'
  sources:
    - url: 'https://iqmp.org/news/national-quantum-algorithm-center-at-the-iqmp-announces-grand-challenges-awards/'
      role: vendor
      title: 'National Quantum Algorithm Center at the IQMP Announces Grand Challenges Awards'
      publisher: 'Illinois Quantum and Microelectronics Park (IQMP)'
      date: '2026-04-24'
      accessed: '2026-08-17'
      note: 'Official programme announcement from the organisation running the awards. E2: programme operator describing its own awards, no technical results. Primary source for award existence and team composition.'
    - url: 'https://iqmp.org/news/solving-energy-challenges-with-quantum-algorithms/'
      role: corroborating
      title: 'Solving Energy Challenges with Quantum Algorithms'
      publisher: 'Illinois Quantum and Microelectronics Park (IQMP)'
      date: '2026-08-01'
      accessed: '2026-08-17'
      note: 'IQMP blog post describing the Chong project in more detail. Confirms focus is nuclear reactor fuel-assembly loading, not electricity grid delivery. Quotes Chong and PhD student Shah on research direction. No quantitative results.'
    - url: 'https://infleqtion.com/infleqtion-to-deploy-fault-tolerant-neutral-atom-quantum-computer-in-illinois/'
      role: corroborating
      title: 'Infleqtion to Deploy Fault-Tolerant Neutral-Atom Quantum Computer in Illinois'
      publisher: Infleqtion
      date: '2026-07-22'
      accessed: '2026-08-17'
      note: 'Vendor press release. Mentions the NQAC Grand Challenges award alongside the separate ARPA-E ENCODE programme. Confirms Infleqtion partnership with Chong team. E2 vendor claim.'
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-17'
---

## What happened

In April 2026, the National Quantum Algorithm Center (NQAC) at the Illinois Quantum and Microelectronics Park (IQMP) announced five awards under its Grand Challenges programme. One of these funds a postdoctoral researcher working under Prof Fred Chong (University of Chicago), with industry partners Infleqtion, Constellation Energy and EPRI, to develop quantum optimisation algorithms for nuclear reactor fuel-assembly design.

The technical problem: fuel loading in a nuclear reactor requires simultaneously satisfying physics, thermal-hydraulic, safety and cost constraints across a combinatorially large design space. Classical optimisers have been used for decades but hit scaling limits as reactor designs become more complex. The team is investigating whether quantum optimisation — likely variational or QAOA-style approaches on Infleqtion's neutral-atom hardware — can outperform classical methods on realistic fuel-loading instances.

## Why it matters

This is one of the first named, funded industry-academic programmes to apply quantum computing to nuclear energy operations rather than materials simulation. If quantum optimisation can demonstrably improve fuel-loading solutions, the operational and safety implications for the nuclear fleet are significant. The programme brings together the algorithm developer (UChicago), the hardware provider (Infleqtion), a major nuclear operator (Constellation) and the Electric Power Research Institute (EPRI), which gives it a direct path to industry uptake if results emerge.

## Distinction from app-infleqtion-encode-grid-optimization

This is not the ARPA-E ENCODE programme. ENCODE (already on the board) is Infleqtion-led, ARPA-E-funded, and targets electricity grid delivery optimisation. This project is NQAC/P33-funded, UChicago-led, and targets nuclear reactor fuel-assembly optimisation. The two share Infleqtion and EPRI as partners but are separate programmes with different technical problems.

Note also that The Quantum Insider article that prompted this focus run described the Chong project as "energy grid optimisation". That description is incorrect. All primary sources (IQMP announcement, IQMP blog, Infleqtion press release) are unambiguous: the Chong project is about nuclear reactor fuel loading.

## Previous state of the art

The applications constellation was empty at the start of this board's operation. Classical optimisation methods (simulated annealing, genetic algorithms, reinforcement learning) are the current industry standard for fuel loading. No quantum approach has yet demonstrated advantage at realistic problem sizes.

## Limitations

No technical results exist. The award was announced April 2026 and research is in early postdoc execution. Evidence ceiling is E2 until a preprint appears. The project is a funded research programme, not a demonstrated result. Readiness is `emerging` and confidence is `low` precisely because the gap between the programme aim and a demonstrated quantum advantage is large and uncharted.

## What would change this assessment

A preprint from the Chong group or Infleqtion showing a quantum optimisation approach applied to a realistic fuel-loading benchmark, with performance comparison against classical methods, would raise this to E3 and potentially justify moving readiness to `experimental`.
