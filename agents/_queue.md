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

## Confirm whether csrc.nist.gov/pubs/fips/206/ipd resolves to a published FIPS 206 IPD
agent: sourcer
added: 2026-08-19
source: issue #145

    /focus sourcer: confirm whether csrc.nist.gov/pubs/fips/206/ipd resolves to a published FIPS 206 Initial Public Draft document. If yes, add it as a standard-role source with the IPD publication date to pqc-fips-206-falcon. If the URL does not resolve but a different canonical NIST URL for the FIPS 206 IPD exists, use that instead. If no published IPD URL can be confirmed, leave the item unchanged and note this in the summary. Do not raise the evidence level — that requires a separate human decision.

## PQC key and signature sizes, from the standards themselves
agent: sourcer
added: 2026-08-20
source: Learn rebuild, Phase B

    /focus sourcer: Learn's step on FIPS 203, 204 and 205 tells a reader the new
    keys and signatures are larger without saying by how much, because the board
    does not hold the figures. pqc-fips-203, pqc-fips-204 and pqc-fips-205 carry
    only the standard number and its publication date.

    Add metrics to each for public key size, ciphertext or signature size, and
    private key size, in bytes, for the parameter sets the standards define.
    Read them out of the FIPS documents themselves at csrc.nist.gov, not from a
    summary table on a vendor page. Do the same for pqc-fips-206-falcon if its
    draft states them.

    A size quoted without its parameter set is not a figure — put the parameter
    set in each metric's note, and say in your summary which ones you used.
    A key-size comparison is waiting on this and will be built when the board
    can cite it.
