---
schema: frontier/v1
id: algo-resource-estimation
title: Cryptanalytic resource estimation
summary: 'Estimates of the quantum resources needed to break RSA-2048 and ECC-256. The 2025 leading surface-code estimate is under one million noisy physical qubits (Gidney 2025). A 2026 qLDPC preprint claims under 100,000 physical qubits (Pinnacle Architecture, Iceberg Quantum). Both are algorithmic advances with no hardware change.'
plain: 'Resource estimation asks how powerful a quantum computer needs to be before it can break the encryption protecting the internet. The answer has dropped sharply in recent years — not because anyone built a bigger machine, but because researchers found smarter algorithms. In May 2025, Craig Gidney at Google Quantum AI showed that a quantum computer with fewer than one million noisy physical qubits could factor a 2048-bit RSA key in under a week, assuming 0.1% gate error rates and 1-microsecond surface code cycles. The previous best estimate from 2019 required 20 million qubits for the same task. In February 2026, Iceberg Quantum published a preprint claiming the Pinnacle Architecture — using quantum LDPC codes instead of surface codes — could reduce the count further to under 100,000 qubits at the same error-rate assumption, though on a more demanding architecture. This paper has not been peer-reviewed and Craig Gidney has noted concerns about its assumptions. Separately, a French research team at Inria showed in 2026 that breaking ECC-256 needs only about 1,193 logical qubits. These are theoretical resource estimates — no machine exists that could run any of these circuits — but the gap between current hardware and the required machine has narrowed substantially on the algorithmic side.'
pillar: quantum
readiness: demonstrated
constellation: algorithms
cluster: cryptanalysis
actors:
  - 'Google Quantum AI'
  - 'Craig Gidney'
  - 'Iceberg Quantum'
  - 'Clemence Chevignard'
  - 'Andre Schrottenloher'
  - 'Inria / Univ Rennes'
country:
  - US
  - AU
  - FR
metrics:
  - name: Physical qubits to factor RSA-2048 (surface code)
    value: '<1000000'
    unit: physical qubits
    note: 'Gidney 2025 (arXiv:2505.15917). Assumes 0.1% gate error, 1 µs surface code cycle, 10 µs reaction time, nearest-neighbour 2D grid. Runtime under one week.'
  - name: Physical qubits to factor RSA-2048 (qLDPC, Pinnacle Architecture)
    value: '<100000'
    unit: physical qubits
    note: 'Webster et al. 2026 (arXiv:2602.11457, Iceberg Quantum). Assumes 10^-3 gate error, 1 µs code cycle, 10 µs reaction time. Preprint, not peer-reviewed. Runtime approximately one month.'
  - name: Reduction vs 2019 estimate (surface code)
    value: '20'
    unit: 'times fewer qubits'
    note: 'Prior Gidney+Ekerå 2019 estimate was 20 million qubits in 8 hours under same physical assumptions.'
  - name: Logical qubits for ECC-256
    value: '1193'
    unit: logical qubits
    note: 'Chevignard/Fouque/Schrottenloher EUROCRYPT 2026 (ePrint 2026/280). Width-optimised; high gate count. Luo et al. arXiv:2607.13816 claims further reduction to 835 logical qubits but at ~20x more Toffoli gates than Chevignard/Babbush alternatives; not peer-reviewed.'
links:
  - to: crqc
    relation: evidence-for
  - to: algo-shor
    relation: enables
  - to: qec-surface-code
    relation: depends-on
