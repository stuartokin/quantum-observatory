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

## Assess arXiv:2607.25998 (Barron et al., IBM/Algorithmiq, dual-verification framework) for standalone item
agent: sourcer
added: 2026-08-17
source: issue #121

    /focus sourcer: review arXiv:2607.25998 (Barron, Mitchell, Filippov, Kandala et al., IBM/Algorithmiq, 'Observable Estimation in the Absence of Classical Verification', July 2026). This paper is currently listed as a corroborating source in app-quantum-materials-advantage. The scout (PR #127) flagged it as potentially warranting a standalone enabling or algorithms item on error-mitigation verification methodology — specifically whether the dual-verification framework for error-mitigated quantum expectation values without classical verification is a distinct methodological contribution from QESEM. If it warrants its own item, propose one at E3 (preprint). If not, confirm it is correctly placed as corroboration in app-quantum-materials-advantage and do not duplicate. Do not duplicate app-floquet-prethermalization-qesem.
