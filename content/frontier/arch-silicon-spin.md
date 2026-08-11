---
schema: frontier/v1
id: arch-silicon-spin
title: Silicon spin qubits
summary: Electron or hole spins in silicon quantum dots used as qubits; two-qubit gate fidelity above 99% demonstrated in both research and industry-compatible 300 mm foundry environments.
plain: Silicon spin qubits trap individual electrons in tiny pockets of silicon and use their quantum magnetic property (spin) as a qubit. Silicon is attractive because it is the material the entire semiconductor industry already knows how to manufacture with exquisite precision. Recent experiments have crossed the 99% two-qubit gate fidelity threshold — a rough benchmark for fault-tolerant operation — in both university-lab devices and chips made in standard chipmaking factories.
pillar: quantum
readiness: experimental
constellation: architectures
cluster: solid-state spin
actors:
  - University of New South Wales
  - Diraq
  - Intel
  - RIKEN
  - Delft University of Technology
  - imec
  - KU Leuven
country:
  - AU
  - US
  - JP
  - NL
  - BE
metrics:
  - name: two-qubit gate fidelity (Si MOS research device)
    value: '>99'
    unit: percent
    note: Tanttu et al., Nature Physics 2024; consistent and repeatable
  - name: two-qubit gate fidelity (300 mm foundry device)
    value: '>99'
    unit: percent
    note: 'Steinacker et al., Nature 646, 81-87 (2025); industry-compatible SiMOS unit cells; four devices on same wafer'
links:
  - to: arch-superconducting
    relation: competes-with
  - to: qec-surface-code
    relation: depends-on
  - to: enable-fabrication
    relation: depends-on
evidence:
  claim: Tanttu et al. (Nature Physics 2024) demonstrate consistent and repeatable above-99% fidelity two-qubit gates in Si MOS quantum dot devices by characterising and mitigating physical error sources. Steinacker et al. (Nature 646, 2025) replicate >99% two-qubit fidelity in industry-compatible SiMOS unit cells manufactured in a 300 mm foundry environment, with SPAM fidelities reaching 99.9% across four devices on the same wafer.
  verified: '2026-08-11'
  level: E4
  sources:
    - url: https://www.nature.com/articles/s41567-024-02614-w
      role: primary
      title: Assessment of the errors of high-fidelity two-qubit gates in silicon quantum dots
      publisher: Nature Physics
      date: '2024-08-20'
      identifier: 'Nature Physics 20, 1804-1809 (2024)'
      doi: 10.1038/s41567-024-02614-w
      accessed: '2026-08-09'
      note: UNSW Sydney-led collaboration. Demonstrates >99% two-qubit gate fidelity, tying errors to physical origins.
    - url: https://www.nature.com/articles/s41586-025-09531-9
      role: corroborating
      title: Industry-compatible silicon spin-qubit unit cells exceeding 99% fidelity
      publisher: Nature
      date: '2025-09-24'
      identifier: 'Nature 646, 81-87 (2025)'
      doi: 10.1038/s41586-025-09531-9
      accessed: '2026-08-11'
      note: 'Steinacker, Dumoulin Stuyck, Dzurak et al.; UNSW / Diraq / imec / KU Leuven. Two-qubit operations >99% fidelity on chips from a 300 mm semiconductor foundry. SPAM fidelity up to 99.9%. All four separate devices on same wafer exceed threshold. Confirmed via nature.com abstract and PubMed (Oct 2025 issue, epub Sep 24).'
confidence: high
status: published
priority: P2
qdayImpact: 1
qdayReasoning: Silicon spin qubit fidelity crossing 99% in foundry-compatible devices is a necessary (not sufficient) condition for eventual scale-up. It modestly shortens the projected gap to fault-tolerant hardware but does not change near-term CRQC timelines because qubit count, connectivity, and classical control at scale remain unsolved.
horizon: 2
novelty: foundry-compatible >99% fidelity
origin: agent
added: '2026-08-08'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-09'
  reviewedOn: '2026-08-11'
  note: 'Steinacker et al. Nature 646, 81-87 confirmed this run via nature.com abstract (all four devices >99% two-qubit, SPAM up to 99.9%) and PubMed (Oct 2025 issue, epub Sep 24). Four-device wafer result confirmed via postquantum.com analysis. E4 correct for peer-reviewed Nature paper. No changes made.'
---

Silicon spin qubits confine individual electrons (or holes) in electrostatically defined quantum dots in silicon or silicon-germanium heterostructures, using spin states as |0⟩ and |1⟩. The platform is attractive for scalability because it is compatible with existing CMOS manufacturing.

The critical milestone of >99% two-qubit gate fidelity — often cited as a necessary condition for surface-code error correction — was demonstrated by Tanttu et al. (Nature Physics, August 2024) in a Si MOS research device. The study identified dominant error sources (charge noise, valley splitting variability) and showed that mitigation strategies yield consistent, repeatable performance above the 99% threshold.

The result was independently corroborated at industrial scale by Steinacker et al. (Nature 646, September 2025), who achieved >99% two-qubit fidelity in unit cells fabricated in a 300 mm commercial foundry, with SPAM fidelities reaching 99.9% across four separate devices on the same wafer — a significant step toward manufacturable silicon quantum processors.

Key remaining challenges: qubit count beyond ~10 qubits, fan-out of classical control at cryogenic temperatures, and mid-circuit measurement.
