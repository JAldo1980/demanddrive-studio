import { useEffect, useState } from 'react'
import type { CSSProperties, KeyboardEvent, ReactNode } from 'react'
import { Link } from 'react-router'
import { site } from '../../config/site'
import { approach } from '../../content/approach'
import { challenges } from '../../content/challenges'
import { faqs } from '../../content/faqs'
import { featuredTestimonials } from '../../content/testimonials'
import { flowOrder, funnel, latestPosts, systemStages } from './data'
import type { StageId } from './data'
import { Arrow, ArrowDown, ArrowLeft, ArrowUp } from './icons'

const delay = (i: number) => ({ '--i': i }) as CSSProperties

/** A hand-written margin note. Decorative: the same point is made in the text. */
function Note({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <span className={`note note--flow ${className}`} aria-hidden="true">
      {children}
    </span>
  )
}

function StageTag({ n, label, note }: { n: string; label: string; note: string }) {
  return (
    <p className="stage-tag">
      <b>
        {n} · {label}
      </b>
      <span className="mono">{note}</span>
    </p>
  )
}

/* ------------------------------------------------------------------ Hero */

export function HomeHero() {
  return (
    <section className="hero tone-paper" aria-labelledby="hero-h">
      <div className="wrap grid12 hero__g">
        <div className="hero__copy">
          <p className="eyebrow mono" style={delay(0)}>B2B growth studio · {site.contact.location ?? 'UK'}</p>
          <h1 className="h1" id="hero-h" style={delay(1)}>
            Generate better B2B demand. <span className="hl">Convert more of it.</span>
          </h1>
          <p className="lead" style={{ ...delay(2), maxWidth: '36ch' }}>
            Growth strategy, SEO, conversion-focused landing pages and measurement for UK B2B businesses, planned as one
            system and built hands-on.
          </p>
          <div className="actions" style={delay(3)}>
            <Link className="btn" to="/contact">
              Discuss a project
              <span className="btn__i"><Arrow /></span>
            </Link>
            <Link className="btn btn--ghost" to="/free-audit">
              Get a free landing page audit
              <span className="btn__i"><Arrow /></span>
            </Link>
          </div>
          <div className="hero__sec" style={delay(4)}>
            {['Manufacturing', 'Engineering', 'Industrial and technical', 'Professional services'].map((s) => (
              <span key={s} className="pill mono">{s}</span>
            ))}
          </div>
        </div>
        <div className="hero__p">
          <Note className="hero__note">
            the person who does the work
            <ArrowDown />
          </Note>
          <div className="portrait">
            <img
              src={site.founder.portrait}
              alt="James Alderman, founder of DemandDrive Studio"
              width={800}
              height={1239}
              fetchPriority="high"
            />
          </div>
          <div className="idcard">
            <div><span className="mono">Founder</span><span>{site.founder.name}</span></div>
            <div><span className="mono">Based</span><span>{site.contact.location ?? 'UK'}</span></div>
            <div><span className="mono">Experience</span><span>13+ years in B2B marketing</span></div>
            <div><span className="mono">How I work</span><span>Strategy and delivery, hands-on</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------- 01 Attract */

export function HomeAttract() {
  const [selected, setSelected] = useState<StageId>('attract')
  const cur = systemStages[selected]

  return (
    <section className="sec tone-paper2" id="attract" data-stage="0" aria-labelledby="s-attract">
      <div className="wrap">
        <StageTag n="01" label="Attract" note="How the system works" />
        <div className="head">
          <h2 className="d1 rv" id="s-attract">
            One system, <span className="hl">not four channels</span>
          </h2>
          <p className="lead rv">
            Buyers do not experience your marketing channel by channel. A search, a service page, an enquiry form and a
            follow-up call form one impression, so I plan them as one system.
          </p>
        </div>

        <div className="sys tone-blue rv">
          <div className="sys__cap">
            <span className="mono">The B2B demand system</span>
            <span className="mono">Select a stage to see the service behind it</span>
          </div>
          <button className="sys__band" type="button" aria-pressed={selected === 'strategy'} onClick={() => setSelected('strategy')}>
            <span>
              <span className="sys__k">Across every stage</span>
              <br />
              <b style={{ fontFamily: 'var(--f-display)', fontSize: '1.15rem' }}>B2B growth strategy</b>
            </span>
            <span className="sys__k">Sets the brief and success measures</span>
          </button>
          <div className="sys__row">
            {flowOrder.map((id) => {
              const s = systemStages[id]
              return (
                <button key={id} className="sys__st" type="button" aria-pressed={selected === id} onClick={() => setSelected(id)}>
                  <span className="sys__k">{s.k}</span>
                  <span className="sys__t">{s.stage}</span>
                  <span className="sys__x">{s.touch}</span>
                </button>
              )
            })}
          </div>
          <div className="sys__loop" aria-hidden="true">
            <span className="mono">Evidence feeds the next priorities</span>
          </div>
          <div className="sys__panel" key={selected} aria-live="polite">
            <div>
              <span className="mono" style={{ color: 'var(--h-600)' }}>
                {cur.k} · {cur.stage}
              </span>
              <p className="d3" style={{ marginTop: 8 }}>{cur.title}</p>
              <p style={{ margin: '10px 0 0', color: 'var(--ink-2)' }}>{cur.summary}</p>
            </div>
            <ul>
              {cur.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link className="la" to={cur.href} style={{ color: 'var(--ink)' }}>
              {cur.cta}
              <Arrow />
            </Link>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <Note className="fun__note">
            start with your biggest gap
            <ArrowDown />
          </Note>
          <ul className="fun" aria-label="Services" style={{ marginTop: 0 }}>
            {funnel.map((f) => (
              <li key={f.id} style={{ '--w': f.width } as CSSProperties}>
                <Link to={`/services#${f.id}`}>
                  <span className="pill mono pill--y">{f.tag}</span>
                  <span className="fun__t">{f.title}</span>
                  <span className="fun__x">{f.outcome}</span>
                  <span className="rnd"><Arrow /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------- 02 Convert */

export function HomeConvert() {
  const [tab, setTab] = useState(0)
  const cur = challenges[tab]

  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft']
    if (!keys.includes(e.key)) return
    e.preventDefault()
    const dir = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1
    const next = (tab + dir + challenges.length) % challenges.length
    setTab(next)
    requestAnimationFrame(() => document.getElementById(`ch-tab-${next}`)?.focus())
  }

  return (
    <section className="sec tone-paper" id="convert" data-stage="1" aria-labelledby="s-convert">
      <div className="wrap">
        <StageTag n="02" label="Convert" note="Common challenges" />
        <div className="head">
          <h2 className="d1 rv" id="s-convert">
            Where B2B marketing <span className="hl">usually breaks</span>
          </h2>
          <p className="lead rv">Four patterns I see most often, and what changes when they are fixed.</p>
        </div>
        <div className="grid12" style={{ rowGap: 28 }}>
          <div className="tabs" role="tablist" aria-label="Common challenges" onKeyDown={onTabKey}>
            {challenges.map((c, i) => (
              <button
                key={c.title}
                className="tab"
                type="button"
                role="tab"
                id={`ch-tab-${i}`}
                aria-selected={i === tab}
                aria-controls="ch-panel"
                tabIndex={i === tab ? 0 : -1}
                onClick={() => setTab(i)}
              >
                <span>{c.title}</span>
                <Arrow />
              </button>
            ))}
          </div>
          <div className="stage tone-navy" role="tabpanel" id="ch-panel" aria-labelledby={`ch-tab-${tab}`}>
            <span className="mono" style={{ color: 'var(--y-200)' }}>
              Challenge {tab + 1} of {challenges.length}
            </span>
            <p className="d2" style={{ fontSize: 'clamp(1.8rem, 1.2rem + 1.6vw, 3rem)' }}>{cur.title}</p>
            <div className="stage__cols">
              <div className="stage__b">
                <span className="mono" style={{ color: 'var(--fg-3)' }}>The problem</span>
                <p>{cur.problem}</p>
              </div>
              <div className="stage__b stage__b--go">
                <span className="mono" style={{ color: 'var(--y-200)' }}>What changes</span>
                <p>{cur.response}</p>
              </div>
            </div>
            <div>
              <Link className="btn btn--sm" to="/contact">
                Discuss your situation
                <span className="btn__i"><Arrow /></span>
              </Link>
            </div>
          </div>
        </div>

        <div className="audit tone-yellow grid12">
          <div className="audit__c">
            <p className="eyebrow mono">Free landing page audit</p>
            <h2 className="d2">
              Send me one page. I’ll show you <span className="hl">what to fix first.</span>
            </h2>
            <p style={{ margin: 0, color: 'var(--ink)' }}>
              A practical review of one landing or service page, with prioritised fixes within 5 working days. No obligation.
            </p>
            <Link className="btn btn--ink" to="/free-audit">
              Request a free audit
              <span className="btn__i"><Arrow /></span>
            </Link>
          </div>
          <div className="audit__v">
            <Note className="audit__n1">
              start here
              <ArrowDown />
            </Note>
            <div
              className="rcard"
              role="img"
              aria-label="Example of how a landing page review is laid out: four checks marked clear, fix first, fix next and check"
            >
              <div className="rcard__bar">
                <span className="mono">Landing page review</span>
                <span className="mono">Example layout</span>
              </div>
              <p className="rcard__h">What to fix first, in order</p>
              <ol className="rev">
                <li><span className="mono">01</span><span>The headline states the offer</span><span className="st st--ok">Clear</span></li>
                <li><span className="mono">02</span><span>Proof buyers check first</span><span className="circ"><span className="st st--fix">Fix first</span></span></li>
                <li><span className="mono">03</span><span><span className="hl">One clear next step</span></span><span className="st st--fix">Fix next</span></li>
                <li><span className="mono">04</span><span>Enquiry source recorded</span><span className="st">Check</span></li>
              </ol>
            </div>
            <Note className="audit__n2">
              <ArrowUp />
              every fix, in priority order
            </Note>
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------- 03 Measure */

const stats = [
  { tag: 'Coatings', value: '2.2×', label: 'Inbound enquiries within 2.5 months', sector: 'Industrial coatings', circled: false },
  { tag: 'Coatings', value: '24/24', label: 'May enquiries that went to quote', sector: 'Industrial coatings', circled: true },
  { tag: 'Water', value: '21', label: 'Form submissions in a record month', sector: 'Water treatment', circled: false },
  { tag: 'Water', value: '16', label: 'Qualified leads in the same month', sector: 'Water treatment', circled: false },
]

const ladder = [
  { label: 'Impressions', h: '20%', on: false },
  { label: 'Sessions', h: '30%', on: false },
  { label: 'Engagement', h: '40%', on: false },
  { label: 'Enquiries', h: '55%', on: true },
  { label: 'Qualified leads', h: '68%', on: true },
  { label: 'Pipeline', h: '84%', on: true },
  { label: 'Revenue', h: '100%', on: true },
]

function QuoteText({ text, mark }: { text: string; mark: string }) {
  const at = text.indexOf(mark)
  if (at === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, at)}
      <span className="hl">{mark}</span>
      {text.slice(at + mark.length)}
    </>
  )
}

export function HomeMeasure() {
  const quote = featuredTestimonials[0]

  return (
    <section className="sec tone-navy" id="measure" data-stage="2" aria-labelledby="s-measure">
      <div className="wrap">
        <StageTag n="03" label="Measure" note="Results" />
        <div className="head">
          <h2 className="d1 rv" id="s-measure">
            Measured in enquiries, <span className="hl">not clicks.</span>
          </h2>
          <p className="lead rv">Results from my previous in-house and agency roles, as reported at the time. Clients are not named.</p>
        </div>
        <div className="stats-notes" aria-hidden="true">
          <span />
          <span className="note note--flow">
            every single one
            <ArrowDown />
          </span>
        </div>
        <ul className="stats">
          {stats.map((s) => (
            <li key={s.label} className="stat rv">
              <span className="stat__xy mono">
                <span>{s.tag}</span>
                <span>Previous role</span>
              </span>
              <span className="num">{s.circled ? <span className="circ">{s.value}</span> : s.value}</span>
              <span className="stat__l">{s.label}</span>
              <span className="stat__s mono">{s.sector}</span>
            </li>
          ))}
        </ul>

        {quote && (
          <blockquote className="quote rv">
            <p>
              “<QuoteText text={quote.quote} mark="tangible result" />”
            </p>
            <footer>
              <span className="mono" style={{ color: 'var(--y-200)' }}>{quote.source}</span>
              {quote.organisation && <span className="mono">{quote.organisation} · Previous role</span>}
            </footer>
          </blockquote>
        )}

        <div className="ladder">
          <div className="ladder__cap">
            <p className="d3" style={{ margin: 0 }}>How far does your reporting reach?</p>
            <span className="mono" style={{ color: 'var(--fg-3)' }}>From first impression to revenue</span>
          </div>
          <div className="ladder__steps" aria-hidden="true">
            <span className="note note--flow lad__n1">
              most reports stop here
              <ArrowDown />
            </span>
            {ladder.map((l) => (
              <span key={l.label} className={`lstep${l.on ? ' lstep--on' : ''}`} style={{ '--h': l.h } as CSSProperties}>
                {l.label}
              </span>
            ))}
          </div>
          <div className="ladder__z">
            <span className="mono" style={{ gridColumn: '1 / 4' }}>Where most reports stop</span>
            <span className="mono on" style={{ gridColumn: '4 / 8' }}>Where I measure to, as far as your systems allow</span>
          </div>
          <p className="sr-only">
            Reporting stages from impressions, sessions and engagement, where most reports stop, up to enquiries, qualified
            leads, pipeline and revenue, where I measure to as far as your systems allow.
          </p>
          <Note className="lad__n2">
            <ArrowUp />
            this is what boards ask about
          </Note>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------- 04 Improve */

export function HomeImprove() {
  return (
    <section className="sec tone-ink" id="improve" data-stage="3" aria-labelledby="s-improve">
      <div className="wrap">
        <StageTag n="04" label="Improve" note="Approach" />
        <div className="head">
          <h2 className="d1 rv" id="s-improve">
            One cycle, <span className="hl">run hands-on</span>
          </h2>
          <p className="lead rv">Strategy and implementation from the same person, so nothing is lost in handover.</p>
        </div>
        <ol className="cyc" style={{ listStyle: 'none', padding: 0 }}>
          {approach.map((step, i) => (
            <li key={step.title} className="step rv">
              <span className="step__d">{String(i + 1).padStart(2, '0')}</span>
              <span className="d3">{step.title}</span>
              <p>{step.description.replace(' Then the cycle continues.', '')}</p>
              <span className="step__o">
                <span className="mono">You get</span>
                {step.output}
              </span>
            </li>
          ))}
        </ol>
        <div className="cyc__back" aria-hidden="true">
          <span>then the cycle continues</span>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- Work */

export function HomeWork() {
  return (
    <section className="sec tone-paper" id="work" data-stage="3" aria-labelledby="s-work">
      <div className="wrap">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 20,
            marginBottom: 'clamp(2.5rem, 2rem + 2vw, 4rem)',
          }}
        >
          <div>
            <p className="eyebrow mono" style={{ marginBottom: 18 }}>Selected work</p>
            <h2 className="d1 rv" id="s-work">
              The <span className="hl">evidence</span>
            </h2>
          </div>
          <Link className="la" to="/work">
            See all work
            <Arrow />
          </Link>
        </div>
        <ul className="cards">
          <li>
            <Link className="cs rv" to="/work/industrial-coatings-enquiry-growth">
              <span className="cs__mat">
                <span className="mono">Inbound enquiries a month</span>
                <span className="big">10.7 → 30</span>
              </span>
              <span className="cs__meta">
                <span className="pill mono">Manufacturing</span>
                <span className="mono" style={{ color: 'var(--ink-3)' }}>Previous role</span>
              </span>
              <span className="cs__t">More than doubling inbound enquiries for an industrial coatings manufacturer</span>
              <span className="cs__x">
                Inbound enquiries rose from an average of 10.7 a month to 24 and then 30, within 2.5 months of launching
                website and SEO changes.
              </span>
            </Link>
          </li>
          <li>
            <Link className="cs rv" to="/work/water-treatment-record-month">
              <span className="cs__mat" style={{ background: 'var(--h-600)' }}>
                <span className="mono">Qualified leads in a record month</span>
                <span className="big">16</span>
              </span>
              <span className="cs__meta">
                <span className="pill mono">Industrial and technical</span>
                <span className="mono" style={{ color: 'var(--ink-3)' }}>Previous role</span>
              </span>
              <span className="cs__t">A record month for an industrial water treatment specialist</span>
              <span className="cs__x">
                Service-page SEO, local search and new content delivered the client’s best month on record: 21 form
                submissions and 16 qualified leads.
              </span>
            </Link>
          </li>
          <li>
            <Link className="cs rv" to="/work/the-circle-line-website">
              <span className="cs__mat" style={{ padding: 0 }}>
                <img src="/images/work/the-circle-line-home.webp" alt="The Circle Line homepage" width={1440} height={900} loading="lazy" />
              </span>
              <span className="cs__meta">
                <span className="pill mono">Professional services</span>
                <span className="mono" style={{ color: 'var(--ink-3)' }}>Client work</span>
              </span>
              <span className="cs__t">A calm, credible website for a leadership psychology consultancy</span>
              <span className="cs__x">
                A React website senior clients can trust on sight, with a clear route in for individuals and for businesses.
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ About */

export function HomeAbout() {
  return (
    <section className="sec tone-paper2" id="about" data-stage="4" aria-labelledby="s-about">
      <div className="wrap grid12" style={{ rowGap: 48 }}>
        <div className="about__s">
          <p className="eyebrow mono" style={{ marginBottom: 22 }}>About</p>
          <h2 className="d1 rv" id="s-about">
            Strategy and delivery from <span className="hl">the same person.</span>
          </h2>
          <p className="lead rv" style={{ marginTop: 26, maxWidth: '40ch' }}>
            I’m James Alderman, a B2B marketer based in Stafford, with more than 13 years in agency, in-house and agency
            co-founder roles.
          </p>
          <div className="figstat rv">
            <span className="num" style={{ color: 'var(--h-600)' }}>13+</span>
            <span className="mono" style={{ color: 'var(--ink-2)' }}>
              years in
              <br />
              B2B marketing
            </span>
            <Note className="is-side about__note">
              <ArrowLeft />
              no hand-offs
            </Note>
          </div>
        </div>
        <div className="about__b">
          <ol className="pts">
            <li className="rv">
              <span className="d3">Strategic thinking</span>
              <p>
                I start with your commercial objectives and the way your buyers make decisions, then decide which marketing
                will move things forward.
              </p>
            </li>
            <li className="rv">
              <span className="d3">Clear communication</span>
              <p>Plain-English recommendations and reporting in enquiries, pipeline and revenue: the language boards act on.</p>
            </li>
            <li className="rv">
              <span className="d3">Hands-on delivery</span>
              <p>I build the pages, content and tracking myself, so strategy does not get lost in handover.</p>
            </li>
          </ol>
          <div>
            <Link className="la" to="/about">
              More about James
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------- Insights and FAQ */

export function HomeInsights() {
  return (
    <section className="sec tone-paper" data-stage="4" aria-labelledby="s-ins">
      <div className="wrap grid12" style={{ rowGap: 56 }}>
        <div className="ins">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20 }}>
            <div>
              <p className="eyebrow mono" style={{ marginBottom: 18 }}>Field notes</p>
              <h2 className="d1 rv" id="s-ins">Insights</h2>
            </div>
            <Link className="la" to="/insights">
              All insights
              <Arrow />
            </Link>
          </div>
          <ul className="bl">
            {latestPosts.map((p) => (
              <li key={p.slug} className="rv">
                <Link to={`/insights/${p.slug}`}>
                  <span>
                    <span className="bl__m mono">{p.meta}</span>
                    <span className="bl__t">{p.title}</span>
                    <span className="bl__x">{p.description}</span>
                  </span>
                  <span className="rnd"><Arrow /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="faqw">
          <h2 className="eyebrow mono">Questions</h2>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.question}>
                <summary>{f.question}</summary>
                <p>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------- Stage progress pill */

const stageLinks = [
  { label: 'Attract', href: '#attract' },
  { label: 'Convert', href: '#convert' },
  { label: 'Measure', href: '#measure' },
  { label: 'Improve', href: '#improve' },
  { label: 'Talk', href: '#talk' },
]

export function StageBar() {
  const [stage, setStage] = useState(-1)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const vh = window.innerHeight
      let current = -1
      document.querySelectorAll<HTMLElement>('[data-stage]').forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.45) current = Number(el.dataset.stage)
      })
      setStage(current)
      setVisible(window.scrollY > vh * 0.6 && !document.body.style.overflow)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <nav className={`stagebar${visible ? ' is-on' : ''}`} aria-label="Page sections">
      {stageLinks.map((s, i) => (
        <a key={s.href} href={s.href} className={i < stage ? 'is-done' : undefined} aria-current={i === stage ? 'step' : undefined}>
          <i aria-hidden="true" />
          <span>{s.label}</span>
        </a>
      ))}
    </nav>
  )
}
