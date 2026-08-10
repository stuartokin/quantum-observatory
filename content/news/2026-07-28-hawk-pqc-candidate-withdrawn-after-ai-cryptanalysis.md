---
schema: news/v1
id: 2026-07-28-hawk-pqc-candidate-withdrawn-after-ai-cryptanalysis
headline: 'HAWK withdrawn from NIST additional-signatures process after AI finds lattice weakness in 60 hours'
pillar: cyber
date: '2026-07-28'
plain: 'HAWK was the only lattice-based scheme among the nine candidates NIST advanced to round three of its additional post-quantum digital signature process in May 2026. On 28 July Anthropic disclosed that its Claude Mythos Preview model had found a nontrivial automorphism in HAWK''s lattice structure — a symmetry that prior theory said would enable a key-recovery attack — after roughly 60 hours of mostly autonomous work at a cost of around $100,000. The HAWK team withdrew the algorithm the following day. No deployed system is at risk: HAWK was never standardised or shipped. What changed is the cost structure of cryptanalytic review: a result that survived two years of expert human scrutiny took a frontier AI model two and a half days to find.'
significance: headline
source:
  url: https://www.anthropic.com/research/discovering-cryptographic-weaknesses
  kind: vendor
  title: 'Discovering cryptographic weaknesses with Claude'
  publisher: Anthropic
  date: '2026-07-28'
corroboration:
  - url: https://thehackernews.com/2026/07/claude-ai-just-cracked-post-quantum.html
    publisher: The Hacker News
    kind: journalism
  - url: https://www.nist.gov/pqc
    publisher: NIST
    kind: authority
  - url: https://www.exequantum.com/insights/ai-just-broke-a-post-quantum-signature-scheme-candidate.-here-is-what-that-means-for-your-migration
    publisher: EQCore
    kind: journalism
validation:
  status: verified
  checks:
    - 'Anthropic research page opened directly; paper and disclosure confirmed present dated 28 July 2026'
    - 'NIST pqc page (nist.gov/pqc) confirms HAWK withdrawal and states finalised FIPS 203, 204, 205 are unaffected'
    - 'The Hacker News technical review corroborates timeline; confirms HAWK team withdrew 29 July 2026 after verifying the attack'
    - 'Attack is specific to HAWK lattice structure; does not affect ML-KEM, ML-DSA, SLH-DSA, or other finalised NIST standards per Anthropic and NIST'
    - 'A second independent attack path via a different AI model reported by postquantum.com, further corroborating the structural weakness — noted as unverified secondary'
  note: 'The Hacker News noted that no independent end-to-end reproduction of HAWK-256 key recovery was publicly confirmed at time of their review. Anthropic published reproducibility artifacts and coordinated disclosure with NIST. The HAWK team co-verified the result before public disclosure. Rated verified on primary source plus two independent corroborations (NIST authority page and journalism technical review).'
about:
  - mig-crypto-agility
  - pqc-fips-206-falcon
establishedBy:
  - url: https://eprint.iacr.org/2022/1155
    title: 'HAWK: Module LIP Makes Lattice Signatures Fast, Compact and Simple'
    relation: builds-on
    date: '2022'
actors:
  - Anthropic
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

HAWK''s security rests on the hardness of the search module Lattice Isomorphism Problem. A paper by Daniël van Gent and Ludo Pulles had already shown theoretically that a nontrivial automorphism in HAWK''s lattice would enable an efficient attack — but their work concluded that no such automorphism was accessible in practice. Claude Mythos Preview found one. The resulting attack reduces the cost of key recovery on HAWK-256 from roughly 2^64 operations to 2^38 — approximately 67 million times cheaper. Restoring HAWK''s original security claims would require roughly doubling its key sizes, eliminating the compact-signature advantage that made it competitive.

The finding matters in two directions. For the NIST process: HAWK was the only lattice-based scheme in the nine-candidate round-three field; its withdrawal narrows the pool to eight. The remaining candidates (FAEST, MAYO, MQOM, QR-UOV, SDitH, SNOVA, SQIsign, UOV) are not affected. For migration planning: AI-assisted cryptanalytic review is now a documented capability operating at approximately $100,000 per campaign — well within the budget of any national signals programme. Organisations relying on unreviewed proprietary or pre-standard post-quantum schemes should treat that figure as a cost floor for adversarial scrutiny.

The attack targets HAWK-256, which is a challenge parameter provided explicitly as a cryptanalytic target, not one of the NIST security-level deployment variants (HAWK-512, HAWK-1024). The attack''s implications for those larger variants are structural rather than direct: the same automorphism approximately halves the effective block size needed in lattice reduction, but the larger parameters remain computationally impractical to attack with current hardware at this cost.
