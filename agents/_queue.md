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

## Evaluate arXiv:2607.08811 (Krinitsin et al.) for counter-paper impact on board items
agent: scout
added: 2026-08-18
source: issue #129

    /focus scout: read arXiv:2607.08811 (Krinitsin et al., Jul 2026), described as a Comment on 'Beyond-classical computation in quantum simulation' (the D-Wave Science 2025 paper, DOI 10.1126/science.ado6285, which is the primary source for algo-quantum-simulation and arch-annealing). Determine whether it contains a classical counter-result or methodological critique that warrants a confidence downgrade on algo-quantum-simulation or arch-annealing per the 2026-08-16 counter-paper precedent. Report the claim, which board item is affected, and whether a correction is needed.

## Evaluate arXiv:2605.04025 (Q-CTRL/IBM Fermi-Hubbard) as potential standalone contested-advantage-claim item
agent: scout
added: 2026-08-18
source: issue #129

    /focus scout: check arXiv:2605.04025 (Hartnett et al., Q-CTRL/IBM, May 2026). This paper claims a 120-qubit Fermi-Hubbard quantum simulation with 3,000x speedup over classical TDVP. It has since been classically countered by two independent groups (arXiv:2606.04771 Rausch et al. and arXiv:2608.13805 Ouyang et al.). Determine whether it warrants a standalone board item as a contested advantage claim so the counter-papers have something to link against, or whether it is adequately covered as corroborating context in algo-classical-fermi-hubbard-ouyang. If a new item is warranted, propose it at emerging with confidence low and cite both classical counters.
