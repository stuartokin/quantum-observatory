---
schema: news/v1
id: 2025-03-11-nist-selects-hqc-fourth-round-pqc
headline: NIST selects HQC for standardisation, adding a code-based non-lattice KEM as backup to ML-KEM
pillar: quantum
date: '2025-03-11'
plain: NIST announced on March 11 2025 that HQC — a key-encapsulation mechanism based on error-correcting codes rather than lattice mathematics — will be standardised as the fifth post-quantum cryptography algorithm. All four previously standardised algorithms rest on lattice-based or hash-based problems; HQC provides insurance if future advances undermine lattices. A draft standard will be released for public comment before finalisation in approximately two years. ML-KEM (FIPS 203) remains the primary recommended KEM for organisations beginning migration now.
significance: notable
source:
  url: https://csrc.nist.gov/news/2025/hqc-announced-as-a-4th-round-selection
  kind: authority
  title: 'HQC Announced as a 4th Round Selection'
  publisher: NIST CSRC
  date: '2025-03-11'
corroboration:
  - url: https://nvlpubs.nist.gov/nistpubs/ir/2025/NIST.IR.8545.pdf
    publisher: NIST
    kind: authority
  - url: https://utimaco.com/news/blog-posts/pqc-news-nist-announces-hqc-fifth-algorithm-be-standardized
    publisher: Utimaco
    kind: journalism
validation:
  status: verified
  checks:
    - 'NIST CSRC news page opened directly; selection date March 11 2025 confirmed; text states HQC was selected after a thorough fourth-round evaluation'
    - 'NIST IR 8545 (full fourth-round status report) confirmed as accompanying technical document; explains why HQC was chosen over BIKE and why Classic McEliece was not selected'
    - 'Confirmed: FIPS 203 (ML-KEM) remains primary KEM; HQC is positioned as non-lattice backup'
    - 'Noted: draft standard not yet published at time of this selection announcement; finalisation expected in approximately two years'
about:
  - pqc-hqc
  - mig-crypto-agility
establishedBy:
  - url: https://nvlpubs.nist.gov/nistpubs/ir/2025/NIST.IR.8545.pdf
    title: Status Report on the Fourth Round of the NIST Post-Quantum Cryptography Standardization Process (NIST IR 8545)
    publisher: NIST
    date: '2025-03'
    relation: reports
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

HQC (Hamming Quasi-Cyclic) is based on the hardness of decoding random linear codes, a problem whose mathematical foundations are independent of the lattice problems underlying CRYSTALS-Kyber (ML-KEM), CRYSTALS-Dilithium (ML-DSA), and FALCON (FN-DSA). If a future mathematical breakthrough — analogous to the 1994 Shor result for factoring — were to undermine lattice problems, HQC would remain secure.

NIST IR 8545 explains the evaluation trade-offs. BIKE was not selected primarily on performance grounds. Classic McEliece, while highly regarded for its security, was not standardised because public keys of hundreds of kilobytes are impractical for most real-world deployments. NIST states it does not anticipate a further KEM standardisation process; the final suite will be ML-KEM plus HQC.

The draft standard for HQC will be released for public comment, with finalisation expected approximately two years after the March 2025 selection. Organisations should not wait for HQC before beginning PQC migration — ML-KEM is final now and should be the primary choice for any migration beginning in 2025 or 2026.
