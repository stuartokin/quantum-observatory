---
schema: frontier/v1
id: enable-snspd-integrated
title: 'On-chip single-photon detection at 99.73% efficiency on silicon waveguide'
summary: 'Nanjing University and Peking University integrated superconducting nanowire single-photon detectors on an 8-inch silicon-on-insulator wafer using DUV lithography, achieving 99.73% on-chip detection efficiency at 1550 nm — approaching the theoretical limit and establishing a new benchmark for scalable integrated quantum photonics.'
plain: 'Photonic quantum computers and quantum communication systems encode information in individual photons — single particles of light. To read out that information, you need a detector that can reliably catch every single photon. Until recently, even the best integrated detectors missed roughly 1 photon in 10 when the light travelled through an on-chip waveguide, which compounds badly when multi-photon states are involved (miss one photon in 10, and a ten-photon state succeeds only 35% of the time). Superconducting nanowire single-photon detectors (SNSPDs) work by running a current through a nanometre-thin wire cooled to near absolute zero; a single photon breaks the superconductivity and produces a measurable pulse. The challenge has been integrating these nanowires onto photonic chips without the corner losses that occur where the nanowire bends. This paper introduces a comb-shaped transversal nanowire design that eliminates corner loss, fabricated by bonding a superconducting membrane onto an 8-inch silicon-on-insulator wafer using deep-ultraviolet lithography — the same technology used in commercial semiconductor fabs. The result is 99.73% on-chip detection efficiency at the 1550 nm telecom wavelength. The fabrication process is compatible with mass production, which is why this result matters beyond its headline number.'
pillar: quantum
constellation: enabling
cluster: photonics
readiness: demonstrated
horizon: 1
priority: P1
actors:
  - 'Nanjing University'
  - 'Peking University'
country:
  - China
metrics:
  - name: 'On-chip detection efficiency'
    value: '99.73'
    unit: '%'
    note: 'At 1550 nm telecom wavelength; fabricated on 8-inch SOI wafer using 248 nm DUV lithography'
novelty: 'Record on-chip SNSPD efficiency; foundry-compatible fabrication demonstrated'
links:
  - to: arch-photonic
    relation: enables
  - to: comms-satellite-qkd
    relation: enables
  - to: quantum-key-distribution
    relation: enables
evidence:
  claim: 'Two cascaded transversal superconducting nanowires on a silicon waveguide achieved 99.73% on-chip single-photon detection efficiency at 1550 nm with on-chip self-calibration. The device was fabricated on an 8-inch SOI wafer using 248 nm deep-ultraviolet lithography, a process compatible with semiconductor manufacturing at scale. Published in a peer-reviewed journal.'
  verified: '2026-08-12'
  level: E4
  sources:
    - url: 'https://www.nature.com/articles/s41377-025-02031-5'
      role: primary
      title: 'Surpassing 99% detection efficiency by cascading two superconducting nanowires on one waveguide with self-calibration'
      publisher: 'Light: Science & Applications'
      date: '2025-10-17'
      identifier: 'Light: Sci. Appl. 14, 369 (2025)'
      doi: '10.1038/s41377-025-02031-5'
      accessed: '2026-08-12'
      note: 'Li, Mao, Zhou et al.; Nanjing University / Peking University / Purple Mountain Laboratory / Hefei National Laboratory. Peer-reviewed in Light: Science & Applications (Nature Publishing Group). Confirmed via PMC full text (PMC12533016) and EurekAlert press release. Self-calibration method allows in-situ efficiency verification despite large fiber-to-chip coupling losses. E4 correct for peer-reviewed experimental result.'
qdayImpact: 0
qdayReasoning: 'Enables photonic quantum computing and QKD. No direct cryptanalytic relevance.'
confidence: high
status: draft
origin: agent
added: '2026-08-12'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-12'
  reviewedOn: '2026-08-12'
  note: 'First reviewer pass. Nature/Light: Science & Applications DOI 10.1038/s41377-025-02031-5 confirmed via nature.com abstract and PMC full text (PMC12533016). 99.73% on-chip efficiency at 1550 nm, Nanjing University / Peking University, 8-inch SOI wafer, DUV lithography all confirmed. E4 correct for peer-reviewed paper. No changes.'
---

## What happened

Superconducting nanowire single-photon detectors (SNSPDs) are the leading technology for detecting individual photons. Integrating them into photonic chips — so that the detector sits directly in the same waveguide that carries the quantum light — has been a key engineering challenge. The main obstacle has been corner loss: where the nanowire bends around the edges of a waveguide, photons escape rather than being absorbed.

Researchers at Nanjing University and Peking University solved this with a transversal comb-shaped nanowire design in which two cascaded nanowires sit across the waveguide rather than running along it, eliminating the corner problem. The device is fabricated by transferring a superconducting membrane onto an 8-inch silicon-on-insulator wafer using 248 nm deep-ultraviolet lithography — the standard tool of commercial semiconductor manufacturing.

The measured on-chip detection efficiency was 99.73% at 1550 nm, the telecom C-band where optical fibres have minimum loss. An on-chip self-calibration setup was included, allowing the efficiency to be measured in situ despite the large coupling loss between optical fibre and chip.

## Why it matters

Detection efficiency compounds multiplicatively with photon number. At 99.73%, a ten-photon state is detected with 97% probability; at 90%, the same state succeeds only 35% of the time. This matters for:
- **Photonic quantum computing** (e.g. PsiQuantum, Xanadu), which requires near-unity detection to perform multi-photon interference at scale
- **Quantum key distribution**, where detection efficiency directly determines secure key rate over long fibres
- **Quantum networks**, where the detector is the readout node

The use of 8-inch wafer fabrication with industry-standard DUV lithography means this result is not a laboratory curiosity — it describes a manufacturable device.

## Previous state of the art

Previous best on-chip SNSPD efficiencies were in the 90–98% range. System detection efficiencies (including fiber coupling) at near-unity have been demonstrated for free-space-coupled SNSPDs, but on-chip waveguide integration had not previously reached this level.

## Limitations

The 99.73% figure is on-chip efficiency, not system efficiency (which includes fiber-to-chip coupling loss). Operating temperature is still millikelvin range, requiring a dilution refrigerator. Integration with active photonic components (sources, switches) on the same chip has not been demonstrated.

## What would change this assessment

Independent replication at another institution; demonstration of the same efficiency with co-integrated photon sources; demonstration at wafer scale with high yield.
