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

// Rate limiting configuration
const RATE_LIMIT = new Map<string, { count: number, lastReset: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 5 // Max requests per minute

export async function POST(request: Request) {
  try {
    // Rate limiting check
    const clientIP = request.headers.get('x-forwarded-for') || '127.0.0.1'
    const currentTime = Date.now()
    
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
    const sanitizedDetails = details ? purify.sanitize(details) : 'No additional details provided.'

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Barker Tree Services Website <onboarding@resend.dev>',
      to: ['jacob@barkertreeservices.com'],
      replyTo: email,
      subject: `Free Estimate Request - ${service}`,
      html: `
        <h2>New Free Estimate Request</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service Needed:</strong> ${service}</p>
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
