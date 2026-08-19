/**
 * THE GLOSSARY IS PRESENTATIONAL, AND STAYS IN CODE.
 *
 * Every other body of text on this site is content: versioned, schema-checked,
 * sourced, and writable by an agent. These definitions are none of those things
 * and should not pretend to be. They make no claim about the world that could
 * be right or wrong against evidence — "a logical qubit is an error-corrected
 * qubit assembled from many physical ones" is a definition, not a finding.
 *
 * Giving them a collection would mean a schema, a gate, a loader and a write
 * scope for material with no provenance to check, and would put definitions in
 * the same place as claims — which is exactly the confusion the board's
 * evidence rules exist to prevent.
 *
 * `see` links a term to the frontier item that carries the actual evidence, so
 * a reader who wants the claim rather than the definition is one click away.
 */
export interface Term {
  term: string
  short?: string
  definition: string
  /** Frontier item id, where the board holds evidence on this. */
  see?: string
}

export const GLOSSARY: readonly Term[] = [
  {
    term: 'Q-Day',
    definition:
      'The day a quantum computer can break the public-key cryptography in general use. Not a scheduled event and not a single moment — it is an estimate, and this site exists to say how the estimate is arrived at.',
  },
  {
    term: 'CRQC',
    short: 'Cryptographically relevant quantum computer',
    definition:
      'A machine large and reliable enough to run Shor’s algorithm against RSA-2048 or equivalent elliptic-curve targets in a practical time. None exists.',
    see: 'crqc',
  },
  {
    term: 'Mosca’s theorem',
    definition:
      'If the time your data must stay secret (X) plus the time your migration takes (Y) exceeds the time until Q-Day (Z), you are already exposed. The point is that X and Y are yours to know and Z is not.',
  },
  {
    term: 'Harvest now, decrypt later',
    short: 'HNDL',
    definition:
      'Capturing encrypted traffic today to decrypt once a quantum computer exists. It makes Q-Day a present-tense problem for anything with a long secrecy requirement, because the interception has already happened.',
    see: 'harvest-now-decrypt-later',
  },
  {
    term: 'Physical qubit',
    definition:
      'One actual device — an ion in a trap, an atom in an optical tweezer, a superconducting circuit. Noisy on its own, and useful mainly as raw material for a logical qubit.',
  },
  {
    term: 'Logical qubit',
    definition:
      'An error-corrected qubit assembled from many physical ones, reliable enough to survive a long computation. This is the figure that actually gates a cryptographic break; current estimates put the requirement in the hundreds to low thousands.',
    see: 'qec-logical-qubit-scaling',
  },
  {
    term: 'Error-corrected vs error-detected',
    definition:
      'Detection notices that something went wrong; correction fixes it and carries on. A device can hold roughly twice as many error-detected qubits as error-corrected ones, so the two counts are not interchangeable — and confusing them is the easiest way to overstate progress.',
  },
  {
    term: 'Below threshold',
    definition:
      'The point at which adding more physical qubits reduces the logical error rate instead of compounding it. Before it, scaling makes a machine worse. It has now been crossed on more than one platform.',
    see: 'qec-below-threshold-surface-code',
  },
  {
    term: 'Λ (lambda)',
    definition:
      'How much the logical error rate improves for each step up in code distance. Λ above 1 means error correction is winning; the demonstrated figure is around 2.14.',
    see: 'qec-error-correction-threshold',
  },
  {
    term: 'Surface code',
    definition:
      'The most studied error-correcting code: physical qubits in a two-dimensional grid, correcting each other. Robust and well understood, but expensive — roughly a thousand physical qubits per logical one.',
    see: 'qec-surface-code',
  },
  {
    term: 'qLDPC',
    short: 'Quantum low-density parity-check codes',
    definition:
      'A newer family of codes that encode more logical qubits into the same physical hardware than a surface code. The main reason published RSA-2048 requirements fell by an order of magnitude in 2026.',
    see: 'qec-qldpc-bivariate-bicycle',
  },
  {
    term: 'Magic state distillation',
    definition:
      'Surface codes cannot perform the gates a cryptanalytic circuit needs directly. Those gates come from purifying special states, and that purification consumes most of the qubits in every RSA-2048 estimate.',
    see: 'qec-magic-state-distillation',
  },
  {
    term: 'Shor’s algorithm',
    definition:
      'The 1994 quantum algorithm that factors integers and computes discrete logarithms in polynomial time, breaking RSA, Diffie-Hellman and elliptic-curve cryptography. The largest number factored with it on real hardware is 21.',
    see: 'algo-shor',
  },
  {
    term: 'Grover’s algorithm',
    definition:
      'A quantum search that halves the effective key length of symmetric ciphers. Much less alarming than Shor: doubling a symmetric key restores the margin, which is why AES-256 is considered fine.',
    see: 'algo-grover',
  },
  {
    term: 'Resource estimate',
    definition:
      'A calculation of how much quantum hardware a specific break would take, under stated assumptions about error rates and cycle times. The assumptions matter as much as the number — an estimate that trades space for a hundred-year runtime is not a threat.',
    see: 'algo-resource-estimation',
  },
  {
    term: 'PQC',
    short: 'Post-quantum cryptography',
    definition:
      'Classical algorithms believed to resist quantum attack, meant to run on ordinary computers. The defence, as opposed to quantum key distribution, which is a different thing entirely.',
  },
  {
    term: 'ML-KEM (FIPS 203)',
    definition:
      'The standardised key-encapsulation mechanism, formerly Kyber. The replacement for the key exchange that protects a connection in transit, and the first thing most migrations do.',
    see: 'pqc-fips-203',
  },
  {
    term: 'ML-DSA (FIPS 204)',
    definition:
      'The standardised lattice signature scheme, formerly Dilithium. Replaces RSA and ECDSA signatures. Signatures are larger, which is why the migration is felt in certificates and firmware.',
    see: 'pqc-fips-204',
  },
  {
    term: 'SLH-DSA (FIPS 205)',
    definition:
      'A hash-based signature scheme, formerly SPHINCS+. Slower and larger than ML-DSA but resting on very different mathematics, which makes it the hedge if lattices are broken.',
    see: 'pqc-fips-205',
  },
  {
    term: 'CNSA 2.0',
    definition:
      'The NSA suite that US national-security systems must migrate to, with dated deadlines running from 2027 to 2033. The most concrete published timetable anywhere.',
    see: 'cnsa-2-timeline',
  },
  {
    term: 'Crypto-agility',
    definition:
      'Being able to change algorithm without re-architecting the system. The property that decides whether the next migration takes months or years — and there will be a next one.',
    see: 'mig-crypto-agility',
  },
  {
    term: 'CBOM',
    short: 'Cryptographic bill of materials',
    definition:
      'An inventory of where cryptography is used across an estate. Migration cannot be planned without one, which is why every published timeline puts discovery first.',
    see: 'crypto-bill-of-materials',
  },
  {
    term: 'Hybrid key exchange',
    definition:
      'Running a classical and a post-quantum algorithm together so the connection is safe if either survives. How most real deployment is happening — already the majority of human web traffic.',
    see: 'hybrid-tls-mlkem',
  },
  {
    term: 'Evidence level (E0–E5)',
    definition:
      'This board’s grading of what stands behind a claim: E5 independently replicated, E4 peer-reviewed experiment, E3 preprint, E2 vendor statement, E1 theory, E0 speculation. A vendor roadmap is E2 and never moves a Q-Day estimate.',
  },
]
