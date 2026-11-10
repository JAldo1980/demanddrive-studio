import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, FocusEvent, KeyboardEvent, PointerEvent } from 'react'
import { Link, useLocation } from 'react-router'
import { site } from '../../config/site'
import { flowOrder, latestPosts, systemStages, workMenu } from '../home/data'
import { Arrow, Chevron, ChevronRight, LinkedInIcon, MailIcon } from '../home/icons'
import { Logo } from './Logo'

const DESKTOP = '(min-width: 1181px)'
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

const triggers = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/insights' },
]

const plainLinks = [
  { label: 'About', to: '/about' },
  { label: 'Free audit', to: '/free-audit' },
  { label: 'Contact', to: '/contact' },
]

/** Stagger index for the menu's entrance animation. */
const stagger = (i: number) => ({ '--i': i }) as CSSProperties

function focusables(root: HTMLElement | null) {
  if (!root) return []
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.getClientRects().length > 0)
}

/** Drawer sub-levels: one per mega-menu trigger. */
const drawerLevels = [
  {
    label: 'Services',
    href: '/services',
    groups: [
      {
        title: 'The system',
        href: '/services',
        links: (['strategy', 'attract', 'convert', 'measure'] as const).map((id) => ({
          label: systemStages[id].title,
          href: systemStages[id].href,
        })),
      },
      { title: 'Free, no obligation', href: '/free-audit', links: [{ label: 'Free landing page audit', href: '/free-audit' }] },
    ],
  },
  {
    label: 'Work',
    href: '/work',
    groups: [{ title: 'Selected work', href: '/work', links: workMenu.map((w) => ({ label: w.title, href: w.href })) }],
  },
  {
    label: 'Insights',
    href: '/insights',
    groups: [
      {
        title: 'Latest articles',
        href: '/insights',
        links: [...latestPosts.map((p) => ({ label: p.title, href: `/insights/${p.slug}` })), { label: 'All insights', href: '/insights' }],
      },
    ],
  },
]

