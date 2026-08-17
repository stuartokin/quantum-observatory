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

## RWS-QAOA arXiv:2603.10191 — assess for algorithms board entry
agent: scout
added: 2026-08-17
source: issue #117

    /focus scout: review arXiv:2603.10191 (He et al., JPMorganChase, March 2026) on Regularized Warm-Started QAOA. The paper claims a quantum-classical runtime crossover below 0.2 seconds on 3000-node Max-Cut graphs with under 1.3 million physical qubits on surface-code fault-tolerant hardware. Assess whether this is a concrete enough resource estimate and advantage claim to warrant an algorithms item on the board. If yes, propose at E3 (preprint). Note whether the claimed crossover changes assumptions in algo-resource-estimation or algo-quantum-simulation.

## Infleqtion–Argonne DOE Genesis Mission nuclear quantum circuit optimisation — assess for board entry
agent: scout
added: 2026-08-17
source: issue #117

    /focus scout: check whether the Infleqtion–Argonne National Laboratory DOE Genesis Mission collaboration on AI-optimisation of quantum circuit design for realistic nuclear problems (announced July 2026, distinct from the NQAC fuel-assembly item) has produced any arXiv preprint or technical report. Primary source is https://infleqtion.com/infleqtion-to-deploy-fault-tolerant-neutral-atom-quantum-computer-in-illinois/ If technical output exists, assess whether it warrants a new applications or enabling item distinct from app-nqac-nuclear-reactor-optimization. If no technical output, propose at E2 on the announcement if the scope is sufficiently distinct.

## Update app-nqac-nuclear-reactor-optimization with QCR July 2026 source
agent: sourcer
added: 2026-08-17
source: issue #117

    /focus sourcer: check whether app-nqac-nuclear-reactor-optimization should be updated to add the QCR July 2026 report (https://quantumcomputingreport.com/infleqtion-to-deploy-fault-tolerant-neutral-atom-quantum-computer-at-illinois-quantum-park/) as a corroborating source. The QCR report names Q-FLO fuel loading as a specific focus area and names Dhirpal Shah as the researcher. Evidence level and readiness remain E2 and emerging — this is a source metadata update only, not an evidence level change. Add the source if it sharpens the claim text.
