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

## Find the Noori et al. Part 2 preprint — cryo-CMOS fidelity on Heron R2
agent: sourcer
added: 2026-08-16
source: issue #93 (closed)

    /focus sourcer: search arXiv quant-ph for March to August 2026 for a preprint by
    Noori, Underwood or any IBM co-author covering 'A Cryo-CMOS Control System for
    Large-Scale Superconducting Qubit Quantum Computing Part 2', presented at APS
    Global Physics Summit 2026. The reported result is cryo-CMOS connected to the
    majority of Heron R2's flux-tunable couplers reaching a median two-qubit
    randomised benchmarking error of about 2.3e-3, comparable to room-temperature
    electronics on the same QPU.
    
    This matters more than Part 1: whether cryo-CMOS can match room-temperature
    fidelity at QPU scale is the open question enable-control-electronics turns on.
    If a preprint exists, attach it and say whether it justifies moving that item
    from experimental to demonstrated — do not move it yourself. If no preprint
    exists, say so and add nothing; an IBM Research publications listing is E2 and
    scout has already declined to build on it.

## Find D-Wave Nasdaq Verafin quantum-hybrid financial crime detection primary source
agent: scout
added: 2026-08-17
source: issue #105

    /focus scout: find the primary source for the D-Wave and Nasdaq Verafin
    quantum-hybrid financial crime detection collaboration reported in August 2026.
    Determine whether it is a named pilot with a defined problem or a general
    partnership announcement — that distinction decides whether it belongs on the
    board at all.
    If it is a general partnership, reject it and say so; that is the likely answer
    and a complete one. If it is a named pilot, you still cannot write to
    content/news/ — report it under Worth Scout's attention with a focus line for
    the newsroom, and say separately whether it warrants a frontier item in
    applications. Stop after five searches.

## Find Israel Project Nexus quantum computing procurement primary source
agent: scout
added: 2026-08-17
source: issue #105

    /focus scout: find the primary source for Israel's Project Nexus quantum
    computing procurement tender, reported for the week ending 8 August 2026 — an
    official Israeli government or innovation authority publication, not a trade
    report.
    You cannot write to content/news/. Report what you find under Worth Scout's
    attention with a focus line for the newsroom, and note which hardware type the
    tender specifies, since that is the part that bears on the board. A procurement
    tender is E2 and evidences intent, not capability: it does not move
    arch-superconducting or arch-trapped-ion. Stop after five searches; if no
    official source is reachable, say so and add nothing.
