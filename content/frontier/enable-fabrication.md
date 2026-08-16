---
schema: frontier/v1
id: enable-fabrication
title: Qubit fabrication yield
summary: 'Industrial-scale fabrication of superconducting qubits with high yield and uniformity, demonstrating that quantum processors can be manufactured using standard semiconductor foundry processes.'
plain: 'Making quantum computers at scale requires producing hundreds or thousands of identical, high-quality qubits on a single chip. Until recently, qubit fabrication relied on laboratory techniques poorly suited to mass production. Imec (2024) demonstrated superconducting transmon qubits made on 300 mm silicon wafers using standard CMOS foundry equipment — the same tools used for ordinary computer chips — achieving 98.25% yield and coherence times over 100 microseconds, performance comparable to research-grade devices. A 2025 preprint from Fraunhofer EMFT (Munich) demonstrated a complementary result on 200 mm wafers: 99.7% Josephson junction yield across over 10,000 junctions, with median T1 up to 100 µs and individual devices approaching 200 µs.'
pillar: quantum
constellation: enabling
readiness: demonstrated
cluster: hardware-stack
actors:
  - Imec
  - 'KU Leuven'
  - 'Fraunhofer EMFT'
  - 'Technical University of Munich'
country:
  - BE
  - DE
horizon: 2
novelty: 'foundry-compatible >99% fidelity; 200mm and 300mm CMOS fabrication demonstrated across two European institutions'
priority: P1
qdayImpact: 1
qdayReasoning: 'High-yield industrial fabrication is a necessary precondition for scaling quantum computers to millions of qubits. Without it, production bottlenecks constrain the path to a CRQC. Two independent European results now demonstrate the feasibility of the manufacturing supply chain, but neither by itself advances Q-Day.'
metrics:
  - name: 'Wafer diameter (imec)'
    value: '300'
    unit: 'mm'
  - name: 'Qubit yield (imec)'
    value: '98.25'
    unit: '%'
    note: '393 of 400 qubits functional across wafer'
  - name: 'Median relaxation time (imec)'
    value: '75'
    unit: 'µs'
    note: 'Time-averaged median across wafer'
  - name: 'Coherence time (imec)'
    value: '>100'
    unit: 'µs'
    note: 'Relaxation and coherence times exceeding 100 µs'
  - name: 'Wafer diameter (Fraunhofer EMFT)'
    value: '200'
    unit: 'mm'
  - name: 'Josephson junction yield (Fraunhofer EMFT)'
    value: '99.7'
    unit: '%'
    note: 'Shorts and opens across >10,000 junctions; room-temperature waferprober measurement'
  - name: 'Median T1 (Fraunhofer EMFT)'
    value: 'up to 100'
    unit: 'µs'
    note: 'Statistical median; individual devices approaching 200 µs in long-term measurements. Preprint arXiv:2505.08424.'
links:
  - to: arch-superconducting
    relation: enables
  - to: enable-cryogenics
    relation: depends-on
