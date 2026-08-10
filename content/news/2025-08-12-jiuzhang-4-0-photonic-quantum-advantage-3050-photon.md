---
schema: news/v1
id: 2025-08-12-jiuzhang-4-0-photonic-quantum-advantage-3050-photon
headline: 'USTC and Tsinghua post Jiuzhang 4.0 preprint: 3,050-photon Gaussian boson sampling claims advantage over El Capitan by a factor of 10 to the 42'
pillar: quantum
date: '2025-08-12'
plain: 'A team led by Pan Jianwei and Lu Chao-Yang at USTC, with Tsinghua University and Jiuzhang Quantum Technology Co., has built a photonic quantum processor that injects 1,024 squeezed light states into an 8,176-mode programmable circuit and detects up to 3,050 photons per run — more than ten times the scale of its predecessor. The processor completes a Gaussian boson sampling output in 25.6 microseconds; the researchers calculate that El Capitan, the world''s top classical supercomputer, would need more than 10 to the power 42 years to reproduce a single result using the best available classical algorithm. This result was posted as a preprint in August 2025 and passed peer review at Nature, published May 2026. It is the largest photonic quantum advantage demonstration to date. The task — Gaussian boson sampling — was chosen because it is hard to simulate classically; it does not demonstrate any economically useful computation, and connecting GBS advantage to practical applications remains an open research question.'
significance: notable
source:
  url: https://www.nature.com/articles/s41586-026-10523-6
  kind: paper
  title: 'Gaussian boson sampling with 1,024 squeezed states in 8,176 modes'
  publisher: Nature
  date: '2026-05-13'
  doi: 10.1038/s41586-026-10523-6
corroboration:
  - url: https://arxiv.org/abs/2508.09092
    publisher: arXiv
    kind: preprint
  - url: https://english.cas.cn/newsroom/headlines/202605/t20260514_1159331.shtml
    publisher: Chinese Academy of Sciences
    kind: authority
  - url: https://postquantum.com/industry-news/jiuzhang-4-0/
    publisher: postquantum.com
    kind: journalism
validation:
  status: verified
  checks:
    - 'arXiv preprint 2508.09092 opened; posted 12 August 2025; describes Jiuzhang 4.0 with 1,024 squeezed inputs, 8,176 modes, up to 3,050 photon detection events, 25.6 microsecond sampling time'
    - 'Nature paper DOI 10.1038/s41586-026-10523-6 opened; confirms peer-reviewed publication May 2026 with identical experimental parameters; abstract matches preprint claims'
    - 'Chinese Academy of Sciences press release confirms USTC leadership and Nature publication with consistent technical detail'
    - 'Classical simulation intractability claim (MPS method on El Capitan greater than 10^42 years) is from the paper itself; this is the authors'' own estimate, not independently verified by a third party'
    - 'No published classical challenge to the Jiuzhang 4.0 result found at the time of this run; earlier Jiuzhang versions faced classical simulation challenges, which the authors argue this work addresses by achieving 51% system efficiency'
    - 'GBS advantage claim is for a specific sampling task; not a general-purpose computation or a result relevant to cryptanalysis or materials simulation'
about:
  - arch-photonic
  - algo-random-circuit-sampling
establishedBy:
  - url: https://arxiv.org/abs/2508.09092
    title: 'Robust quantum computational advantage with programmable 3050-photon Gaussian boson sampling'
    relation: reports
    date: '2025-08'
actors: ['USTC', 'Tsinghua University', 'Jiuzhang Quantum Technology Co.']
country: ['CN']
review:
  state: agent-merged
  by: agent
  agent: newsroom
  agentMergedOn: '2026-08-10'
status: published
added: '2026-08-10'
---

Jiuzhang 4.0 is the fourth in a series of photonic quantum advantage demonstrations from USTC's Pan group. The key engineering advance over Jiuzhang 3.0 is system-level efficiency: 92% squeezed-light source efficiency and 51% overall system efficiency, which enables the 3,050-photon detection rate (compared to 255 photons for Jiuzhang 3.0). The programmable spatial-temporal hybrid encoding circuit allows reconfiguration, unlike earlier fixed-optics designs.

The classical simulation comparison uses the matrix product state (MPS) method, which was designed to exploit photon loss to reduce GBS simulation complexity — the argument being that earlier GBS advantage claims were undermined by classical algorithms that used photon loss as a resource. The authors argue that Jiuzhang 4.0 outperforms MPS even accounting for photon loss, which is the specific objection they are answering.

What the result is: the largest photonic quantum advantage demonstration to date on a well-chosen benchmark, now peer-reviewed in Nature. What it is not: a demonstration of useful computation, a result relevant to breaking cryptography, or evidence that photonic quantum computers are close to practical utility. Applications sometimes cited for GBS (molecular vibrational spectra, graph problems) remain speculative and have not been demonstrated at this scale.
