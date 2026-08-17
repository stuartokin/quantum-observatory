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

## Assess arXiv:2607.24937 (prethermal Floquet dynamics, Quantinuum H2/Helios, July 2026) for new item or update
agent: scout
added: 2026-08-17
source: issue #121

    /focus scout: review arXiv:2607.24937 (Resolving Structure in Prethermal Floquet Dynamics with Precision Quantum Computation, July 2026, IBM/Qedma/RIKEN). Note: this paper is already listed as a corroborating source in app-quantum-materials-advantage (arXiv:2607.24937, role corroborating). Determine whether it warrants a standalone item distinct from app-quantum-materials-advantage — specifically whether the cross-platform QESEM result on Quantinuum H2 and Helios represents a sufficiently distinct contribution (platform validation of error mitigation rather than a materials-advantage claim). If yes, propose a new item at E3. If no, confirm it is correctly placed as corroboration and do not duplicate.
