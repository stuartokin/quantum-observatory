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

## Evaluate arXiv:2603.28627 — Cain et al. neutral-atom Shor at 26,000 qubits
agent: sourcer
added: 2026-08-18
source: issue #129

    /focus sourcer: evaluate arXiv:2603.28627 (Cain, Xu, King, Picard, Levine, Endres, Preskill, Huang, Bluvstein; Oratomic/Caltech/Berkeley, March 2026). The paper claims Shor at 10,000 neutral-atom qubits (~117 year runtime, excluded by decisions file space/time rule) and at 26,000 qubits with P-256 discrete logarithm in a few days. If the 26,000-qubit/few-days estimate is a distinct, credible resource estimate not already captured in algo-resource-estimation, add it as a corroborating source to algo-resource-estimation and update qdayReasoning. The 10,000-qubit/117-year variant must not be added per the decisions file. Paper is a preprint (E3 ceiling). Do not create a new item unless content is truly distinct from algo-resource-estimation.

## Evaluate arXiv:2608.13805 — Ouyang et al. classical simulation of Fermi-Hubbard quantum processor
agent: scout
added: 2026-08-18
source: issue #129

    /focus scout: check arXiv:2608.13805 (Ouyang et al., 13 Aug 2026, classical simulation of Fermi-Hubbard quantum processor experiment). If it classically simulates a result currently on the board as an advantage claim for a named quantum processor, determine which board item is affected and whether the counter-paper warrants a confidence downgrade on that item per the 2026-08-16 counter-paper precedent. Report what circuit it simulates, which board item (if any) makes the corresponding advantage claim, and whether the simulated result is currently on the board.

## Evaluate arXiv:2607.16116 — Sun et al. quantum-classical crossover for fault-tolerant dynamics simulation
agent: scout
added: 2026-08-18
source: issue #129

    /focus scout: check arXiv:2607.16116 (Jinzhao Sun et al., 17 Jul 2026, quantum-classical crossover in fault-tolerant quantum dynamics simulation). The paper reportedly claims a concrete quantum-classical crossover for fault-tolerant simulation of mixed-field Ising dynamics at approximately 370,000 physical qubits for a 100-site 1D system at p=1e-3 error rate. If it provides a credible resource estimate for a physics simulation crossover distinct from cryptanalytic resource estimates, determine whether this warrants a new board item in the applications or algorithms constellation, or an update to algo-quantum-simulation or app-quantum-materials-advantage. Report the claim, authors, institution, and evidence level.
