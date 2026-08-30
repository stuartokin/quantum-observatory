import { Section, Takeaway } from '../ui/Section'
import { BoardFigure } from '../ui/Figure'
import { frontierById } from '../../content/frontier'
import { allNews } from '../../content/newsroom'

/**
 * THREATS — what a quantum computer actually breaks, and what it does not.
 *
 * **This was planned as a quarantined import and is not one.** The original
 * sequence had Threats arriving from the research prototype marked unverified,
 * on the reasoning that the board held no material of its own. That was written
 * when a cyber galaxy was in scope and this section was going to carry CVEs and
 * exploitation data.
 *
 * With the project narrowed to quantum, the question changes and the board
 * turns out to answer it already. "What is the threat" here is not a
 * vulnerability feed; it is *which cryptography breaks, how completely, and
 * when* — and `algo-shor`, `algo-grover`, `harvest-now-decrypt-later`, `crqc`
 * and the additional-signatures round are all on the board with sources and
 * evidence levels. Importing unverified scores alongside them would have put
 * the one unsourced thing on the site in the section about danger.
 *
 * The most useful work this page does is **saying what is not threatened**.
 * The field's loudest failure mode is treating "quantum breaks encryption" as
 * undifferentiated, and a reader who leaves believing AES is doomed has been
 * misinformed by a page that meant well.
 */
