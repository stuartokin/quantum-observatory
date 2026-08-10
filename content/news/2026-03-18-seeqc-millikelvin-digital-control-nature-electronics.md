---
schema: news/v1
id: 2026-03-18-seeqc-millikelvin-digital-control-nature-electronics
headline: 'SEEQC publishes first full-stack quantum computer with superconducting digital control integrated at millikelvin temperatures'
pillar: quantum
date: '2026-03-18'
plain: 'One of the hardest engineering problems in scaling superconducting quantum computers is routing thousands of control wires from room temperature down to the near-absolute-zero environment where qubits live. SEEQC has demonstrated a different approach: move the control electronics into the freezer alongside the qubits. Their five-qubit processor, described in Nature Electronics, integrates superconducting Single Flux Quantum digital logic directly with the qubit chip at 10 mK via flip-chip bonding. Single-qubit gate fidelities exceeded 99.5%, and no measurable degradation from the nearby electronics — specifically no quasiparticle poisoning — was detected. This is a scalability result, not a qubit-count record: it shows a path to controlling many qubits without a proportional explosion in cabling.'
significance: notable
source:
  url: https://www.nature.com/articles/s41928-026-01576-6
  kind: paper
  title: 'A quantum computer controlled by superconducting digital electronics at millikelvin temperature'
  publisher: Nature Electronics
  date: '2026-03-18'
  doi: 10.1038/s41928-026-01576-6
corroboration:
  - url: https://www.hpcwire.com/off-the-wire/seeqc-reports-1st-quantum-computer-with-integrated-qubit-control-on-a-chip-at-millikelvin-temperatures/
    publisher: HPCwire
    kind: press
  - url: https://quantumcomputingreport.com/seeqc-reports-integrated-qubit-control-logic-operating-at-millikelvin-temperatures/
    publisher: Quantum Computing Report
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature Electronics paper DOI 10.1038/s41928-026-01576-6 confirmed on nature.com; published March 18, 2026'
    - 'HPCwire and Quantum Computing Report independently report the same result with consistent gate-fidelity figures (above 99.5%)'
    - 'Gate fidelity figure and absence of quasiparticle poisoning confirmed in Quantum Computing Report technical summary'
    - 'Prior art checked: HRL silicon QPU with cryo-CMOS (filed July 29 2026) is a different architecture — CMOS at 4K not SFQ at 10 mK — and a different item'
about:
  - enable-control-electronics
  - arch-superconducting
establishedBy:
  - url: https://www.nature.com/articles/s41928-026-01576-6
    title: 'A quantum computer controlled by superconducting digital electronics at millikelvin temperature'
    relation: reports
    date: '2026-03-18'
    doi: 10.1038/s41928-026-01576-6
actors: [SEEQC]
country: [US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The wiring bottleneck is real: every qubit in a superconducting processor currently requires its own control line running from room temperature into the cryostat. At tens of qubits this is manageable; at thousands it is not. SEEQC's approach uses Single Flux Quantum (SFQ) digital pulses — a superconducting technology operating at near-zero power — to multiplex control signals so fewer external lines drive more qubits.

The five-qubit system is small. What the paper establishes is that the proximity of digital logic does not degrade qubit coherence — specifically, no quasiparticle poisoning was detected. That negative result is the contribution: a key concern about co-integration has been experimentally ruled out.

The HRL/IBM silicon QPU published July 2026 also integrates cryo-CMOS control, but at 4K rather than 10 mK. SEEQC's approach operates at the same temperature as the qubits themselves, which is architecturally distinct.
