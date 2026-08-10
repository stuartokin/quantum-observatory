---
schema: news/v1
id: 2026-04-07-cloudflare-google-2029-pqc-migration
headline: 'Google and Cloudflare each commit to 2029 as their internal PQC migration deadline, citing the March 2026 ECC-256 resource estimates as cause'
pillar: quantum
date: '2026-04-07'
plain: 'Google announced a 2029 PQC deadline on March 25 and Cloudflare followed on April 7. Both explicitly cited the Oratomic and Google Quantum AI ECC resource-estimate papers as the immediate cause. Together these two companies handle a substantial fraction of global internet traffic — their certificate authorities, TLS stacks, Android, Chrome, and cloud services. A 2029 internal deadline means active migration now, not a planning phase. Notably, both companies shifted priority to authentication rather than encryption: post-quantum encryption of data in transit is already largely deployed, but post-quantum digital signatures for certificates and authentication are only beginning.'
significance: notable
source:
  url: https://www.helpnetsecurity.com/2026/04/07/cloudflare-post-quantum-authentication/
  kind: journalism
  title: 'Cloudflare moves up its post-quantum deadline as researchers narrow the path to Q-Day'
  publisher: 'Help Net Security'
  date: '2026-04-07'
corroboration:
  - url: https://ia.acs.org.au/article/2026/google--cloudflare-want-post-quantum-cryptography-by-2029.html
    publisher: 'Information Age / ACS'
    kind: journalism
  - url: https://utimaco.com/news/blog-posts/post-quantum-hsm-migration-2029
    publisher: Utimaco
    kind: journalism
validation:
  status: verified
  checks:
    - 'Cloudflare blog confirmed via blog.cloudflare.com/post-quantum-eo-2026: deadline is 2029, cites Google and Oratomic papers as catalysts'
    - 'Google 2029 deadline dated March 25 2026, confirmed by multiple sources including Information Age citing Google security engineers Heather Adkins and Sophie Schmieg by name'
    - 'Both deadlines are internal migration targets, not regulatory mandates — confirmed; the US federal EO 14409 signed June 22 2026 set 2030-2031 federal timelines separately'
    - 'Cloudflare blog notes over 65% of human-initiated traffic already uses post-quantum encryption — context confirms the shift in focus to authentication'
    - 'No contradicting announcement found'
  note: 'These are migration roadmap commitments, not technical demonstrations. Recorded here because a 2029 internal deadline from two of the largest internet infrastructure providers constitutes a planning-relevant change for any organisation dependent on their infrastructure or certificate chains.'
about:
  - harvest-now-decrypt-later
  - mig-crypto-agility
  - hybrid-tls-mlkem
establishedBy:
  - url: https://arxiv.org/abs/2603.28846
    title: 'Securing Elliptic Curve Cryptocurrencies against Quantum Vulnerabilities'
    relation: applies
    date: '2026-03-31'
  - url: https://arxiv.org/abs/2603.28627
    title: "Shor's algorithm is possible with as few as 10,000 reconfigurable atomic qubits"
    relation: applies
    date: '2026-03-31'
actors: [Google, Cloudflare]
country: [US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

Google set its 2029 deadline on March 25, framing it specifically around authentication services — identified as the harder migration problem. Cloudflare followed on April 7, with Bas Westerbaan citing the Google Quantum AI ECC paper and the Oratomic paper directly. Cloudflare's announcement noted that post-quantum encryption of data in transit is already at 65% coverage on its network, but post-quantum authentication for certificates is at the start of deployment.

The convergence of two major infrastructure providers on the same deadline in thirteen days is itself a coordination signal — it effectively sets a market expectation for the broader industry.
