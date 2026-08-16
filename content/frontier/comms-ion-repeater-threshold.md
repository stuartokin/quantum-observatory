---
schema: frontier/v1
id: comms-ion-repeater-threshold
title: 'Ion–ion entanglement lifetime exceeds generation time over 10 km fibre'
summary: 'USTC demonstrates trapped-ion memory–memory entanglement where coherence lifetime (550 ms) exceeds average entanglement generation time (~450 ms) over 10 km of spooled telecom fibre — the threshold condition for scalable quantum repeaters.'
plain: 'A quantum repeater chain can only work if the quantum memory holding entanglement lasts longer than it takes to create new entanglement across the next link. Until now, decoherence always won that race over useful distances. USTC''s Pan group has crossed this threshold for the first time: trapped calcium-40 ions connected by 10 km of standard telecom fibre maintained entanglement for 550 ms on average, while fresh entanglement could be established in about 450 ms. The race is now winnable in principle, making multi-stage repeater chains physically feasible rather than merely theoretical.'
pillar: quantum
constellation: communications
readiness: experimental
horizon: 2
priority: P1
qdayImpact: 0
qdayReasoning: 'This is a networking result. It improves the feasibility of long-distance quantum key distribution and quantum internet but does not alter the resources, qubit count or gate fidelity needed to break RSA-2048 or elliptic-curve cryptography.'
actors:
  - 'USTC (University of Science and Technology of China)'
  - 'Shanghai Research Center for Quantum Science'
  - 'CAS Center for Excellence in Quantum Information and Quantum Physics'
country:
  - CN
novelty: 'first crossing of the repeater operability threshold (coherence > generation) over telecom fibre'
metrics:
  - name: fibre length
    value: '10'
    unit: km
    note: spooled telecom fibre
  - name: entanglement coherence lifetime
    value: '550'
    unit: ms
    note: '± 36 ms; memory–memory entanglement'
  - name: average entanglement generation time
    value: '~450'
    unit: ms
    note: threshold crossed when lifetime > generation time
links:
  - to: comms-quantum-repeater
    relation: evidence-for
  - to: entanglement-distribution
    relation: competes-with
  - to: comms-quantum-internet
    relation: enables
  - to: comms-quantum-memory
    relation: depends-on
evidence:
  claim: 'Liu et al. report trapped calcium-40 ion memory–memory entanglement over 10 km of spooled telecom fibre with a coherence lifetime of 550 ± 36 ms against an average entanglement generation time of approximately 450 ms. The paper states this crosses the threshold where establishment time is shorter than decoherence time, which the authors describe as a critical building block for scalable quantum repeaters. Previous remote memory–memory entanglement experiments suffered decoherence faster than entanglement could be established and purified over long distances.'
  level: E4
  verified: '2026-08-16'
  sources:
    - url: https://www.nature.com/articles/s41586-026-10177-4
      role: primary
      title: 'Long-lived remote ion–ion entanglement for scalable quantum repeaters'
      publisher: Nature
      date: '2026-02-02'
      identifier: 'Nature 652, 51–57 (2026)'
      doi: 10.1038/s41586-026-10177-4
      accessed: '2026-08-16'
      note: 'Peer-reviewed experimental result. Lead authors Liu W.-Z., Zhou Y.-B., Chen J.-P.; senior authors Qiang Zhang and Jian-Wei Pan; USTC / Shanghai Research Center for Quantum Science / CAS. Confirmed distinct from PRL 136, 240801 (Wang, Luo et al., same Pan group, June 2026) — that paper demonstrates a memory-assisted nonlocal optical interferometer extending baselines to 20 km, not ion-ion repeater entanglement.'
confidence: high
status: draft
origin: agent
added: '2026-08-14'
review:
  state: agent-reviewed
  by: agent
  agent: verifier
  agentMergedOn: '2026-08-14'
  reviewedOn: '2026-08-16'
  note: 'Focus instruction 2026-08-16. Checked whether item cites wrong paper. It does not. Nature 652, 51-57 confirmed as the ion-ion memory entanglement over 10 km result (Liu W.-Z. et al., Pan group). PRL 136, 240801 (Wang, Luo et al., same group, June 2026) is a different experiment: a nonlocal optical interferometer using delocalized single-photon entanglement to extend baselines to 20 km. Author lists, experimental descriptions, and DOIs are distinct. Item description matches the cited Nature source on all checked points: 550 ± 36 ms coherence, ~450 ms generation, 10 km spooled fibre, Ca-40 ions. No downward correction needed.'
---

## What happened

The Pan group at USTC connected two trapped calcium-40 ions via 10 km of spooled telecom fibre and demonstrated memory–memory entanglement with a coherence lifetime of 550 ± 36 ms. The average time to establish a new entangled pair was approximately 450 ms. Lifetime exceeds generation time — the threshold that makes multi-stage repeater chains operable in principle.

## Why it matters

Quantum repeaters have been a theoretical necessity for long-distance quantum networks for two decades. The practical barrier was always the same: by the time entanglement was heralded across a meaningful distance, the quantum memory holding the earlier entanglement had already decohered. No memory could bridge two links simultaneously. This result is the first experimental demonstration that the barrier can be crossed: 550 ms is long enough to create a second entangled pair while the first is still alive.

## Previous state of the art

Prior trapped-ion entanglement over fibre reached 33 km (van Leent et al., Nature 607, 2022) but did not demonstrate the operability threshold. Ensemble-memory results at USTC reached 50+ km (Nature 578, 2020) but used different memory technologies with lower coherence. The 420 km result on the board (entanglement-distribution) uses a different figure of merit — distance — and a different memory platform.

## Limitations

10 km is a single link using spooled (not field-deployed) fibre. Entanglement generation rate is modest. Scaling to multi-node chains, field fibre, and integration with entanglement swapping and purification protocols all remain ahead. The result demonstrates the threshold condition; it does not demonstrate a repeater chain.

## What would change this assessment

A multi-node demonstration with entanglement swapping would move readiness to demonstrated. Independent replication by a different group (Innsbruck, Oxford, Delft) would raise evidence to E5. Field-deployed fibre, rather than spooled, would strengthen the engineering case.
