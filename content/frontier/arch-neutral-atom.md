---
schema: frontier/v1
id: arch-neutral-atom
title: Neutral atom arrays
summary: Optical tweezers holding atoms that can be physically rearranged mid-computation.
plain: Uncharged atoms held in place by focused laser beams, like marbles in invisible tweezers. Because the tweezers can be moved during a calculation, the wiring diagram is rearranged on the fly rather than fixed at manufacture. That flexibility is a real advantage for error correction.
pillar: quantum
constellation: architectures
readiness: experimental
actors: [QuEra Computing, Harvard University, MIT]
metrics:
  - name: Code distances
    value: 'd=3, d=5'
    note: colour code, Gemini
evidence:
  claim: Logical magic state distillation was demonstrated on a neutral-atom processor using dynamically reconfigurable atom transport.
  verified: '2026-08-04'
  sources:
    - url: https://www.nature.com/articles/s41586-025-09367-3
      role: primary
      publisher: Nature
      date: '2025-07-14'
      identifier: Nature 645, 620–625 (2025)
links:
  - to: qec-magic-state-distillation
    relation: evidence-for
  - to: arch-trapped-ion
    relation: competes-with
confidence: high
status: published
added: '2026-08-04'
origin: human
---
