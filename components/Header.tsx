'use client'

/* GEO: Header navigation with semantic nav landmarks and aria-current for AI understanding */
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import {
  PhoneIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
  MapPinIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'
import { BUSINESS_INFO } from '@/lib/config'

const navItems = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/services', label: 'Services', icon: WrenchScrewdriverIcon },
  { href: '/service-areas', label: 'Service Areas', icon: MapPinIcon },
  { href: '/guides', label: 'Guides', icon: BookOpenIcon },
  { href: '/about', label: 'About', icon: InformationCircleIcon },
  { href: '/contact', label: 'Contact', icon: EnvelopeIcon }
]

const MENU_ID = 'mobile-menu'

// Shared by the desktop nav and the mobile menu so both stay in step.
const linkTone = (isActive: boolean) =>
  isActive
    ? 'text-evergreen-300 bg-evergreen-950/40'
    : 'text-charcoal-100 hover:text-evergreen-300 hover:bg-charcoal-800/50'

const ctaBase =
  'relative inline-flex items-center justify-center box-border select-none whitespace-nowrap overflow-hidden bg-gradient-to-r from-evergreen-600 to-evergreen-700 font-bold text-white shadow-lg shadow-evergreen-900/50 outline-solid outline-transparent focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-evergreen-600 focus-visible:outline-offset-2 transition-[transform,opacity] hover:opacity-90 active:scale-[0.97] motion-reduce:transition-none'

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuPath, setMenuPath] = useState(pathname)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Close the menu when the route changes (back/forward, any link). Adjusting
  // state while rendering is React's recommended alternative to an effect that
  // resets it, and avoids a frame of the stale open menu.
  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setIsMenuOpen(false)
  }

  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    if (!isMenuOpen) return

    // Escape closes the menu and hands focus back to the toggle.
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setIsMenuOpen(false)
      toggleRef.current?.focus()
    }
    // The menu is mobile-only: close it if the viewport grows to desktop.
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMenuOpen(false)
    }
    // Lock page scroll behind the full-screen menu.
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'

    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onBreakpoint)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onBreakpoint)
      root.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  return (
    <nav
      className={`flex z-40 w-full h-auto items-center justify-center sticky top-0 inset-x-0 backdrop-saturate-150 bg-charcoal-900/95 ${
        isMenuOpen ? 'backdrop-blur-xl' : 'backdrop-blur-md border-b border-evergreen-900/20'
      }`}
      aria-label="Main navigation"
    >
      <div className="z-40 flex gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-16 max-w-[1280px] px-4 sm:px-6">
        {/* Left section with menu toggle and brand - using div to avoid ul/li accessibility issue */}
        <div className="flex items-center gap-2 lg:basis-0 lg:grow lg:justify-start">
          <button
            ref={toggleRef}
            type="button"
            className="group flex items-center justify-center rounded-lg outline-solid outline-transparent focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-evergreen-600 focus-visible:outline-offset-2 lg:hidden text-charcoal-100 h-11 w-11 min-w-11"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls={MENU_ID}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {/* Two bars that cross into an X while the menu is open */}
            <span
              aria-hidden="true"
              className="w-full h-full pointer-events-none flex flex-col items-center justify-center text-inherit before:content-[''] before:block before:h-px before:w-6 before:bg-current before:transition-transform before:duration-150 before:motion-reduce:transition-none before:-translate-y-1 after:content-[''] after:block after:h-px after:w-6 after:bg-current after:transition-transform after:duration-150 after:motion-reduce:transition-none after:translate-y-1 group-aria-expanded:before:translate-y-px group-aria-expanded:before:rotate-45 group-aria-expanded:after:translate-y-0 group-aria-expanded:after:-rotate-45"
            />
          </button>
          <div className="flex basis-0 flex-row flex-grow flex-nowrap justify-start bg-transparent items-center no-underline text-base whitespace-nowrap box-border lg:justify-start lg:max-w-fit">
            <Link href="/" className="flex items-center gap-3 group" aria-label="Barker Tree Services home page">
              <div className="relative transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/logo1.svg"
                  alt="Barker Tree Services Logo"
                  width={48}
                  height={48}
                  className="h-10 w-10 lg:h-12 lg:w-12"
                  priority
                />
              </div>
              <div className="flex flex-col transition-all duration-300 group-hover:translate-x-1">
                <span className="text-xl lg:text-2xl font-bold tracking-tight bg-gradient-to-r from-evergreen-300 via-evergreen-200 to-sage-300 bg-clip-text text-transparent leading-tight">
                  BARKER
                </span>
                <span className="text-xs lg:text-sm font-semibold tracking-wider text-charcoal-100 uppercase -mt-1">
                   Tree Services
                 </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Center navigation - proper ul/li structure for accessibility */}
        <ul className="hidden lg:flex gap-1 lg:basis-0 lg:grow lg:justify-center list-none m-0 p-0" role="list">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.href} role="listitem">
                <Link
                  href={item.href}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${linkTone(isActive)}`}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`Navigate to ${item.label}`}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? 'text-evergreen-300' : 'text-sage-300'
                  }`} aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right section with CTA - using div to avoid ul/li accessibility issue */}
        <div className="flex items-center lg:basis-0 lg:grow lg:justify-end">
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className={`${ctaBase} px-3 min-w-16 text-xs gap-2 rounded-lg hover:from-evergreen-500 hover:to-evergreen-600 h-11`}
            aria-label="Call Barker Tree Services now"
          >
            <PhoneIcon className="w-4 h-4 lg:w-5 lg:h-5" aria-hidden="true" />
            <span className="hidden sm:inline">Call Now</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </div>

      {/* Mobile menu: only mounted while open, so closed pages don't ship a
          second copy of every link */}
      {isMenuOpen && (
        <ul
          id={MENU_ID}
          className="animate-menu-in motion-reduce:animate-none z-30 px-6 fixed flex max-w-full top-16 inset-x-0 bottom-0 w-screen h-[calc(100vh-4rem)] flex-col gap-2 overflow-y-auto list-none m-0 backdrop-saturate-150 bg-charcoal-900/98 backdrop-blur-xl border-r border-evergreen-900/20 pt-6 lg:hidden"
        >
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-semibold text-base transition-all duration-200 ${linkTone(isActive)}`}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`Navigate to ${item.label}`}
                >
                  <Icon className={`w-6 h-6 ${
                    isActive ? 'text-evergreen-300' : 'text-sage-300'
                  }`} aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
          <li>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              onClick={closeMenu}
              className={`${ctaBase} px-6 min-w-24 h-12 text-base gap-3 rounded-[14px] w-full mt-4`}
              aria-label="Call Barker Tree Services"
            >
              <PhoneIcon className="w-5 h-5" aria-hidden="true" />
              {BUSINESS_INFO.phone}
            </a>
          </li>
        </ul>
      )}
    </nav>
  )
}
