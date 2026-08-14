---
schema: question/v1
id: q-day-timing
number: 2
question: Does anything alter the likely timing of Q-Day?
pillar: quantum
answer: 'Resource estimation preprints (Gidney 2025, Pinnacle Architecture 2026) have lowered the qubit floor for RSA-2048 factoring to sub-100,000 physical qubits on paper, but these are theoretical architectural proposals, not hardware demonstrations. The hardware gap — no machine near this scale with the required error rates and connectivity — remains the binding constraint. The GRI 2025 Quantum Threat Timeline survey (March 2026) places CRQC probability at 28–49% within 10 years, the highest recorded figure in seven years of surveys. NCSC, NSA, and NIST have not revised their 2033–2035 central estimate in response to 2025–2026 hardware announcements. The board''s position: Q-Day timing has not moved, but the upper bound of the uncertainty interval has tightened, and the ''maybe scalable QEC is impossible'' argument is no longer credible for superconducting and neutral-atom hardware.'
state: contested
asOf: '2026-08-14'
lastChanged: '2026-03-09'
changedBy: 'GRI 2025 Quantum Threat Timeline Report (published March 2026) recorded highest expert 10-year CRQC probability in survey history.'
evidence:
  - ref: crqc
    kind: frontier
    note: Board item tracking the cryptographically relevant quantum computer threshold.
  - ref: algo-resource-estimation
    kind: frontier
    note: Covers Gidney 2025 resource reduction; Pinnacle Architecture not yet added.
  - ref: algo-shor
    kind: frontier
    note: Hardware gap to Shor at cryptographic scale.
  - ref: 'https://globalriskinstitute.org/publication/quantum-threat-timeline-report-2025b/'
    kind: url
    note: 'GRI 2025 survey: 28–49% probability of CRQC within 10 years, up from 14–34% in 2024.'
  - ref: 'https://arxiv.org/abs/2505.15917'
    kind: url
    note: 'Gidney 2025: RSA-2048 under one million noisy qubits at 0.1% gate error.'
  - ref: 'https://arxiv.org/abs/2602.11457'
    kind: url
    note: 'Pinnacle Architecture: sub-100,000 physical qubits claimed; preprint, contested on engineering assumptions, not peer-reviewed.'
history:
  - date: '2026-03-09'
    was: 'GRI 2024 survey placed CRQC probability at 14–34% within 10 years. NCSC/NSA/NIST central estimate remained 2033–2035.'
    why: 'GRI 2025 survey (published March 2026) recorded sharpest single-year upward shift in expert estimates in report history.'
    by: agent
    agent: scout
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-14'
status: draft
added: '2026-08-14'
---

Two forces are pulling in opposite directions. On the hardware side, no machine close to the qubit counts needed to run Shor's algorithm at cryptographic scale exists or is on a near-term engineering roadmap. The 2029 targets from IBM and others are for early fault-tolerant systems, not CRQC-scale machines.

On the algorithmic side, resource estimates have compressed dramatically. The 2019 estimate of 20 million noisy qubits has been reduced to under one million (Gidney 2025) and potentially under 100,000 (Pinnacle Architecture 2026, preprint only, contested). Each compression was achieved through better algorithms and error-correction architectures, not better hardware — which means future improvements could come faster than hardware progress alone would imply.

The board scores this as `contested` rather than `moving` because the official institutional positions (NCSC, NSA, NIST) have not moved, while expert survey probability has reached a new high. The honest position: Q-Day is not imminent, but the arguments for treating it as distant have weakened.
