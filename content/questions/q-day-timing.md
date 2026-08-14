---
schema: question/v1
id: q-day-timing
number: 2
question: Does anything alter the likely timing of Q-Day?
pillar: quantum
answer: 'The Gidney 2025 preprint (arXiv:2505.15917) reduced the estimated qubit count to break RSA-2048 from 20 million to under one million, on the same hardware assumptions, through algorithmic improvements alone. This is the single most consequential change to Q-Day planning since 2019 — no hardware changed, yet the machine needed is now twenty times smaller. The GRI/evolutionQ 2025 expert survey (26 experts, March 2026) placed a CRQC at 28–49% probability within ten years, the highest ten-year estimate in the survey''s seven-year history. No CRQC exists as of August 2026; the largest deployed processors hold around 1,200 noisy physical qubits. The hardware gap remains measured in orders of magnitude.'
state: moving
asOf: '2026-08-14'
lastChanged: '2026-08-14'
changedBy: Gidney arXiv:2505.15917 (May 2025) reducing qubit estimate twenty-fold; GRI 2025 survey showing sharpest upward expert probability shift in report history.
evidence:
  - ref: algo-resource-estimation
    kind: frontier
    note: Gidney 2025 preprint is the primary source; already on board.
  - ref: crqc
    kind: frontier
    note: No CRQC exists; this item tracks the gap.
  - ref: https://globalriskinstitute.org/publication/quantum-threat-timeline-report-2025b/
    kind: url
    note: GRI Quantum Threat Timeline Report 2025, March 2026. 26 experts; 28-49% within 10 years.
history:
  - date: '2026-08-09'
    was: Gidney 2025 preprint noted as primary driver; GRI 2024 survey cited. Answer confirmed but dates needed updating.
    why: Previous answer was current; asOf date advanced.
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

The twenty-fold reduction in the estimated qubit count to break RSA-2048 (Gidney, May 2025) is an algorithmic result with no hardware counterpart — it means the machine needed to reach Q-Day is now substantially closer in specification to machines being built, even though the gap in practice remains enormous. The GRI 2025 expert survey records the sharpest single-year upward shift in ten-year CRQC probability since the survey began in 2019. Neither result changes the current hardware reality: no machine approaching cryptanalytic capability exists. The planning implication is that the margin of error on migration timelines has narrowed.