export function Header() {
  const { pathname } = useLocation()
  const [menu, setMenu] = useState<number | null>(null)
  const [drawer, setDrawer] = useState(false)
  const [level, setLevel] = useState<number | null>(null)
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)

  const headerRef = useRef<HTMLElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<number | null>(null)
  const openTimer = useRef(0)
  const closeTimer = useRef(0)
  const lastScroll = useRef(0)
  const hoverOpenedAt = useRef(0)

  useEffect(() => {
    menuRef.current = menu
  }, [menu])

  const openMenu = (i: number, delay: number) => {
    window.clearTimeout(closeTimer.current)
    window.clearTimeout(openTimer.current)
    const go = () => {
      setMenu(i)
      setHidden(false)
      hoverOpenedAt.current = performance.now()
    }
    if (delay > 0) openTimer.current = window.setTimeout(go, delay)
    else go()
  }

  const closeMenu = (delay = 0) => {
    window.clearTimeout(openTimer.current)
    window.clearTimeout(closeTimer.current)
    if (delay > 0) closeTimer.current = window.setTimeout(() => setMenu(null), delay)
    else setMenu(null)
  }

  const cancelClose = () => window.clearTimeout(closeTimer.current)

  // Navigating closes everything.
  useEffect(() => {
    setMenu(null)
    setDrawer(false)
    setLevel(null)
  }, [pathname])

  // Solid background once scrolled; hide on scroll down, show on scroll up.
  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0
    const onScroll = () => {
      lastScroll.current = performance.now()
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const y = window.scrollY
        setSolid(y > 24)
        if (Math.abs(y - lastY) > 6) {
          setHidden(menuRef.current === null && y > lastY && y > 320)
          lastY = y
        }
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Close the mega menu below the desktop breakpoint.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP)
    const onChange = () => {
      if (!mq.matches) setMenu(null)
      else setDrawer(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Lock the page behind the open drawer.
  useEffect(() => {
    const main = document.getElementById('main')
    const footer = document.querySelector('footer')
    document.body.style.overflow = drawer ? 'hidden' : ''
    main?.toggleAttribute('inert', drawer)
    footer?.toggleAttribute('inert', drawer)
    if (drawer) requestAnimationFrame(() => focusables(document.getElementById('drawer'))[0]?.focus())
    return () => {
      document.body.style.overflow = ''
      main?.removeAttribute('inert')
      footer?.removeAttribute('inert')
    }
  }, [drawer])

  useEffect(
    () => () => {
      window.clearTimeout(openTimer.current)
      window.clearTimeout(closeTimer.current)
    },
    [],
  )

  const navTriggers = () => Array.from(headerRef.current?.querySelectorAll<HTMLElement>('.nav [data-trig]') ?? [])

  const focusFirstIn = (i: number) =>
    requestAnimationFrame(() => requestAnimationFrame(() => focusables(document.getElementById(`mega-${i}`))[0]?.focus()))

  const onTriggerMove = (i: number) => (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || !window.matchMedia(DESKTOP).matches) return
    if (performance.now() - lastScroll.current < 180) return
    if (menuRef.current === i) return
    openMenu(i, menuRef.current === null ? 90 : 0)
  }

  const onTriggerClick = (i: number) => () => {
    if (menuRef.current === i) {
      if (performance.now() - hoverOpenedAt.current > 700) closeMenu()
    } else openMenu(i, 0)
  }

  const onTriggerKey = (i: number) => (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      openMenu(i, 0)
      focusFirstIn(i)
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      moveAcross(e.currentTarget, e.key === 'ArrowRight' ? 1 : -1)
    }
  }

  const moveAcross = (from: HTMLElement, dir: number) => {
    const all = navTriggers()
    const next = all[(all.indexOf(from) + dir + all.length) % all.length]
    if (!next) return
    next.focus()
    const ni = all.indexOf(next)
    if (menuRef.current !== null) {
      if (ni < triggers.length) openMenu(ni, 0)
      else closeMenu()
    }
  }

  const onHeaderKey = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      if (drawer) {
        setDrawer(false)
        burgerRef.current?.focus()
        return
      }
      const was = menuRef.current
      if (was !== null) {
        closeMenu()
        navTriggers()[was]?.focus()
      }
      return
    }
    if (e.key === 'Tab' && drawer) {
      const items = focusables(headerRef.current)
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  const onHeaderBlur = (e: FocusEvent<HTMLElement>) => {
    const next = e.relatedTarget as Node | null
    if (menuRef.current !== null && next && !e.currentTarget.contains(next)) closeMenu()
  }

  const toggleDrawer = () => {
    setLevel(null)
    setHidden(false)
    setDrawer(!drawer)
  }

  const headerClass = ['hdr', solid || menu !== null ? 'is-solid' : '', hidden && menu === null && !drawer ? 'is-hidden' : '']
    .filter(Boolean)
    .join(' ')

  const sub = level !== null ? drawerLevels[level] : null
  const flow = flowOrder.map((id) => systemStages[id])

  return (
    <header
      ref={headerRef}
      className={headerClass}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') closeMenu(260)
      }}
      onKeyDown={onHeaderKey}
      onBlur={onHeaderBlur}
    >
      <div className="hdr__bg" aria-hidden="true" />
      <div className="wrap hdr__bar">
        <Link className="logo" to="/" aria-label="DemandDrive Studio home">
          <Logo />
        </Link>
        <nav aria-label="Main">
          <ul className="nav">
            {triggers.map((t, i) => (
              <li key={t.label}>
                <button
                  className="nav__a"
                  type="button"
                  data-trig=""
                  aria-expanded={menu === i}
                  aria-controls={`mega-${i}`}
                  onPointerMove={onTriggerMove(i)}
                  onPointerLeave={() => window.clearTimeout(openTimer.current)}
                  onClick={onTriggerClick(i)}
                  onKeyDown={onTriggerKey(i)}
                >
                  <span>{t.label}</span>
                  <Chevron />
                </button>
              </li>
            ))}
            {plainLinks.map((l) => (
              <li key={l.to}>
                <Link
                  className="nav__a"
                  data-trig=""
                  to={l.to}
                  aria-current={pathname === l.to ? 'page' : undefined}
                  onPointerEnter={() => {
                    window.clearTimeout(openTimer.current)
                    if (menuRef.current !== null) closeMenu(120)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                      e.preventDefault()
                      moveAcross(e.currentTarget, e.key === 'ArrowRight' ? 1 : -1)
                    }
                  }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link className="btn btn--ink btn--sm" to="/contact">
          Discuss a project
          <span className="btn__i">
            <Arrow />
          </span>
        </Link>
        <button ref={burgerRef} className="burger" type="button" aria-expanded={drawer} aria-controls="drawer" onClick={toggleDrawer}>
          <i aria-hidden="true" />
          <span>{drawer ? 'Close' : 'Menu'}</span>
        </button>
      </div>

      {/* Mega menu */}
      <div className={`mega tone-navy${menu !== null ? ' is-open' : ''}`} onPointerEnter={cancelClose}>
        {menu === 0 && (
          <section id="mega-0" aria-label="Services">
            <div className="wrap grid12 mega__in">
              <div className="mega__lead">
                <span className="eyebrow mono mi" style={stagger(0)}>How the system works</span>
                <p className="mega__t mi" style={stagger(1)}>Services</p>
                <p className="mega__intro mi" style={stagger(2)}>
                  Four connected services, planned as one system rather than four separate channels.
                </p>
                <Link className="la mi" style={stagger(3)} to="/services">
                  Explore services
                  <Arrow />
                </Link>
                <Link className="mega__feat tone-yellow mi" style={stagger(4)} to="/free-audit">
                  <span className="mono">Free, no obligation</span>
                  <span className="mega__ft">Free landing page audit</span>
                  <span className="mega__fx">One page reviewed, with prioritised fixes within 5 working days.</span>
                  <span className="la">
                    Request an audit
                    <Arrow />
                  </span>
                </Link>
              </div>
              <div className="mega__body">
                <Link className="mflow__band mi" style={stagger(4)} to={systemStages.strategy.href}>
                  <span>
                    <span className="mono mflow__k">Across every stage</span> <b style={{ marginLeft: 8 }}>B2B growth strategy</b>
                  </span>
                  <span className="mono" style={{ color: 'var(--fg-3)' }}>Sets the brief and success measures</span>
                </Link>
                <div className="mflow">
                  {flow.map((s, n) => (
                    <div key={s.id} className="mflow__s mi" style={stagger(5 + n)}>
                      <span className="mono mflow__k">{s.stage}</span>
                      <Link className="mflow__t" to={s.href}>
                        {s.title}
                      </Link>
                      <p className="mflow__x">{s.touch}</p>
                      <ul>
                        {s.items.slice(0, 3).map((item) => (
                          <li key={item}>
                            <Link to={s.href}>{item}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
        {menu === 1 && (
          <section id="mega-1" aria-label="Work">
            <div className="wrap grid12 mega__in">
              <div className="mega__lead">
                <span className="eyebrow mono mi" style={stagger(0)}>Evidence</span>
                <p className="mega__t mi" style={stagger(1)}>Work</p>
                <p className="mega__intro mi" style={stagger(2)}>
                  Results from previous roles, client projects and concept work, each clearly labelled.
                </p>
                <Link className="la mi" style={stagger(3)} to="/work">
                  See all work
                  <Arrow />
                </Link>
              </div>
              <div className="mega__body">
                <ul className="mega__grid">
                  {workMenu.map((w, n) => (
                    <li key={w.href} className="mi" style={stagger(4 + n)}>
                      <Link className="mega__cell" to={w.href}>
                        <span className="pill mono" style={{ alignSelf: 'flex-start' }}>{w.chip}</span>
                        <span className="mega__cellt">{w.title}</span>
                        <span className="mega__cellx">{w.x}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
        {menu === 2 && (
          <section id="mega-2" aria-label="Insights">
            <div className="wrap grid12 mega__in">
              <div className="mega__lead">
                <span className="eyebrow mono mi" style={stagger(0)}>Field notes</span>
                <p className="mega__t mi" style={stagger(1)}>Insights</p>
                <p className="mega__intro mi" style={stagger(2)}>
                  Practical thinking on B2B demand, search and conversion, for the people accountable for growth.
                </p>
                <Link className="la mi" style={stagger(3)} to="/insights">
                  Read the insights
                  <Arrow />
                </Link>
              </div>
              <div className="mega__body mega__res">
                <div className="mi" style={stagger(4)}>
                  <Link className="mega__big" to="/insights">
                    <span>
                      <span className="mega__bigt">All articles</span>
                      <span className="mega__bigx">Websites, landing pages, SEO and measurement.</span>
                    </span>
                    <span className="rnd" style={{ borderColor: 'var(--paper)' }}><Arrow /></span>
                  </Link>
                  <Link className="mega__big" to="/free-audit">
                    <span>
                      <span className="mega__bigt">Free landing page audit</span>
                      <span className="mega__bigx">One page reviewed, with prioritised fixes.</span>
                    </span>
                    <span className="rnd" style={{ borderColor: 'var(--paper)' }}><Arrow /></span>
                  </Link>
                  <a className="mega__big" href="/insights/rss.xml">
                    <span>
                      <span className="mega__bigt">RSS feed</span>
                      <span className="mega__bigx">New articles in your reader as they publish.</span>
                    </span>
                    <span className="rnd" style={{ borderColor: 'var(--paper)' }}><Arrow /></span>
                  </a>
                </div>
                <div className="mi" style={stagger(5)}>
                  <p className="mono" style={{ margin: '0 0 6px', color: 'var(--fg-3)' }}>Latest</p>
                  {latestPosts.map((p) => (
                    <Link key={p.slug} className="mega__post" to={`/insights/${p.slug}`}>
                      <span className="mono">{p.meta}</span>
                      <span className="mega__postt">{p.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      <div className={`scrim${menu !== null ? ' is-on' : ''}`} aria-hidden="true" onClick={() => closeMenu()} />

      {/* Mobile drawer */}
      {drawer && (
        <nav className="drawer tone-navy" id="drawer" aria-label="Main">
          <div className="wrap">
            {sub === null ? (
              <div className="lvl">
                <ul className="drawer__list">
                  {triggers.map((t, i) => (
                    <li key={t.label}>
                      <button className="drawer__a" type="button" onClick={() => setLevel(i)}>
                        <span>{t.label}</span>
                        <ChevronRight />
                      </button>
                    </li>
                  ))}
                  {plainLinks.map((l) => (
                    <li key={l.to}>
                      <Link className="drawer__a" to={l.to}>
                        <span>{l.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="drawer__foot">
                  <Link className="btn btn--block" to="/contact">
                    Discuss a project
                    <span className="btn__i"><Arrow /></span>
                  </Link>
                  {site.contact.email && (
                    <a className="drawer__c" href={`mailto:${site.contact.email}`}>
                      <MailIcon />
                      {site.contact.email}
                    </a>
                  )}
                  {site.social.map((s) => (
                    <a key={s.href} className="drawer__c" href={s.href} rel="me noopener" target="_blank">
                      <LinkedInIcon />
                      {s.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <div className="lvl">
                <button className="drawer__back mono" type="button" onClick={() => setLevel(null)}>
                  <Arrow />
                  Back
                </button>
                <Link className="drawer__ov" to={sub.href}>
                  <span className="mono" style={{ color: 'var(--fg-3)' }}>Overview</span>
                  <span className="d2">{sub.label}</span>
                </Link>
                {sub.groups.map((g) => (
                  <div key={g.title}>
                    <Link className="drawer__g mono" to={g.href}>
                      {g.title}
                    </Link>
                    <ul className="drawer__sl">
                      {g.links.map((l) => (
                        <li key={l.href + l.label}>
                          <Link to={l.href}>{l.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
