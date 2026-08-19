---
schema: frontier/v1
id: algo-shor
title: 'Hardware gap to Shor at cryptographic scale'
summary: 'The largest number factored by Shor''s algorithm on real quantum hardware is 21. Breaking RSA-2048 or ECC-256 requires hundreds to thousands of error-corrected logical qubits on hardware that does not yet exist. Resource estimates in 2025-2026 quantify the gap; experimental work characterises current hardware limits.'
plain: 'Shor''s algorithm, proven correct in 1994, could break RSA and elliptic-curve cryptography if run on a large enough fault-tolerant quantum computer. The key word is if. The largest number factored using Shor''s algorithm on real quantum hardware is 21 — a result from 2012 that has not been exceeded on actual hardware, even though classical simulators have gone further. Claims of larger factorisations on quantum hardware (N=35, 143, 56,153) either rely on compile-time tricks that assume prior knowledge of the answer, or use methods that are not Shor''s algorithm. Breaking RSA-2048 requires thousands of error-corrected logical qubits running billions of gates; the best machines today hold tens of logical qubits. A December 2025 experimental study ran Shor circuits on cloud quantum processors and found noise overwhelms the algorithmic structure far below cryptographically relevant integers. The 2025-2026 algorithmic papers have sharpened the resource estimates — down to 835 logical qubits for ECC-256 and under one million physical qubits for RSA-2048 — without closing the hardware gap. Those are calculations of what a future machine would need, not demonstrations.'
pillar: quantum
readiness: emerging
constellation: algorithms
cluster: cryptanalysis
priority: P1
qdayImpact: 2
qdayReasoning: 'Two independent groups — Chevignard/Fouque/Schrottenloher (Inria/Univ Rennes, EUROCRYPT 2026) and Babbush et al. (Google Quantum AI / Stanford / Ethereum Foundation, arXiv:2603.28846, March 2026) — estimated ECC-256 discrete logarithm at under 1,200 logical qubits from different algorithmic angles; a July 2026 preprint (Luo et al., arXiv:2607.13816) reduces this further to 835 logical qubits using a space-efficient modular inversion circuit. Babbush et al. additionally map this to under 500,000 physical qubits in minutes on a surface-code superconducting architecture at 10^-3 error rate. Combined with Gidney 2025 reducing RSA-2048 physical qubits to under one million, the algorithmic cost of a CRQC has fallen substantially in 2025-2026 without any hardware advance. This is scored +2: the hardware gap remains enormous — current best machines hold tens of logical qubits against a requirement of hundreds to thousands — but the algorithmic gap has narrowed faster than most risk models assumed, which is a material signal to migration planners.'
actors:
  - 'Univ Rennes / Inria'
  - 'Google Quantum AI'
  - 'ETH Zurich / armasuisse'
  - 'Forschungszentrum Jülich'
country:
  - FR
  - US
  - CH
  - DE