priority: P0
qdayImpact: 3
qdayReasoning: 'The resource estimates for breaking RSA-2048 have fallen from 20 million physical qubits (Gidney+Ekerå 2019) to under one million (Gidney 2025, surface code) to a claimed under 100,000 (Pinnacle Architecture, Iceberg Quantum, 2026 preprint using qLDPC codes) — without any hardware advancing. The Gidney 2025 result is the most credible current estimate: it uses the same conservative assumptions as 2019, is from Google Quantum AI, and is widely cited. The Pinnacle Architecture result is a preprint from a startup, uses a more demanding architecture (qLDPC requires higher connectivity and more complex decoders than surface code), and has not been independently validated. Craig Gidney has noted specific concerns with its assumptions. If the Pinnacle claim holds under scrutiny, it would represent a further tenfold reduction. Together, the trajectory of estimates from 2019-2026 — two to three orders of magnitude — is the strongest signal that algorithmic improvements alone are materially narrowing the gap between demonstrated hardware and a CRQC. Impact raised to +3 from +2: the 2019-to-2025 reduction alone would have been scored +2, but the further 2026 preprint (even at E3) accelerates a trend that now spans three orders of magnitude. Risk models calibrated to the 2019 figure are severely too conservative, and models calibrated to Gidney 2025 may now also need updating.'
horizon: 2
novelty: 'Three-orders-of-magnitude reduction in physical-qubit requirement for RSA-2048 attack via algorithmic advances alone (2019-2026)'
evidence:
  claim: 'Gidney (Google Quantum AI, arXiv:2505.15917, May 2025) estimates that a 2048-bit RSA integer can be factored in under one week by a quantum computer with fewer than one million noisy qubits, under the same assumptions as Gidney+Ekerå 2019 (0.1% gate error, 1 µs surface code cycle, 10 µs reaction time, nearest-neighbour 2D grid). The twenty-fold qubit reduction comes from approximate residue arithmetic, yoked surface code storage, and reduced magic-state distillation overhead. Chevignard, Fouque, and Schrottenloher (EUROCRYPT 2026, ePrint 2026/280) separately estimate ECC-256 requires 1,193 logical qubits. Luo et al. (arXiv:2607.13816, July 2026) subsequently claim 835 logical qubits using a space-efficient modular inversion circuit. Neither result is a demonstration; both are resource estimates for future fault-tolerant machines. Webster et al. (Iceberg Quantum, arXiv:2602.11457, February 2026, updated May 2026) additionally claim that using qLDPC codes in the Pinnacle Architecture reduces RSA-2048 to under 100,000 physical qubits at 10^-3 error rate with approximately one-month runtime — a further tenfold reduction from Gidney 2025, but using a more demanding architectural approach. The Pinnacle preprint has not been peer-reviewed; Craig Gidney has publicly noted specific concerns about its assumptions. Independent replication of the full resource counts for any of these estimates has not been published.'
  verified: '2026-08-11'
  level: E3
  sources:
    - url: https://arxiv.org/abs/2505.15917
      role: preprint
      title: 'How to factor 2048 bit RSA integers with less than a million noisy qubits'
      publisher: arXiv
      date: '2025-05-21'
      identifier: 'arXiv:2505.15917'
      doi: 10.48550/arXiv.2505.15917
      accessed: '2026-08-11'
      note: 'Craig Gidney, Google Quantum AI. Confirmed as preprint-only — not peer-reviewed as of access date (ResearchGate and arXiv both confirm no peer review). CC BY 4.0. The current leading surface-code estimate. Confirmed: <1M qubits, <1 week, 0.1%/1µs/10µs assumptions, ~20x reduction vs 2019.'
    - url: https://eprint.iacr.org/2026/280
      role: corroborating
      title: 'Reducing the Number of Qubits in Quantum Discrete Logarithms on Elliptic Curves'
      publisher: 'IACR ePrint / EUROCRYPT 2026'
      date: '2026-03-01'
      identifier: 'ePrint 2026/280'
      accessed: '2026-08-09'
      note: 'Chevignard, Fouque, Schrottenloher (Inria/Univ Rennes). Peer-reviewed at EUROCRYPT 2026. ECC-256 at 1,193 logical qubits (P-256). ePrint correction note confirmed (last revised June 2026): abstract had swapped P-224 (1,098) and P-256 (1,193) values. Correct P-256 figure is 1,193.'
    - url: https://arxiv.org/abs/2602.11457
      role: corroborating
      title: 'The Pinnacle Architecture: Reducing the cost of breaking RSA-2048 to 100 000 physical qubits using quantum LDPC codes'
      publisher: arXiv
      date: '2026-02-12'
      identifier: 'arXiv:2602.11457'
      doi: 10.48550/arXiv.2602.11457
      accessed: '2026-08-09'
      note: 'Webster, Berent, Chandra et al., Iceberg Quantum (Sydney). Preprint, not peer-reviewed. Claims <100,000 physical qubits using qLDPC codes at 10^-3 error rate; runtime ~1 month. Gidney has noted concerns about assumptions. v2 posted May 2026.'
    - url: https://arxiv.org/abs/2607.13816
      role: corroborating
      title: 'Quantum Algorithm for Elliptic Curve Discrete Logarithms with Space-Efficient Point Addition'
      publisher: arXiv
      date: '2026-07-15'
      identifier: 'arXiv:2607.13816'
      doi: 10.48550/arXiv.2607.13816
      accessed: '2026-08-11'
      note: 'Luo et al. (Peking University / Tsinghua / CAS). Preprint, not peer-reviewed. Claims 835 logical qubits for ECC-256 at ~20x more Toffoli gates than Chevignard/Babbush. Width-optimised; depth tradeoff not yet analysed. Confirmed via arXiv abstract: cites Chevignard P-256 as 1,098 — confirmed error; 1,098 is the P-224 figure per ePrint 2026/280 correction note; correct P-256 is 1,193.'
confidence: high
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-09'
  reviewedOn: '2026-08-11'
  note: 'Gidney arXiv:2505.15917 re-confirmed as preprint-only via arXiv.org and ResearchGate (which notes "may not have been peer reviewed"). Luo et al. arXiv:2607.13816 confirmed via arXiv abstract: 835 qubits for secp256k1, ~20x Toffoli penalty, supersedes 2604.02311. Abstract cites Chevignard P-256 as 1098 (confirmed error). E3 correct. All other figures unchanged.'
---

Gidney (Google Quantum AI, May 2025) showed that the physical-qubit cost of breaking RSA-2048 is under one million — twenty times lower than the 2019 benchmark — through algorithmic improvements requiring no new hardware. Chevignard et al. (EUROCRYPT 2026) extended the same approach to ECC-256, reaching 1,193 logical qubits.

A further preprint from Iceberg Quantum (arXiv:2602.11457, February 2026, updated May 2026) claims the Pinnacle Architecture — built on qLDPC codes rather than surface codes — reduces RSA-2048 to under 100,000 physical qubits at the same error-rate assumption (10⁻³), with a runtime of approximately one month. This is a compelling theoretical result but uses a more demanding architectural approach: qLDPC codes require higher qubit connectivity and more complex decoders than surface codes. The paper has not been peer-reviewed and Craig Gidney has publicly noted specific concerns about its assumptions.

Luo et al. (arXiv:2607.13816, July 2026) claim the ECC-256 logical qubit count can be reduced further to 835, using a space-efficient modular inversion circuit. This comes at a cost: approximately 20 times more Toffoli gates than the Chevignard and Babbush alternatives. A smaller quantum computer running 20 times more expensive gates is a different shape of machine; the net cost in wall-clock time has not been analysed.

All results are theoretical resource estimates; no machine capable of running these circuits exists. The trajectory from 20 million (2019) to under 1 million (2025) to a claimed under 100,000 (2026) represents a genuine and consequential compression of the hardware gap, driven entirely by algorithmic and architectural innovation.
