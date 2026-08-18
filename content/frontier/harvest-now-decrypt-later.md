---
schema: frontier/v1
id: harvest-now-decrypt-later
title: Harvest-now, decrypt-later
summary: 'Adversaries collect today''s encrypted traffic for retroactive decryption once a cryptographically relevant quantum computer exists. Formally recognised in joint CISA/NSA/NIST guidance (August 2023).'
plain: 'Most internet traffic is protected by encryption that relies on hard maths problems — specifically factoring large numbers or solving discrete logarithms. A sufficiently powerful quantum computer could solve those problems efficiently using Shor''s algorithm. Harvest-now, decrypt-later (HNDL) is the strategy of capturing encrypted traffic today and storing it until that quantum capability arrives. The data is already collected before anyone has the means to break it; defenders get no second chance. The US government — through a joint CISA, NSA and NIST factsheet published in August 2023 — formally named this threat model and urged critical-infrastructure operators to begin migration planning immediately.'
pillar: quantum
readiness: emerging
constellation: migration
cluster: threat-model
actors:
  - CISA
  - NSA
  - NIST
country:
  - US
horizon: 1
qdayImpact: 2
qdayReasoning: 'HNDL makes Q-Day relevant earlier than its calendar date because data stolen today loses its confidentiality the moment a CRQC appears, regardless of when that happens. The formal acknowledgement by CISA/NSA/NIST that adversaries may already be conducting HNDL operations adds operational urgency to quantum-migration timelines. Impact scored +2 rather than +3 because no publicly confirmed live HNDL operation against a named target has been evidenced; the threat model is formally accepted but the actual collection rate is unknown.'
links:
  - to: crqc
    relation: depends-on
  - to: pqc-fips-203
    relation: enables
  - to: algo-shor
    relation: depends-on
novelty: threat model formally adopted in national authority guidance
priority: P1
metrics:
  - name: US federal migration deadline
    value: '2035'
    unit: year
    note: NSM-10 (2022) target for federal PQC migration, implicitly acknowledging CRQC plausibility before that date
evidence:
  claim: 'The joint CISA/NSA/NIST factsheet "Quantum-Readiness: Migration to Post-Quantum Cryptography" (August 2023) formally states that adversaries may be collecting encrypted data now with the goal of decrypting it once quantum technology matures — the factsheet names this a "harvest now, decrypt later" threat — and urges critical-infrastructure organisations to begin migration planning immediately. This constitutes formal recognition of the threat model by the principal US technical authorities for cybersecurity and cryptographic standards.'
  level: E3
  verified: '2026-08-09'
  sources:
    - url: https://www.cisa.gov/sites/default/files/2023-08/Quantum%20Readiness_Final_CLEAR_508c%20(3).pdf
      role: standard
      title: 'Quantum-Readiness: Migration to Post-Quantum Cryptography'
      publisher: 'CISA / NSA / NIST'
      date: '2023-08-21'
      accessed: '2026-08-09'
      note: Joint advisory factsheet. Mirrors also at media.defense.gov. Formally names HNDL and urges immediate migration planning for critical infrastructure. Authoritative government guidance but not a formal standard (FIPS/ETSI); E3 ceiling applies.
    - url: https://media.defense.gov/2023/Aug/21/2003284212/-1/-1/0/CSI-QUANTUM-READINESS.PDF
      role: corroborating
      title: 'Quantum-Readiness: Migration to Post-Quantum Cryptography (DoD mirror)'
      publisher: NSA
      date: '2023-08-21'
      accessed: '2026-08-09'
confidence: high
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-08'
  reviewedOn: '2026-08-18'
  note: 'CISA factsheet confirmed via direct PDF access at cisa.gov. Formally names "harvest now, decrypt later" and urges migration planning — language confirmed in PDF text. E3 correct for government advisory factsheet (not a FIPS/ETSI formal standard). No changes.'
---

Harvest-now, decrypt-later (HNDL) is the practice of capturing ciphertext today and storing it against the day when a cryptographically relevant quantum computer (CRQC) can break the key-establishment mechanism that protected it. The attack is passive and undetectable: an adversary needs only network access and storage, not any cryptanalytic capability at the time of collection.

The threat model rests on two premises that are both well-established: (1) Shor's algorithm can break RSA and elliptic-curve cryptography exponentially faster than any classical method; (2) data with long confidentiality requirements — state secrets, healthcare records, financial data — may still require protection years after it was sent, well within plausible CRQC timelines.

On 21 August 2023, CISA, NSA and NIST published a joint factsheet explicitly naming HNDL and urging organisations that support critical infrastructure to begin post-quantum migration planning immediately. National Security Memorandum 10 (2022) had already set a 2035 federal migration deadline, implicitly acknowledging that a CRQC could plausibly exist before then.

**Readiness note:** Readiness is `emerging` because the threat model is formally recognised by national authorities but no publicly evidenced live HNDL collection against a named target has been confirmed. Per board decisions, a recognised threat model without evidenced instances is emerging. The urgency for migration planning is real regardless of whether collection is already occurring.
