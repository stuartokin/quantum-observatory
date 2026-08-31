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
  - Google Quantum AI
  - Craig Gidney
  - Iceberg Quantum
  - Clemence Chevignard
  - Andre Schrottenloher
  - Inria / Univ Rennes
  - Oratomic
  - Caltech
country:
  - US
  - AU
  - FR
metrics:
  - name: Physical qubits to factor RSA-2048 (surface code, 2019 baseline)
    value: '20000000'
    unit: physical qubits
    note: Gidney and Ekerå (arXiv:1905.09749; Quantum 5, 433, 2021). 8-hour runtime; 0.1% gate error, 1 µs surface code cycle, 10 µs reaction time, nearest-neighbour 2D grid. The baseline all subsequent estimates reduce from.
  - name: Physical qubits to factor RSA-2048 (surface code)
    value: <1000000
    unit: physical qubits
    note: Gidney 2025 (arXiv:2505.15917). Assumes 0.1% gate error, 1 µs surface code cycle, 10 µs reaction time, nearest-neighbour 2D grid. Runtime under one week.
  - name: Physical qubits to factor RSA-2048 (qLDPC, Pinnacle Architecture)
    value: <100000
    unit: physical qubits
    note: Webster et al. 2026 (arXiv:2602.11457, Iceberg Quantum). Assumes 10^-3 gate error, 1 µs code cycle, 10 µs reaction time. Preprint, not peer-reviewed. Runtime approximately one month.
  - name: Reduction vs 2019 estimate (surface code)
    value: '20'
    unit: times fewer qubits
    note: Prior Gidney+Ekerå 2019 estimate (arXiv:1905.09749) was 20 million qubits in 8 hours under same physical assumptions.
  - name: Logical qubits for ECC-256 ECDLP (2020 baseline)
    value: '2124'
    unit: logical qubits
    note: Häner, Jaques, Naehrig, Roetteler, Soeken (arXiv:2001.09580; PQCrypto 2020). Prior state of the art explicitly cited by Chevignard 2026 as the baseline their 1,193-qubit result improved on.
  - name: Logical qubits for ECC-256
    value: '1193'
    unit: logical qubits
    note: Chevignard/Fouque/Schrottenloher EUROCRYPT 2026 (ePrint 2026/280). Width-optimised; high gate count. Luo et al. arXiv:2607.13816 claims further reduction to 835 logical qubits but at ~20x more Toffoli gates than Chevignard/Babbush alternatives; not peer-reviewed.
  - name: Physical qubits for ECC-256/P-256 ECDLP (neutral-atom qLDPC, few-days runtime)
    value: '26000'
    unit: physical qubits
    note: Cain et al. arXiv:2603.28627. Neutral-atom qLDPC, 1ms cycle, ~10 days. Contested framing; 10K/117-yr variant excluded per decisions file.
links:
  - to: crqc
    relation: evidence-for
  - to: algo-shor
    relation: enables
  - to: qec-surface-code
    relation: depends-on
