---
schema: frontier/v1
id: arch-topological
title: Majorana-based topological qubits
summary: 'Microsoft''s Majorana programme: InAs–Pb tetron devices show 20 s Z-parity lifetime (Majorana 2, June 2026 preprint). Roadmap revised to 2029. No peer review; only Z measurements shown; no independent replication. External expert skepticism remains high.'
plain: 'Microsoft is trying to build qubits using exotic quantum states called Majorana zero modes, which in theory would be inherently protected against errors. Their latest chip (Majorana 2) uses a lead-based superconductor and reports that a parity state — one component of a qubit — lasts over 20 seconds, roughly 1000 times longer than the previous aluminium-based design. However, demonstrating a complete qubit requires two kinds of measurement (X and Z); the June 2026 preprint shows only Z measurements. Independent physicists remain sceptical that Majorana zero modes have been confirmed at all. No peer review has been completed and no independent group has replicated the result.'
pillar: quantum
readiness: emerging
constellation: architectures
cluster: topological
actors:
  - Microsoft Quantum
country:
  - US
metrics:
  - name: Z-parity lifetime (InAs-Pb tetron, Majorana 2)
    value: '>20'
    unit: seconds
    note: 'Reported in arXiv:2606.03884; improvement of >3 orders of magnitude over Al-based predecessor (~1–12 ms). Only Z-type measurement; X measurement absent.'
  - name: Roadmap target (fault-tolerant quantum computing)
    value: '2029'
    unit: year
    note: 'Revised from 2033 at Build 2026. Vendor roadmap only, E2, no Q-Day impact per decisions file.'
links:
  - to: qec-surface-code
    relation: depends-on
  - to: arch-superconducting
    relation: competes-with
  - to: qec-magic-state-distillation
    relation: depends-on
evidence:
  claim: 'arXiv:2606.03884 (Aghaee et al., Microsoft Quantum, June 2026) reports Z-parity lifetime exceeding 20 s in an InAs–Pb tetron device, replacing the aluminium superconductor of Majorana 1 with lead to raise the excitation gap. The paper uses interferometric single-shot parity measurements and claims to experimentally validate that increasing the excitation gap improves device performance. Only Z-type parity measurements are presented; X measurements are absent. The preprint is unreviewed and all authors are Microsoft employees. External physicists (Legg, Frolov) state that without X measurements the data do not demonstrate a topological qubit. Microsoft revised its fault-tolerant roadmap from 2033 to 2029 citing this result; this is a vendor roadmap statement (E2).'
  verified: '2026-08-17'
  level: E2
  sources:
    - url: https://arxiv.org/abs/2606.03884
      role: vendor
      title: '20 Second Parity Lifetime in an InAs-Pb Tetron Device'
      publisher: arXiv
      date: '2026-06-03'
      identifier: 'arXiv:2606.03884'
      doi: 10.48550/arXiv.2606.03884
      accessed: '2026-08-17'
      note: 'Vendor preprint (all authors Microsoft Quantum); E2 ceiling per decisions file. Reports >20 s Z-parity lifetime; no X measurements; not peer-reviewed. Significant external skepticism from Frolov, Legg and others.'
    - url: https://www.nature.com/articles/d41586-026-01788-y
      role: corroborating
      title: 'Microsoft upgrades controversial quantum chip — researchers are still sceptical'
      publisher: Nature
      date: '2026-06-03'
      identifier: 'Nature 654, 308-309 (2026)'
      doi: 10.1038/d41586-026-01788-y
      accessed: '2026-08-17'
      note: 'Nature news piece (not a research article) documenting expert skepticism and citing the arXiv preprint. Not primary evidence; corroborating only for the controversy framing.'
priority: P2
qdayImpact: 0
qdayReasoning: 'Majorana 2 demonstrates an improved parity lifetime in a single-wire Z measurement on a vendor preprint. It does not demonstrate a functioning topological qubit, logical operations, or error suppression at any scale. The revised 2029 roadmap is a commercial statement and per the decisions file vendor roadmaps never move a Q-Day score. No hardware has been built or demonstrated that changes the resources needed to break RSA-2048 or elliptic-curve cryptography.'
confidence: low
novelty: 'Incremental coherence improvement; roadmap revision; qubit claim contested'
status: draft
origin: agent
horizon: 2
review:
  state: agent-reviewed
  by: agent
  agent: reviewer
  agentMergedOn: '2026-08-17'
  reviewedOn: '2026-08-18'
  note: 'arXiv:2606.03884 abstract and HTML opened; characteristic ~22 s parity lifetime consistent with ">20 s" claim. All authors Microsoft Quantum confirmed. No X measurements confirmed; paper explicitly defers X measurements to future work. Nature news d41586-026-01788-y corroborates Legg/Frolov skepticism. E2 correct; confidence low correct. No changes.'
---

## What happened

Microsoft unveiled the Majorana 2 chip at Build 2026 (May–June 2026) alongside a preprint (arXiv:2606.03884) reporting Z-parity lifetimes exceeding 20 seconds in an InAs–Pb tetron device. Replacing the aluminium superconductor of the Majorana 1 chip with lead raises the excitation gap, which in theory suppresses quasiparticle poisoning — the dominant error mechanism — by more than three orders of magnitude over the Al-based predecessor (where lifetimes were 1–12 ms).

## Why it matters

Parity lifetime is a necessary (but not sufficient) condition for a functioning topological qubit. A 20 s lifetime would in principle allow many gate operations before decoherence. Microsoft has revised its fault-tolerant quantum computing roadmap from 2033 to 2029 on the basis of this result.

## What was the previous state of the art

The Majorana 1 chip (InAs–Al, February 2025, Nature 638, 651–655) reported parity lifetimes of order milliseconds and demonstrated interferometric single-shot parity measurement (Z only). Independent physicists were sceptical of the underlying Majorana zero mode interpretation at that stage.

## Limitations

The June 2026 preprint presents **only Z-type parity measurements**. A functioning qubit requires both X and Z measurements. Without X measurements, the paper demonstrates a long-lived parity state in a superconducting nanowire but does not demonstrate a qubit. The paper acknowledges this: it states that investigating X measurements "will be an important direction for future work." All authors are Microsoft employees; the preprint has not been peer-reviewed; and no independent group has replicated the result. External physicists (Legg, Frolov) have stated publicly that the data do not prove the existence of a topological qubit or Majorana zero modes.

## What would change the assessment

Publication of X measurements showing non-trivial joint parity; independent replication by a non-Microsoft group; peer review; or a demonstration of two-qubit operations would each individually move the readiness assessment. A retraction or further expert consensus against the Majorana interpretation would lower it further.
