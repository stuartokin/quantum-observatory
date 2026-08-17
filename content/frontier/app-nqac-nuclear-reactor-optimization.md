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
  claim: 'The NQAC at IQMP announced a Grand Challenges award to Prof Fred Chong (UChicago), Infleqtion, Constellation Energy and EPRI to apply quantum optimisation algorithms to nuclear reactor fuel-assembly designs under the Q-FLO (Quantum Fuel Loading Optimization) programme. The IQMP blog describes Q-FLO as developing hybrid quantum-classical algorithms to optimise fuel assembly arrangements in nuclear reactors, balancing physics, safety, operational objectives and cost. Researcher Dhirpal Shah (UChicago) leads the postdoctoral execution. No technical results or preprint exist; the project is in early research execution. This is a distinct programme from the ARPA-E ENCODE grid-optimisation project (app-infleqtion-encode-grid-optimization): different technical problem, lead institution, and funding vehicle.'
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
      note: 'IQMP blog post naming Q-FLO (Quantum Fuel Loading Optimization) as the specific programme focus, confirming hybrid quantum-classical approach for nuclear reactor fuel-assembly loading. Names Dhirpal Shah as researcher. No quantitative results.'
    - url: 'https://infleqtion.com/infleqtion-to-deploy-fault-tolerant-neutral-atom-quantum-computer-in-illinois/'
      role: corroborating
      title: 'Infleqtion to Deploy Fault-Tolerant Neutral-Atom Quantum Computer in Illinois'
      publisher: Infleqtion
      date: '2026-07-22'
      accessed: '2026-08-17'
      note: 'Vendor press release. Mentions the NQAC Grand Challenges award alongside the separate ARPA-E ENCODE programme. Confirms Infleqtion partnership with Chong team and nuclear fuel loading as a named focus area. E2 vendor claim.'
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-17'
  note: 'Focus run 2026-08-17: QCR article (quantumcomputingreport.com) not added — tier-6 aggregator, uncitable per source rules. Q-FLO program name added to claim, sourced from existing IQMP blog corroborating source which names it explicitly. Dhirpal Shah already in claim. Evidence level E2 and readiness emerging unchanged.'
---

## What happened

In April 2026, the National Quantum Algorithm Center (NQAC) at the Illinois Quantum and Microelectronics Park (IQMP) announced five awards under its Grand Challenges programme. One of these funds a postdoctoral researcher working under Prof Fred Chong (University of Chicago), with industry partners Infleqtion, Constellation Energy and EPRI, to develop quantum optimisation algorithms for nuclear reactor fuel-assembly design under the Q-FLO (Quantum Fuel Loading Optimization) programme.

The technical problem: fuel loading in a nuclear reactor requires simultaneously satisfying physics, thermal-hydraulic, safety and cost constraints across a combinatorially large design space. Classical optimisers have been used for decades but hit scaling limits as reactor designs become more complex. The Q-FLO team is investigating whether hybrid quantum-classical approaches — likely variational or QAOA-style algorithms on Infleqtion's neutral-atom hardware — can outperform classical methods on realistic fuel-loading instances. Researcher Dhirpal Shah (UChicago) leads the postdoctoral execution.

## Why it matters

This is one of the first named, funded industry-academic programmes to apply quantum computing to nuclear energy operations rather than materials simulation. If quantum optimisation can demonstrably improve fuel-loading solutions, the operational and safety implications for the nuclear fleet are significant. The programme brings together the algorithm developer (UChicago), the hardware provider (Infleqtion), a major nuclear operator (Constellation) and the Electric Power Research Institute (EPRI), which gives it a direct path to industry uptake if results emerge.

## Distinction from app-infleqtion-encode-grid-optimization

This is not the ARPA-E ENCODE programme. ENCODE (already on the board) is Infleqtion-led, ARPA-E-funded, and targets electricity grid delivery optimisation. This project is NQAC/P33-funded, UChicago-led, and targets nuclear reactor fuel-assembly optimisation. The two share Infleqtion and EPRI as partners but are separate programmes with different technical problems.

## Previous state of the art

The applications constellation was empty at the start of this board's operation. Classical optimisation methods (simulated annealing, genetic algorithms, reinforcement learning) are the current industry standard for fuel loading. No quantum approach has yet demonstrated advantage at realistic problem sizes.

## Limitations

No technical results exist. The award was announced April 2026 and research is in early postdoc execution. Evidence ceiling is E2 until a preprint appears. The project is a funded research programme, not a demonstrated result. Readiness is `emerging` and confidence is `low` precisely because the gap between the programme aim and a demonstrated quantum advantage is large and uncharted.

## What would change this assessment

A preprint from the Chong group or Infleqtion showing a quantum optimisation approach applied to a realistic fuel-loading benchmark, with performance comparison against classical methods, would raise this to E3 and potentially justify moving readiness to `experimental`.
