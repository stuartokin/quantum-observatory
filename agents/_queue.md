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

## Australia: the ASD transition deadline
agent: scout
added: 2026-08-19
source: Q-Day Observatory comparison, Phase 3 review

    /focus scout: The board holds no Australian milestone. The Australian
    Signals Directorate's Information Security Manual is understood to set a
    2030 date for ceasing approval of traditional asymmetric cryptography (RSA,
    ECDH, ECDSA, DH) for Australian government systems, which would make it the
    earliest national hard deadline anywhere and worth having.

    Start from cyber.gov.au: "Planning for post-quantum cryptography" and the
    ISM "Guidelines for cryptography" chapter. Note that cyber.gov.au refuses
    automated fetching, so this needs a real read rather than a scrape.

    Record for each date you find: the exact year, what ceases or is required,
    whether it binds government systems only or industry as well, the ISM
    revision that sets it, and its publication date. Add them to
    content/milestones/ with jurisdiction AU and authority "ASD". If there are
    intermediate milestones before 2030, record those too — a single end date
    with nothing before it is usually a summary rather than the plan.

    This has already been researched successfully twice and lost twice, both
    times on field lengths rather than on the finding. You reached the sources
    and wrote asd-ism-pqc-cessation-2030 and asd-ism-pqc-plan-2026; both were
    discarded because `plain` and `review.note` were written to frontier-item
    limits. **On a milestone, `plain` is 400 characters and `review.note` is
    600.** Count them before returning. The rest of the work was right.

## United States: the OMB civilian timeline and the FIPS 140-2 sunset
agent: scout
added: 2026-08-19
source: Q-Day Observatory comparison, Phase 3 review

    /focus scout: Part (a) of this entry is done and is already on the board —
    do not repeat it. Executive Order 14412 was read in the published order
    text (91 FR 38484, 25 June 2026) and its two dated requirements are now
    eo-14412-2030-key-establishment and eo-14412-2031-signatures. Section 4(c)
    sets a NIST-internal migration pilot to be completed by 31 December 2027,
    which was judged too narrow for a board milestone; say so if you disagree.

    Two parts remain, each needing its own primary document:
    (b) OMB M-26-15 — the reported five-phase civilian timeline running to 2035.
        Find the memorandum itself on whitehouse.gov/omb, not a law firm's
        summary of it.
    (c) The date FIPS 140-2 certificates move to Historical status, after which
        only 140-3 validated modules may be procured. Primary source is the
        NIST CMVP programme pages.

    Add each as a separate milestone record. Where a date is set by an
    executive order or a memorandum rather than a standard, say so in `what` —
    an EO can be revoked by the next administration and a standard cannot, and
    a reader planning ten years out needs to know which kind of date they are
    looking at.

## The standards themselves: FIPS 206, HQC, and SP 800-57 Rev 6
agent: sourcer
added: 2026-08-19
source: Q-Day Observatory comparison, Phase 3 review

    /focus sourcer: Three standards items on the board are thin or stale where
    the Plan page needs them.

    pqc-fips-206-falcon: establish the current status of FIPS 206 (FN-DSA,
    from Falcon) — whether the draft has been published, when, and what the
    expected final date is. Cite the NIST PQC project page and any Federal
    Register notice.

    pqc-hqc: HQC was selected in March 2025 as the backup KEM on different
    mathematics. Establish the expected final standard date and the draft
    status. The distinction that matters for a reader is that HQC is a hedge
    against lattices being broken, not a second choice for general use — make
    sure the claim says that.

    Also: NIST SP 800-57 Part 1 Revision 6 (initial public draft, December
    2025) is reported to fold the post-quantum algorithms into NIST's
    key-management guidance for the first time. If that is right it belongs on
    the board, because SP 800-57 is what most organisations' key-management
    policy actually cites. Attach it to whichever existing item fits or flag it
    for scout in your summary.

