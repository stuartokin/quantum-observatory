---
schema: question/v1
id: what-changed
number: 1
question: What has changed since the last scan?
pillar: quantum
answer: 'IBM, Qedma, Algorithmiq, and the University of Chicago announced three quantum advantage demonstrations on 30 July 2026, benchmarked against the Fugaku supercomputer using up to 74 qubits on commercially available cloud hardware — the first claims with rigorous process-verification frameworks. HRL Laboratories published a Nature paper the day before demonstrating a silicon QPU running error correction autonomously with a cryogenic CMOS controller inside the cryostat, addressing the wiring bottleneck directly. US Executive Order 14412 (22 June 2026) imposed binding federal civilian PQC deadlines. No CRQC hardware breakthrough occurred.'
state: moving
asOf: '2026-08-14'
lastChanged: '2026-08-14'
changedBy: IBM/Qedma/Algorithmiq triple quantum advantage demonstrations on 30 July 2026 and HRL Nature paper on 29 July 2026.
evidence:
  - ref: algo-resource-estimation
    kind: frontier
    note: Gidney 2025 preprint reducing RSA-2048 qubit estimate to under one million.
  - ref: arch-silicon-spin
    kind: frontier
    note: HRL Nature paper (29 Jul 2026) extends silicon spin qubit architecture to autonomous cryogenic control.
  - ref: pqc-fips-203
    kind: frontier
    note: FIPS 203/204/205 now in product integration; first FIPS 140-3 CMVP submission May 2026.
  - ref: https://newsroom.ibm.com/2026-07-30-ibm-and-algorithmiq-demonstrate-quantum-advantage,-establishing-a-framework-for-trusted-quantum-computation-beyond-classical-verification
    kind: url
    note: IBM/Algorithmiq quantum advantage announcement, 30 July 2026.
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-14'
status: draft
added: '2026-08-14'
---

The most significant events since the last scan are two Nature-level hardware results and a binding policy action. On 30 July 2026, IBM and partners (Qedma, Algorithmiq, University of Chicago, RIKEN) published three quantum advantage demonstrations using cloud-accessible Heron-based systems against the Fugaku supercomputer — the first advantage claims with process-level verification frameworks rather than classical reference answers. One day earlier, HRL Laboratories published a Nature paper showing an 18-qubit silicon QPU running error correction autonomously with a cryogenic CMOS controller at 4 K, removing the need for room-temperature wiring. On the policy side, US EO 14412 (22 June 2026) imposed binding PQC deadlines on federal civilian agencies. None of these events constitutes a CRQC — the hardware gap remains enormous — but the advantage and enabling-layer results change the texture of the field.
