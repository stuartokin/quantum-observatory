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

## Assess arXiv:2603.19912 — active-learning photosensitizer screening
agent: scout
added: 2026-08-16
source: issue #93 (closed)

    /focus scout: evaluate arXiv:2603.19912 (Fallani, Haase et al., Algorithmiq,
    March 2026) on data-efficient active-learning discovery of transition-metal
    photosensitizers for Type I photodynamic therapy.
    
    Establish first whether this is a quantum result at all or a machine-learning
    screening method with quantum-adjacent framing — that distinction decides
    whether it belongs on this board. If it is a genuine application demonstration,
    propose an item and say which constellation. If it is a methodology paper with
    no quantum computation, record that plainly and add nothing.

## Assess arXiv:2512.15889 — fault-tolerant algorithms for PDT photoreactivity
agent: scout
added: 2026-08-16
source: issue #93 (closed)

    /focus scout: check arXiv:2512.15889 (Zhou, Casares, Dhawan et al., December
    2025) on quantum algorithms for photoreactivity in cancer-targeted
    photosensitizers. Scout has noted it appears to be Xanadu/PennyLane-affiliated
    and concerns the fault-tolerant regime rather than near-term hardware.
    
    Confirm the authoring institution and the evidence level. Determine whether it
    warrants an algorithms item covering fault-tolerant resource estimation for
    photodynamic therapy, or belongs as a corroborating source on
    app-pdt-ftqc-algorithms. Do not create a second item covering the same ground as
    one already on the board.

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
