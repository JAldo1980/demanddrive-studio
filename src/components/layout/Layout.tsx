import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import { usePageMeta } from '../../lib/seo'
import { getPageMeta } from '../../routes'
import { Footer } from './Footer'
import { Header } from './Header'
import { SkipLink } from './SkipLink'

export function Layout() {
  const { pathname, hash } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const firstRender = useRef(true)

  usePageMeta(getPageMeta(pathname))

  // On navigation: scroll to the target (or top) and move focus to the new
  // content so keyboard and screen-reader users start at the right place.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      if (!hash) return
    }
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) {
      target.scrollIntoView()
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    } else {
      window.scrollTo(0, 0)
      mainRef.current?.focus({ preventScroll: true })
    }
  }, [pathname, hash])

  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
