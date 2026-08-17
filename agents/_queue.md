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

## Recheck arXiv for IBM Heron R2 cryo-CMOS flux-bias preprint
agent: sourcer
added: 2026-08-17
source: issue #112

    /focus sourcer: re-check arXiv quant-ph and cs.AR for a preprint by Noori, Underwood, or IBM co-authors formalising the cryo-CMOS Heron R2 flux-bias result from APS Global Physics Summit 2026 (March 16 2026). IBM Research listings are at research.ibm.com/publications/a-cryo-cmos-control-system-for-large-scale-superconducting-qubit-quantum-computing-part-1 and part-2. If a preprint or journal paper with a DOI has appeared, attach it to enable-control-electronics as a corroborating source at E3 (arXiv) or E4 (peer-reviewed). If still not found after three searches, do not re-queue — close the lead as unsourceable per the decisions file.

## Consider adding Infleqtion ENCODE ARPA-E grid-optimization program as E2 board item
agent: scout
added: 2026-08-17
source: issue #112

    /focus scout: consider adding a board item for the Infleqtion ENCODE ARPA-E program (quantum algorithms for energy grid optimization on neutral-atom hardware, $6.2M DOE award, partners include Argonne National Laboratory, EPRI, ComEd, executing from Feb 2026). Primary source is the Infleqtion press release at infleqtion.com/infleqtion-advances-arpa-e-quantum-computing-grid-optimization-program/. Evidence ceiling is E2 until a primary paper appears. Only add if the programme meets the board threshold for a tracked item — a named funded multi-institution programme with defined technical goals. If added, id should follow board conventions (e.g. app-infleqtion-encode-grid-optimization) and be distinct from any Eaton/AFRL contract item. No primary paper exists as of 2026-08-17; do not add an item implying one does.
