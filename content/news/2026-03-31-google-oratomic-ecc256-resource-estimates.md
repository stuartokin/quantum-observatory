---
schema: news/v1
id: 2026-03-31-google-oratomic-ecc256-resource-estimates
headline: 'Two concurrent preprints cut the estimated qubit cost of breaking ECC-256 by twenty-fold and fifty-fold'
pillar: quantum
date: '2026-03-31'
plain: 'For years the consensus was that breaking the elliptic-curve cryptography securing Bitcoin, TLS, and most digital signatures would require millions of physical qubits — a hardware scale that felt safely distant. On the same day, Google Quantum AI and Caltech startup Oratomic each published resource estimates that compress that number dramatically. Google''s estimate puts the threshold below 500,000 superconducting qubits executing in minutes; Oratomic''s architecture reaches the same problem with roughly 26,000 neutral-atom qubits at a ten-day runtime. Neither team has built such a machine or run the attack — these are algorithm-and-architecture estimates, not demonstrations. But the numbers are close enough to plausible near-term hardware that Google and Cloudflare immediately moved their PQC migration deadlines from the mid-2030s to 2029.'
significance: headline
source:
  url: https://arxiv.org/abs/2603.28846
  kind: preprint
  title: 'Securing Elliptic Curve Cryptocurrencies against Quantum Vulnerabilities: Resource Estimates and Mitigations'
  publisher: arXiv
  date: '2026-03-31'
  doi: 10.48550/arXiv.2603.28846
corroboration:
  - url: https://arxiv.org/abs/2603.28627
    publisher: 'arXiv / Caltech / Oratomic'
    kind: preprint
  - url: https://pqshield.com/improved-quantum-attacks-on-elliptic-curves-is-the-pqc-transition-moving-fast-enough/
    publisher: PQShield
    kind: journalism
  - url: https://physicsworld.com/a/new-findings-shorten-the-road-to-cryptographically-relevant-quantum-computers/
    publisher: Physics World
    kind: journalism
validation:
  status: verified
  checks:
    - 'Google arXiv abstract opened directly (arXiv:2603.28846v2): figures of fewer than 1,200 logical qubits and fewer than 500,000 physical qubits confirmed in abstract text'
    - 'Oratomic arXiv abstract (arXiv:2603.28627) confirmed via Caltech IQIM page and Coindesk: 10,000 qubit figure is logical; physical qubit count for ECC-256 is approximately 26,000 at a ten-day runtime, not minutes'
    - 'Runtime caveat applied per decisions file: the 10-day figure is slow but not absurd for a high-value target; the 26,000-qubit scale is not operable today but is within the range of near-term hardware roadmaps'
    - 'PQShield technical analysis (independent cryptography firm) confirms both papers are resource estimates, not demonstrations, and that the Oratomic paper uses Google circuit constructions as its base'
    - 'IACR ePrint 2026/625 confirmed as the same Google paper submitted to IACR archive'
    - 'No contradicting peer-reviewed paper found'
  note: 'The headline Oratomic figure of 10,000 qubits refers to a logical-layer count in one configuration; the operable physical qubit count for an ECC-256 attack is approximately 26,000 at a ten-day runtime. Google withheld the actual circuits, disclosing only a zero-knowledge proof of their existence. Both papers remain preprints as of the filing date.'
about:
  - algo-resource-estimation
  - algo-shor
  - crqc
  - harvest-now-decrypt-later
  - arch-neutral-atom
establishedBy:
  - url: https://arxiv.org/abs/2603.28846
    title: 'Securing Elliptic Curve Cryptocurrencies against Quantum Vulnerabilities: Resource Estimates and Mitigations'
    relation: reports
    date: '2026-03-31'
  - url: https://arxiv.org/abs/2603.28627
    title: "Shor's algorithm is possible with as few as 10,000 reconfigurable atomic qubits"
    relation: reports
    date: '2026-03-31'
actors: [Google Quantum AI, Oratomic, Caltech, UC Berkeley, Stanford, Ethereum Foundation]
country: [US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The two papers were posted within hours of each other on March 31, 2026. They are technically complementary: the Google paper provides optimised Shor circuits for ECDLP-256 on superconducting hardware; the Oratomic paper takes those circuits and shows a neutral-atom LDPC architecture can execute them with far fewer physical qubits, at the cost of longer runtime.

What the papers do not claim: that any machine of this scale exists today, or that the attack has been performed. Google's Willow processor has 105 physical qubits. The gap to 500,000 superconducting qubits at 1e-3 error rates is large. The gap to 26,000 neutral-atom qubits is smaller — the Endres group at Caltech has demonstrated 6,100-atom arrays — but the fault-tolerant operation and magic-state generation required to run Shor's algorithm at this scale have not been demonstrated.

In responsible-disclosure practice, Google used a zero-knowledge proof allowing third parties to verify the resource-estimate claim without accessing the circuits.
