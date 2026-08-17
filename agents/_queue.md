# The queue

Focus instructions waiting to run. The steward writes them here after reading
the open issues; the agents drain them on their next run.

**Nothing here has run yet.** Delete any entry you disagree with — this file is
the window between an instruction being proposed and it being executed, and it
exists so that window is a real one rather than a formality.

## How an entry is read

Each entry is a `## ` heading, three metadata lines, and a fenced block holding
the exact instruction. The runner parses this file, so the shape matters:

```
## <a short description>
agent: scout
added: 2026-08-14
source: issue #85

    /focus scout: the exact instruction, indented four spaces
    continuing across as many lines as it needs
```

- **agent** — which agent runs it. One of scout, sourcer, verifier, reviewer,
  newsroom.
- **added** — when it was queued. Entries older than 21 days are dropped rather
  than run: an instruction that has sat unexecuted for three weeks has probably
  been overtaken, and running it blind is worse than losing it.
- **source** — the issue it came from, so a result can be traced back to the
  question that prompted it.

An entry is removed by the run that executes it. If a run fails, the entry stays
and will be tried again.

## What is queued

## File Israel Project Nexus sovereign quantum tender news item
agent: newsroom
added: 2026-08-17
source: issue #105

    /focus newsroom: add a news item for Israel's Project Nexus sovereign quantum tender announced 4 August 2026. Primary source to attempt: https://www.gov.il/en/pages/spoke-ai040826 (gov.il, cited by Quantum Zeitgeist). Corroborating sources: Times of Israel https://www.timesofisrael.com/israel-rolls-out-tender-for-national-quantum-computer-and-plans-for-advanced-ai-push/ and Jerusalem Post https://www.jpost.com/business-and-innovation/tech-and-start-ups/article-904774. Evidence level E2. Hardware architecture not specified. Does not move readiness on any existing frontier item.

## File Eaton AFRL $7M quantum grid-resilience contract news item
agent: newsroom
added: 2026-08-17
source: issue #105

    /focus newsroom: file a news item for the Eaton AFRL $7M quantum grid-resilience contract announced 6 August 2026. Primary source: https://www.eaton.com/us/en-us/company/news-insights/news-releases/2026/eaton-wins-contract-to-apply-quantum-computing.html (E2, vendor press release, corroborated by Business Wire). Partners are Infleqtion and Penn State. 24-month programme toward proof-of-concept. No frontier item warranted — funded programme, no demonstrated results. Link to quantum-sensing-grid if the news schema supports it.

## Monitor arXiv for IBM cryo-CMOS Heron R2 Noori et al. preprint
agent: sourcer
added: 2026-08-17
source: issue #105

    /focus sourcer: search arXiv quant-ph for a preprint from Noori, Underwood or IBM co-authors formalising the cryo-CMOS Heron R2 flux-bias result presented at APS Global Physics Summit 2026. The IBM Research publications listing at research.ibm.com/publications/a-cryo-cmos-control-system-for-large-scale-superconducting-qubit-quantum-computing-part-2 confirms the result exists (median 2Q RB error approximately 2.3e-3 on majority of Heron R2 couplers). If a preprint or journal paper has appeared, attach it to enable-control-electronics and flag whether readiness should move from demonstrated; existing item is E4 on Underwood et al. PRX Quantum 2024. If no preprint exists, say so and add nothing.
