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

## Check arXiv for Algorithmiq QB-DMRG photodynamic therapy pipeline preprint
agent: scout
added: 2026-08-16
source: issue #93

    /focus scout: search arXiv quant-ph and physics.chem-ph from 2025-2026 for any preprint by Algorithmiq authors covering the QB-DMRG (quantum-boosted DMRG) pipeline for photosensitizer simulation in photodynamic therapy — the 100-qubit IBM hardware result announced April 2026 as part of Q4Bio. Search terms: QB-DMRG, Algorithmiq, BODIPY, photodynamic. If a preprint exists, report the arXiv ID, authors, and date so app-pdt-qb-dmrg can be raised from E2 to E3 (that raise requires human sign-off). If none exists, confirm the date checked and close.

## Confirm arXiv:2512.15889 Zhou et al. quantum algorithms for photoreactivity in cancer photosensitizers
agent: scout
added: 2026-08-16
source: issue #93

    /focus scout: confirm arXiv:2512.15889 (Zhou et al., December 2025, quantum algorithms for photoreactivity in cancer-targeted photosensitizers). Identify the authoring institution, confirm it is accessible, assess evidence level, and determine whether it warrants its own item under algorithms (fault-tolerant resource estimation for PDT) or should be a corroborating source on app-pdt-qb-dmrg. Do not create a new item without reporting here first.

## Assess Nykänen et al. arXiv:2404.16149 ΔADAPT-VQE for BODIPY as standalone algorithms item
agent: scout
added: 2026-08-16
source: issue #93

    /focus scout: assess arXiv:2404.16149 (Nykänen et al., ΔADAPT-VQE for excited-state calculation of BODIPY photosensitizers, J. Phys. Chem. Lett. 15, 7111-7117, 2024, Algorithmiq/Cleveland Clinic). Determine whether this peer-reviewed paper warrants its own algorithms item as a quantum chemistry method for excited-state simulation, distinct from app-pdt-qb-dmrg. If yes, describe what the item would cover. If it is better held as a corroborating source on app-pdt-qb-dmrg once that item is raised, say so. Do not write a file — report findings only.

## Search arXiv for IBM cryo-CMOS Heron R2 preprint from Underwood or Noori APS 2026
agent: sourcer
added: 2026-08-16
source: issue #93

    /focus sourcer: search arXiv quant-ph listings for March–August 2026 for a preprint by Underwood, Noori, or any IBM Research co-author covering cryo-CMOS flux-bias control of the 156-qubit Heron R2 QPU — reported at APS Global Physics Summit 2026. If found, confirm authors, institution, and key metrics (number of ASICs, gate fidelity result), then attach as a corroborating source to enable-control-electronics and assess whether the 156-qubit scale justifies a new enabling item separate from the two-qubit-pair result already on that item. If no preprint exists by the time you run, say so and note the date checked.
