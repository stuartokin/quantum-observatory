---
schema: frontier/v1
id: algo-ai-assisted-cryptanalysis
title: 'AI-assisted cryptanalysis: HAWK key recovery found by Claude Mythos Preview'
summary: 'Claude Mythos Preview found a novel structural weakness in HAWK in approximately 60 hours, reducing HAWK-512 key-recovery cost from 2^150 to 2^108 gates and prompting withdrawal from NIST Round 3. First documented AI-discovered vulnerability in a NIST PQC candidate.'
plain: 'HAWK was a lattice-based digital signature scheme — one of nine candidates in NIST''s Additional Digital Signatures process — whose security rested on the Lattice Isomorphism Problem. On 28 July 2026, Anthropic researchers disclosed that their Claude Mythos Preview AI model, working semi-autonomously for approximately 60 hours, had found a nontrivial symmetry in HAWK''s lattice structure that prior human review had not exploited. The symmetry allows key recovery to be reduced to a well-studied hard problem in roughly half the original lattice dimension, cutting the estimated cost of breaking HAWK-512 from 2^150 to 2^108 gate operations. HAWK-256 key recovery was demonstrated end-to-end in practice. The HAWK team confirmed the finding and withdrew the scheme from NIST the following morning, noting that straightforward parameter mitigations would make the scheme uncompetitive. This is the first documented case of an AI system independently discovering a novel structural cryptographic weakness in a NIST PQC candidate after two years of expert human review. NIST''s finalized standards — ML-KEM, ML-DSA, SLH-DSA and FN-DSA — are not affected. HAWK was a research candidate, never a deployed standard.'
pillar: quantum
readiness: experimental
constellation: algorithms
cluster: classical-advantage-narrowing
actors:
  - 'Straznickas (Anthropic)'
  - 'Weis (Anthropic)'
  - 'Claude Mythos Preview (Anthropic)'
metrics:
  - name: 'HAWK-512 key-recovery cost before attack'
    value: '2^150'
    unit: 'gate operations (AGPS20 model)'
  - name: 'HAWK-512 key-recovery cost after attack'
    value: '2^108'
    unit: 'gate operations (AGPS20 model)'
  - name: 'SVP dimension for key recovery'
    value: 'n/2 + 1'
    unit: 'lattice dimension (reduced from n)'
  - name: 'Time to AI discovery'
    value: '~60'
    unit: 'hours'
  - name: 'HAWK-256 practical recovery'
    value: 'demonstrated'
    unit: ''
    note: 'HAWK-256 is a challenge parameter, not a NIST security-level set'
links:
  - to: pqc-additional-signatures-r3
    relation: evidence-for
  - to: mig-crypto-agility
    relation: enables
evidence:
  claim: 'Straznickas and Weis (IACR ePrint 2026/1593, received 2026-08-03, approved 2026-08-06) reduce HAWK-n key recovery to exact SVP calls in dimension at most n/2+1, using a nontrivial Galois automorphism recoverable as a shortest vector of a public rank-n lattice. In the AGPS20 gate-count model, HAWK-512 cost falls from 2^150 to 2^108 and HAWK-1024 from 2^288 to 2^182. Practical end-to-end recovery of a HAWK-256 key was demonstrated on a single server. The paper states the attack was developed primarily by Claude Mythos Preview in approximately 60 hours. Anthropic disclosed to the HAWK team in June 2026. On 2026-07-28, Weis posted the finding to the NIST pqc-forum. On 2026-07-29 the HAWK team withdrew, confirming the attack approximately halves the lattice-reduction block size and that straightforward mitigations would make HAWK uncompetitive. An independent cryptographer confirmed the reduction on the forum. NIST updated its Round 3 page to mark HAWK withdrawn.'
  verified: '2026-10-12'
  level: E3
  sources:
    - url: 'https://eprint.iacr.org/2026/1593'
      role: primary
      title: 'HAWK-n Key Recovery Reduces to SVP in Dimension n/2 + 1'
      publisher: 'IACR ePrint Archive'
      date: '2026-08-03'
      identifier: 'ePrint 2026/1593'
      accessed: '2026-10-12'
      note: 'Primary technical paper. Preprint. Authors at Anthropic. Received 2026-08-03, approved 2026-08-06. Unconditional polynomial-time reduction from HAWK key recovery to SVP in dimension n/2+1. Peer-review status unknown as of 2026-10-12.'
    - url: 'https://groups.google.com/a/list.nist.gov/g/pqc-forum/c/2r2u6SbHun4'
      role: corroborating
      title: 'HAWK-n Key Recovery Reduces to SVP in Dimension n/2 + 1 — NIST pqc-forum'
      publisher: 'NIST pqc-forum'
      date: '2026-07-28'
      accessed: '2026-10-12'
      note: 'Weis public announcement on NIST mailing list. HAWK team confirmation and withdrawal statement included. An independent cryptographer confirmed the reduction on the same thread. NIST acknowledged the withdrawal.'
