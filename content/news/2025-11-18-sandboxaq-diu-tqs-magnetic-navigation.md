---
schema: news/v1
id: 2025-11-18-sandboxaq-diu-tqs-magnetic-navigation
headline: 'US Defense Innovation Unit adds SandboxAQ quantum magnetic navigation to its Transition of Quantum Sensing programme'
pillar: quantum
date: '2025-11-18'
plain: 'The Pentagon''s Defence Innovation Unit has a formal programme — Transition of Quantum Sensing — designed to take quantum sensing technology from laboratory to operational military use. Joining it is not the same as being deployed, but it is a deliberate procurement step: it means the US military will test and benchmark a system across multiple aircraft types and mission conditions, generating the dataset needed to evaluate readiness for operational adoption. SandboxAQ''s AQNav uses quantum magnetometers and AI software to navigate by Earth''s geomagnetic field without any external signal, which makes it immune to GPS jamming. The system had already logged over 450 flight hours across four aircraft types before this agreement. The military need it addresses is real and growing: GPS denial and spoofing in contested airspace is now a routine threat.'
significance: notable
source:
  url: https://www.sandboxaq.com/press/sandboxaq-partners-with-dows-defense-innovation-unit-to-advance-development-of-magnetic-navigation-systems
  kind: vendor
  title: 'SandboxAQ Partners with DoW''s Defense Innovation Unit to Advance Development of Magnetic Navigation Systems'
  publisher: SandboxAQ
  date: '2025-11-18'
corroboration:
  - url: https://www.defenseone.com/technology/2025/11/pentagon-expands-partnership-quantum-sensing-startup/409597/
    publisher: Defense One
    kind: journalism
  - url: https://quantumcomputingreport.com/sandboxaq-partners-with-dows-defense-innovation-unit-to-advance-quantum-enabled-magnetic-navigation/
    publisher: Quantum Computing Report
    kind: journalism
validation:
  status: verified
  checks:
    - 'SandboxAQ primary press release opened and confirmed: agreement with DIU, TQS programme, November 18 2025'
    - 'Defense One (independent defence journalism) corroborates and adds context — describes the agreement as allowing military to test AQNav aboard a range of aircraft under varied conditions'
    - 'Quantum Computing Report independently confirms the 450+ flight hours figure and AQNav''s prior USAF work'
    - 'This is a procurement/evaluation agreement, not a deployment. Marked single-source for the technical claims (no independent measurement of AQNav performance published); verified for the fact of the agreement itself'
  note: 'AQNav accuracy figures come from SandboxAQ''s own reporting. No independent third-party measurement of navigational accuracy published as of this run.'
about:
  - sense-inertial-navigation
  - sense-nv-magnetometry
establishedBy:
  - url: https://arxiv.org/abs/2504.08167
    title: 'Quantum-assured magnetic navigation achieves positioning accuracy better than a strategic-grade INS in airborne and ground-based field trials'
    relation: builds-on
    date: '2025-04'
actors: [SandboxAQ, Defense Innovation Unit]
country: [US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The Transition of Quantum Sensing (TQS) programme sits within DIU's Emerging Technologies portfolio and is explicitly designed to bridge the gap between commercial quantum sensing research and military adoption. Joining it gives SandboxAQ access to a structured evaluation process across multiple aircraft platforms and mission profiles.

Magnetic Anomaly Navigation (MagNav) uses the natural variation in Earth's crustal magnetic field as a position reference. It requires no external signal and cannot be jammed. The limitations are map quality and sensor noise — both of which AQNav's quantum magnetometers and AI denoising algorithms address. SandboxAQ claims the system has already beaten strategic-grade inertial navigation systems in accuracy during flight trials.

This is an evaluation agreement, not a procurement. The outcome — whether the technology is adopted for operational use — depends on how it performs against DIU's specific use-case benchmarks, which have not been published.
