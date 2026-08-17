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

## Find the Noori et al. Part 2 preprint — cryo-CMOS fidelity on Heron R2
agent: sourcer
added: 2026-08-16
source: issue #93 (closed)

    /focus sourcer: search arXiv quant-ph for March to August 2026 for a preprint by
    Noori, Underwood or any IBM co-author covering 'A Cryo-CMOS Control System for
    Large-Scale Superconducting Qubit Quantum Computing Part 2', presented at APS
    Global Physics Summit 2026. The reported result is cryo-CMOS connected to the
    majority of Heron R2's flux-tunable couplers reaching a median two-qubit
    randomised benchmarking error of about 2.3e-3, comparable to room-temperature
    electronics on the same QPU.
    
    This matters more than Part 1: whether cryo-CMOS can match room-temperature
    fidelity at QPU scale is the open question enable-control-electronics turns on.
    If a preprint exists, attach it and say whether it justifies moving that item
    from experimental to demonstrated — do not move it yourself. If no preprint
    exists, say so and add nothing; an IBM Research publications listing is E2 and
    scout has already declined to build on it.

## Find a citable source for the IBM 100-qubit chemistry result of April 2026
agent: scout
added: 2026-08-16
source: issue #93 (closed)

    /focus scout: the IBM newsroom post of 16 April 2026 describes Algorithmiq, IBM
    and Cleveland Clinic running ground- and excited-state chemistry circuits on up
    to 100 qubits of IBM hardware. That post is E2 and cannot carry an item on its
    own.
    
    Search for a preprint or peer-reviewed paper behind it. If one exists, assess
    whether it raises app-pdt-qb-dmrg above its current E2 ceiling — that raise
    needs human sign-off, so report it rather than applying it — or whether it
    warrants a separate item. If only the newsroom post exists, record the date
    checked and leave the board unchanged. Two scout runs have already searched for
    QB-DMRG specifically and found nothing; search for the hardware experiment
    rather than the method name.

## Find Communications Physics Rydberg microwave electrometry ML-PCA paper (Aug 2026)
agent: scout
added: 2026-08-17
source: issue #105

    /focus scout: find the Communications Physics paper on Rydberg microwave electrometry with a machine-learning PCA framework that appears in the August 2026 recent articles listing. Identify authors, publication date and DOI. If it is a new peer-reviewed result rather than a restatement of earlier work (e.g. NComms 2022 Rydberg+deep learning), add a news item under sense-rf-rydberg.

## Evaluate Weizmann PRX 7 033021 Peleg et al. — experimental or theoretical?
agent: scout
added: 2026-08-17
source: issue #105

    /focus scout: determine whether PRX Quantum 7, 033021 (Peleg et al., Weizmann, Aug 2026, 'Fast Design and Scaling of Multiqubit Gates in Large-Scale Trapped-Ion Quantum Computers') reports an experimental result or a theoretical/algorithmic advance. If experimental, add under arch-trapped-ion at E4; if theoretical only, record as E1 and note the paper as a corroborating source on enable-compilers.

## Check for Microsoft Majorana 2 preprint on arXiv (Aug 2026)
agent: scout
added: 2026-08-17
source: issue #105

    /focus scout: check whether a preprint for Microsoft Majorana 2 exists on arXiv or elsewhere as of August 2026. If it does, note its claims in the arch-topological source list as a corroborating vendor preprint (E2 ceiling) and record the revised 2029 roadmap date in the metrics. Do not raise the evidence level or readiness. If no preprint exists, note the Build 2026 announcement and leave evidence unchanged.

## Find Eaton AFRL $7M quantum-classical power-grid contract primary source
agent: scout
added: 2026-08-17
source: issue #105

    /focus scout: find the primary source for Eaton's $7 million AFRL contract for hybrid quantum-classical multi-threat power-grid resilience, reported in week ending 8 August 2026 by The Qubit Report. If an AFRL award announcement or Eaton press release exists, add a news item under quantum-sensing-grid. If only a secondary source exists, mark it single-source and note that.

## Find D-Wave Nasdaq Verafin quantum-hybrid financial crime detection primary source
agent: scout
added: 2026-08-17
source: issue #105

    /focus scout: find the primary source for the D-Wave and Nasdaq Verafin quantum-hybrid financial crime detection collaboration reported in August 2026. Determine whether this is a named pilot with a defined problem, or a general partnership announcement. If the former, add a news item under applications; if the latter, reject.

## Find Israel Project Nexus quantum computing procurement primary source
agent: scout
added: 2026-08-17
source: issue #105

    /focus scout: find the primary source for Israel's Project Nexus quantum computing procurement tender, reported in the week ending 8 August 2026. If an official Israeli government or innovation authority source exists, add a news item under arch-superconducting or arch-trapped-ion as appropriate to the hardware type specified.
