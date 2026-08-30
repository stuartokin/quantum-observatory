---
schema: news/v1
id: 2026-06-12-nist-piv-pqc-dual-stack-working-drafts
headline: 'NIST releases working drafts for post-quantum updates to PIV identity standards using a dual-stack model'
pillar: quantum
date: '2026-06-12'
plain: 'Personal Identity Verification credentials underpin physical and logical access across the US federal government. NIST has released working drafts of proposed updates to SP 800-73 and SP 800-78 that would add ML-DSA signatures and ML-KEM key encapsulation to PIV cards, alongside — not replacing — existing classical keys. A dual-stack model means current PIV tokens remain valid during the transition, avoiding a forced simultaneous upgrade. These are preliminary working materials, not a formal public draft, but they indicate the direction of the specification and invite implementer feedback now.'
significance: notable
source:
  url: https://www.nist.gov/news-events/news/2026/06/working-drafts-post-quantum-cryptography-updates-piv-standards
  kind: authority
  title: 'Working Drafts: Post-Quantum Cryptography Updates to the PIV Standards'
  publisher: NIST
  date: '2026-06-12'
corroboration:
  - url: https://csrc.nist.gov/pubs/sp/800/73/pt1/6/iwd
    publisher: NIST CSRC
    kind: authority
  - url: https://csrc.nist.gov/News/2026/pqc-updates-to-piv-standards-working-drafts
    publisher: NIST CSRC
    kind: authority
validation:
  status: verified
  checks:
    - 'NIST news page opened; confirms SP 800-73 Parts 1 and 2, and SP 800-78 working drafts published 12 June 2026'
    - 'CSRC publication page for SP 800-73-6 Part 1 opened directly; confirms dual-stack model description and open comment period'
    - 'CSRC news page opened as second authority corroboration; consistent'
    - 'Drafts are labelled preliminary working materials, not formal public drafts — distinction preserved in plain text'
    - 'No contradicting authority document found'
about:
  - mig-hardware-roots
  - mig-crypto-agility
  - pqc-fips-203
  - pqc-fips-204
establishedBy:
  - url: https://csrc.nist.gov/publications/detail/fips/203/final
    title: 'FIPS 203: Module-Lattice-Based Key-Encapsulation Mechanism Standard'
    relation: applies
    date: '2024-08-13'
  - url: https://csrc.nist.gov/publications/detail/fips/204/final
    title: 'FIPS 204: Module-Lattice-Based Digital Signature Standard'
    relation: applies
    date: '2024-08-13'
actors:
  - NIST
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

PIV credentials are used for both physical access to facilities and logical access to federal IT systems. Updating them to post-quantum algorithms requires changes across three specification documents: the card application namespace, the command interface, and the cryptographic algorithm profile (SP 800-73 Parts 1 and 2, and SP 800-78). All three were released as working drafts simultaneously on 12 June 2026.

The dual-stack approach preserves existing classical PIV keys and data objects while adding new key references, certificate containers, and data objects for PQC credentials. This means existing card readers and middleware do not need to be replaced simultaneously with the cards, and incremental deployment is possible during the transition window.

A supporting PQC Overview accompanies the drafts, presenting a gap analysis of what needs to change across the PIV algorithm profile, command interface, and data model. NIST explicitly labels these preliminary working materials rather than formal public drafts and is soliciting feedback throughout development via a public mailing list. The comment period has no closing date.
