'use client'

import { useState, useEffect } from 'react'
import { PhoneIcon } from '@heroicons/react/24/outline'
import { BUSINESS_INFO } from '@/lib/config'

// One tap to call. The number label only shows from md up: on phones it
// covered page content, and the sticky header already carries a Call button.
export default function FloatingContactButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300)
    toggleVisibility()
    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  if (!isVisible) return null

  return (
    <a
      href={`tel:${BUSINESS_INFO.phoneRaw}`}
      aria-label={`Call Barker Tree Services at ${BUSINESS_INFO.phone}`}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group focus-visible:outline-none"
    >
      <span className="hidden md:inline-block bg-charcoal-800 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
        Call {BUSINESS_INFO.phone}
      </span>
      <span className="flex w-14 h-14 items-center justify-center rounded-full shadow-xl bg-gradient-to-r from-evergreen-600 to-evergreen-700 group-hover:from-evergreen-500 group-hover:to-evergreen-600 transition-colors group-focus-visible:ring-2 group-focus-visible:ring-evergreen-300 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-charcoal-950">
        <PhoneIcon className="w-6 h-6 text-white" aria-hidden="true" />
      </span>
    </a>
  )
}
