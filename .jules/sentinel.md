## 2024-06-05 - [DoS / OOM] Unbounded Rate Limit Map and IP Spoofing
**Vulnerability:** The API contact endpoint used an unbounded in-memory `Map` for rate limiting, keyed by IP address. The IP was incorrectly extracted using the leftmost value of `X-Forwarded-For`.
**Learning:** Attackers can trivially spoof `X-Forwarded-For` with random IPs on every request, filling up the unbounded `Map` and causing an Out-of-Memory (OOM) crash, resulting in a Denial of Service.
**Prevention:** Always bound the size of in-memory maps or caches used for rate limiting (e.g., clearing or evicting old entries when the map size exceeds a threshold). Properly extract the client IP (using `x-real-ip` or validating proxy chains) to prevent simple spoofing.
