---
schema: news/v1
id: 2026-05-14-nist-nine-pqc-signature-candidates-round-3
headline: 'NIST advances nine additional PQC digital signature candidates to a third evaluation round, spanning four distinct mathematical families'
pillar: quantum
date: '2026-05-14'
plain: 'NIST has three finalised PQC standards for digital signatures — ML-DSA, SLH-DSA, and FN-DSA — but all share narrow mathematical foundations. This third evaluation round builds insurance: algorithms based on codes, multivariate polynomials, isogenies, and zero-knowledge proofs that would remain secure even if a flaw emerged in the lattice or hash families underlying the current standards. Nine candidates advance: FAEST, HAWK, MAYO, MQOM, QR-UOV, SDitH, SNOVA, SQIsign, and UOV. Only HAWK is lattice-based, and on different assumptions than ML-DSA. Five candidates were eliminated. The third round is expected to run approximately two years, meaning standardisation of backup signature algorithms is likely by 2028 — relevant to organisations that need cryptographic diversity beyond what the current three standards provide.'
significance: notable
source:
  url: https://nvlpubs.nist.gov/nistpubs/ir/2026/NIST.IR.8610.pdf
  kind: standard
  title: 'NIST IR 8610: Status Report on the Second Round of the Additional Digital Signature Schemes for the NIST PQC Standardization Process'
  publisher: NIST
  date: '2026-05-14'
corroboration:
  - url: https://www.nist.gov/news-events/news/2026/05/nine-candidates-advance-third-round-additional-digital-signatures-pqc
    publisher: NIST
    kind: authority
  - url: https://quantumcomputingreport.com/nist-advances-nine-post-quantum-digital-signature-candidates-to-third-evaluation-round/
    publisher: 'Quantum Computing Report'
    kind: journalism
validation:
  status: verified
  checks:
    - 'NIST.gov news announcement opened directly; confirms May 14 2026 date and lists nine advancing candidates by name'
    - 'NIST IR 8610 PDF URL (nvlpubs.nist.gov) confirmed; document names nine candidates as FAEST, HAWK, MAYO, MQOM, QR-UOV, SDitH, SNOVA, SQIsign, and UOV'
    - 'CSRC.nist.gov project page corroborates the announcement'
    - 'Quantum Computing Report provides independent context confirming the five eliminated candidates (CROSS, LESS, Mirath, PERK, RYDE) and the 18-month second-round timeline'
    - 'Authority-level primary source; verification straightforward'
about:
  - pqc-fips-204
  - pqc-fips-205
  - pqc-fips-206-falcon
  - mig-crypto-agility
establishedBy:
  - url: https://nvlpubs.nist.gov/nistpubs/ir/2026/NIST.IR.8610.pdf
    title: 'NIST IR 8610'
    relation: reports
    date: '2026-05-14'
actors: [NIST]
country: [US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The nine advancing candidates span four distinct mathematical families. HAWK is the sole lattice-based candidate, resting on different assumptions than ML-DSA (CRYSTALS-Dilithium). The remaining eight draw on code-based cryptography (MAYO, SNOVA, QR-UOV), multivariate systems (UOV, MQOM), hash-based zero-knowledge proofs (FAEST, SDitH), and isogenies (SQIsign).

Five candidates were eliminated during the second round: CROSS, LESS, Mirath, PERK, and RYDE — due to uncompetitive performance trade-offs or security vulnerabilities identified during the 18-month evaluation.

The second evaluation round began October 24, 2024 and ran through May 14, 2026. The Sixth NIST PQC Standardization Conference was held September 24–26, 2025 in Gaithersburg, Maryland. A Seventh conference is planned for late spring/early summer 2027, also in or near Gaithersburg. Submission teams for the advancing candidates have until August 14, 2026 to submit updated specifications and implementations.
