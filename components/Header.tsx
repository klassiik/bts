'use client'

/* GEO: Header navigation with semantic nav landmarks and aria-current for AI understanding */
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react"
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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      classNames={{
        base: "bg-charcoal-900/95 backdrop-blur-md border-b border-evergreen-900/20",
        wrapper: "px-4 sm:px-6",
        item: "data-[active=true]:text-evergreen-300"
      }}
      as="nav"
      aria-label="Main navigation"
    >
      {/* Left section with menu toggle and brand - using div to avoid ul/li accessibility issue */}
      <div className="flex items-center gap-2 lg:basis-0 lg:grow lg:justify-start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden text-charcoal-100 h-11 w-11 min-w-11"
        />
        <NavbarBrand className="lg:justify-start lg:max-w-fit">
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
        </NavbarBrand>
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
                className={`group flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  isActive
                    ? 'text-evergreen-300 bg-evergreen-950/40'
                    : 'text-charcoal-100 hover:text-evergreen-300 hover:bg-charcoal-800/50'
                }`}
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
        <Button
          as="a"
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          color="primary"
          variant="shadow"
          size="sm"
          className="bg-gradient-to-r from-evergreen-600 to-evergreen-700 hover:from-evergreen-500 hover:to-evergreen-600 font-bold text-white shadow-lg shadow-evergreen-900/50 h-11"
          startContent={<PhoneIcon className="w-4 h-4 lg:w-5 lg:h-5" aria-hidden="true" />}
          aria-label="Call Barker Tree Services now"
        >
          <span className="hidden sm:inline">Call Now</span>
          <span className="sm:hidden">Call</span>
        </Button>
      </div>

      <NavbarMenu className="bg-charcoal-900/98 backdrop-blur-xl border-r border-evergreen-900/20 pt-6">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <NavbarMenuItem key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-semibold text-base transition-all duration-200 ${
                  isActive
                    ? 'text-evergreen-300 bg-evergreen-950/40'
                    : 'text-charcoal-100 hover:text-evergreen-300 hover:bg-charcoal-800/50'
                }`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Navigate to ${item.label}`}
              >
                <Icon className={`w-6 h-6 ${
                  isActive ? 'text-evergreen-300' : 'text-sage-300'
                }`} aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            </NavbarMenuItem>
          )
        })}
        <NavbarMenuItem>
          <Button
            as="a"
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            color="primary"
            variant="shadow"
            fullWidth
            size="lg"
            startContent={<PhoneIcon className="w-5 h-5" aria-hidden="true" />}
            className="mt-4 bg-gradient-to-r from-evergreen-600 to-evergreen-700 font-bold text-white shadow-lg shadow-evergreen-900/50"
            aria-label="Call Barker Tree Services"
          >
            {BUSINESS_INFO.phone}
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}
