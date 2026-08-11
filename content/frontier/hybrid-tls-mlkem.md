---
schema: frontier/v1
id: hybrid-tls-mlkem
title: 'Hybrid TLS key exchange (X25519 + ML-KEM)'
summary: 'Hybrid TLS 1.3 key exchange combining classical X25519 with post-quantum ML-KEM-768, specified in IETF draft-ietf-tls-ecdhe-mlkem. Deployed by default in Chrome, Edge, Firefox, and Cloudflare; over 50% of human web traffic quantum-secured by end-2025.'
plain: 'When your browser visits a website today, it negotiates a secret session key to encrypt the connection. The new hybrid approach does this twice: once with the proven classical method (X25519) and once with a new quantum-resistant method (ML-KEM). The session is secure as long as either one holds — a safety net in case quantum computers appear sooner than expected. Google Chrome, Microsoft Edge, Mozilla Firefox, and Cloudflare all switched this on by default in 2024-2025, meaning most users are already protected without knowing it. By end-2025, over half of human web traffic to Cloudflare was using this protection.'
pillar: quantum
readiness: adopted
constellation: migration
actors:
  - Cloudflare
  - Google
  - Mozilla
  - Microsoft
  - IETF TLS Working Group
country:
  - US
metrics:
  - name: 'Share of human HTTPS traffic using hybrid PQ key exchange at Cloudflare'
    value: '52'
    unit: '%'
    note: 'Cloudflare Radar 2025 Year in Review (Dec 2025); 29% at start of 2025, 52% by early December 2025. Note: Cloudflare IPsec blog (April 2026) reports >two-thirds of human TLS traffic now uses hybrid ML-KEM — figure is now likely above 67%.'
  - name: 'Client key_exchange size for X25519MLKEM768'
    value: '1216'
    unit: bytes
    note: '1184 bytes ML-KEM-768 encapsulation key + 32 bytes X25519 share'
priority: P1
qdayImpact: -1
qdayReasoning: 'Widespread hybrid TLS deployment reduces the practical window of harvest-now-decrypt-later exposure for web traffic. With over 50% of human web traffic quantum-secured by end-2025, the value of current TLS interception for future quantum decryption is substantially reduced for data in transit through major CDNs. This does not eliminate the CRQC threat but reduces its harvest-now vector for a significant fraction of internet traffic.'
horizon: 1
novelty: 'First quantum-safe protection deployed at global web scale'
evidence:
  claim: 'IETF draft-ietf-tls-ecdhe-mlkem (active standard-track, adopted by TLS WG) specifies X25519MLKEM768 as a hybrid key agreement for TLS 1.3, combining ML-KEM-768 with X25519 ECDH. Chrome, Edge, and Firefox deploy this by default. Cloudflare measured 29% of human HTTPS traffic using hybrid PQC at start of 2025, rising to 52% by early December 2025 (Cloudflare Radar 2025 Year in Review, confirmed via heise.de, infoq.com, Cloudflare press release). The IETF draft is not yet a finalised RFC; it remains an Internet-Draft as of the verification date.'
  level: E3
  verified: '2026-08-11'
  sources:
    - url: 'https://datatracker.ietf.org/doc/draft-ietf-tls-ecdhe-mlkem/'
      role: standard
      title: 'Post-quantum hybrid ECDHE-MLKEM Key Agreement for TLSv1.3'
      publisher: IETF
      date: '2026-05-01'
      identifier: 'draft-ietf-tls-ecdhe-mlkem-05'
      accessed: '2026-08-08'
      note: 'Active IETF TLS WG Internet-Draft. Not yet an RFC as of verification date. Defines X25519MLKEM768, SecP256r1MLKEM768, SecP384r1MLKEM1024.'
    - url: 'https://blog.cloudflare.com/radar-2025-year-in-review/'
      role: corroborating
      title: 'Cloudflare Radar 2025 Year in Review'
      publisher: Cloudflare
      date: '2025-12-15'
      accessed: '2026-08-11'
      note: 'Reports 52% of human HTTPS traffic post-quantum encrypted by early December 2025; 29% at year-start. Confirmed via heise.de, infoq.com, Cloudflare press release. Vendor self-reported measurement.'
    - url: 'https://blog.cloudflare.com/post-quantum-ipsec/'
      role: corroborating
      title: 'Post-quantum encryption for Cloudflare IPsec is generally available'
      publisher: Cloudflare
      date: '2026-04-30'
      accessed: '2026-08-11'
      note: 'April 2026 blog states "more than two-thirds" of human-generated TLS traffic to Cloudflare now uses hybrid ML-KEM — indicating the 52% end-2025 figure has since grown substantially. Vendor measurement.'
links:
  - to: pqc-fips-203
    relation: depends-on
  - to: harvest-now-decrypt-later
    relation: competes-with
confidence: high
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-08'
  reviewedOn: '2026-08-11'
  note: 'Cloudflare Radar 2025 Year in Review confirmed at blog.cloudflare.com/radar-2025-year-in-review/: 52% by early December 2025, 29% at year-start (corrected from prior 38% March 2025 figure — Cloudflare blog states start-of-year 29%). Added Cloudflare IPsec blog (April 2026) as corroborating source noting >two-thirds figure. Metric note updated to flag that end-2025 figure is now outdated. E3 correct — IETF draft not yet RFC, measurement is vendor self-reported.'
---

Hybrid TLS key exchange combines a classical elliptic-curve key agreement (X25519) with a post-quantum key encapsulation mechanism (ML-KEM-768) in a single TLS 1.3 handshake. The session key is derived from both shared secrets, so the connection is secure as long as either algorithm remains unbroken — protecting against a future quantum computer without sacrificing security against current classical attackers if ML-KEM were to be broken.

The IETF TLS Working Group adopted the draft specification (draft-ietf-tls-ecdhe-mlkem) and it is progressing toward RFC status. Browser vendors deployed ahead of standardisation: Chrome enabled it by default in version 124 (April 2024), with Edge and Firefox following. Cloudflare rolled out hybrid PQC by default across its network and measured adoption rising from 29% of human HTTPS traffic at the start of 2025 to 52% by early December 2025, with a major jump in September 2025 driven by Apple adding PQC support in iOS operating system updates. By April 2026, Cloudflare reported more than two-thirds of human TLS traffic using hybrid ML-KEM.

The item was previously evidenced at E1 (proposal/theory) which materially understates the state of deployment. Readiness of `adopted` is correct — the mechanism ships in named browser versions and CDN defaults — but the IETF draft is not yet a finalised RFC, justifying E3 rather than E4.
