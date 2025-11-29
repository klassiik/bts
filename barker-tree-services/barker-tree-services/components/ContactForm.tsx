'use client'

/* GEO: Contact form with semantic HTML and ARIA labels for accessibility and AI extraction */
import { BUSINESS_INFO } from '@/lib/config'
import { Card, CardBody, CardHeader, Button, Input, Textarea, Select, SelectItem } from '@heroui/react'
import { PaperAirplaneIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const services = [
  { key: 'trimming', label: 'Tree Trimming' },
  { key: 'removal', label: 'Tree Removal' },
  { key: 'stump', label: 'Stump Removal' },
  { key: 'emergency', label: 'Emergency Services' }
]

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
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      service: formData.get('service') as string,
      details: formData.get('details') as string
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
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
    <Card className="bg-gradient-to-br from-evergreen-950/80 to-evergreen-900/50 border border-evergreen-700/30" role="form" aria-label="Request free estimate form">
      <CardHeader className="pb-0 pt-8 px-8">
        <h2 className="text-3xl font-bold text-evergreen-300">Request Free Estimate</h2>
      </CardHeader>
      <CardBody className="p-8 pt-6">
        {/* GEO: Form with semantic fieldset structure for AI understanding */}
        <form className="space-y-4" aria-label="Contact form" onSubmit={handleSubmit}>
          <Input 
            type="text" 
            label="Your Name"
            placeholder="John Doe" 
            variant="bordered"
            name="name"
            isRequired
            aria-label="Enter your full name"
            aria-required="true"
            classNames={{
              input: "text-charcoal-50",
              inputWrapper: "border-evergreen-700/30 bg-charcoal-900/50 hover:border-evergreen-500/50 data-[hover=true]:border-evergreen-500/50",
              label: "text-evergreen-300"
            }}
          />
          <Input 
            type="tel" 
            label="Phone Number"
            placeholder="(530) 555-0123" 
            variant="bordered"
            name="phone"
            isRequired
            aria-label="Enter your phone number"
            aria-required="true"
            classNames={{
              input: "text-charcoal-50",
              inputWrapper: "border-evergreen-700/30 bg-charcoal-900/50 hover:border-evergreen-500/50 data-[hover=true]:border-evergreen-500/50",
              label: "text-evergreen-300"
            }}
          />
          <Input 
            type="email" 
            label="Email Address"
            placeholder="you@example.com" 
            variant="bordered"
            name="email"
            isRequired
            aria-label="Enter your email address"
            classNames={{
              input: "text-charcoal-50",
              inputWrapper: "border-evergreen-700/30 bg-charcoal-900/50 hover:border-evergreen-500/50 data-[hover=true]:border-evergreen-500/50",
              label: "text-evergreen-300"
            }}
          />
          <Select 
            label="Service Needed"
            placeholder="Select a service"
            variant="bordered"
            name="service"
            isRequired
            aria-label="Select the service you need"
            aria-required="true"
            classNames={{
              trigger: "border-evergreen-700/30 bg-charcoal-900/50 hover:border-evergreen-500/50 data-[hover=true]:border-evergreen-500/50",
              label: "text-evergreen-300",
              value: "text-charcoal-50"
            }}
          >
            {services.map((service) => (
              <SelectItem key={service.key} aria-label={service.label}>
                {service.label}
              </SelectItem>
            ))}
          </Select>
          <Textarea 
            label="Project Details"
            placeholder="Describe your needs..." 
            variant="bordered"
            minRows={4}
            name="details"
            aria-label="Describe your project details"
            classNames={{
              input: "text-charcoal-50",
              inputWrapper: "border-evergreen-700/30 bg-charcoal-900/50 hover:border-evergreen-500/50 data-[hover=true]:border-evergreen-500/50",
              label: "text-evergreen-300"
            }}
          />
          <Button 
            type="submit"
            className="w-full bg-charcoal-50 text-evergreen-900 font-bold shadow-lg hover:bg-white transition"
            size="lg"
            isLoading={isSubmitting}
            isDisabled={submitStatus === 'success'}
            startContent={
              submitStatus === 'success' ? <CheckCircleIcon className="w-5 h-5" aria-hidden="true" /> :
              submitStatus === 'error' ? <ExclamationCircleIcon className="w-5 h-5" aria-hidden="true" /> :
              !isSubmitting ? <PaperAirplaneIcon className="w-5 h-5" aria-hidden="true" /> : null
            }
            aria-label="Submit contact form to request estimate"
          >
            {submitStatus === 'success' ? 'Message Sent Successfully!' :
             submitStatus === 'error' ? 'Send Failed' :
             isSubmitting ? 'Sending...' : 'Send Estimate Request'}
          </Button>
          {submitStatus === 'success' && (
            <p className="text-center text-evergreen-400 text-sm font-semibold" role="status">
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
      </CardBody>
    </Card>
  )
}