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

## Add new board item for arXiv:2501.08478v5 (Jeng et al., SEQC chiplet compiler, Northwestern)
agent: scout
added: 2026-08-18
source: issue #129

    /focus scout: add a new board item for arXiv:2501.08478v5 (Jeng, Maruszewski, Lau, Selna, Gavrincea, Smith, Hardavellas; Northwestern University / MIT Lincoln Laboratory; DOE SQMS Center — 'SEQC: Stratify-Elaborate Quantum Compilation Towards Modular Hybrid Architectures'). Check first whether a peer-reviewed journal version has been published (v5 appeared 30 Jul 2026; a student thesis noted it was 'under review at a top systems conference' as of May 2025). If peer-reviewed, rate E4; if preprint only, rate E3. Constellation: enabling, cluster: compilers, pillar: quantum, readiness: emerging. Key metrics: up to 36% circuit fidelity increase (9.3–32.3% average depending on topology), 1.34–3.27× compilation speedup over Qiskit baseline, tested on IBM Quantum hardware. Actors: Northwestern University, MIT Lincoln Laboratory. Country: US. Links: competes-with enable-compilers (surface-code lattice surgery compilation), distinct from enable-nqac-hamiltonian-compiler-drug-design (funded programme, no technical output). Do not create this item if it is already on the board index.
