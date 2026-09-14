---
schema: frontier/v1
id: arch-silicon-spin-8q-foundry
title: 'Eight-qubit foundry silicon spin array: coherent control in 300mm CMOS process'
summary: 'UNSW Sydney, Diraq, and imec demonstrate coherent tuning, control, and readout of an eight-qubit linear SiMOS spin-qubit array fabricated in a 300mm CMOS-compatible foundry, extending prior two-qubit unit-cell results to meaningful multi-qubit scale.'
plain: 'Silicon spin qubits are built from single electrons trapped in tiny pockets of silicon — the same material used in ordinary computer chips. Getting them to work at all requires extreme cooling, careful engineering, and very precise fabrication. The critical question for this approach is whether standard semiconductor factories (which make billions of chips a year) can produce them reliably at scale, or whether they only work in bespoke hand-built research devices. This paper answers that for eight qubits in a row: researchers from UNSW Sydney, Diraq, and the semiconductor foundry imec took a silicon chip made on imec''s standard 300mm production line — the same process used for conventional electronics — and successfully operated all eight qubits, measuring their quantum properties and running two-qubit gate operations between adjacent pairs. Coherence times (how long the qubits hold their quantum state) matched or exceeded what hand-built research devices achieve. The paper does not report gate fidelity numbers; those belong to the earlier two-qubit Steinacker et al. result on the same process. The significance is that foundry fabrication now supports multi-qubit coherent operation, not just isolated unit cells — a prerequisite for scaling toward error-corrected processors using industrial manufacturing.'
pillar: quantum
readiness: experimental
constellation: architectures
cluster: silicon-spin
actors:
  - 'UNSW Sydney'
  - 'Diraq'
  - 'imec'
metrics:
  - name: 'qubit count'
    value: '8'
    unit: 'qubits'
    note: 'Eight-dot linear array, operated as four double-dot pairs'
  - name: 'Ramsey dephasing time T2*'
    value: 'up to 41'
    unit: 'µs'
    note: 'Best of eight qubits; all qubits successfully tuned'
  - name: 'Hahn-echo coherence time T2Hahn'
    value: 'up to 1.31'
    unit: 'ms'
    note: 'State-of-the-art for foundry-fabricated SiMOS'
  - name: 'wafer diameter'
    value: '300'
    unit: 'mm'
    note: 'CMOS-compatible foundry process (imec, Leuven)'
links:
  - to: arch-silicon-spin
    relation: evidence-for
  - to: enable-fabrication
    relation: enables
country:
  - AU
  - BE
status: draft
origin: agent
added: '2026-09-14'
horizon: 2
priority: P1
qdayImpact: 0
qdayReasoning: 'Silicon spin qubits at eight-qubit scale in a foundry process do not change the resources needed to break RSA-2048. The result bears on manufacturing scalability for a quantum computing platform, not on cryptanalytic circuit capability.'
novelty: 'First coherent multi-qubit operation of a foundry-fabricated SiMOS array beyond two-qubit unit cells'
confidence: high
evidence:
  level: E4
  claim: 'Nickl et al. (Nature Communications 17, 5878, 2026) demonstrate tuning, pairwise coherent control, and readout of an eight-dot linear silicon spin-qubit array fabricated in a 300mm CMOS-compatible foundry process, with Ramsey dephasing times T2* up to 41(2)µs and Hahn-echo coherence times T2Hahn up to 1.31(4)ms. No gate-fidelity benchmarks are reported in this paper; >99% fidelity figures belong to the prior Steinacker et al. (Nature 646, 2025) two-qubit unit-cell result on the same process. Readout of the central four qubits achieved via cascaded charge-sensing protocol. Two-qubit gate operations demonstrated between adjacent pairs with low phase noise.'
  verified: '2026-09-14'
  sources:
    - url: 'https://www.nature.com/articles/s41467-026-74597-6'
      role: primary
      title: 'Eight-qubit operation of a 300 mm SiMOS foundry-fabricated device'
      publisher: 'Nature Communications'
      date: '2026-07-09'
      identifier: 'Nat Commun 17, 5878 (2026)'
      doi: '10.1038/s41467-026-74597-6'
      accessed: '2026-09-14'
      note: 'Peer-reviewed experimental result. Reports coherence metrics but not gate fidelity. Authors: Nickl, Dumoulin Stuyck, Steinacker et al. (UNSW Sydney, Diraq, imec).'
    - url: 'https://arxiv.org/abs/2512.10174'
      role: preprint
      title: 'Eight-Qubit Operation of a 300 mm SiMOS Foundry-Fabricated Device'
      publisher: 'arXiv'
      date: '2025-12-11'
      identifier: 'arXiv:2512.10174'
      accessed: '2026-09-14'
      note: 'Preprint version. v2 posted 2026-06-01. Published as Nat Commun 17, 5878 (2026).'
    - url: 'https://www.nature.com/articles/s41586-025-09531-9'
      role: corroborating
      title: 'Industry-compatible silicon spin-qubit unit cells exceeding 99% fidelity'
      publisher: 'Nature'
      date: '2025-09-24'
      identifier: 'Nature 646, 81-87 (2025)'
      doi: '10.1038/s41586-025-09531-9'
      accessed: '2026-09-14'
      note: 'Steinacker et al. (2025) — prior result on same 300mm process, reporting >99% two-qubit gate fidelity on unit cells. Provides the fidelity baseline this paper extends in qubit count.'
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-09-14'
  note: 'Primary source is Nature Communications peer-reviewed paper (DOI 10.1038/s41467-026-74597-6), confirmed open access via nature.com. Preprint arXiv:2512.10174 confirmed as same work. Corroborating Steinacker Nature 646 source confirmed via PubMed record 40993388, DOI 10.1038/s41586-025-09531-9. Gate fidelity figures explicitly excluded from this item per paper text and per postquantum.com analysis confirming the 8-qubit paper reports no fidelity benchmarks.'
---

## What happened

Researchers at UNSW Sydney, Diraq, and imec fabricated an eight-dot linear silicon spin-qubit array on imec's 300mm CMOS-compatible pilot line in Leuven, Belgium. All eight qubits were successfully tuned and characterised, achieving Ramsey dephasing times up to 41µs and Hahn-echo coherence times up to 1.31ms. Two-qubit gate operations were demonstrated between adjacent qubit pairs with low phase noise. Readout of the central four qubits was achieved via a cascaded charge-sensing protocol.

## Why it matters

The previous state of the art on the same imec foundry process was Steinacker et al. (Nature 646, 2025): several two-qubit unit cells, all exceeding 99% gate fidelity. That result validated that foundry-fabricated devices can match hand-built research devices in quality. This result extends the same process to an eight-qubit array — establishing that coherent multi-qubit operation is not limited to isolated unit cells. The distinction matters for scaling: a qubit architecture that works at two qubits on a foundry wafer but degrades at eight is not a manufacturable architecture. This paper shows it holds.

## Limitations

The paper reports no gate-fidelity benchmarks. The >99% figures associated with this fabrication line belong to the 2025 Steinacker result on two-qubit unit cells. The array is a linear chain, not a two-dimensional structure; two-dimensional arrays will be required for surface-code error correction at scale. Eight qubits is far below the hundreds or thousands needed for any practically useful computation. Readout coverage is partial (central four qubits via cascaded sensing).

## What would change this assessment

Gate fidelity benchmarks (randomised benchmarking or gate set tomography) on the eight-qubit array would confirm whether the coherence advantage translates to operational quality. Extension to a two-dimensional array on the same process would be the next threshold result. Independent replication at a different foundry would raise evidence to E5.
