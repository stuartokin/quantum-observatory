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

## Re-check app-quantum-materials-advantage after the classical counter-paper
agent: verifier
added: 2026-08-16
source: issue #93

    /focus verifier: the steward has already applied a downward correction to
    app-quantum-materials-advantage for arXiv:2608.13110 (Manabe, Gu, Pan;
    SUTD/NVIDIA, 13 Aug 2026), which classically simulates the IBM/UChicago
    doped-Clifford circuit with a tensor 256 times smaller than IBM estimated.
    Check that correction is sound and complete: does the counter-paper reach the
    Qedma 74-qubit Floquet result or the Algorithmiq 56-qubit result, or only the
    doped-Clifford one? The item should say precisely which of the three claims is
    weakened and which stand. Apply further downward correction if warranted; raise
    nothing.
