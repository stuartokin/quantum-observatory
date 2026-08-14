---
schema: question/v1
id: lab-to-product
number: 5
question: Are laboratory results becoming prototypes or products?
pillar: quantum
answer: 'PQC standards (ML-KEM, ML-DSA, SLH-DSA) have moved fully to product: deployed in browsers, TLS stacks, and operating systems. Quantum sensing hardware is at the prototype-to-product boundary: field-deployable gravimeters and compact atom-interferometer inertial sensors are available commercially from vendors including AOSense, Nomad Atomics, and Exail. QKD is in limited commercial deployment in metropolitan networks and demonstrated via satellite. Quantum computing hardware remains at the laboratory and early engineering prototype stage for fault-tolerant systems. IBM''s Kookaburra (2026) and Nighthawk processors are engineering prototypes for fault-tolerance pathways, not production systems. No fault-tolerant quantum computer capable of running commercially useful algorithms is available or on a credible sub-five-year engineering roadmap.'
state: moving
asOf: '2026-08-14'
lastChanged: '2024-08-01'
changedBy: 'NIST published FIPS 203, 204, 205 in August 2024, moving ML-KEM, ML-DSA and SLH-DSA to adopted standards — the clearest lab-to-product transition in this cycle.'
evidence:
  - ref: pqc-fips-203
    kind: frontier
    note: ML-KEM adopted; deployed in products.
  - ref: pqc-fips-204
    kind: frontier
    note: ML-DSA adopted; deployed in products.
  - ref: pqc-fips-205
    kind: frontier
    note: SLH-DSA adopted; deployed in products.
  - ref: sense-gravimetry
    kind: frontier
    note: Quantum gravimetry demonstrated; commercial field instruments available.
  - ref: sense-inertial-navigation
    kind: frontier
    note: Quantum inertial navigation at experimental stage; field-deployable prototypes exist.
  - ref: comms-satellite-qkd
    kind: frontier
    note: Satellite QKD demonstrated; limited commercial deployment underway.
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-14'
status: draft
added: '2026-08-14'
---

The PQC transition is the fastest lab-to-product story in this field: three standards finalised in August 2024 and in broad deployment within months. Quantum sensing is the second clearest: the physics has been proven for decades and the engineering bottleneck is miniaturisation, which is being solved incrementally.

Quantum computing is the slowest. The gap between a logical qubit demonstration at distance-7 and a machine that runs a commercially useful algorithm on hundreds of error-corrected logical qubits is not measured in years of linear progress — it involves multiple unresolved engineering problems including decoder scaling, modular interconnects, and classical control at scale.
