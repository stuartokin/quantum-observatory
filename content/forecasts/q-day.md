---
schema: forecast/v1
id: q-day
pillar: quantum
title: Q-Day
question: When could a quantum computer practically break RSA-2048 or deployed elliptic-curve cryptography?
estimates:
  earliest: 2034
  aggressive: 2036
  central: 2038
  conservative: 2041
state: human-set
by: human
'on': '2026-08-07'
lastHumanReview: '2026-08-07'
note: 'Outer bounds set by hand. Inner values are provisional until the expert synthesis in content/forecasts/experts/ is populated.'
log:
  - date: '2026-08-07'
    from: 'unset'
    to: '2034-2041'
    by: human
    evidence: 'Baseline set at the start of the agent programme.'
    assumption: 'None changed — this is the starting position.'
  - date: '2026-08-19'
    from: '2034-2041'
    to: '2034-2041'
    by: human
    evidence: 'No estimate moved. The log entry above recorded the baseline as 2036-2041 while the estimates block has always read earliest 2034 — the outermost axis was omitted from the record rather than changed after it. Corrected so the log and the estimates agree; this became visible when the Q-Day Observatory began rendering the change history beside the countdown.'
    assumption: 'None. A metadata correction, not a movement — the numbers a reader sees are unchanged.'
---

The date everything else is measured against. Not a countdown: a countdown with
its own change history, where every movement is attributable to a source.

**Scientific feasibility is not engineering feasibility is not economic
feasibility is not actual cryptanalytic capability.** A result can be
scientifically decisive and move the engineering timeline not at all.

Agents may move this estimate. When they do it is stamped `agent-estimate` and
cannot be un-stamped by anything but a human. Guardrails: one axis at a time, a
two-year cap on any single move, evidence required, and never on a vendor
roadmap.