horizon: 3
novelty: 'Logical qubit count for ECC-256 now under 1,200 from two independent groups; hardware gap characterised experimentally on cloud processors (arXiv:2512.15330, Dec 2025)'
metrics:
  - name: Largest integer factored by Shor on real quantum hardware
    value: '21'
    unit: ''
    note: Factored using 10 qubits in 2012; N=35 claimed with compile-time simplifications requiring prior knowledge. Willsch et al. 2025 and Bagourd et al. 2025 confirm this ceiling.
  - name: Physical qubits to factor RSA-2048 (surface code, 2019 baseline)
    value: '20000000'
    unit: physical qubits
    note: Gidney and Ekerå (arXiv:1905.09749; Quantum 5, 433, 2021). 8-hour runtime; 0.1% gate error, 1 µs surface code cycle, 10 µs reaction time. Baseline for all subsequent reductions.
  - name: Physical qubits for RSA-2048 (surface code, leading estimate)
    value: <1000000
    unit: physical qubits
    note: Gidney 2025 (arXiv:2505.15917). Assumes 0.1% gate error, 1 µs surface code cycle. Runtime under one week.
  - name: Logical qubits for ECC-256 ECDLP (2020 baseline)
    value: '2124'
    unit: logical qubits
    note: Häner, Jaques, Naehrig, Roetteler, Soeken (arXiv:2001.09580; PQCrypto 2020). Prior state of the art; the baseline Chevignard 2026 EUROCRYPT explicitly improves on to reach 1,193.
  - name: Logical qubits for ECC P-256 / secp256k1 ECDLP (best current estimate)
    value: '835'
    unit: logical qubits
    note: Luo et al. arXiv:2607.13816, July 2026. Down from 1,193 (Chevignard, EUROCRYPT 2026). Preprint only; not peer-reviewed. Uses ~20x more Toffoli gates than Chevignard/Babbush alternatives; width-optimised at cost of depth.
  - name: Logical qubits for ECC-256 ECDLP (peer-reviewed estimate)
    value: '1193'
    unit: logical qubits
    note: Chevignard et al. EUROCRYPT 2026 (IACR eprint 2026/280). Down from 2,124 (Häner et al. arXiv:2001.09580, PQCrypto 2020). Gate count is O(n^4).
  - name: Logical qubits for secp256k1 ECDLP (Babbush et al. estimate)
    value: <1200
    unit: logical qubits
    note: Babbush et al. arXiv:2603.28846 (Google Quantum AI / Stanford / Ethereum Foundation, March 2026). Preprint; circuits withheld under responsible disclosure; validated by ZK proof. Maps to <500,000 physical qubits in minutes on surface code at 10^-3 error rate.
links:
  - to: algo-resource-estimation
    relation: depends-on
  - to: crqc
    relation: evidence-for
  - to: qec-surface-code
    relation: depends-on
