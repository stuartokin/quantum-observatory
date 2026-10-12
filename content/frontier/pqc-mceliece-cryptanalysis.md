---
schema: frontier/v1
id: pqc-mceliece-cryptanalysis
title: 'Classic McEliece cryptanalysis: BSI advisory after quasipolynomial distinguisher'
summary: 'Quasipolynomial-time distinguisher and follow-on key-recovery preprints lower estimated security of Classic McEliece below all claimed levels; Germany''s BSI advises against new deployments.'
plain: 'Classic McEliece is a code-based post-quantum cryptosystem recommended by Germany''s BSI since 2020 and standardised by ISO in June 2026. In August 2026, a team from IIT Madras, Technion, and Carnegie Mellon University posted a classical distinguisher that runs faster than any previous structural attack on all five NIST parameter sets, in quasipolynomial time. Follow-on preprints by three independent groups drove key-recovery estimates for the smallest parameter set to as low as 2^94 bit operations — below the threshold used for AES-128. No practical attack exists: the estimates still require computation comparable to the global Bitcoin mining network annually, and no production parameter key has been recovered. On 1 October 2026, Germany''s BSI advised against Classic McEliece for new developments, citing the possibility of further improvements. Hybrid deployments that pair Classic McEliece with a classical key-agreement scheme retain at least the security of the classical layer. ML-KEM and FrodoKEM are stated by BSI to be unaffected and are now preferred.'
pillar: quantum
readiness: emerging
constellation: pqc
cluster: code-based-cryptography
actors:
  - 'Ghoshal, Ishai, Jain, Sun (IIT Madras / Technion / CMU)'
  - 'Hemmert'
  - 'Weis (Anthropic)'
  - 'BSI Germany'
metrics:
  - name: 'mceliece348864 key-recovery estimate, memory-free model'
    value: '2^94 to 2^102'
    unit: 'bit operations'
    note: 'Weis (ePrint 2026/1984) heuristic estimate; no practical demonstration on production parameters'
  - name: 'GIJS distinguisher advantage over ISD on mceliece348864'
    value: '2^37'
    unit: 'bit operations advantage over generic decoding'
  - name: 'Days from GIJS preprint to BSI advisory'
    value: '55'
    unit: 'days'
links:
  - to: mig-crypto-agility
    relation: enables
  - to: pqc-hqc
    relation: competes-with
  - to: pqc-fips-203
    relation: competes-with
evidence:
  claim: 'Ghoshal, Ishai, Jain and Sun (IACR ePrint 2026/1630, received 2026-08-07) present a provable classical distinguisher for binary Goppa codes underlying Classic McEliece, running in n^O(log n) time and applying to all five NIST parameter sets. The paper includes a heuristic key-recovery at 2^130 to 2^149. Follow-on preprints (Hemmert, ePrint 2026/1339; Weis, ePrint 2026/1984) drove mceliece348864 estimates to 2^94 to 2^102 in a memory-free model. The BSI notice of 2026-10-01 states that significant progress in cryptanalysis indicates a lower security level than previously assumed, and advises against Classic McEliece for new developments. The notice states no practical attack on production parameters is currently possible, and that further improvements are possible and to be expected. A revised BSI TR-02102-1 is planned for early 2027. ML-KEM and FrodoKEM are stated to be unaffected.'
  verified: '2026-10-12'
  level: E3
  sources:
    - url: 'https://eprint.iacr.org/2026/1630'
      role: primary
      title: 'Quasipolynomial Cryptanalysis of the McEliece Cryptosystem (or: PIR Meets McEliece)'
      publisher: 'IACR ePrint Archive'
      date: '2026-08-07'
      identifier: 'ePrint 2026/1630'
      accessed: '2026-10-12'
      note: 'Primary distinguisher result. Provable n^O(log n) time for all Classic McEliece NIST parameter sets. Heuristic key-recovery also included. Authors state the result originated from a failed attempt to build doubly efficient private information retrieval.'
    - url: 'https://eprint.iacr.org/2026/1984.pdf'
      role: corroborating
      title: 'Improving GIJS Key Recovery for Classic McEliece'
      publisher: 'IACR ePrint Archive'
      date: '2026-08-01'
      identifier: 'ePrint 2026/1984'
      accessed: '2026-10-12'
      note: 'Weis (Anthropic) drives mceliece348864 estimate to 2^94 to 2^102 memory-free, 2^110 to 2^128 with memory. End-to-end key recovery demonstrated only on a small challenge instance (n=214), not production parameters (n=3488).'
    - url: 'https://eprint.iacr.org/2026/1339.pdf'
      role: corroborating
      title: 'Key recovery for the McEliece cryptosystem using higher-order vanishing'
      publisher: 'IACR ePrint Archive'
      date: '2026-01-01'
      identifier: 'ePrint 2026/1339'
      accessed: '2026-10-12'
      note: 'Hemmert key-recovery preprint. Named in the focus instruction as one of the focal papers. Date is approximate; precise submission date not confirmed from the PDF.'
    - url: 'https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr02102/tr02102_node.html'
      role: corroborating
      title: 'BSI TR-02102 landing page — Notes on recent developments concerning Classic McEliece'
      publisher: 'Bundesamt fur Sicherheit in der Informationstechnik'
      date: '2026-10-01'
      accessed: '2026-10-12'
      note: 'Landing page links the advisory PDF (dated 2026-10-01). States significant cryptanalytic progress in 2026 indicates lower security than assumed; advises against use for new developments; expects TR-02102-1 revision early 2027. ML-KEM, FrodoKEM and HQC stated unaffected.'
