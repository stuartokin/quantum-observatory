---
schema: frontier/v1
id: mig-google-pqc-2029
title: 'Google 2029 PQC migration roadmap: Android 17 ML-DSA and full-stack commitment'
summary: 'Google published a 2029 target for completing PQC migration across its products and infrastructure, with Android 17 as the first concrete deliverable shipping ML-DSA in Verified Boot.'
plain: 'Google has committed to migrating all of its products and services to post-quantum cryptography by 2029, six years ahead of the NIST 2035 deadline that bans classical public-key algorithms. The first concrete step is Android 17, which ships ML-DSA (the NIST-standardised post-quantum signature algorithm) in Android Verified Boot, meaning the chain of trust that checks a phone has not been tampered with will be quantum-resistant. Google also adjusted its threat model to treat digital signature migration as a near-term priority, not only key exchange — a meaningful shift given that forged signatures are a future threat once a cryptographically relevant quantum computer exists, requiring migration before that machine arrives.'
pillar: quantum
constellation: migration
readiness: adopted
cluster: vendor-migration-roadmaps
actors:
  - 'Google (Heather Adkins, Sophie Schmieg)'
country:
  - US
metrics:
  - name: 'Migration target year'
    value: '2029'
  - name: 'Concrete deliverable'
    value: 'Android 17 ML-DSA in Verified Boot'
  - name: 'NIST deprecation deadline'
    value: '2030'
  - name: 'NIST disallow deadline'
    value: '2035'
links:
  - to: pqc-fips-204
    relation: evidence-for
  - to: mig-hardware-roots
    relation: evidence-for
  - to: hybrid-tls-mlkem
    relation: competes-with
  - to: harvest-now-decrypt-later
    relation: depends-on
evidence:
  claim: 'Google blog post dated 25 March 2026, authored by VP of Security Engineering Heather Adkins and Senior Staff Cryptography Engineer Sophie Schmieg, states a 2029 target for completing PQC migration across all Google products, systems and services. The post states: "This new timeline reflects migration needs for the PQC era in light of progress on quantum computing hardware development, quantum error correction, and quantum factoring resource estimates." Android 17 is described as integrating ML-DSA (FIPS 204) into Android Verified Boot. The post explicitly states Google has adjusted its threat model to prioritise authentication services and digital signature migration. This is a vendor blog and rated E2; the 2029 date is a migration commitment, not a Q-Day prediction.'
  verified: '2026-11-02'
  level: E2
  sources:
    - url: 'https://blog.google/innovation-and-ai/technology/safety-security/cryptography-migration-timeline/'
      role: vendor
      title: 'Quantum frontiers may be closer than they appear'
      publisher: Google Blog
      date: '2026-03-25'
      accessed: '2026-11-02'
      note: 'Vendor blog by Adkins and Schmieg. The primary citable claim is the 2029 target and the Android 17 ML-DSA Verified Boot deployment. E2 per board rules — vendor blog, not a peer-reviewed paper or formal standard. The 2029 date is six years ahead of the NIST 2035 disallow deadline and one year ahead of the 2030 deprecation date.'
confidence: medium
status: draft
origin: agent
added: '2026-11-02'
priority: P1
qdayImpact: 0
qdayReasoning: 'A migration deadline is not a Q-Day prediction. Google''s 2029 target says when Google intends to have moved its own systems, not when a cryptographically relevant quantum computer will exist. The board rule is explicit: vendor roadmaps do not move Q-Day scores. Score 0.'
novelty: 'First named 2029 PQC migration commitment from a major internet infrastructure and quantum hardware vendor'
horizon: 1
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-11-02'
  note: 'Primary source is blog.google, March 25 2026, by Adkins and Schmieg. Verified the blog exists and the claims match multiple independent news reports. Rated E2 per decisions (vendor blog). 2029 target date, Android 17 ML-DSA Verified Boot deployment, and threat model shift to authentication-service priority all confirmed from the source URL.'
---

## What happened

On 25 March 2026, Google's VP of Security Engineering (Heather Adkins) and Senior Staff Cryptography Engineer (Sophie Schmieg) published a blog post titled "Quantum frontiers may be closer than they appear" committing Google to completing its PQC migration by 2029. The stated reason is progress on quantum hardware, error correction and resource estimation for cryptanalytic circuits — the blog cites no specific papers but the context is Google's own Willow results and the Gidney 2025 resource estimate revision.

## Why it matters

Google is simultaneously the world's leading quantum hardware organisation and one of the largest internet infrastructure providers. A 2029 internal migration target — six years ahead of the NIST 2035 deadline and one year ahead of the 2030 deprecation date — is the first named commitment from a company of this reach. The concrete deliverable is Android 17 shipping ML-DSA (FIPS 204) in Android Verified Boot, making the chain of trust for hundreds of millions of Android devices quantum-resistant from boot. Google Play is also generating ML-DSA signing keys for new applications. This is E2 evidence (vendor blog), but the deliverables are observable.

## Previous state of the art

The board had `hybrid-tls-mlkem` (X25519 + ML-KEM in Chrome, adopted, E3) and `mig-hardware-roots` (PQC in hardware roots of trust, experimental, E2). No item captured a named vendor's full-stack migration commitment with a specific year target.

## Limitations

This is a vendor blog, E2. The 2029 target is a commercial commitment, not a formal standard or regulatory obligation. It cannot move a Q-Day forecast. Whether Google meets it, and which specific systems are covered, will only be visible when products ship.

## What would change the assessment

A published technical roadmap (arXiv, internal report) with specific system-by-system migration milestones and engineering constraints would raise confidence. Observable shipping of ML-DSA in Android 17 (expected June 2026) would confirm the first deliverable.
