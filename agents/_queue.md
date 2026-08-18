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

## Check algo-qctrl-fermi-hubbard-advantage v2 claim text for downgrade
agent: sourcer
added: 2026-08-18
source: issue #129

    /focus sourcer: check arXiv:2605.04025 v2 (July 2026) — the Q-CTRL/IBM Fermi-Hubbard preprint — to confirm whether the authors explicitly accept that Rausch et al. (arXiv:2606.04771) certify their hardware results and revise the 3000× speedup claim. If the v2 text supports it, update algo-qctrl-fermi-hubbard-advantage claim text to reflect the authors' own acknowledgement, and lower confidence from low to low (it is already low — check whether the claim text itself overstates the advantage). This is a downward correction needing no permission.