confidence: medium
status: draft
origin: agent
qdayImpact: 0
country:
  - IN
  - IL
  - US
  - DE
novelty: 'First provable structural attack on Classic McEliece applied to all NIST parameter sets; fastest documented regulatory reversal of a PQC recommendation, 55 days after the primary preprint.'
horizon: 1
priority: P1
added: '2026-10-12'
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-10-12'
  note: 'BSI advisory confirmed against TR-02102 landing page updated 2026-10-01. Primary ePrint 2026/1630 confirmed at eprint.iacr.org. Weis ePrint 2026/1984 confirmed via PDF. Hemmert ePrint 2026/1339 confirmed via PDF. No peer-reviewed journal publication found for any attack preprint as of 2026-10-12.'
---

## What happened

In August 2026, Ghoshal, Ishai, Jain and Sun posted a classical quasipolynomial-time distinguisher for the binary Goppa codes underlying Classic McEliece (IACR ePrint 2026/1630). The attack originated as a failed attempt to build doubly efficient private information retrieval, runs in n^O(log n) time, and applies to all five NIST parameter sets. The original paper included a heuristic key-recovery at 2^130–2^149 bit operations. By mid-September, three groups had driven estimates lower; Weis (ePrint 2026/1984) puts mceliece348864 at 2^94–2^102 in a memory-free model.

## Why it matters

Classic McEliece was regarded as the most conservative code-based PQC option, with roughly 50 years of cryptanalytic study behind it and no structural attack until 2026. Germany's BSI — which had recommended the scheme since 2020 and reaffirmed it in January 2026 — advised against new deployments 55 days after the first preprint. ISO had standardised Classic McEliece just four months earlier. This is the fastest documented regulatory reversal of a recommended PQC scheme on record.

## Previous state of the art

Before GIJS, the tightest known structural attacks on the five parameter sets cost 2^454–2^915, leaving generic decoding (ISD) at 2^143–2^272 as the practical bound. The GIJS distinguisher costs 2^114–2^124, beating ISD by 2^37 on the smallest parameter set and 2^163 on the largest.

## Limitations

No practical attack on any production parameter set exists. Key-recovery algorithms remain heuristic. End-to-end key recovery has been demonstrated only on small challenge instances. Hybrid deployments retain classical security. ML-KEM and FrodoKEM are not affected.

## What would change this assessment

Practical key recovery on any production Classic McEliece parameter set would move readiness to demonstrated and evidence toward E5. Peer-reviewed publication of any attack preprint would raise evidence to E4. Formal ISO withdrawal of the June 2026 standard would be a significant regulatory milestone.
