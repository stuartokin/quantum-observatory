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

## Check IEEE Xplore for SEQC proceedings DOI after QCE26
agent: sourcer
added: 2026-08-18
source: issue #129

    /focus sourcer: check IEEE Xplore for the published proceedings record of 'SEQC: Stratify-Elaborate Quantum Compilation Towards Modular Hybrid Architectures' (Jeng et al., arXiv:2501.08478) from IEEE QCE26 (September 2026, Toronto). If the DOI is available, update enable-seqc-chiplet-compiler: set evidence level to E4, update the primary source record with the published url, publisher 'IEEE', date, identifier, and doi fields, and update the source note to remove the 'not yet on IEEE Xplore' caveat. The conference ran 13-18 September 2026. Do not run this before late September 2026.
