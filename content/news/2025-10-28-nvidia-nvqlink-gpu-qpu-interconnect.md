---
schema: news/v1
id: 2025-10-28-nvidia-nvqlink-gpu-qpu-interconnect
headline: 'NVIDIA launches NVQLink, an open GPU-QPU interconnect standard backed by 17 quantum companies and nine US national laboratories'
pillar: quantum
date: '2025-10-28'
plain: 'Real-time quantum error correction and hybrid classical-quantum algorithms require moving data between quantum control hardware and conventional computers at microsecond latency — a problem no standard has previously addressed across hardware vendors. NVIDIA announced NVQLink at its GTC Washington event, defining an open interconnect architecture that links GPU supercomputers directly to quantum processors. The coalition spans 17 quantum hardware builders (including Quantinuum, QuEra, IonQ, Rigetti, Pasqal, Diraq and others) and nine US national laboratories including Oak Ridge, Argonne, Berkeley Lab and Sandia. A technical preprint was posted to arXiv the following day. This is an architecture announcement, not a demonstrated result — no quantum computation has yet used NVQLink to achieve a capability beyond what existed before.'
significance: notable
source:
  url: https://nvidianews.nvidia.com/news/nvidia-nvqlink-quantum-gpu-computing
  kind: vendor
  title: 'NVIDIA Introduces NVQLink — Connecting Quantum and GPU Computing for 17 Quantum Builders and Nine Scientific Labs'
  publisher: NVIDIA
  date: '2025-10-28'
corroboration:
  - url: https://www.hpcwire.com/2025/10/28/nvidia-introduces-nvqlink-to-connect-quantum-processors-with-gpu-supercomputers/
    publisher: HPCwire
    kind: journalism
  - url: https://arxiv.org/abs/2510.25213
    publisher: arXiv
    kind: preprint
validation:
  status: single-source
  checks:
    - 'NVIDIA investor press release opened and confirms 28 October 2025 date, 17 quantum builders and nine national labs'
    - 'HPCwire independently reports the announcement and confirms the arXiv preprint arXiv:2510.25213 posted 29 October 2025'
    - 'arXiv preprint opened; authors include named researchers from Sandia, MIT Lincoln Lab, Oak Ridge and Berkeley Lab, confirming national lab involvement'
    - 'Status single-source because the underlying architecture is a preprint, not peer-reviewed; the announcement is vendor-origin; no independent performance measurement published'
  note: 'The arXiv preprint (arXiv:2510.25213) provides technical detail including a measured round-trip latency of 3.96 microseconds. This is a design document, not a peer-reviewed experimental result.'
about:
  - enable-control-electronics
  - qec-realtime-decoding
  - enable-benchmarking
establishedBy:
  - url: https://arxiv.org/abs/2510.25213
    title: 'Platform Architecture for Tight Coupling of High-Performance Computing with Quantum Processors'
    relation: reports
    date: '2025-10-29'
actors: [NVIDIA, Quantinuum, QuEra, IonQ, Rigetti, Pasqal, Diraq, Sandia National Laboratories, Oak Ridge National Laboratory, Lawrence Berkeley National Laboratory, MIT Lincoln Laboratory, Argonne National Laboratory]
country: [US]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

NVQLink defines a low-latency, high-throughput network connecting GPU supercomputer resources to a quantum processor control system. The preprint reports a round-trip latency of 3.96 microseconds using standard commercial Ethernet, which the authors argue is within the tolerance required for real-time quantum error correction loops.

The architecture is modality-agnostic — it is designed to work with superconducting, trapped-ion, neutral-atom and photonic processors, and with any control-system vendor. Five control-system builders signed on at launch: Keysight Technologies, Quantum Machines, Qblox, QubiC and Zurich Instruments.

The breadth of institutional backing — including national-lab co-authors on the preprint — is a genuine signal. It means NVQLink has a real chance of becoming the de facto standard for GPU-QPU integration rather than a proprietary interface. That matters for the field because a common interconnect lowers the cost of swapping hardware and running multi-platform benchmarks.

What to watch: whether any peer-reviewed experimental result demonstrates a QEC improvement attributable to NVQLink integration, rather than the control hardware already in use.