## Capability history: backfill the measurements the newsroom already has
agent: newsroom
added: 2026-08-19
source: Q-Day Observatory comparison, Phase 3 review

    /focus newsroom: The news schema gained a `measurements[]` block, which is
    the only accumulating capability record this board has — a frontier item
    holds the current best figure and overwrites its own history, but a news
    item is dated by when the thing happened and is never revised.

    Seven measurements exist across six items. Roughly 52 published news items
    state a qubit count, a fidelity or a code distance in their headline or
    plain text without recording it structurally.

    Work through the back catalogue and add `measurements[]` to those items.
    Rules that matter more than volume:
    - Only record a figure the item's own sources state. This is transcription,
      not inference, and not new research.
    - `modality` is mandatory for any qubit count. Counts on different platforms
      are not points on one curve.
    - `qualifier` distinguishes measurements that look alike and are not:
      "error-corrected" against "error-detected", "trapped in a tweezer array"
      against "operated below threshold". Without it the series shows capability
      falling by an order of magnitude between two real results.
    - Set `crossChecks` to a frontier item wherever the same figure already
      appears there as a verified metric.
    Twelve to fifteen items in one run is plenty. Report how many you left.

## The requirement trend needs its earlier points
agent: sourcer
added: 2026-08-19
source: Q-Day Observatory comparison, Phase 3 review

    /focus sourcer: The Trends page derives the falling requirement floor from
    dated metrics on algo-resource-estimation and algo-shor. The trend is real
    but short — it currently starts in May 2025, because the earlier estimates
    exist only as prose inside metric notes and the derivation refuses to read
    prose.

    Add these as first-class metrics with their own dated sources, so the trend
    reaches back to where it actually starts:
    - Gidney and Ekera 2019: 20 million noisy physical qubits for RSA-2048 in 8
      hours (arXiv:1905.09749).
    - Haner et al. 2020: the 2,124-logical-qubit estimate for ECC-256 that
      Chevignard's 1,193 improved on.
    Each note must name its paper's identifier in the form the existing metrics
    use ("arXiv:1905.09749"), because that string is what the derivation matches
    against evidence.sources to date the figure. A metric whose note names no
    source the item carries is refused and will not appear.

## The expert survey has earlier editions than the one on the board
agent: sourcer
added: 2026-08-19
source: Q-Day Observatory comparison, Phase 3 review

    /focus sourcer: crqc carries the Global Risk Institute Quantum Threat
    Timeline 2025 figures — 28-49% within ten years, 51-70% within fifteen.
    That single survey currently sets the entire derived Q-Day window, because
    it is the only evidence on this board that maps to calendar years.

    The GRI survey is annual and longitudinal. Earlier editions reportedly put
    the ten-year figure at 17-31% (2023) and 19-34% (2024). If those hold up,
    the board can show expert opinion *accelerating* rather than a single
    snapshot — which is a materially different and better-evidenced claim, and
    the acceleration is itself the finding.

    Add each edition as its own metric with its own publication date, named so
    the year is unambiguous ("Expert survey probability of CRQC within 10 years
    (2024 edition)"). Do not merge them into one figure.

    Also worth attaching: Michele Mosca's own 2015 estimate of a 1-in-2 chance
    of RSA-2048 falling by 2031 (eprint.iacr.org/2015/1075), which is the
    origin of the X+Y>Z inequality this site's Mosca test uses. A named forecast
    from a decade ago that can now be checked against reality is worth more
    than most current commentary.

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

## Stack: circuit depth and runtime have no home on the board
agent: scout
added: 2026-08-19
source: Q-Day Observatory comparison, Phase 3 review

    /focus scout: Every published RSA-2048 resource estimate is a pair — a
    qubit count and a runtime — and this board records only the qubit count.
    That matters because the two trade against each other: an estimate can
    always buy fewer qubits with a longer run, and the board's own precedent
    says an estimate trading space for an impractical runtime is not a threat
    metric.

    The board has no item covering sustained circuit depth, coherence-limited
    runtime, or the depth a cryptanalytic circuit requires. Without one, the
    Stack page cannot show the component the prototype called "depth and
    speed", and the requirement figures on the Trends page are quoted without
    the runtime that qualifies them.

    Propose one item covering it, with primary sources. Make sure the claim
    states the runtime attached to each headline qubit figure the board already
    carries — under a million qubits for RSA-2048 means little without the
    "in under a week" that Gidney's estimate attaches to it.