confidence: medium
status: draft
origin: agent
qdayImpact: 0
country:
  - US
novelty: 'First AI-discovered structural weakness in a NIST PQC candidate; scheme withdrew within 24 hours of public disclosure.'
horizon: 1
priority: P1
added: '2026-10-12'
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-10-12'
  note: 'ePrint 2026/1593 confirmed at eprint.iacr.org (received 2026-08-03, approved 2026-08-06). NIST pqc-forum post confirmed via groups.google.com thread. HAWK team withdrawal confirmed on same thread. HAWK-256 end-to-end recovery confirmed in paper. No peer-reviewed journal version found as of 2026-10-12.'
---

## What happened

HAWK was the sole lattice-based scheme among nine candidates NIST advanced to the third round of its Additional Digital Signatures process in May 2026. On 28 July 2026, Straznickas and Weis (Anthropic) posted IACR ePrint 2026/1593, reducing HAWK-n key recovery to polynomially many exact SVP calls in dimension n/2+1. The reduction exploits a nontrivial Galois automorphism in HAWK's cyclotomic lattice structure — a symmetry that two years of expert human review had not weaponised. The attack was developed primarily by Claude Mythos Preview in approximately 60 hours, using SageMath and published cryptanalysis literature. Anthropic disclosed to the HAWK team in June 2026 and published in coordination with the NIST pqc-forum. An independent cryptographer confirmed the reduction on the forum. The HAWK team withdrew the following morning.

## Why it matters

This is the first documented case of an AI system independently discovering a novel structural weakness in a NIST PQC candidate. The attack halved HAWK's effective security margin and the developers confirmed that straightforward parameter mitigations would make the scheme uncompetitive. The incident demonstrates that AI-assisted cryptanalysis can find structural weaknesses that extensive human expert review misses, and that discovery-to-withdrawal can now be measured in hours. It raises open questions about the adequacy of human-only cryptanalytic review in PQC standardisation.

## Previous state of the art

HAWK's specification placed HAWK-512 at 2^150 gates and HAWK-1024 at 2^288. Best prior attacks required lattice reduction at the full dimension n. The SIKE break in 2022 required months of human analysis; this attack took approximately 60 hours of AI-assisted compute.

## Limitations

The attack remains exponential: it reduces the lattice dimension for SVP, it does not solve SVP in polynomial time. Practical recovery demonstrated only for HAWK-256, a challenge parameter. HAWK was never a deployed standard. The result does not extend to ML-DSA, SLH-DSA, FN-DSA, or lattice cryptography generally. Attribution of discovery to the AI model relies on Anthropic's own account — self-evaluation, not independent assessment.

## What would change this assessment

A second documented case of AI discovering a structural PQC weakness would move readiness toward demonstrated. Peer-reviewed publication of ePrint 2026/1593 would raise evidence to E4. An independent reproduction of the AI-assisted discovery process would strengthen the methodology claim.
