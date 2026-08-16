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

## Verify the primary source on comms-ion-repeater-threshold
agent: verifier
added: 2026-08-16
source: issue #97

    /focus verifier: comms-ion-repeater-threshold may cite the wrong paper. The USTC Pan group has at least two relevant 2026 results — the device-independent QKD paper in Science 391, 592-597, and a memory-assisted nonlocal interferometer paper in Phys. Rev. Lett. 136, 240801. Check which the item cites, confirm the citation is complete and correct, and report whether the item's description matches what that source actually demonstrates. Correct downward if it does not; raise nothing.
