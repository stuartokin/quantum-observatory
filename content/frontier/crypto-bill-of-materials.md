---
schema: frontier/v1
id: crypto-bill-of-materials
title: Cryptographic bill of materials
summary: 'A CBOM is a machine-readable inventory of all cryptographic assets in a software system. OWASP CycloneDX v1.6 (ECMA-424, April 2024) formalised the CBOM standard, developed by IBM Research. NIST NCCoE SP 1800-38B provides a government practice guide for cryptographic discovery.'
plain: 'Before an organisation can migrate to post-quantum cryptography, it must know what cryptography it currently uses. A cryptographic bill of materials (CBOM) is a structured, machine-readable list of every algorithm, key, certificate, and protocol in a system — extending the software bill of materials concept to cover cryptographic detail. IBM Research developed the concept; OWASP formalised it in April 2024 as part of the CycloneDX standard, now ratified as an Ecma International standard (ECMA-424). NIST''s National Cybersecurity Center of Excellence published a companion practice guide (SP 1800-38B) explaining how discovery tools can generate such inventories. Without a CBOM, PQC migration is blind.'
pillar: quantum
readiness: demonstrated
constellation: migration
cluster: crypto-discovery
actors:
  - 'OWASP Foundation'
  - 'IBM Research'
  - 'Ecma International TC54'
  - 'NIST NCCoE'
country:
  - US
horizon: 1
novelty: 'Formal standardisation of cryptographic asset inventory as ECMA-424'
evidence:
  claim: 'OWASP CycloneDX v1.6, published April 2024 and ratified as ECMA-424, formally introduced the Cryptographic Bill of Materials (CBOM) as a machine-readable standard for inventorying cryptographic assets, developed by IBM Research. The standard defines a cryptographic-asset component type covering algorithms, certificates, keys, and protocols. NIST NCCoE SP 1800-38B (Quantum Readiness: Cryptographic Discovery, December 2023) provides a government practice guide showing how discovery tools can produce cryptographic inventories to support PQC migration planning.'
  verified: '2026-08-08'
  level: E4
  sources:
    - url: 'https://owasp.org/blog/2024/04/09/CycloneDX-v1.6-Released'
      role: standard
      title: 'CycloneDX v1.6 Released — Cryptographic Bill of Materials and Attestations'
      publisher: 'OWASP Foundation / Ecma International'
      date: '2024-04-09'
      identifier: ECMA-424
      accessed: '2026-08-08'
      note: 'Formal introduction of CBOM into OWASP CycloneDX. Developed by IBM Research. Ratified as Ecma International standard ECMA-424.'
    - url: 'https://csrc.nist.gov/pubs/sp/1800/38/iprd-(1)'
      role: standard
      title: 'NIST SP 1800-38B: Quantum Readiness: Cryptographic Discovery'
      publisher: 'NIST NCCoE'
      date: '2023-12-19'
      identifier: 'NIST SP 1800-38B (Preliminary Draft)'
      accessed: '2026-08-08'
      note: 'Government practice guide for cryptographic discovery tools to support PQC migration. Comment period closed February 2024.'
confidence: high
status: published
links:
  - to: mig-discovery
    relation: enables
  - to: mig-crypto-agility
    relation: enables
  - to: mig-supply-chain
    relation: enables
origin: human
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-08'
---

A CBOM answers the question every PQC migration starts with: what cryptography are we actually running? CycloneDX v1.6 formalised the format; NIST SP 1800-38B showed organisations how to generate one.
