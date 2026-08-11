---
schema: news/v1
id: 2025-01-07-nist-sp-800-227-kem-guidance-draft
headline: 'NIST releases initial draft of SP 800-227 guidance on implementing post-quantum key-encapsulation mechanisms securely'
pillar: quantum
date: '2025-01-07'
plain: 'FIPS 203 (ML-KEM) was standardised in August 2024 but left organisations without practical guidance on how to deploy it. NIST''s draft SP 800-227 fills that gap: it specifies what properties to verify when implementing a key-encapsulation mechanism, how to handle hybrid combinations with classical algorithms, and what security guarantees KEMs do and do not provide — including the distinction between key agreement and identity authentication, which practitioners frequently conflate. For organisations beginning PQC migration planning, this operational guidance is more immediately actionable than the standard itself. The final SP 800-227 was published September 2025.'
significance: routine
source:
  url: https://csrc.nist.gov/pubs/sp/800/227/ipd
  kind: authority
  title: 'NIST SP 800-227 (Initial Public Draft): Recommendations for Key-Encapsulation Mechanisms'
  publisher: NIST
  date: '2025-01-07'
corroboration:
  - url: https://www.nist.gov/news-events/news/2025/01/recommendations-key-encapsulation-mechanisms-draft-sp-800-227-available
    publisher: NIST
    kind: authority
validation:
  status: verified
  checks:
    - 'NIST CSRC publication page opened directly; date confirmed as January 7, 2025; document history shows 01/07/25 as initial draft'
    - 'NIST news announcement independently confirms the release date and comment period closing March 7, 2025'
    - 'DOI 10.6028/NIST.SP.800-227.ipd confirmed on the CSRC page'
    - 'Final SP 800-227 published September 18, 2025 — confirming January 2025 is the draft date, not the finalisation date'
    - 'No contradicting document found'
about:
  - pqc-fips-203
  - mig-crypto-agility
  - hybrid-tls-mlkem
establishedBy:
  - url: https://csrc.nist.gov/pubs/sp/800/227/ipd
    title: 'NIST SP 800-227 Initial Public Draft: Recommendations for Key-Encapsulation Mechanisms'
    relation: reports
    date: '2025-01-07'
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

The draft covers the basic definitions and security properties of key-encapsulation mechanisms, including correctness, IND-CCA2 security, and key confirmation. It addresses hybrid KEMs — combining a classical algorithm such as X25519 with a post-quantum one such as ML-KEM — and how to sequence shared secret derivation in hybrid constructions.

A key practical contribution is the explicit clarification that key confirmation does not substitute for authentication of identity. This distinction is frequently missed in implementations: a KEM can produce a shared secret that both parties hold without either party being certain who the other party is. SP 800-227 addresses how these layers relate.

NIST held a virtual workshop on the draft February 25–26, 2025. Public comments were accepted through March 7, 2025. The finalised SP 800-227 was published September 18, 2025.
