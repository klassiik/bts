## 2024-05-18 - HTML Injection in Contact Form Emails
**Vulnerability:** The API endpoint `app/api/contact/route.ts` was using `DOMPurify.sanitize` without restricting allowed tags, allowing an attacker to submit HTML payloads (e.g., links or tracking images) that would be rendered in the email client.
**Learning:** Even when sanitizing user input intended for emails, the default `DOMPurify` configuration may permit safe HTML tags that are still undesirable in plain-text or strictly-formatted email contexts, leading to HTML injection or tracking.
**Prevention:** Always pass `{ ALLOWED_TAGS: [] }` to `DOMPurify.sanitize()` when processing user input that should be strictly plain text, especially before sending it in an email.

## 2024-05-18 - Unbounded In-Memory Map
**Vulnerability:** The rate limiting implementation in `app/api/contact/route.ts` used an unbounded in-memory `Map` keyed by IP address (`X-Forwarded-For`).
**Learning:** An attacker could spoof the `X-Forwarded-For` header with many different IP addresses, causing the `Map` to grow indefinitely and resulting in a Denial of Service (DoS) via memory exhaustion (OOM).
**Prevention:** Implement a maximum size limit for in-memory caches or use a dedicated store like Redis for rate limiting, especially when keys are derived from easily spoofable user inputs like HTTP headers.
