---
schema: frontier/v1
id: algo-ecdlp-trapped-ion-estimate
title: 'ECC-256 resource estimate on trapped-ion qLDPC: 20,000 qubits for secp256k1'
summary: 'IonQ preprint (arXiv:2609.05625) presents the first end-to-end compiled trapped-ion qLDPC estimate for secp256k1 ECC-256: 19,397 physical qubits, ~25.7 days per attempt, on hardware nine orders of magnitude better than demonstrated.'
plain: 'A team at IonQ has estimated how large a trapped-ion quantum computer would need to be to break the 256-bit elliptic-curve cryptography used by Bitcoin (secp256k1). Using their Walking Cat architecture — a blueprint combining trapped ions with quantum LDPC error-correcting codes — they calculate that a machine with roughly 20,000 physical qubits could solve the underlying maths problem in about 26 days per attempt. This is far fewer qubits than previous trapped-ion estimates for the same problem, which ran to over a million. The estimate assumes hardware that does not yet exist: the required logical error rate is roughly nine orders of magnitude better than what IonQ measured in its June 2026 hardware experiment. The curve attacked (secp256k1) protects Bitcoin; it is not P-256, which protects most web traffic and government systems, and the arithmetic shortcuts used here do not transfer to P-256. The paper explicitly describes itself as a proof-of-concept for the Walking Cat architecture, not a hardware demonstration.'
pillar: quantum
readiness: emerging
constellation: algorithms
cluster: cryptanalysis
actors:
  - IonQ
metrics:
  - name: physical qubits
    value: '19397'
    note: 'Walking Cat trapped-ion qLDPC architecture, secp256k1'
  - name: runtime per attempt
    value: '25.7'
    unit: days
    note: 'Estimated at 63% single-shot success probability'
  - name: logical qubits
    value: '1450'
    note: 'Shor circuit for secp256k1 ECDLP'
  - name: 'Toffoli gates (logical)'
    value: '4e7'
    note: 'Optimised from Schrottenloher 2026 circuits'
links:
  - to: algo-resource-estimation
    relation: evidence-for
  - to: algo-shor
    relation: evidence-for
  - to: algo-cryptanalytic-runtime
    relation: evidence-for
  - to: arch-trapped-ion
    relation: depends-on
evidence:
  claim: 'Haner et al. (IonQ, arXiv:2609.05625, submitted 4 Sep 2026) present a full-stack resource estimate for solving the ECDLP on secp256k1 using Shor''s algorithm on a Walking Cat trapped-ion architecture with qLDPC codes. The logical circuit requires approximately 1,450 logical qubits and 40 million Toffoli gates. Physical compilation to measurement schedules yields 19,397 physical qubits and ~25.7 days runtime per attempt at 63% estimated success probability. The assumed Q102-class qLDPC logical error rate is 9.34e-12 per cycle including ion transport — roughly nine orders of magnitude below the ~1% per logical qubit per cycle achieved in IonQ''s June 2026 hardware qLDPC breakeven experiment on a stationary 40-ion chain. The paper is a proof-of-concept for the Walking Cat architecture; it does not claim to be a hardware demonstration. secp256k1 exploits a pseudo-Mersenne prime that reduces gate count vs. generic 256-bit curves; no P-256 estimate appears in this paper.'
  verified: '2026-09-28'
  level: E3
  sources:
    - url: https://arxiv.org/abs/2609.05625
      role: preprint
      title: 'Computing 256-bit elliptic curve discrete logarithms in 26 days on a fault-tolerant trapped-ion quantum computer with 20,000 qubits'
      publisher: arXiv
      date: '2026-09-04'
      identifier: 'arXiv:2609.05625'
      accessed: '2026-09-28'
      note: 'All 14 authors at IonQ. Submitted 4 Sep 2026. Also posted as IACR ePrint 2026/1916. Full technical methods and compiled measurement schedules present; rated E3 per preprint rule. The paper self-describes as a proof-of-concept; the press release framing is stronger than the paper''s own.'
    - url: https://eprint.iacr.org/2026/1916
      role: corroborating
      title: 'Computing 256-bit elliptic curve discrete logarithms in 26 days on a fault-tolerant trapped-ion quantum computer with 20,000 qubits'
      publisher: 'IACR ePrint'
      date: '2026-09-04'
      identifier: 'IACR ePrint 2026/1916'
      accessed: '2026-09-28'
      note: 'Same paper cross-posted to IACR ePrint. Confirms accessibility via the cryptography-community preprint server.'
