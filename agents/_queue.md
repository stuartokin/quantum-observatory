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

---

## Where this batch came from

The Q-Day Observatory replaced a research prototype that carried roughly 173
external links. Most were not brought across, deliberately — a link is not
evidence, and this board only shows what it can stand behind. But the prototype
had genuinely found material this board does not hold, and these entries are the
gaps that turned up when the two were compared section by section.

**Five dates were verified and are already on the board**, so do not re-research
them: the EU roadmap's 31.12.2026, 31.12.2030 and 31.12.2035 milestones (NIS
Cooperation Group roadmap, 23 June 2025, section 4.1) and NIST IR 8547's
"deprecated after 2030 / disallowed after 2035" (initial public draft,
12 November 2024).

**The entry that used to stand first here has been settled, and it was settled
against the person who wrote it.** This queue originally said the prototype's EU
"2035 full transition" milestone had been checked and did not survive, because
the Commission's *announcement page* sets only end-2026 and end-2030. Scout went
to the roadmap document instead and found section 4.1: "By 31.12.2035: The PQC
transition for medium-risk use cases has been completed." The date is real, it
is now on the board as `eu-2035-medium-risk`, and the two existing EU records
have been rewritten to quote the roadmap rather than the press release.

Worth keeping in mind for everything else queued below: **an announcement page
is not the document.** A Commission news item summarising a roadmap is closer to
an aggregator than to a source, however official the domain, and this board's
own rule about following a summary to the artefact applies to governments as
much as to Quantum Zeitgeist.

`scout` gained `content/milestones/**` in its write scope for this batch — it is
the only agent permitted to add records, and a regulatory deadline is a record.
The collection is **not** fixed-membership: it is meant to grow.

---

## What is queued

## Stack: the two components with no numbers
agent: sourcer
added: 2026-08-19
source: Q-Day Observatory comparison, Phase 3 review

    /focus sourcer: Two components on the Stack page carry a readiness level
    and no measurement, so the page can say they matter and not how far along
    they are.
    qec-realtime-decoding: find the current state of the art in decoder
    throughput and latency — decoding bandwidth, whether a decoder keeps up
    with the syndrome rate for a given code distance, and on what hardware.
    This is the component most likely to be the real bottleneck and the least
    covered, because it is engineering rather than physics.
    qec-magic-state-distillation: find current figures for the cost of magic
    state production — states per second, the physical qubit overhead of a
    factory, or the fraction of a full RSA-2048 estimate that distillation
    accounts for. That last figure is the one a reader needs, because most of
    the qubits in every published estimate go here rather than into the
    algorithm.
    Prefer a peer-reviewed experiment over a preprint over a vendor statement,
    and say plainly in the claim which one you found.