evidence:
  claim: The largest number factored by Shor's algorithm on real digital quantum hardware is 21, achieved with 10 qubits in 2012; numbers above 35 on digital QC rely on compile-time simplifications requiring prior knowledge of the answer, which Willsch et al. (NIC Symposium 2025, arXiv:2410.14397, Forschungszentrum Jülich) formally prove cause algorithm failure under noise. Bagourd et al. (ETH Zurich / armasuisse, arXiv:2512.15330, December 2025) experimentally ran Shor order-finding circuits on cloud superconducting processors and found that noise overwhelms algorithmic structure before cryptographically relevant integers are reached, confirming a substantial gap between current hardware and deployed key sizes. On the algorithmic side, the 2019 baseline (Gidney and Ekerå, arXiv:1905.09749, Quantum 5, 433) required 20 million physical qubits for RSA-2048 in 8 hours; Gidney 2025 (arXiv:2505.15917) reduces this to under one million in under one week under the same hardware assumptions. For ECC-256, Häner et al. (arXiv:2001.09580, PQCrypto 2020) set the 2,124 logical qubit baseline; Chevignard, Fouque and Schrottenloher (EUROCRYPT 2026, IACR eprint 2026/280) estimate 1,193 logical qubits; Luo et al. (arXiv:2607.13816, July 2026) subsequently claim 835 via a space-efficient circuit. None of these are demonstrations; all are resource estimates for future fault-tolerant machines. No machine capable of running these circuits exists.
  level: E3
  verified: '2026-08-19'
  sources:
    - url: https://arxiv.org/abs/2512.15330
      role: primary
      title: Practical Challenges in Executing Shor's Algorithm on Existing Quantum Platforms
      publisher: arXiv
      date: '2025-12-17'
      identifier: arXiv:2512.15330
      doi: 10.48550/arXiv.2512.15330
      accessed: '2026-08-09'
      note: Bagourd, Jang-Jaccard, Lenders, Mermoud, Hoefler, Hempel; ETH Zurich / armasuisse. Preprint v3. Experimentally characterises hardware gap on cloud quantum processors. CC BY 4.0.
    - url: https://arxiv.org/abs/2410.14397
      role: corroborating
      title: The State of Factoring on Quantum Computers
      publisher: NIC Symposium 2025 / arXiv
      date: '2024-10-18'
      identifier: arXiv:2410.14397; NIC Series 52, 239-250 (2025)
      doi: 10.48550/arXiv.2410.14397
      accessed: '2026-08-09'
      note: Willsch et al.; Forschungszentrum Jülich / FH Aachen. Conference proceedings NIC Symposium 2025. Formally proves Shor fails under noise; confirms N<=35 ceiling on digital QC hardware. v2 updated May 2025.
    - url: https://quantum-journal.org/papers/q-2021-04-15-433/
      role: corroborating
      title: How to factor 2048 bit RSA integers in 8 hours using 20 million noisy qubits
      publisher: Quantum
      date: '2021-04-15'
      identifier: Quantum 5, 433 (2021); arXiv:1905.09749
      doi: 10.22331/q-2021-04-15-433
      accessed: '2026-08-19'
      note: Gidney and Ekerå. Peer-reviewed. Sets the 20 M qubit / 8-hour RSA-2048 baseline. The starting point of the qubit-reduction trend.
    - url: https://arxiv.org/abs/2001.09580
      role: corroborating
      title: Improved quantum circuits for elliptic curve discrete logarithms
      publisher: PQCrypto 2020 / Springer LNCS 12100
      date: '2020-01-27'
      identifier: arXiv:2001.09580; DOI 10.1007/978-3-030-44223-1_23
      doi: 10.1007/978-3-030-44223-1_23
      accessed: '2026-08-19'
      note: Häner, Jaques, Naehrig, Roetteler, Soeken. Peer-reviewed. 2,124 logical qubits for ECC-256 ECDLP. Baseline cited by Chevignard 2026 EUROCRYPT.
    - url: https://eprint.iacr.org/2026/280
      role: corroborating
      title: Reducing the Number of Qubits in Quantum Discrete Logarithms on Elliptic Curves
      publisher: EUROCRYPT 2026 / IACR Cryptology ePrint Archive
      date: '2026-03-01'
      identifier: IACR eprint 2026/280
      accessed: '2026-08-09'
      note: 'Chevignard, Fouque, Schrottenloher. Peer-reviewed at EUROCRYPT 2026. Achieves 1,193 logical qubits for P-256. ePrint correction note (last revised June 2026): abstract originally swapped P-224 (1,098) and P-256 (1,193) values; corrected P-256 value is 1,193.'
    - url: https://arxiv.org/abs/2607.13816
      role: corroborating
      title: Quantum Algorithm for Elliptic Curve Discrete Logarithms with Space-Efficient Point Addition
      publisher: arXiv
      date: '2026-07-15'
      identifier: arXiv:2607.13816
      doi: 10.48550/arXiv.2607.13816
      accessed: '2026-08-11'
      note: Luo, Yang, Luo, Wang, Su, Sun, Li, Li; Peking University / Tsinghua / CAS. Preprint, not peer-reviewed. Claims 835 logical qubits for ECC-256 via space-efficient modular inversion. Uses ~20x more Toffoli gates than Chevignard/Babbush alternatives. Supersedes same group arXiv:2604.02311. Abstract cites Chevignard P-256 as 1,098 — confirmed error; 1,098 is the P-224 figure per ePrint 2026/280 correction note.
    - url: https://arxiv.org/abs/2603.28846
      role: corroborating
      title: 'Securing Elliptic Curve Cryptocurrencies against Quantum Vulnerabilities: Resource Estimates and Mitigations'
      publisher: arXiv
      date: '2026-03-30'
      identifier: arXiv:2603.28846
      doi: 10.48550/arXiv.2603.28846
      accessed: '2026-08-16'
      note: Babbush, Zalcman, Gidney et al. (Google Quantum AI / Stanford / Ethereum Foundation / UC Berkeley). Preprint, not peer-reviewed. Circuits withheld under responsible disclosure; ZK proof used. Trail of Bits found memory safety and logic vulnerabilities in Google Rust prover (April 2026); Google patched, scientific claims described as unaffected. E3 per 2026-08-16 decisions precedent.
    - url: https://arxiv.org/abs/2505.15917
      role: corroborating
      title: How to factor 2048 bit RSA integers with less than a million noisy qubits
      publisher: arXiv
      date: '2025-05-21'
      identifier: arXiv:2505.15917
      doi: 10.48550/arXiv.2505.15917
      accessed: '2026-08-09'
      note: Craig Gidney, Google Quantum AI. Preprint. <1M qubits, <1 week, same hardware assumptions as Gidney+Ekerå 2019. The 20x qubit reduction from the 2019 baseline.
