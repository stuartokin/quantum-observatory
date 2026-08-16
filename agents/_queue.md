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

## Confirm NIST IR 8610 on additional PQC signature candidates
agent: scout
added: 2026-08-14
source: issue #74

    /focus scout: confirm NIST IR 8610 of May 2026, which advanced nine additional
    digital-signature candidates to a third evaluation round. Confirm the
    publication date, the nine candidates, and how they relate to the current
    FIPS 204 and FIPS 205 set. Assess whether a new pqc item is warranted or whether
    an existing one covers it.

## Find the Q4Bio Nature Biotechnology paper on 12,000-atom simulation
agent: scout
added: 2026-08-14
source: issue #85

    /focus scout: confirm the Q4Bio Nature Biotechnology paper of July 2026 on
    hybrid quantum-classical simulation of protein complexes over 12,000 atoms.
    Confirm DOI, authors and institutions, and establish whether this is a quantum
    advantage claim or a hybrid result that remains classically verifiable. Assess
    whether it warrants an applications item — and if it does, the item must say
    plainly which of those two it is.
