---
schema: question/v1
id: lab-to-product
number: 5
question: Are laboratory results becoming prototypes or products?
pillar: quantum
answer: 'FIPS 203, 204, and 205 (ML-KEM, ML-DSA, SLH-DSA) are in active product integration by hardware vendors and cloud providers; the first FIPS 140-3 CMVP submission for a PQC-capable module was made in May 2026. HRL Laboratories described its silicon QPU (Nature, July 2026) as a complete prototype for a manufacturable architecture, using commercial foundry processes. IonQ acquired ID Quantique (~$250M, May 2025) to convert laboratory QKD into a commercial product line. IBM''s quantum advantage demonstrations (July 2026) used cloud-accessible, commercially available hardware, indicating the hardware has left the laboratory for at least research-commercial use. Fault-tolerant systems remain prototype-stage.'
state: moving
asOf: '2026-08-14'
lastChanged: '2026-08-14'
changedBy: PQC standards in product integration; HRL QPU described as manufacturable prototype; IBM advantage on commercial cloud hardware.
evidence:
  - ref: pqc-fips-203
    kind: frontier
  - ref: pqc-fips-204
    kind: frontier
  - ref: pqc-fips-205
    kind: frontier
  - ref: arch-silicon-spin
    kind: frontier
    note: HRL Nature paper July 2026; commercial foundry fabrication.
  - ref: quantum-key-distribution
    kind: frontier
    note: IonQ/ID Quantique acquisition consolidates QKD into commercial portfolio.
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-14'
status: draft
added: '2026-08-14'
---

The fastest lab-to-product transition is in PQC: three standards published in August 2024 are now being integrated into products, with the first FIPS 140-3 validated implementation in the validation queue as of May 2026. On the hardware side, HRL's result is significant because its controller was built in a commercial 130 nm RF CMOS foundry, not a specialised research facility — the manufacturing path to scale already exists in principle. Quantum computing hardware itself remains in early research-commercial deployment, not broad product availability.
