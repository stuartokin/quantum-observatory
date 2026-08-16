---
schema: frontier/v1
id: pqc-additional-signatures-r3
title: 'NIST IR 8610: nine additional PQC digital-signature candidates in third evaluation round'
summary: 'NIST Internal Report 8610 (May 2026) selects nine post-quantum digital signature algorithms — FAEST, HAWK, MAYO, MQOM, QR-UOV, SDitH, SNOVA, SQIsign, and UOV — for a third evaluation round lasting approximately two years. The process diversifies beyond the lattice-based ML-DSA and FN-DSA already standardised, spanning six distinct mathematical families. Any eventual selections will augment FIPS 204 and FIPS 205, not replace them.'
plain: 'NIST has already published three post-quantum signature standards built mainly on lattice mathematics and hash functions. To guard against the possibility that a future mathematical breakthrough breaks one of those foundations, NIST launched a separate process in 2022 seeking signatures built on entirely different assumptions. After two rounds of public cryptanalysis, nine candidates survive: FAEST (AES/symmetric primitives), HAWK (lattice, different from ML-DSA), SQIsign (supersingular isogenies — tiny 148-byte signatures), UOV, MAYO, QR-UOV and SNOVA (multivariate polynomial families), and MQOM and SDitH (multiparty-computation-in-the-head designs). They enter a third round expected to last around two years. Five others — CROSS, LESS, Mirath, PERK, and RYDE — were eliminated in round two. None are standards yet.'
pillar: cyber
readiness: experimental
constellation: pqc
cluster: digital-signatures
actors:
  - NIST
country:
  - US
metrics:
  - name: candidates advancing to round 3
    value: '9'
    note: 'FAEST, HAWK, MAYO, MQOM, QR-UOV, SDitH, SNOVA, SQIsign, UOV'
  - name: candidates eliminated in round 2
    value: '5'
    note: 'CROSS, LESS, Mirath, PERK, RYDE'
  - name: expected round 3 duration
    value: '~2'
    unit: years
  - name: distinct mathematical families represented
    value: '6'
    note: 'AES-based, lattice, supersingular-isogeny, multivariate-polynomial (UOV family), MPC-in-the-head on MQ, MPC-in-the-head on syndrome decoding'
links:
  - to: pqc-fips-204
    relation: competes-with
  - to: pqc-fips-205
    relation: competes-with
  - to: pqc-fips-206-falcon
    relation: competes-with
  - to: mig-crypto-agility
    relation: enables
evidence:
  claim: 'NIST IR 8610 (14 May 2026) reports the selection of nine algorithms advancing from the second to the third round of the Additional Digital Signatures process: FAEST, HAWK, MAYO, MQOM, QR-UOV, SDitH, SNOVA, SQIsign, and UOV. The report states any eventual selection will augment FIPS 204, FIPS 205, FIPS 186-5, and SP 800-208. Five second-round candidates (CROSS, LESS, Mirath, PERK, RYDE) were eliminated due to uncompetitive performance or security vulnerabilities. The third round is expected to last approximately two years, with a seventh PQC Standardization Conference planned for spring/summer 2027. The nine candidates span six mathematical families: AES-based (FAEST), lattice (HAWK), supersingular-isogeny (SQIsign), multivariate-polynomial (UOV, MAYO, QR-UOV, SNOVA), and MPC-in-the-head with distinct hard problems (MQOM on MQ, SDitH on syndrome decoding). No candidate has been standardised.'
  level: E4
  verified: '2026-08-16'
  sources:
    - url: https://csrc.nist.gov/pubs/ir/8610/final
      role: standard
      title: 'IR 8610, Status Report on the Second Round of the Additional Digital Signature Schemes for the NIST PQC Standardization Process'
      publisher: NIST CSRC
      date: '2026-05-14'
      identifier: NIST IR 8610
      accessed: '2026-08-16'
      note: 'Formal NIST Internal Report. Names nine third-round candidates and gives rationale for elimination of five. PDF at nvlpubs.nist.gov/nistpubs/ir/2026/NIST.IR.8610.pdf'
    - url: https://nvlpubs.nist.gov/nistpubs/ir/2026/NIST.IR.8610.pdf
      role: primary
      title: NIST IR 8610 full report PDF
      publisher: NIST
      date: '2026-05-14'
      identifier: NIST IR 8610
      accessed: '2026-08-16'
      note: 'Source for candidate names, mathematical family breakdown, evaluation rationale, and timeline cited in the claim.'
confidence: high
priority: P1
qdayImpact: 0
qdayReasoning: 'This process concerns post-quantum defences, not cryptanalytic capability. It does not change the qubit resources or engineering difficulty needed to break RSA-2048 or deployed elliptic-curve cryptography.'
status: draft
origin: agent
novelty: 'new process track — diversifies PQC portfolio beyond lattice assumptions'
horizon: 1
added: '2026-08-16'
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-16'
---

NIST launched the Additional Digital Signatures process in September 2022 specifically because ML-DSA and FN-DSA — its two lattice-based signature standards — rest on related mathematical problems. A structural breakthrough in lattice cryptanalysis could compromise both simultaneously. The nine candidates in round three are deliberately spread across incompatible mathematical foundations so that a single breakthrough cannot invalidate the whole portfolio.

**What happened.** On 14 May 2026, NIST published IR 8610, selecting nine candidates for a third evaluation round from the fourteen that entered round two. Five were eliminated: CROSS and LESS for insufficient performance advantage over SLH-DSA; Mirath, PERK, and RYDE for performance gaps or security vulnerabilities. The nine survivors span six mathematical families: FAEST (AES-based MPC-in-the-head), HAWK (lattice, smaller signatures than FN-DSA), SQIsign (supersingular isogenies, ~148-byte signatures — smallest of any candidate), UOV, MAYO, QR-UOV, SNOVA (multivariate-polynomial schemes on the Unbalanced Oil and Vinegar problem), and MQOM and SDitH (MPC-in-the-head on multivariate-quadratic and syndrome-decoding problems respectively).

**Previous state.** The board held the three finalised FIPS signature standards (pqc-fips-204, pqc-fips-205, pqc-fips-206-falcon) and HQC as a KEM candidate. The Additional Digital Signatures track was absent.

**Why it matters.** Any scheme standardised from this process will sit alongside, not replace, the existing FIPS standards. The portfolio-insurance rationale is explicit in IR 8610: if lattice assumptions are ever broken, alternatives must be ready. Round three focuses on implementation security, side-channel resistance, and formal proof verification, with candidate tweaks due August 2026 and a conference planned for spring/summer 2027.

**Limitations.** Round three has no guaranteed outcome. SQIsign has a thin cryptanalyst pool and its isogeny mathematics is considered exotic. Several multivariate candidates (UOV, MAYO, SNOVA) face ongoing cryptanalytic pressure. HAWK, while lattice-based, rests on assumptions distinct from ML-DSA.

**What would change the assessment.** A cryptanalytic break against a surviving candidate during round three would lower its prospects. A formal FIPS publication from this track would move the item to adopted.
