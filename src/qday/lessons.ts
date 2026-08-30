/**
 * THE EIGHT STEPS, AND WHY THEY ARE CODE RATHER THAN CONTENT.
 *
 * Same argument as the glossary next door. A lesson is exposition: "RSA works
 * because multiplying two primes is easy and undoing it is not" is a teaching
 * sentence, not a finding that could be right or wrong against a source. Giving
 * it a schema, a gate and an agent write scope would put explanation in the
 * same place as evidence, which is the confusion the board's rules exist to
 * prevent.
 *
 * **But every figure in a lesson comes from the board.** A step names the
 * frontier items that carry the claims it leans on, and the page renders those
 * from live content — so the lesson cannot drift from the evidence, it improves
 * when an agent improves an item, and a step resting on something the board has
 * stopped standing behind visibly loses its footing.
 *
 * Where a step touches something genuinely unsettled it names one of the twelve
 * standing questions instead of pretending to answer it. That is why the
 * questions are no longer listed here as a block: they used to be the whole tab,
 * which made Learn a status report rather than a lesson. They live on the
 * Frontier view, and appear here only where a reader has just been told
 * something and should know it is still open.
 */
export interface Lesson {
  id: string
  title: string
  /** One line under the heading, before the fold. */
  kicker: string
  /** The body. Each string is a paragraph. */
  body: string[]
  /** Frontier item ids whose evidence this step rests on. */
  cites?: string[]
  /** A standing question this step should not pretend to settle. */
  question?: string
  /** Which demonstration to render, if any. */
  demo?: 'factoring' | 'curve'
}

