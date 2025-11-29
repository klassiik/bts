'use client'

import { useState, useEffect } from 'react'
import { Button } from '@heroui/react'
import { PhoneIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { BUSINESS_INFO } from '@/lib/config'

export default function FloatingContactButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsExpanded(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const handleCall = () => {
    window.location.href = `tel:${BUSINESS_INFO.phoneRaw}`
  }

  const handleEmail = () => {
    window.location.href = `mailto:${BUSINESS_INFO.email}?subject=Tree Service Inquiry&body=Hi, I would like to learn more about your tree services.`
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Quick contact options when expanded */}
      {isExpanded && (
        <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-2">
          {/* Email option */}
          <Button
            isIconOnly
            color="default"
            variant="solid"
            size="lg"
            className="bg-charcoal-800 hover:bg-charcoal-700 text-white shadow-lg backdrop-blur-md"
            onClick={handleEmail}
            aria-label="Email Barker Tree Services"
          >
            ✉️
          </Button>
          
          {/* Call option with full number */}
          <Button
            color="primary"
            variant="solid"
            size="lg"
            className="bg-gradient-to-r from-evergreen-600 to-evergreen-700 hover:from-evergreen-500 hover:to-evergreen-600 text-white shadow-lg backdrop-blur-md whitespace-nowrap px-4"
            onClick={handleCall}
            startContent={<PhoneIcon className="w-5 h-5" aria-hidden="true" />}
            aria-label="Call Barker Tree Services now"
          >
            <span className="text-sm font-bold">{BUSINESS_INFO.phone}</span>
          </Button>
        </div>
      )}

      {/* Main toggle button */}
      <Button
        isIconOnly
        color={isExpanded ? "default" : "primary"}
        variant="solid"
        size="lg"
        className={`w-14 h-14 rounded-full shadow-xl backdrop-blur-md transition-all duration-300 ${
          isExpanded 
            ? 'bg-charcoal-700 hover:bg-charcoal-600' 
            : 'bg-gradient-to-r from-evergreen-600 to-evergreen-700 hover:from-evergreen-500 hover:to-evergreen-600 animate-pulse'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? "Close contact options" : "Open contact options"}
      >
        {isExpanded ? (
          <XMarkIcon className="w-6 h-6 text-white" aria-hidden="true" />
        ) : (
          <PhoneIcon className="w-6 h-6 text-white" aria-hidden="true" />
        )}
      </Button>

      {/* Tooltip */}
      {!isExpanded && (
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-charcoal-800 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-90">
          Call for Emergency Service
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-charcoal-800 border-t-4 border-b-4 border-t-transparent border-b-transparent"></div>
        </div>
      )}
    </div>
  )
}