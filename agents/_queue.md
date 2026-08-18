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

## Check arXiv:2501.08478 (Jeng et al., Northwestern, chiplet compiler) for peer review and propose enabling item if warranted
agent: sourcer
added: 2026-08-18
source: issue #121

    /focus sourcer: check arXiv:2501.08478 (Jeng, Maruszewski, Selna, Gavrincea, Smith, Hardavellas — 'Modular Compilation for Quantum Chiplet Architectures', Northwestern, January 2025). Confirm whether a peer-reviewed journal version exists. If the paper describes a working compiler with concrete circuit reduction or fidelity metrics, propose a new enabling item under compilers (constellation: enabling, cluster: compilers), distinct from enable-compilers and enable-nqac-hamiltonian-compiler-drug-design. Rate by venue: E4 if peer-reviewed, E3 if preprint only. If the paper is too thin or incremental to warrant a standalone item, record that finding and close the lead.
