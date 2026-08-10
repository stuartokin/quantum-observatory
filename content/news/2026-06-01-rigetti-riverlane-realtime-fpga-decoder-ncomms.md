---
schema: news/v1
id: 2026-06-01-rigetti-riverlane-realtime-fpga-decoder-ncomms
headline: 'Rigetti and Riverlane publish peer-reviewed real-time FPGA decoding on a superconducting processor in Nature Communications'
pillar: quantum
date: '2026-06-01'
plain: 'One of the harder engineering problems in fault-tolerant quantum computing is keeping the classical decoder fast enough that it does not fall behind the quantum circuit it is correcting — the backlog problem. Rigetti and Riverlane have published the peer-reviewed record of integrating an FPGA-based decoder directly into Rigetti''s Ankaa-2 control stack, achieving sub-microsecond mean decoding per syndrome round and a full system latency of 9.6 microseconds. This is an enabling infrastructure result, not a demonstration of a fault-tolerant algorithm — no logical computation was run at full error-corrected scale — but the control system necessary to attempt one is now measured and published in a peer-reviewed journal.'
significance: routine
source:
  url: https://www.nature.com/articles/s41467-026-73331-6
  kind: paper
  title: 'Demonstrating real-time and low-latency quantum error correction with superconducting qubits'
  publisher: Nature Communications
  date: '2026-06-01'
  doi: 10.1038/s41467-026-73331-6
corroboration:
  - url: https://finance.yahoo.com/news/rigettis-ankaa-system-show-real-161000287.html
    publisher: Yahoo Finance / Seeking Alpha
    kind: journalism
validation:
  status: verified
  checks:
    - 'Nature Communications paper confirmed: article number 7383, published 1 June 2026, volume 17. Source URL opened and abstract confirmed.'
    - 'Key figures confirmed in abstract: sub-1 µs mean decoding per round, 9.6 µs full feedback latency (6.5 µs decoding, 3.1 µs communication and control).'
    - 'Earlier preprint arXiv:2410.05202 (October 2024) is the same work — this is the peer-reviewed journal record. Earlier announcement by aggregators noted.'
    - 'No claim of fault-tolerant logical computation — paper demonstrates decoding infrastructure on an 8-qubit stability experiment. Scope stated in plain field.'
    - 'No contradicting report found.'
about:
  - qec-realtime-decoding
  - arch-superconducting
  - enable-control-electronics
establishedBy:
  - url: https://arxiv.org/abs/2410.05202
    title: 'Demonstrating real-time and low-latency quantum error correction with superconducting qubits'
    relation: reports
    date: '2024-10'
actors: [Rigetti Computing, Riverlane]
country: [US, UK]
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

The backlog problem arises because a quantum error correction cycle generates syndrome data faster than a classical decoder can process it, causing the decoder queue to grow without bound. Avoiding this requires the decoder to keep pace with the circuit — in Rigetti's case, a measurement cycle of roughly one microsecond.

The Riverlane FPGA decoder, implementing a Collision Clustering algorithm, achieves this on the Ankaa-2 84-qubit device. The experiment runs an 8-qubit stability experiment over 25 decoding rounds, demonstrating logical error suppression and confirming that the full system response time — gate pulses to syndrome readout to decoder output to feedback — clears the one-microsecond threshold that prevents backlog accumulation.

This is the peer-reviewed version of work first announced as a preprint in October 2024. The journal publication is the citable record.
