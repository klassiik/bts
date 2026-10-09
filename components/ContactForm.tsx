'use client'

/* GEO: Contact form with semantic HTML and ARIA labels for accessibility and AI extraction */
import { PaperAirplaneIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const services = [
  { key: 'trimming', label: 'Tree Trimming' },
  { key: 'removal', label: 'Tree Removal' },
  { key: 'stump', label: 'Stump Removal' },
  { key: 'emergency', label: 'Emergency Services' }
]

const MAX_DETAILS_LENGTH = 2000
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || ''

// Field chrome carried over from the old HeroUI inputs: a 2px bordered box
// with a small label pinned above the value (every field has a placeholder, so
// the label always sits in its "floated" position). The border lightens on
// hover and turns white while the field has focus.
const fieldBox =
  'relative flex w-full flex-col items-start justify-center rounded-xl border-2 border-evergreen-700/30 bg-charcoal-900/50 px-3 py-2 shadow-xs transition-colors duration-150 motion-reduce:transition-none hover:border-evergreen-500/50 focus-within:border-white focus-within:hover:border-white'
const fieldLabel =
  "block max-w-full overflow-hidden text-ellipsis pe-2 text-sm text-[#d4d4d8] origin-top-left scale-[0.85] after:content-['*'] after:ms-0.5 after:text-[#f31260]"
const floatedLabel = `${fieldLabel} absolute left-3 top-[7px]`
const fieldControl =
  'w-full bg-transparent bg-clip-text font-normal text-sm text-charcoal-50 placeholder:text-[#71717a] outline-2 outline-transparent autofill:bg-transparent autofill:[-webkit-text-fill-color:#e6e6e7]'

function validateForm(data: { name: string; phone: string; email: string; service: string; details: string }) {
  const phoneDigits = (data.phone || '').replace(/\D/g, '')
  if (!data.name || data.name.trim().length < 2) return 'Please enter your name (2+ characters).'
  if (phoneDigits.length < 10) return 'Please enter a valid phone number with at least 10 digits.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'Please enter a valid email address.'
  if (!data.service) return 'Please select a service.'
  if (data.details && data.details.length > MAX_DETAILS_LENGTH) return 'Details are too long.'
  return ''
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: (formData.get('name') as string)?.trim() || '',
      phone: (formData.get('phone') as string)?.trim() || '',
      email: (formData.get('email') as string)?.trim() || '',
      service: (formData.get('service') as string) || '',
      details: (formData.get('details') as string)?.trim() || '',
      honeypot: (formData.get('company') as string)?.trim() || ''
    }

    if (data.honeypot) {
      setIsSubmitting(false)
      return
    }

    const validationError = validateForm(data)
    if (validationError) {
      setSubmitStatus('error')
      setErrorMessage(validationError)
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Free Estimate Request - ${data.service}`,
          from_name: 'Barker Tree Services Website',
          name: data.name,
          phone: data.phone,
          email: data.email,
          service: data.service,
          message: data.details || 'No additional details provided.',
          replyto: data.email,
          botcheck: data.honeypot,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error('Failed to send message')
      }

      setSubmitStatus('success')
      ;(e.target as HTMLFormElement).reset()

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setErrorMessage('Failed to send message. Please try calling us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="flex flex-col relative overflow-hidden h-auto box-border rounded-[14px] shadow-[0px_0px_15px_0px_#0000000f,0px_2px_30px_0px_#00000038,inset_0px_0px_1px_0px_#ffffff26] text-[#e6e6e7] bg-gradient-to-br from-evergreen-950/80 to-evergreen-900/50 border border-evergreen-700/30"
      role="form"
      aria-label="Request free estimate form"
    >
      <div className="flex w-full justify-start items-center shrink-0 pb-0 pt-8 px-8">
        <h2 className="text-3xl font-bold text-evergreen-300">Request Free Estimate</h2>
      </div>
      <div className="relative flex w-full flex-auto flex-col p-8 pt-6 text-left break-words">
        {/* GEO: Form with semantic fieldset structure for AI understanding */}
        <form className="space-y-4" aria-label="Contact form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
          <div className={`${fieldBox} h-14 justify-end`}>
            <label htmlFor="contact-name" className={floatedLabel}>Your Name</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="John Doe"
              required
              maxLength={100}
              className={fieldControl}
            />
          </div>
          <div className={`${fieldBox} h-14 justify-end`}>
            <label htmlFor="contact-phone" className={floatedLabel}>Phone Number</label>
            <input
              id="contact-phone"
              type="tel"
              name="phone"
              placeholder="(530) 555-0123"
              required
              maxLength={25}
              inputMode="tel"
              className={fieldControl}
            />
          </div>
          <div className={`${fieldBox} h-14 justify-end`}>
            <label htmlFor="contact-email" className={floatedLabel}>Email Address</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              maxLength={150}
              className={fieldControl}
            />
          </div>
          <div className={`${fieldBox} h-14`}>
            <label htmlFor="contact-service" className={`${floatedLabel} z-10 pointer-events-none`}>Service Needed</label>
            {/* The native select fills the whole box so a click anywhere opens it */}
            <select
              id="contact-service"
              name="service"
              required
              defaultValue=""
              className="absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-[10px] bg-transparent pb-2 pe-10 ps-3 pt-6 font-normal text-sm text-charcoal-50 outline-2 outline-transparent"
            >
              <option value="" disabled>Select a service</option>
              {services.map((service) => (
                <option key={service.key} value={service.key}>{service.label}</option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              fill="none"
              focusable="false"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="pointer-events-none absolute end-3 top-[18px] h-4 w-4"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          <div className={fieldBox}>
            <label htmlFor="contact-details" className={`${fieldLabel} pb-0.5 after:content-none`}>Project Details</label>
            <textarea
              id="contact-details"
              name="details"
              rows={4}
              placeholder="Describe your needs..."
              maxLength={MAX_DETAILS_LENGTH}
              className={`${fieldControl} min-h-20 max-h-40 resize-none field-sizing-content`}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || submitStatus === 'success'}
            className="relative inline-flex w-full h-12 min-w-24 items-center justify-center gap-3 overflow-hidden rounded-[14px] px-6 text-base font-bold bg-charcoal-50 text-evergreen-900 shadow-lg hover:bg-white outline-solid outline-transparent focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 transition-[transform,opacity] enabled:hover:opacity-90 enabled:active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none"
            aria-label="Submit contact form to request estimate"
          >
            {isSubmitting ? (
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
              </svg>
            ) : submitStatus === 'success' ? <CheckCircleIcon className="w-5 h-5" aria-hidden="true" /> :
              submitStatus === 'error' ? <ExclamationCircleIcon className="w-5 h-5" aria-hidden="true" /> :
              <PaperAirplaneIcon className="w-5 h-5" aria-hidden="true" />}
            {submitStatus === 'success' ? 'Message Sent Successfully!' :
             submitStatus === 'error' ? 'Send Failed' :
             isSubmitting ? 'Sending...' : 'Send Estimate Request'}
          </button>
          {submitStatus === 'success' && (
            <p className="text-center text-evergreen-300 text-sm font-semibold" role="status">
              ✓ We&apos;ll contact you within 24 hours!
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="text-center text-red-400 text-sm" role="alert">
              {errorMessage || 'Please try again or call us directly.'}
            </p>
          )}
          {submitStatus === 'idle' && (
            <p className="text-center text-evergreen-300/70 text-sm" role="note">
              We&apos;ll respond to your inquiry within 24 hours
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
