---
schema: frontier/v1
id: mig-sp800-57pt1r6
title: 'NIST SP 800-57 Part 1 Rev. 6: key-management guidance updated for PQC algorithms'
summary: 'First revision of NIST foundational key-management guidance to incorporate ML-KEM, ML-DSA, and SLH-DSA. IPD published December 2025; comment period closed February 2026; no final version published as of August 2026.'
plain: 'NIST SP 800-57 Part 1 is the document most organisations use as the policy foundation for how cryptographic keys are managed — what algorithms are approved, how long keys should stay in service, and how they should be stored and protected. Revision 5, published in 2020, predates the post-quantum algorithms. Revision 6 (currently in draft) is the first edition to include ML-KEM, ML-DSA, and SLH-DSA (the three NIST-standardised post-quantum algorithms) alongside the security categories from the PQC competition. It also removes hardcoded algorithm approval timelines and points instead to SP 800-131A, which NIST keeps current. The draft closed its public comment period in February 2026; no final version has been published. Until it is final, organisations cannot update their key-management policies to formally reference the new PQC algorithms under this guidance.'
pillar: cyber
constellation: migration
cluster: standards
readiness: emerging
priority: P1
qdayImpact: 0
country:
  - US
actors:
  - 'Elaine Barker (NIST)'
  - 'William Barker (NIST / Strativia)'
metrics:
  - name: 'Comment period'
    value: 'December 5, 2025 – February 5, 2026'
  - name: 'Algorithms added'
    value: 'ML-KEM (FIPS 203), ML-DSA (FIPS 204), SLH-DSA (FIPS 205)'
  - name: 'Final version published'
    value: 'No — IPD only as of August 2026'
links:
  - to: pqc-fips-203
    relation: depends-on
  - to: pqc-fips-204
    relation: depends-on
  - to: pqc-fips-205
    relation: depends-on
  - to: mig-crypto-agility
    relation: enables
evidence:
  level: E3
  claim: 'NIST published the initial public draft of SP 800-57 Part 1 Revision 6 on December 5, 2025, with a comment period closing February 5, 2026. The draft incorporates the quantum-resistant algorithms specified in FIPS 203 (ML-KEM), FIPS 204 (ML-DSA), and FIPS 205 (SLH-DSA), and includes the security categories from the PQC competition. Algorithm approval timelines have been removed and replaced with references to SP 800-131A. As of August 2026, no final version has been published; SP 800-57 Part 1 Revision 5 (2020) remains the active document.'
  verified: '2026-08-24'
  sources:
    - url: 'https://csrc.nist.gov/pubs/sp/800/57/pt1/r6/ipd'
      role: standard
      title: 'Recommendation for Key Management: Part 1 — General (Initial Public Draft)'
      publisher: 'National Institute of Standards and Technology'
      date: '2025-12-05'
      identifier: 'NIST SP 800-57pt1r6.ipd'
      doi: '10.6028/NIST.SP.800-57pt1r6.ipd'
      accessed: '2026-08-24'
      note: 'IPD only; no final version published as of August 2026. Source confirmed via csrc.nist.gov publication page. Changes from Rev. 5 listed in the announcement include inclusion of FIPS 203, 204, 205 and PQC security categories.'
confidence: medium
status: draft
origin: agent
added: '2026-08-24'
horizon: 1
novelty: 'First revision of SP 800-57 to incorporate NIST PQC standards'
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-24'
  note: 'Source is the NIST CSRC publication page for the IPD, confirmed December 5, 2025 date and February 5, 2026 comment close. Key-management project news page (csrc.nist.gov/Projects/key-management/news) shows no subsequent final publication. Evidence level E3 per focus instruction and source-type rules: draft guidance from a national technical authority is not yet a formal standard.'
---

## NIST SP 800-57 Part 1 Rev. 6 — key-management guidance updated for PQC

**What happened.** NIST published an initial public draft of SP 800-57 Part 1 Revision 6 on 5 December 2025. This is the first revision of the long-standing NIST key-management recommendation (Part 1 covers general guidance) to formally incorporate ML-KEM, ML-DSA, and SLH-DSA — the three post-quantum algorithms standardised as FIPS 203, 204, and 205 in 2024. The draft also includes the PQC security-category framework and removes the earlier practice of embedding algorithm-approval timelines directly, replacing those references with a pointer to SP 800-131A (which NIST maintains on a rolling basis). The public comment period closed 5 February 2026. No final version has been published as of August 2026.

**Why it matters.** SP 800-57 Part 1 is the document that most organisational key-management policies explicitly cite. Federal agencies and many commercial organisations write their cryptographic policy against it. Until a final Rev. 6 is published, there is no NIST-endorsed framework that formally integrates PQC algorithm guidance into key-management lifecycle decisions — covering cryptoperiods, key types, key storage, and algorithm approval status. The gap between the finalisation of FIPS 203/204/205 (August 2024) and the finalisation of the key-management guidance that governs how those algorithms are deployed is a practical obstacle to migration.

**Previous state of the art.** SP 800-57 Part 1 Revision 5 (May 2020) remains the active document. It predates the PQC standards entirely.

**Limitations.** This is an initial public draft — not a final standard. The evidence level is E3: credible draft guidance from a national technical authority, but not yet formally published. Comments received in the February 2026 round may lead to substantive revisions before finalisation.

**What would change this assessment.** Publication of a final SP 800-57 Part 1 Revision 6 would move this item to `demonstrated` and raise the evidence level to E4. A second public draft issued before finalisation would be noted but would not itself change readiness.
