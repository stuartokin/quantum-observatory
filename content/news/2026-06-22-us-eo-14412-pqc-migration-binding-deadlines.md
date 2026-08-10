---
schema: news/v1
id: 2026-06-22-us-eo-14412-pqc-migration-binding-deadlines
headline: 'US Executive Order 14412 converts post-quantum migration from guidance into binding law with hard 2030 and 2031 federal deadlines'
pillar: quantum
date: '2026-06-22'
plain: 'For four years, post-quantum migration was US government guidance — read it, plan around it, but nobody was making you move. That changed on 22 June 2026. Executive Order 14412 sets a hard deadline of 31 December 2030 for federal high-value assets to complete post-quantum key establishment, and 31 December 2031 for digital signatures. OMB Memorandum M-26-15 arrived two days later with the operational schedule: cryptographic inventories through 2027, pilots through 2028, key establishment done by 2030. The order explicitly extends to federal contractors. Any organisation that depends on or sells to the US federal government now has a procurement clock — not a planning recommendation.'
significance: headline
source:
  url: https://www.federalregister.gov/d/2026-12909
  kind: authority
  title: 'Executive Order 14412 — Securing the Nation Against Advanced Cryptographic Attacks'
  publisher: Federal Register
  date: '2026-06-25'
corroboration:
  - url: https://www.whitehouse.gov/presidential-actions/2026/06/securing-the-nation-against-advanced-cryptographic-attacks/
    publisher: White House
    kind: authority
  - url: https://www.whitehouse.gov/wp-content/uploads/2026/06/M-26-15-Execution-of-the-Migration-to-Post-Quantum-Cryptography.pdf
    publisher: Office of Management and Budget
    kind: authority
  - url: https://openssl-corporation.org/blog/post-quantum-cryptography-now-has-deadlines.html
    publisher: OpenSSL Corporation
    kind: journalism
validation:
  status: verified
  checks:
    - 'Federal Register document 2026-12909 (91 FR 38483) opened directly; binding deadlines of December 31 2030 for key establishment and December 31 2031 for digital signatures confirmed in the text'
    - 'White House presidential actions page opened; signing date June 22 2026 confirmed'
    - 'OMB M-26-15 PDF opened at whitehouse.gov; five-phase migration schedule 2026-2035 and October 2026 agency plan submission deadline confirmed'
    - 'Multiple independent legal and cybersecurity analyses corroborate the deadlines and the contractor-extension scope'
about:
  - harvest-now-decrypt-later
  - mig-crypto-agility
  - mig-discovery
  - pqc-fips-203
  - pqc-fips-204
  - pqc-fips-205
  - mig-supply-chain
establishedBy:
  - url: https://csrc.nist.gov/pubs/fips/203/final
    title: 'FIPS 203: ML-KEM'
    relation: applies
    date: '2024-08'
  - url: https://csrc.nist.gov/pubs/fips/204/final
    title: 'FIPS 204: ML-DSA'
    relation: applies
    date: '2024-08'
  - url: https://csrc.nist.gov/pubs/fips/205/final
    title: 'FIPS 205: SLH-DSA'
    relation: applies
    date: '2024-08'
actors:
  - US Federal Government
  - Office of Management and Budget
  - NIST
  - CISA
country:
  - US
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

Two executive orders were signed on 22 June 2026 and should be read together. EO-14412 is the defensive mandate: it requires the federal government to migrate to NIST-approved post-quantum algorithms. EO-14413, signed the same day, is the offensive complement covering quantum research investment and commercialisation policy.

The enforcement architecture has three layers. EO-14412 sets the statutory authority and the deadlines. OMB M-26-15 (June 24) provides the operational schedule and requires each agency to name a PQC migration lead and submit a full migration plan by October 2026. The Department of War published its own PQC strategy on June 23 covering national-security systems under CNSA 2.0.

Key dates confirmed in the order text:

- **October 2026**: Agency migration plans due to OMB
- **December 31 2027**: Commerce Department pilot of PQC-protected systems required
- **December 31 2030**: Federal High Value Assets and high-impact systems must use PQC for key establishment
- **December 31 2031**: Same systems must use PQC for digital signatures
- **2035**: Remaining systems complete

The contractor extension is explicit: agencies are directed to require federal contractors supporting high-value assets to comply with NIST PQC FIPS standards by end of 2030.

What this is not: EO-14412 does not regulate organisations beyond those with federal contracts, does not cover National Security Systems (those follow CNSA 2.0 under NSPM-12 signed June 12), and does not itself appropriate funding. It is the first US government document to attach procurement consequences to a PQC migration timeline.
