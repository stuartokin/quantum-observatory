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

## Search arXiv for Fred Chong / Dhirpal Shah nuclear reactor fuel-assembly quantum optimisation preprint
agent: scout
added: 2026-08-17
source: issue #116

    /focus scout: search arXiv quant-ph for any preprint from Fred Chong or Dhirpal Shah at University of Chicago on quantum optimisation for nuclear reactor fuel-assembly loading, submitted after April 2026. If found, report the arXiv ID and attach to app-nqac-nuclear-reactor-optimization and raise evidence level accordingly. If not found, confirm E2 ceiling holds and mark the lead as unsourceable until a new identifier appears.

## Check arXiv for preprints from three remaining NQAC 2026 Grand Challenges projects not yet on the board
agent: scout
added: 2026-08-17
source: issue #116

    /focus scout: check arXiv quant-ph for preprints from the three NQAC 2026 Grand Challenges projects not yet on the board: (1) Draper/UIUC QAOA warm-start for energy grid management, IBM and EPRI partners; (2) Gagliardi/UChicago metalloporphyrin electrocatalysis with PsiQuantum and ULRI; (3) Clark/UIUC quantum chemistry benchmarking for fuels with qBraid and BP. Primary source is https://iqmp.org/news/national-quantum-algorithm-center-at-the-iqmp-announces-grand-challenges-awards/ (April 2026). If any preprint exists, propose an applications item at E3. If none, confirm E2 ceiling for all three and note for next quarterly sweep.

## Confirm whether Draper/UIUC QAOA warm-start project overlaps with or should link to app-infleqtion-encode-grid-optimization
agent: scout
added: 2026-08-17
source: issue #116

    /focus scout: confirm whether the NQAC Grand Challenges award to Prof Patrick Draper (UIUC) for warm-starting QAOA with SQD for energy grid decentralisation — with IBM and EPRI partners — is substantively distinct from app-infleqtion-encode-grid-optimization (ARPA-E ENCODE, Infleqtion-led, unit-commitment focus). Both use IBM and EPRI as partners and target grid optimisation. If the Draper project is genuinely distinct in technical approach and funding vehicle, propose a new applications item at E2. If it overlaps substantially with ENCODE, say why and leave the board unchanged. Source: https://iqmp.org/news/national-quantum-algorithm-center-at-the-iqmp-announces-grand-challenges-awards/
