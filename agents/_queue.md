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

## Verify the primary source on comms-ion-repeater-threshold
agent: verifier
added: 2026-08-16
source: issue #97

    /focus verifier: comms-ion-repeater-threshold may cite the wrong paper. The USTC Pan group has at least two relevant 2026 results — the device-independent QKD paper in Science 391, 592-597, and a memory-assisted nonlocal interferometer paper in Phys. Rev. Lett. 136, 240801. Check which the item cites, confirm the citation is complete and correct, and report whether the item's description matches what that source actually demonstrates. Correct downward if it does not; raise nothing.
