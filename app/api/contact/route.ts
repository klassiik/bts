import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import { ContactSchema } from '@/lib/schema'

// Configure DOM Purify
const window = new JSDOM('').window
const purify = DOMPurify(window)

// Validate environment configuration
if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable')
}

const resend = new Resend(process.env.RESEND_API_KEY)

// Rate limiting configuration (per-IP, in-memory)
const RATE_LIMIT = new Map<string, { count: number, lastReset: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 5 // Max requests per minute
const MAX_MAP_SIZE = 10000 // Max entries to prevent OOM

const truncate = (value: string | undefined, max = 2000) => (value || '').slice(0, max)
const sanitizeText = (value: string | undefined) => purify.sanitize(truncate(value, 2000))

export async function POST(request: Request) {
  try {
    // Rate limiting check
    const forwardedFor = request.headers.get('x-forwarded-for')
    // Use the right-most IP in X-Forwarded-For if present, or fallback to X-Real-IP to prevent IP spoofing
    const forwardedIps = forwardedFor ? forwardedFor.split(',').map(ip => ip.trim()) : []
    const clientIP = request.headers.get('x-real-ip') || (forwardedIps.length > 0 ? forwardedIps[forwardedIps.length - 1] : '127.0.0.1')
    const currentTime = Date.now()
    
    // Periodically clean up the rate limiting map if it gets too large
    if (RATE_LIMIT.size > MAX_MAP_SIZE) {
      // Clear all entries that are past their window
      for (const [key, val] of RATE_LIMIT.entries()) {
        if (currentTime - val.lastReset > RATE_LIMIT_WINDOW) {
          RATE_LIMIT.delete(key)
        }
      }

      // If it's still too large, just clear it all to prevent OOM
      if (RATE_LIMIT.size > MAX_MAP_SIZE) {
        RATE_LIMIT.clear()
      }
    }

    if (!RATE_LIMIT.has(clientIP)) {
      RATE_LIMIT.set(clientIP, { count: 1, lastReset: currentTime })
    } else {
      const record = RATE_LIMIT.get(clientIP)!
      if (currentTime - record.lastReset > RATE_LIMIT_WINDOW) {
        record.count = 1
        record.lastReset = currentTime
      } else if (record.count >= MAX_REQUESTS) {
        return NextResponse.json(
          { error: 'Too many requests, please try again later' },
          { status: 429 }
        )
      } else {
        record.count += 1
      }
    }

    const body = await request.json()
    
    // Validate request body with Zod schema
    const result = ContactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: result.error.issues },
        { status: 400 }
      )
    }
    
    const { name, phone, email, service, details } = result.data

    // Sanitize user input
    const sanitizedDetails = details ? sanitizeText(details) : 'No additional details provided.'
    const safeName = sanitizeText(name)
    const safePhone = sanitizeText(phone)
    const safeEmail = sanitizeText(email)
    const safeService = sanitizeText(service)

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Barker Tree Services Website <onboarding@resend.dev>',
      to: ['jacob@barkertreeservices.com'],
      replyTo: safeEmail,
      subject: `Free Estimate Request - ${safeService}`,
      html: `
        <h2>New Free Estimate Request</h2>
        <p><strong>From:</strong> ${safeName}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Service Needed:</strong> ${safeService}</p>
        <h3>Project Details:</h3>
        <p>${sanitizedDetails}</p>
        <hr />
        <p><em>This message was sent from the Barker Tree Services contact form.</em></p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
