---
schema: question/v1
id: q2-qday-timing
number: 2
question: 'Does anything alter the likely timing of Q-Day?'
pillar: quantum
answer: 'Expert sentiment has accelerated: the GRI 2025 survey (March 2026) places a 28–49% probability of a CRQC within 10 years, the highest figure in the survey''s history. The physical qubit threshold for breaking RSA-2048 has fallen roughly 200-fold since 2019 through algorithm improvements alone — from 20 million (Gidney+Ekerå 2019) to under 1 million (Gidney 2025) to under 100,000 (Pinnacle Architecture 2026) — without any hardware having been built. These are resource estimate improvements, not hardware achievements; the machine still does not exist. No standards body has revised its migration timeline in response to any 2025–2026 announcement. The board holds its Q-Day estimate unchanged; what has changed is the resource ceiling needed, which is now meaningfully lower.'
state: moving
asOf: '2026-08-12'
lastChanged: '2026-05-21'
changedBy: 'Gidney arXiv:2505.15917 (May 2025) reduced the surface-code RSA-2048 qubit estimate from 20 million to under 1 million, representing the largest single algorithmic reduction in the published literature. The Pinnacle Architecture (arXiv:2602.11457, February 2026) further reduced the figure to under 100,000 using qLDPC codes, though this requires non-local connectivity not yet demonstrated at scale.'
evidence:
  - ref: algo-resource-estimation
    kind: frontier
    note: 'Gidney 2025 preprint is the primary source for the 1M qubit figure; Pinnacle 2026 claims 100K with qLDPC.'
  - ref: crqc
    kind: frontier
    note: 'GRI 2025 survey data underpins the expert probability figures.'
  - ref: algo-shor
    kind: frontier
    note: 'Hardware gap context — the machine does not yet exist.'
history:
  - date: '2026-05-21'
    was: 'Q-Day timing unchanged; Gidney 2025 preprint reduced the qubit estimate to under 1 million but did not change the hardware availability timeline.'
    why: 'Gidney arXiv:2505.15917 published May 2025; boards updated to reflect the lower resource estimate.'
    by: agent
    agent: scout
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-12'
status: draft
added: '2026-08-12'
---

The distinction that matters: resource estimates are falling rapidly; hardware is not keeping pace. A 200-fold reduction in the theoretical qubit count required does not move the date on which such a machine exists. What it does is compress the buffer between "machines of this scale exist" and "machines of this scale can threaten RSA-2048". That buffer is now smaller than it was in 2019, which is why the GRI expert panel is showing a record upward shift in near-term probability. The board should not adjust its Q-Day forecast on preprints alone; but it should note that the algorithmic headroom for hardware developers is now substantially less than the standard narrative assumed.