evidence:
  claim: 'Van Damme et al. (2024) at Imec demonstrated superconducting transmon qubits manufactured in a 300 mm CMOS pilot line using industrial methods (optical lithography and reactive-ion etching), achieving relaxation and coherence times exceeding 100 µs and a yield of 98.25% (393 of 400 qubits functional) across the wafer. Performance was comparable to laboratory-fabricated devices. Mayer et al. (Fraunhofer EMFT / TU Munich, arXiv:2505.08424, May 2025) separately demonstrated industry-grade CMOS-compatible fabrication on 200 mm wafers, achieving 99.7% Josephson junction yield (shorts and opens) across more than 10,000 junctions, 1.6% qubit frequency prediction accuracy, median T1 of up to 100 µs, and individual devices consistently approaching 200 µs in long-term cryogenic characterisation. The paper describes this as the best performance for superconducting qubits fabricated by industry-grade wafer-level subtractive processes. The Fraunhofer EMFT result is a preprint and has not been peer-reviewed.'
  verified: '2026-08-16'
  level: E4
  sources:
    - url: https://www.nature.com/articles/s41586-024-07941-9
      role: primary
      title: 'Advanced CMOS manufacturing of superconducting qubits on 300 mm wafers'
      publisher: Nature
      date: '2024-09-18'
      identifier: 'Nature 634, 74-79 (2024)'
      doi: 10.1038/s41586-024-07941-9
      accessed: '2026-08-08'
      note: 'Van Damme et al.; Imec and KU Leuven, Belgium; open access via PMC. 300 mm CMOS foundry, 98.25% yield (393/400 qubits), >100 µs relaxation and coherence.'
    - url: https://arxiv.org/abs/2505.08424
      role: corroborating
      title: 'CMOS-Compatible, Wafer-Scale Processed Superconducting Qubits Exceeding Energy Relaxation Times of 200us'
      publisher: arXiv
      date: '2025-05-13'
      identifier: 'arXiv:2505.08424'
      doi: 10.48550/arXiv.2505.08424
      accessed: '2026-08-16'
      note: 'Mayer, Weber, Music, Moran Guizan, Lang, Schwarzenbach, Dhieb, Kiliclar, Maiwald, Luo, Lerch, Zahn, Eisele, Pereira, Kutter. Fraunhofer EMFT Munich and Technical University of Munich. 200 mm wafer, CMOS-established subtractive processes. 99.7% JJ yield across >10,000 junctions; median T1 up to 100 µs; individual devices approaching 200 µs in long-term measurements (not the median). Preprint v3 updated 20 May 2025; not peer-reviewed as of 2026-08-16. Evidence ceiling E3 for this source; overall item remains E4 on the peer-reviewed imec Nature paper.'
confidence: high
status: published
origin: agent
added: '2026-08-08'
review:
  state: agent-merged
  by: agent
  agent: sourcer
  agentMergedOn: '2026-08-16'
  note: 'Added Fraunhofer EMFT arXiv:2505.08424 as corroborating source per focus instruction 2026-08-16. Metric correction: focus instruction stated >200 µs T1; preprint abstract specifies median T1 up to 100 µs with individual devices approaching 200 µs. Metric block updated to reflect both wafer sizes and both institutions. Evidence level remains E4 on primary imec Nature paper; the corroborating preprint is E3 on its own. Plain text and claim updated to reflect both results. Country updated to include DE.'
---

Superconducting transmon qubits manufactured in industrial foundry environments have now been demonstrated across two European institutions on different wafer sizes, establishing that CMOS-compatible fabrication of high-coherence superconducting qubits is reproducible rather than specific to one process or facility.

**Imec / KU Leuven (300 mm, peer-reviewed).** Van Damme et al. (Nature 634, September 2024) demonstrated qubits on 300 mm silicon wafers in a commercial CMOS pilot line using optical lithography and reactive-ion etching. 98.25% of qubits (393 of 400) worked correctly, with coherence times over 100 microseconds — matching what smaller research laboratories achieve with bespoke techniques.

**Fraunhofer EMFT / TU Munich (200 mm, preprint).** Mayer et al. (arXiv:2505.08424, May 2025) reported industry-grade fabrication on 200 mm wafers using CMOS-established subtractive processes. Room-temperature waferprobe measurements on more than 10,000 Josephson junctions showed 99.7% yield (shorts and opens) and 1.6% qubit frequency prediction accuracy. Cryogenic characterisation found median T1 up to 100 µs, with individual devices consistently approaching 200 µs in long-term measurements — the best performance the authors report for industry-grade wafer-level subtractive fabrication. This result is a preprint.

Key remaining challenges: qubit count beyond single chips, fan-out of classical control at cryogenic temperatures, mid-circuit measurement, and integration of multiple qubits at the same yield and coherence.
