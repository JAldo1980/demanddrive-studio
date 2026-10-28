import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { mainNav } from '../../routes'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { Logo } from './Logo'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative py-2 text-[0.9375rem] font-medium transition-colors hover:text-electric ${
    isActive ? 'text-navy after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-electric' : 'text-charcoal'
  }`

export function Header() {
  const { pathname } = useLocation()
  // Remember which page the menu was opened on; navigating elsewhere closes it.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const setOpen = (value: boolean) => setOpenOn(value ? pathname : null)
  const menuId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpenOn(null)
      buttonRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <Container className="flex h-18 items-center justify-between gap-6 lg:h-20">
        <Link to="/" className="shrink-0" aria-label="DemandDrive Studio home">
          <Logo className="h-12 w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={navLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <ButtonLink to="/contact" className="min-h-11! px-5! text-[0.9375rem]!">
            Discuss a project
          </ButtonLink>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-md text-navy md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </Container>

      <nav id={menuId} aria-label="Main" hidden={!open} className="border-t border-line bg-white md:hidden">
        <Container className="py-4">
          <ul className="divide-y divide-line">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `block py-3.5 text-lg font-medium ${isActive ? 'text-electric' : 'text-navy'}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <ButtonLink to="/contact" className="mt-4 w-full">
            Discuss a project
          </ButtonLink>
        </Container>
      </nav>
    </header>
  )
}