export const LESSONS: Lesson[] = [
  {
    id: 'why',
    title: 'Why you should care',
    kicker: 'Cryptography is load-bearing, and you never see it.',
    body: [
      'Almost nothing you do online is protected by a password. It is protected by cryptography running underneath the password: the padlock on a website, the signature that proves a software update came from its vendor, the chip in a passport, the keys that let a bank move money, the control systems that keep power and water running.',
      'All of it rests on two mathematical problems being hard: factoring large numbers, and a related problem on elliptic curves. Not impossible — hard. Hard enough that the fastest computers ever built would need longer than the age of the universe.',
      'A quantum computer of sufficient size would make both of them easy. Not faster. Easy. That machine does not exist and may not for years, but two things follow immediately. Data captured today can be stored until it does, and replacing cryptography across an organisation takes years of work that has to start before the machine arrives, not after.',
    ],
    cites: ['harvest-now-decrypt-later'],
  },
  {
    id: 'rsa',
    title: 'Today’s first lock: RSA, the multiplication trapdoor',
    kicker: 'Easy one way, hard the other. That asymmetry is the whole trick.',
    body: [
      'Multiply 61 by 53 and you get 3,233. That took a second. Now go the other way: given 3,233, find the two numbers that made it. You have to search.',
      'That is a trapdoor — trivial in one direction, expensive in the other — and RSA is built on it. Your public key is the product of two enormous primes. Anyone can use it to lock a message. Only someone who knows the two primes can unlock it.',
      'The security comes entirely from the size of the search. An RSA-2048 key is a product of two 1,024-bit primes, and the number of candidates to check is beyond any imaginable amount of classical computing. Try the demonstration below with four digits, then consider that a real key has six hundred.',
    ],
    demo: 'factoring',
    cites: ['algo-shor'],
  },
  {
    id: 'ecc',
    title: 'Today’s second lock: elliptic curves, billiards on a curve',
    kicker: 'The same idea, smaller keys, and a different hard problem underneath.',
    body: [
      'Elliptic-curve cryptography protects most modern connections, and it uses a different trapdoor. Take a point on a curve and add it to itself, following a geometric rule: draw a line, find where it strikes the curve, reflect it. Do that repeatedly and the point bounces around unpredictably.',
      'Adding a point to itself a thousand times is quick. Given the starting point and where you landed, working out that it took a thousand steps is not — that is the discrete logarithm problem, and nobody has a fast classical method for it.',
      'Because that problem is harder per bit than factoring, elliptic curves get equivalent security from far smaller keys, which is why they are everywhere in phones, cards and embedded devices. It also means they fall to the same quantum algorithm, and by current estimates they fall *first*.',
    ],
    demo: 'curve',
    cites: ['algo-resource-estimation'],
  },
  {
    id: 'keys',
    title: 'Managing the keys you already have',
    kicker: 'Most organisations cannot say where their cryptography is.',
    body: [
      'Keys are not set once. They are generated, distributed, rotated, revoked and retired, and NIST SP 800-57 sets out that lifecycle in detail — including how long a key protecting long-lived data may responsibly be used.',
      'The practical problem is prior to any of that. Cryptography is embedded in applications nobody has opened in years, in appliances, in supplier code, in protocol defaults chosen by somebody who has left. Every national playbook opens by asking for an inventory, because you cannot rotate, prioritise or replace what you cannot see.',
      'This is also the honest starting point for the migration. An organisation with a maintained cryptographic inventory has a project. One without has a discovery exercise first, and that discovery is usually the longest part.',
    ],
    cites: ['mig-discovery', 'crypto-bill-of-materials', 'mig-crypto-agility'],
  },
  {
    id: 'quantum',
    title: 'The quantum problem',
    kicker: 'One algorithm, published in 1994, breaks both locks.',
    body: [
      'Peter Shor showed in 1994 that a quantum computer could factor large numbers efficiently, and solve the elliptic-curve problem too. The mathematics has never been in doubt. What has always been in doubt is the machine.',
      'Today’s quantum computers are far too small and far too error-prone. Getting from here to a cryptographically relevant machine needs error correction working at scale — thousands of imperfect physical qubits combined into each reliable logical one — and that is the engineering the board tracks item by item.',
      'The distance is not fixed, and it does not only shrink for hardware reasons. In 2025 an estimate of the machine needed to break RSA-2048 fell from twenty million physical qubits to under one million. Nothing was built. Somebody found a better algorithm.',
    ],
    cites: ['crqc', 'algo-resource-estimation', 'qec-below-threshold-surface-code'],
    question: 'q-day-timing',
  },
  {
    id: 'replacements',
    title: 'The replacements: FIPS 203, 204 and 205',
    kicker: 'Standardised, published, and being deployed now.',
    body: [
      'After an eight-year public competition, NIST published three post-quantum standards in August 2024: ML-KEM for key establishment, ML-DSA for signatures, and SLH-DSA as a hash-based signature that rests on no lattice assumption at all. A fourth, FN-DSA, is in development, and a separate process is evaluating nine further signature candidates on deliberately different mathematics.',
      'That diversity is not indecision. It is insurance. If a mathematical advance ever weakened lattice-based schemes, a standard built on entirely different assumptions would still stand — and the board has already recorded one candidate withdrawn after a weakness was found.',
      'Deploying them is not a drop-in replacement. The new keys and signatures are larger than the ones they replace, which breaks assumptions buried in protocols, hardware security modules and embedded devices that sized a buffer years ago. Hybrid modes exist so the change can be made without giving up the security of what is already deployed.',
    ],
    cites: ['pqc-fips-203', 'pqc-fips-204', 'pqc-fips-205', 'pqc-additional-signatures-r3', 'hybrid-tls-mlkem'],
  },
  {
    id: 'steering',
    title: 'Who is steering',
    kicker: 'The dates are set by regulators, not by vendors.',
    body: [
      'NIST standardises the algorithms and sets the American deprecation schedule: RSA and elliptic curves deprecated after 2030, disallowed after 2035. The NSA’s CNSA 2.0 timetable binds national security systems earlier. The UK’s NCSC sets 2028, 2031 and 2035 checkpoints for discovery, priority migration and completion.',
      'The EU’s coordinated roadmap works in risk tiers rather than a single date: first steps and national roadmaps by the end of 2026, high-risk use cases transitioned by the end of 2030, medium-risk by the end of 2035.',
      'Every one of those dates is on the Plan section with the document that set it, because a deadline this board asserts and cannot cite would be the same failure as an unsourced claim. Note also which kind of instrument each is — an executive order can be revoked by the next administration, and a published standard cannot.',
    ],
    cites: ['cnsa-2-timeline'],
    question: 'roadmaps',
  },
  {
    id: 'loop',
    title: 'The loop that never ends',
    kicker: 'This is not a project with a completion date.',
    body: [
      'The post-quantum migration is being treated in most organisations as a one-off programme. It is better understood as the first exercise of a capability that will be needed repeatedly: discover what you have, assess what it protects and for how long, replace what is weakest, and be able to do it again.',
      'The reason is in the previous step. Nine further signature candidates are still being evaluated, one has already been withdrawn after cryptanalysis found a weakness, and the algorithms standardised in 2024 will not be the last. The organisations that will find the next change cheap are the ones that made this one into an ability rather than a project.',
      'Which is also why this board exists in the shape it does. The estimates move, the deadlines are fixed, and the gap between them is the only number that matters — so everything here is dated, sourced, and marked with whether anyone has actually checked it.',
    ],
    cites: ['mig-crypto-agility', 'mig-supply-chain'],
    question: 'forecasts',
  },
]