confidence: high
status: published
origin: agent
added: '2026-08-09'
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-19'
  reviewedOn: '2026-08-18'
  note: Focus run 2026-08-19. Added Gidney+Ekerå 2019 (arXiv:1905.09749; Quantum 5, 433, 2021) as RSA-2048 physical qubit baseline metric and source. Added Häner et al. 2020 (arXiv:2001.09580; PQCrypto 2020) as ECC-256 logical qubit baseline metric and source. Both were referenced in prose/metric notes but absent from evidence.sources; the Trends derivation requires source records. evidence.claim updated to name both identifiers explicitly.
---

Shor's algorithm is proven correct and its asymptotic advantage over classical factoring is well established. The open question is not whether it works in principle but when hardware will be capable of running it at cryptographically relevant parameters. The answer, as of mid-2026, is: not yet, and not imminently.

**What hardware can do today.** The largest number factored by Shor's algorithm on a real quantum processor is 21 — a result from 2012 achieved with 10 qubits, and one that has not been exceeded on actual hardware. Claims of larger factorisations on quantum hardware (N = 35, N = 143, N = 56,153) either rely on compile-time simplifications that require prior knowledge of the answer — making them equivalent to verifying rather than finding factors — or use methods that are not Shor's algorithm. Willsch et al. (Forschungszentrum Jülich, NIC Symposium 2025) prove formally that gate noise causes Shor's algorithm to fail and confirm N ≤ 35 as the practical ceiling on digital quantum hardware. Bagourd et al. (ETH Zurich / armasuisse, arXiv:2512.15330, December 2025) ran Shor order-finding circuits on cloud superconducting processors and experimentally confirmed that noise overwhelms the algorithmic structure far below cryptographically relevant key sizes.

**What the resource estimates say.** Breaking RSA-2048 requires fewer than one million noisy physical qubits (Gidney 2025, arXiv:2505.15917) running a surface-code fault-tolerant circuit for under one week. Breaking ECC-256 requires 1,193 logical qubits (Chevignard et al., EUROCRYPT 2026) — now reduced to 835 by Luo et al. (arXiv:2607.13816, July 2026, Peking University / CAS) using a space-efficient modular inversion circuit. Separately, Babbush et al. (Google Quantum AI / Stanford / Ethereum Foundation, arXiv:2603.28846, March 2026) estimate secp256k1 ECDLP-256 at under 1,200 logical qubits and under 500,000 physical qubits on a planar superconducting surface-code architecture at 10⁻³ error rate, executing in minutes — with circuits withheld under responsible disclosure and results validated by zero-knowledge proof. Trail of Bits found and exploited memory safety and logic vulnerabilities in Google's Rust prover to forge a proof; Google patched the code and describes their scientific claims as unaffected. An independent preprint (Schrottenloher, Inria, arXiv:2606.02235, June 2026) provides similar circuit results with full disclosure, corroborating the ballpark. These are resource estimates for machines that do not exist, not demonstrations.

**The gap.** Current state-of-the-art: ~48 error-corrected logical qubits (Quantinuum Helios, 98 physical qubits, iceberg codes). Required for ECC-256: ~835 logical qubits minimum. Required for RSA-2048: thousands of logical qubits backed by hundreds of thousands to millions of physical qubits. The gap is not one of kind but of scale, and it remains large. See algo-resource-estimation for the full trajectory of qubit estimates from 2019 to 2026.
