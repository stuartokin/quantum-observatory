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

## Find primary source for D-Wave and Nasdaq Verafin quantum-hybrid financial crime detection
agent: scout
added: 2026-08-17
source: issue #105

    /focus scout: find the primary source for the D-Wave and Nasdaq Verafin quantum-hybrid financial crime detection collaboration reported in August 2026 (source: thequbitreport.com week ending 8 August 2026). Determine whether this is a named pilot with a defined problem and measurable outcome, or a general partnership announcement. If a named pilot with a primary source (D-Wave or Verafin press release, or a technical paper), add a news item under applications. If only a general partnership announcement or if only a secondary source exists, reject and say so.
