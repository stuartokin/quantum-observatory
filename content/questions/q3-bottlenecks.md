---
schema: question/v1
id: q3-bottlenecks
number: 3
question: 'Has any known bottleneck become easier — or harder?'
pillar: quantum
answer: 'Easier: logical qubit overhead ratios have improved substantially in 2025–2026. Quantinuum Helios achieves a 2:1 physical-to-logical ratio on trapped-ion hardware; QuEra reports the same 2:1 with qLDPC codes on neutral atoms. Magic state distillation overhead is declining as qLDPC codes reduce the physical qubit cost per logical operation. Harder: real-time decoding latency is newly identified as the next bottleneck — current FPGA/ASIC decoders handle present qubit counts but scaling to millions demands orders-of-magnitude more classical bandwidth. Non-local qubit connectivity required by qLDPC architectures has not been demonstrated at scale. Cryogenic control electronics and manufacturing yield remain constrained at the component level.'
state: moving
asOf: '2026-08-12'
lastChanged: '2026-08-12'
changedBy: 'Quantinuum Helios 2:1 physical-to-logical ratio and QuEra qLDPC 2:1 result (April 2026) represent step-change improvements in logical qubit overhead, the central bottleneck since 2019.'
evidence:
  - ref: qec-logical-qubit-scaling
    kind: frontier
    note: '2:1 overhead ratios on two separate hardware modalities.'
  - ref: qec-magic-state-distillation
    kind: frontier
    note: 'Overhead reduction from improved codes.'
  - ref: qec-realtime-decoding
    kind: frontier
    note: 'Decoding latency is the newly identified next bottleneck at scale.'
  - ref: enable-control-electronics
    kind: frontier
    note: 'Cryogenic electronics remain a constrained component.'
history: []
review:
  state: agent-merged
  by: agent
  agent: scout
  agentMergedOn: '2026-08-12'
status: draft
added: '2026-08-12'
---

The physical-to-logical qubit overhead ratio has been the defining bottleneck since the field moved to error correction as its primary objective. The 2:1 ratios reported in 2025–2026 represent a qualitative shift from the 100:1 or worse figures that defined the pre-Willow era. The new bottleneck — decoder latency at scale — is a classical computing problem, not a quantum physics problem, which makes it tractable but not trivial. The enabling constellation items (enable-control-electronics, enable-cryo-cmos-qubit-control) remain the board's thinnest area and are where hardware progress is least visible in the published record.