confidence: medium
status: draft
origin: agent
priority: P1
qdayImpact: 1
qdayReasoning: 'The estimate targets secp256k1 (Bitcoin/Ethereum transaction signing), not P-256 or P-384 used in TLS, web PKI, or government systems. The 20,000-qubit figure assumes a Q102-class qLDPC memory block at 9.34e-12 logical error rate per cycle including ion transport — approximately nine orders of magnitude below demonstrated hardware; no machine of this class has been operated. The result tightens the theoretical lower-bound qubit count for a fully compiled ECC-256 attack on trapped-ion qLDPC and provides the most detailed end-to-end compilation for this architecture to date, but does not change the engineering gap between current hardware and a cryptographically relevant device. Prior trapped-ion estimates for the same problem required 1.2 to 9.4 million qubits; the reduction comes from qLDPC codes and curve-specific arithmetic, not from hardware progress. Scored +1: algorithmic and compilation targets for ECC-256 on trapped-ion qLDPC are now well characterised, marginally tightening the long-term threat picture for blockchain cryptography, but the hardware gap remains the binding constraint and no near-term threat assessment should change on this basis alone.'
country:
  - US
novelty: 'First end-to-end compiled trapped-ion qLDPC ECC-256 estimate; 60-470x fewer qubits than prior trapped-ion estimates'
horizon: 2
added: '2026-09-28'
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-09-28'
  note: 'Confirmed arXiv:2609.05625 free to access; also at IACR ePrint 2026/1916. All authors IonQ: rated E3 per preprint rule, not E2, as full methods and compiled schedules are present on arXiv. Nine-orders-of-magnitude hardware gap and secp256k1 vs P-256 distinction documented in claim and plain. Q-Day +1 not +2: no near-term hardware path demonstrated.'
---

## What happened

IonQ published arXiv:2609.05625 on 4 September 2026, presenting a full-stack resource estimate for breaking secp256k1 ECC-256 on a Walking Cat trapped-ion machine using qLDPC error-correcting codes. Starting from Schrottenloher's 2026 optimised point-addition circuits and applying a complete compilation — logical circuit design, code selection, physical layout, and measurement schedules including ion transport — the team arrives at 19,397 physical qubits and approximately 25.7 days per attempt at 63% success probability.

## Why it matters

Previous trapped-ion estimates for the same problem required between 1.2 million and 9.4 million qubits. The reduction comes from choosing qLDPC codes over surface codes and from exploiting the pseudo-Mersenne prime structure of secp256k1, which reduces modular arithmetic gate count. This is the most detailed end-to-end compilation for a trapped-ion cryptanalytic circuit to date, making architectural assumptions explicit and independently checkable.

## Previous state of the art

Gidney (arXiv:2505.15917, May 2025) reduced RSA-2048 to under one million noisy qubits on a surface-code grid. Cain et al. (arXiv:2603.28627, 2026) estimated secp256k1 at roughly 10,000 atoms on a neutral-atom reconfigurable array. Gouzien et al. (PRL 2023) put ECC-256 at 126,133 cat qubits in 9 hours. The IonQ result is the first such estimate fully compiled for a trapped-ion qLDPC machine with transport and routing included.

## Limitations

The assumed Q102-class qLDPC logical error rate (9.34e-12 per cycle with transport) is approximately nine orders of magnitude below what IonQ measured in its June 2026 hardware experiment (~1% per cycle on a stationary 40-ion chain without transport, with leakage post-selected away). No block of the Q102 class has been operated. The curve (secp256k1) protects blockchain; P-256, protecting most web and government traffic, is not addressed. The paper is an unreviewed vendor preprint.

## What would change the assessment

Independent replication of the resource estimate by a non-IonQ group, peer review, hardware progress narrowing the nine-orders-of-magnitude error-rate gap, or an equivalent P-256 estimate would all strengthen this result and potentially raise the Q-Day impact score.
