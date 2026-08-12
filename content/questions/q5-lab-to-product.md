---
schema: question/v1
id: q5-lab-to-product
number: 5
question: 'Are laboratory results becoming prototypes or products?'
pillar: quantum
answer: 'Quantum sensing is the clearest example of lab-to-product transition: IonQ was contracted by DARPA for 125 compact optical atomic clocks for government deployment. Quantum networking infrastructure is crossing from research to deployable hardware — Qunnect''s Carina system is commercially available and NIST/UMD/Qunnect demonstrated entanglement distribution over 62 km of commercial aerial fibre on 6 August 2026. QKD is commercially available for specialised high-security applications. Fault-tolerant quantum computing remains at the laboratory demonstration stage — logical qubit counts have improved substantially, but no system runs deep fault-tolerant circuits at commercially useful scale. PQC standards (FIPS 203/204/205) are shipping in named products and are adopted.'
state: moving
asOf: '2026-08-12'
lastChanged: '2026-08-12'
changedBy: 'NIST/UMD/Qunnect 62 km metropolitan aerial fibre entanglement demonstration (6 August 2026) and IonQ DARPA contract for 125 compact optical atomic clocks mark the most recent lab-to-deployment transitions.'
evidence:
  - ref: sense-optical-clock
    kind: frontier
    note: 'IonQ contracted for compact atomic clocks for government deployment.'
  - ref: comms-quantum-repeater
    kind: frontier
    note: 'Qunnect Carina and NIST 62 km demonstration represent commercial-fibre entanglement deployment.'
  - ref: pqc-fips-203
    kind: frontier
    note: 'PQC standards shipping in products; the clearest lab-to-mainstream transition on the board.'
  - ref: qec-logical-qubit-scaling
    kind: frontier
    note: 'Logical qubit counts improving but not yet at useful scale for computing applications.'
history: []
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-12'
status: draft
added: '2026-08-12'
---

The sensing and networking constellations are moving faster toward deployment than the computing constellation. This reflects both the lower engineering complexity of sensing applications and the pull from government programmes. PQC is the most complete lab-to-product story on the board — three NIST standards adopted and shipping. Fault-tolerant quantum computing is still at the laboratory demonstration stage despite rapid progress in error correction metrics.
