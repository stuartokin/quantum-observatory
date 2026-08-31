---
schema: frontier/v1
id: algo-modular-shor-compilation
title: 'Modular Shor compilation for neutral-atom arrays: 16% overhead vs. single-module'
summary: 'Xue and Covey (U. Illinois Urbana-Champaign) show that distributing Shor''s algorithm across networked neutral-atom modules adds only 16% runtime overhead vs. a single-module machine, from an end-to-end compilation analysis for a 500,000-qubit modular processor targeting RSA-2048.'
pillar: quantum
readiness: emerging
constellation: algorithms
cluster: resource-estimation
actors:
  - 'Tian Xue, University of Illinois Urbana-Champaign'
  - 'Jacob P. Covey, University of Illinois Urbana-Champaign'
country:
  - US
horizon: 2
priority: P2
qdayImpact: 1
qdayReasoning: 'This paper does not reduce the total qubit count needed to break RSA-2048 — it addresses whether distributing computation across modules introduces large scheduling overhead. The answer (16% overhead) removes one concern about the modular neutral-atom path, but does not change the fundamental engineering challenge: 500,000 physical neutral-atom qubits with 10^5 Bell pairs per second inter-module links do not exist and are far beyond current capability. Q-Day timing is not moved by a compilation analysis alone. Score +1 because confirming that modular distribution is not a fundamental bottleneck slightly advances the credibility of the neutral-atom path to cryptographically relevant scale, without requiring any new hardware to be built first.'
novelty: 'First end-to-end modular compilation analysis for Shor on neutral-atom hardware'
metrics:
  - name: total physical qubits
    value: '500000'
    unit: qubits
    note: 'Distributed across all modules in the modular design'
  - name: inter-module runtime overhead
    value: '16'
    unit: '%'
    note: 'Overhead vs. hypothetical single-module machine at 10^5 Bell pairs/s and 1 ms measurement time'
  - name: inter-module Bell pair rate
    value: '100000'
    unit: 'Bell pairs/s'
links:
  - to: algo-resource-estimation
    relation: evidence-for
  - to: algo-shor
    relation: evidence-for
  - to: qec-modular-architecture
    relation: depends-on
  - to: arch-neutral-atom
    relation: depends-on
evidence:
  claim: 'Xue and Covey (arXiv:2605.03951, May 2026) present the first end-to-end compilation of Shor''s algorithm on a modular neutral-atom processor. With 500,000 physical qubits, inter-module Bell-pair generation at 10^5 per second, and 1 ms measurement time in a CPU-inspired architecture, they show RSA-2048 integers can be factored in only 16% more time than a single-module machine. This is a compilation and scheduling analysis; no hardware was operated.'
  level: E3
  verified: '2026-08-31'
  sources:
    - url: 'https://arxiv.org/abs/2605.03951'
      role: preprint
      title: 'Factoring 2048 bit RSA integers with a half-million-qubit modular atomic processor'
      publisher: arXiv
      date: '2026-05-05'
      identifier: 'arXiv:2605.03951'
      accessed: '2026-08-31'
      note: 'Submitted 5 May 2026 by Xue and Covey (U. Illinois Urbana-Champaign). Two authors, same institution; not yet peer-reviewed. Key result: 16% runtime overhead vs. single-module at 10^5 Bell pairs/s and 1 ms measurement time with 500,000 total physical qubits. Authors describe this as the first end-to-end analysis of large-scale integer factorization on modular atomic hardware.'
confidence: medium
status: draft
origin: agent
added: '2026-08-31'
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-31'
  note: 'Checked arXiv:2605.03951 abstract and PDF directly. The 16% overhead figure, 500K-qubit count, 10^5 Bell pairs/s and 1 ms measurement assumptions are stated in the abstract. Not peer-reviewed; two authors from same institution (UIUC). Confidence medium: compilation analysis with no hardware operation; Bell-pair rate assumption not yet demonstrated at scale in a modular neutral-atom system.'
---

## What happened

Xue and Covey (University of Illinois Urbana-Champaign, May 2026) ask a question that sits between hardware and algorithm design: if you distribute Shor's algorithm across many quantum modules, how much slower does it get? Their answer, for a modular neutral-atom machine, is: not much. With 500,000 physical qubits split across modules communicating at 100,000 Bell pairs per second and a 1 millisecond measurement time, RSA-2048 takes only 16% longer than on a hypothetical single giant machine.

The paper presents end-to-end compilation and scheduling optimisation, focusing on the interplay between inter-module communication rate and intra-module clock speed. The architecture follows a CPU-inspired modular design with photonic interconnects assumed to generate remote entanglement between modules.

## Why it matters

Most resource estimates for cryptographically relevant Shor's algorithm assume a single monolithic machine. At 500,000 qubits that assumption is unrealistic: no single device will hold that. The practical path to a cryptanalytic machine runs through modular assembly. Xue and Covey provide the first analysis of what that modular overhead actually costs on a neutral-atom platform. A 16% penalty is small enough that it does not invalidate conclusions drawn from single-module resource estimates.

## Previous state of the art

Earlier modular quantum computing analyses addressed smaller scales without neutral-atom-specific compilation. Gidney 2025 (arXiv:2505.15917, referenced in algo-resource-estimation) established the leading single-module estimate at under one million noisy qubits but did not model modular distribution overhead. The Pinnacle Architecture (arXiv:2602.11457) cut that to under 100,000 qubits using qLDPC codes but also did not model modular distribution.

## Limitations

This is a theoretical compilation analysis; no hardware was operated. No modular neutral-atom machine with photonic inter-module links at 10^5 Bell pairs per second has been demonstrated. The 500,000-qubit scale is far beyond current hardware — the largest demonstrated coherent neutral-atom arrays hold around 6,100 atoms without performing quantum computation. The 1 ms measurement time is consistent with recent experiments but was not optimised for modular communication.

## What would change this assessment

An independent compilation analysis reaching substantially different overhead figures would lower confidence. A hardware demonstration of inter-module Bell-pair generation at the assumed rate would raise readiness. Peer review of the preprint would raise evidence from E3 to E4.