export function Threats() {
  /** The HAWK withdrawal is the board's own worked example of a replacement
   *  failing, and it is a news item rather than a frontier item. */
  const hawk = allNews.find((n) => n.id.includes('hawk-pqc-candidate-withdrawn'))

  return (
    <div className="qd-threats">
      <Section
        title="What breaks, and how badly"
        info={
          <>
            Three tiers, because the difference between them is the single most
            misunderstood thing in this subject. Public-key cryptography is broken
            outright by Shor. Symmetric cryptography is <b>weakened</b> by Grover and
            answered by using longer keys. Hash functions and properly sized symmetric
            ciphers are not meaningfully threatened at all.
            <br />
            <br />
            Every card is read from the board item it names, with that item&rsquo;s
            evidence level and source.
          </>
        }
      >
        <p className="qd-trends__lede">
          &ldquo;Quantum breaks encryption&rdquo; is true of one half of cryptography and
          badly wrong about the other. The distinction decides what you have to replace
          and what you merely have to size correctly.
        </p>

        <div className="qd-threats__tiers">
          <div className="qd-tier" data-tier="broken">
            <p className="qd-tier__head">
              <span>Broken outright</span> RSA · elliptic curves · Diffie-Hellman
            </p>
            <p className="qd-tier__body">
              Shor&rsquo;s algorithm does not weaken these, it solves them. A machine large
              enough recovers the private key from the public one, and no key length
              helps: doubling the size of an RSA key adds a little work for the attacker
              and a great deal for everyone else. The only answer is different
              mathematics, which is what the FIPS standards are.
            </p>
            <BoardFigure
              itemId="algo-shor"
              title="Shor at cryptographic scale"
              badge="the whole problem"
              headline={
                <>
                  Proven in 1994
                  <span className="qd-fig__sub">
                    the mathematics has never been in doubt — only the machine
                  </span>
                </>
              }
            />
          </div>

          <div className="qd-tier" data-tier="weakened">
            <p className="qd-tier__head">
              <span>Weakened, not broken</span> AES · symmetric ciphers
            </p>
            <p className="qd-tier__body">
              Grover&rsquo;s algorithm searches a space of size N in roughly √N steps. Against
              a 128-bit key that is a 64-bit search, which is a real reduction. Against
              AES-256 it leaves about 128 bits of security, which is not.
              <b> The answer is to use longer keys, and that is all.</b> This is why
              CNSA 2.0 specifies AES-256 rather than abandoning symmetric cryptography.
            </p>
            <BoardFigure
              itemId="algo-grover"
              title="Grover search"
              badge="halves the exponent"
              headline={
                <>
                  √N, not N
                  <span className="qd-fig__sub">
                    a quadratic speed-up — and quadratic is survivable
                  </span>
                </>
              }
            />
          </div>

          <div className="qd-tier" data-tier="safe">
            <p className="qd-tier__head">
              <span>Not meaningfully threatened</span> hash functions · adequately sized symmetric keys
            </p>
            <p className="qd-tier__body">
              SHA-256 and SHA-3 face the same quadratic effect and the same answer. There
              is no known quantum attack that breaks a well-chosen hash function or a
              256-bit symmetric cipher, and the board holds no evidence of one. That is
              worth stating plainly, because a reader who leaves believing everything is
              doomed will make worse decisions than one who knows which half to worry
              about.
            </p>
          </div>
        </div>

        <Takeaway>
          Half of cryptography needs replacing and half needs resizing. Migration plans
          that treat the two the same either waste effort on symmetric ciphers or, worse,
          fold public-key replacement into a general &ldquo;crypto refresh&rdquo; that never
          finishes.
        </Takeaway>
      </Section>

      <Section
        title="The clock that has already started"
        info={
          <>
            Every other deadline on this board is about a machine that does not exist yet.
            This one is not: traffic captured today can be stored indefinitely and decrypted
            whenever a capable machine arrives, so the exposure begins the moment the data
            crosses the wire.
          </>
        }
      >
        <BoardFigure
          itemId="harvest-now-decrypt-later"
          title="Harvest now, decrypt later"
          badge="already running"
          headline={
            <>
              Capture today, read later
              <span className="qd-fig__sub">
                the only threat here whose clock does not wait for the hardware
              </span>
            </>
          }
        />
        <p className="qd-note">
          This is the reason the Mosca test asks how long your data must stay confidential
          rather than how long you have to migrate. If a secret must hold for fifteen years
          and a capable machine arrives in twelve, it was exposed three years ago —
          whatever your migration plan says. The arithmetic is on <b>Clocks</b>.
        </p>
      </Section>

      <Section
        title="The replacements are unbroken, not proven"
        defaultOpen={false}
        info={
          <>
            A standard is a decision, not a proof. The post-quantum algorithms rest on
            mathematical problems believed hard, in the same way RSA rested on factoring
            being believed hard — and cryptanalysis of them is young.
          </>
        }
      >
        <p className="qd-trends__lede">
          The honest position on ML-KEM and ML-DSA is that nobody has broken them and
          people have been trying for less than a decade. That is a good position and it
          is not the same as a guarantee.
        </p>

        {hawk ? (
          <div className="qd-threats__event">
            <p className="qd-threats__eventhead">
              <span>{hawk.date}</span> A candidate has already fallen
            </p>
            <p className="qd-threats__eventbody">{hawk.headline}</p>
          </div>
        ) : (
          <p className="qd-note">
            The board previously recorded a signature candidate withdrawn after
            cryptanalysis; that record is not currently loaded.
          </p>
        )}

        <BoardFigure
          itemId="pqc-additional-signatures-r3"
          title="A third round, on purpose"
          badge="insurance"
          headline={
            <>
              Nine candidates, four families
              <span className="qd-fig__sub">
                deliberately different mathematics, so one advance cannot take everything
              </span>
            </>
          }
        />

        <Takeaway>
          The diversity in the standards programme is not indecision. If lattice
          assumptions were ever weakened, a hash-based signature resting on no lattice
          assumption at all would still stand — which is precisely why SLH-DSA was
          standardised alongside ML-DSA rather than instead of it.
        </Takeaway>
      </Section>

      <Section
        title="What this section does not hold"
        defaultOpen={false}
      >
        <p className="qd-trends__lede">
          <b>No vulnerability records, no exploitation data, and no vendor risk scores.</b>{' '}
          This board tracks how close developments are to being real; it is not a
          vulnerability feed, and material of that kind would be the only thing on the
          site without a source it could be checked against.
        </p>
        <p className="qd-note">
          It also holds nothing on side-channel attacks against post-quantum
          implementations, which is a real and active area. If that becomes a gap worth
          filling it will arrive as sourced frontier items like everything else, not as an
          import.
          {!frontierById.has('pqc-side-channels') && (
            <> No item covers it today.</>
          )}
        </p>
      </Section>
    </div>
  )
}
