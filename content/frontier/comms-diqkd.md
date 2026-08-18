---
schema: frontier/v1
id: comms-diqkd
title: 'Device-independent QKD over 100 km fibre'
summary: 'USTC Pan group demonstrates DI-QKD between single-atom nodes across 100 km of spooled fibre, the first metropolitan-scale result in the highest security class of quantum key distribution.'
plain: 'Device-independent QKD (DI-QKD) is the strictest form of quantum key distribution: security is guaranteed by quantum mechanics alone, requiring no trust in any hardware. Prior experiments reached only 700 m. This paper from USTC demonstrates the protocol across 100 km of fibre using pairs of trapped rubidium atoms. The key advance is switching from two-photon to single-photon interference heralding, which changes loss scaling from quadratic to linear, plus conversion of atom photons to telecom wavelength to cut fibre loss. A secure key rate was extracted from finite data at 11 km; the asymptotic regime is confirmed up to 100 km.'
pillar: quantum
constellation: communications
cluster: quantum-networks
readiness: experimental
horizon: 2
priority: P1
qdayImpact: 0
qdayReasoning: 'DI-QKD is a communications security protocol. It does not change the resources, engineering difficulty or timeline needed to break RSA-2048 or deployed elliptic-curve cryptography. Q-Day score is 0.'
country:
  - CN
actors:
  - 'USTC Hefei National Laboratory (Pan group)'
  - 'Jinan Institute of Quantum Technology'
novelty: 'First DI-QKD at metropolitan-scale fibre; prior record 700 m'
metrics:
  - name: 'Maximum fibre length with positive asymptotic key rate'
    value: '100'
    unit: km
  - name: 'Finite-size secure key rate at 11 km'
    value: '0.112'
    unit: 'bits per event'
    note: 'Against general attacks'
  - name: 'Heralded Bell pairs accumulated at 11 km'
    value: '1200000'
    unit: pairs
    note: 'Over 624 hours of operation'
links:
  - to: comms-mdi-qkd
    relation: competes-with
  - to: quantum-key-distribution
    relation: evidence-for
  - to: comms-quantum-internet
    relation: enables
  - to: comms-quantum-repeater
    relation: depends-on
  - to: comms-quantum-memory
    relation: depends-on
confidence: high
status: draft
origin: agent
added: '2026-08-16'
evidence:
  level: E4
  verified: '2026-08-16'
  claim: 'Lu et al. report DI-QKD between two single Rb-87 atom nodes linked by 100 km of spooled fibre. Positive asymptotic key rates are demonstrated up to 100 km. At 11 km, 1.2 million heralded Bell pairs were prepared over 624 hours, yielding an extractable finite-size secure key rate of 0.112 bits per event against general attacks. Single-photon interference heralding replaces the two-photon scheme used in prior work, changing loss scaling from quadratic to linear in fibre transmission. Quantum frequency conversion shifts atom photons from 780 nm to 1.3 micrometre telecom band. A tailored Rydberg emission scheme suppresses photon recoil without added noise. Prior state of the art was 700 m asymptotic-only (Munich 2022). This is the first finite-size key extraction in DI-QKD beyond laboratory scale and the first positive key rate at 100 km.'
  sources:
    - url: https://www.science.org/doi/10.1126/science.aec6243
      role: primary
      title: 'Device-independent quantum key distribution over 100 km with single atoms'
      publisher: Science
      date: '2026-02-05'
      identifier: 'Science 391, 592-597 (2026)'
      doi: 10.1126/science.aec6243
      accessed: '2026-08-16'
      note: 'Peer-reviewed experimental paper. Paywalled at Science; arXiv preprint is free-access version.'
    - url: https://arxiv.org/abs/2602.09596
      role: preprint
      title: 'Device-independent quantum key distribution over 100 km with single atoms'
      publisher: arXiv
      date: '2026-02-10'
      identifier: 'arXiv:2602.09596'
      accessed: '2026-08-16'
      note: 'Posted after journal publication; same result. Free to access. Submitted 10 Feb 2026.'
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-16'
  reviewedOn: '2026-08-18'
  note: 'Science 391, 592-597 opened via science.org and arXiv:2602.09596 HTML. Authors confirmed: Bo-Wei Lu, Chao-Wei Yang et al. (USTC Pan group, Hefei National Lab, Jinan Institute). 87Rb atoms confirmed. 100 km spooled fibre, positive asymptotic key rate confirmed. 0.112 bits/event finite-size secure key at 11 km, 1.2M Bell pairs over 624 hours confirmed. Single-photon interference heralding, QFC to 1.3 µm, Rydberg emission scheme confirmed. E4 correct for peer-reviewed Science paper. No changes.'
---

## What happened

The Pan group at USTC demonstrated device-independent QKD (DI-QKD) between two single trapped rubidium-87 atoms connected by spooled fibre, achieving positive asymptotic key rates at up to 100 km — the first time DI-QKD has operated at metropolitan scale.

## Why it matters

DI-QKD is the highest security class of QKD. Standard QKD requires trust in characterised hardware; MDI-QKD removes trust in measurement devices only; DI-QKD requires no device trust at all, with security grounded entirely in observed Bell-inequality violation. The prior distance record was 700 m (Munich, 2022), and that experiment demonstrated only asymptotic key rates. This result extracts finite-size secure keys at 11 km and shows the asymptotic regime holds to 100 km — a distance sufficient for metropolitan-scale deployment.

## Previous state of the art

Nadlinger et al. (Oxford, Nature 2022): DI-QKD at 2 metres, finite keys extracted, trapped strontium ions. Zhang et al. (Munich, Nature 2022): DI-QKD at 700 m over campus fibre with Rb-87 atoms, asymptotic keys only, 75-hour runtime insufficient for finite-key extraction. Both were blocked from longer distances by quadratic loss scaling inherent to two-photon heralding.

## Technical advance

Three combined innovations enabled the distance leap: (1) single-photon interference heralding changes entanglement generation probability from scaling as the square of fibre transmission to linear, fundamentally improving the rate-distance relationship; (2) quantum frequency conversion from 780 nm to 1.3 µm reduces fibre attenuation from roughly 3 dB/km to 0.35 dB/km; (3) a Rydberg-based single-photon emission scheme suppresses photon recoil without introducing noise.

## Limitations

Throughput is very low. Accumulating 1.2 million Bell pairs at 11 km required 624 hours. Finite-size key extraction was demonstrated only at 11 km; the 100 km result is asymptotic. Repeater-based extension beyond 100 km is not demonstrated. The experiment is single-lab, single-group; independent replication has not occurred.

## What would change this assessment

Independent replication at a different institution would move this to E5. Finite-size key extraction at 100 km, or repeater-extended range, would move readiness toward demonstrated. A significant rate increase — currently roughly 2000 Bell pairs per hour at 11 km — is the key engineering threshold before deployability can be discussed.