priority: P0
qdayImpact: 3
qdayReasoning: 'The resource estimates for breaking RSA-2048 have fallen from 20 million physical qubits (Gidney+Ekerå 2019) to under one million (Gidney 2025, surface code) to a claimed under 100,000 (Pinnacle Architecture, Iceberg Quantum, 2026 preprint using qLDPC codes) — without any hardware advancing. The Gidney 2025 result is the most credible current estimate: it uses the same conservative assumptions as 2019, is from Google Quantum AI, and is widely cited. The Pinnacle Architecture result is a preprint from a startup, uses a more demanding architecture (qLDPC requires higher connectivity and more complex decoders than surface code), and has not been independently validated. Craig Gidney has noted specific concerns with its assumptions. If the Pinnacle claim holds under scrutiny, it would represent a further tenfold reduction. Together, the trajectory of estimates from 2019-2026 — two to three orders of magnitude — is the strongest signal that algorithmic improvements alone are materially narrowing the gap between demonstrated hardware and a CRQC. Impact raised to +3 from +2: the 2019-to-2025 reduction alone would have been scored +2, but the further 2026 preprint (even at E3) accelerates a trend that now spans three orders of magnitude. Cain et al. (Oratomic/Caltech, arXiv:2603.28627) additionally estimate 26,000 neutral-atom qubits for P-256 ECDLP in ~10 days via high-rate qLDPC at 1ms cycle — neutral-atom-specific, unreviewed, framing contested; included for completeness of the space-time tradeoff landscape.'
horizon: 2
novelty: 'Three-orders-of-magnitude reduction in physical-qubit requirement for RSA-2048 attack via algorithmic advances alone (2019-2026)'
evidence:
  claim: Gidney (Google Quantum AI, arXiv:2505.15917, May 2025) estimates that a 2048-bit RSA integer can be factored in under one week by a quantum computer with fewer than one million noisy qubits, under the same assumptions as Gidney+Ekerå 2019 (0.1% gate error, 1 µs surface code cycle, 10 µs reaction time, nearest-neighbour 2D grid). The twenty-fold qubit reduction comes from approximate residue arithmetic, yoked surface code storage, and reduced magic-state distillation overhead. Chevignard, Fouque, and Schrottenloher (EUROCRYPT 2026, ePrint 2026/280) separately estimate ECC-256 requires 1,193 logical qubits, down from 2,124 in Häner et al. (arXiv:2001.09580, PQCrypto 2020). Luo et al. (arXiv:2607.13816, July 2026) claim 835. Babbush et al. (arXiv:2603.28846, March 2026) give <1,200 for secp256k1 and <500,000 physical qubits, with circuits withheld under responsible disclosure. None is a demonstration; all are estimates for machines that do not exist. Webster et al. (Iceberg Quantum, arXiv:2602.11457, February 2026) claim qLDPC codes reduce RSA-2048 to under 100,000 physical qubits at ~one-month runtime — a further tenfold reduction from Gidney 2025, not peer-reviewed. Independent replication of the full resource counts for any of these estimates has not been published.
  level: E3
  verified: '2026-08-19'
  sources:
    - url: https://quantum-journal.org/papers/q-2021-04-15-433/
      role: corroborating
      title: How to factor 2048 bit RSA integers in 8 hours using 20 million noisy qubits
      publisher: Quantum
      date: '2021-04-15'
      identifier: 'Quantum 5, 433 (2021); arXiv:1905.09749'
      doi: 10.22331/q-2021-04-15-433
      accessed: '2026-08-19'
      note: Gidney and Ekerå. Peer-reviewed. Sets the 20 M qubit / 8-hour RSA-2048 baseline at 0.1% gate error, 1 µs surface code cycle, 10 µs reaction time. The baseline Gidney 2025 reduces from.
    - url: https://arxiv.org/abs/2001.09580
      role: corroborating
      title: Improved quantum circuits for elliptic curve discrete logarithms
      publisher: 'PQCrypto 2020 / Springer LNCS 12100'
      date: '2020-01-27'
      identifier: 'arXiv:2001.09580; DOI 10.1007/978-3-030-44223-1_23'
      doi: 10.1007/978-3-030-44223-1_23
      accessed: '2026-08-19'
      note: Häner, Jaques, Naehrig, Roetteler, Soeken. Peer-reviewed conference paper. Estimates 2,124 logical qubits for ECC-256 ECDLP. Explicit prior-state-of-art cited by Chevignard 2026 EUROCRYPT.
    - url: https://arxiv.org/abs/2505.15917
      role: preprint
      title: How to factor 2048 bit RSA integers with less than a million noisy qubits
      publisher: arXiv
      date: '2025-05-21'
      identifier: arXiv:2505.15917
      doi: 10.48550/arXiv.2505.15917
      accessed: '2026-08-11'
      note: 'Craig Gidney, Google Quantum AI. Confirmed as preprint-only — not peer-reviewed as of access date. CC BY 4.0. The current leading surface-code estimate. Confirmed: <1M qubits, <1 week, 0.1%/1µs/10µs assumptions, ~20x reduction vs 2019.'
    - url: https://eprint.iacr.org/2026/280
      role: corroborating
      title: Reducing the Number of Qubits in Quantum Discrete Logarithms on Elliptic Curves
      publisher: 'IACR ePrint / EUROCRYPT 2026'
      date: '2026-03-01'
      identifier: ePrint 2026/280
      accessed: '2026-08-09'
      note: 'Chevignard, Fouque, Schrottenloher (Inria/Univ Rennes). Peer-reviewed at EUROCRYPT 2026. ECC-256 at 1,193 logical qubits (P-256). ePrint correction note (last revised June 2026): abstract had swapped P-224 (1,098) and P-256 (1,193) values. Correct P-256 figure is 1,193.'
    - url: https://arxiv.org/abs/2602.11457
      role: corroborating
      title: 'The Pinnacle Architecture: Reducing the cost of breaking RSA-2048 to 100 000 physical qubits using quantum LDPC codes'
      publisher: arXiv
      date: '2026-02-12'
      identifier: arXiv:2602.11457
      doi: 10.48550/arXiv.2602.11457
      accessed: '2026-08-09'
      note: Webster, Berent, Chandra et al., Iceberg Quantum (Sydney). Preprint, not peer-reviewed. Claims <100,000 physical qubits using qLDPC codes at 10^-3 error rate; runtime ~1 month. Gidney has noted concerns about assumptions. v2 posted May 2026.
    - url: https://arxiv.org/abs/2603.28846
      role: corroborating
      title: 'Securing Elliptic Curve Cryptocurrencies against Quantum Vulnerabilities: Resource Estimates and Mitigations'
      publisher: arXiv
      date: '2026-03-30'
      identifier: arXiv:2603.28846v2
      doi: 10.48550/arXiv.2603.28846
      accessed: '2026-08-18'
      note: 'Babbush, Zalcman, Gidney et al. (Google Quantum AI, Stanford, Berkeley, Ethereum Foundation). ECDLP-256 on secp256k1 in <1,200 logical qubits and <90M Toffoli gates; <500,000 physical qubits at 1e-3, minutes-scale. Circuits withheld under responsible disclosure, validated by ZK proof. Trail of Bits found vulnerabilities in the Rust prover (April 2026), patched; scientific claims unaffected. Schrottenloher arXiv:2606.02235 corroborates with full circuits. E3 per 2026-08-16 precedent: arXiv preprint with co-authors outside sponsoring institution.'
    - url: https://arxiv.org/abs/2607.13816
      role: corroborating
      title: Quantum Algorithm for Elliptic Curve Discrete Logarithms with Space-Efficient Point Addition
      publisher: arXiv
      date: '2026-07-15'
      identifier: arXiv:2607.13816
      doi: 10.48550/arXiv.2607.13816
      accessed: '2026-08-11'
      note: Luo et al. (Peking University / Tsinghua / CAS). Preprint, not peer-reviewed. Claims 835 logical qubits for ECC-256 via space-efficient modular inversion. Uses ~20x more Toffoli gates than Chevignard/Babbush alternatives. Supersedes same group arXiv:2604.02311. Abstract cites Chevignard P-256 as 1,098 — confirmed error; 1,098 is the P-224 figure per ePrint 2026/280 correction note.
    - url: https://arxiv.org/abs/2603.28627
      role: corroborating
      title: 'Shor''s algorithm is possible with as few as 10,000 reconfigurable atomic qubits'
      publisher: arXiv
      date: '2026-03-30'
      identifier: arXiv:2603.28627
      doi: 10.48550/arXiv.2603.28627
      accessed: '2026-08-18'
      note: 'Cain, Xu, King, Picard, Levine, Endres, Preskill, Huang, Bluvstein; Oratomic and Caltech. Preprint, not peer-reviewed. 26,000 physical qubits for P-256 ECDLP in ~10 days using high-rate lifted-product qLDPC on neutral-atom hardware with 1ms stabilizer cycle. The 10,000-qubit minimum requires ~117 years and is excluded per board scope (decisions file space/time rule). Contested framing: scirate review notes estimates from different optimization regimes may be combined non-self-consistently.'
confidence: high
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-19'
  reviewedOn: '2026-08-31'
  note: arXiv:2505.15917 confirmed still preprint per arXiv HTML (no journal record; HTML date shows Aug 24 2026 suggesting minor update). E3 correct for primary source. New paper arXiv:2605.03951 (Xue & Covey, modular atomic processor, ~500k qubits for RSA-2048) noted in run summary under Worth Scout's attention — not added here as it needs Scout evaluation first. No downward corrections.
---
