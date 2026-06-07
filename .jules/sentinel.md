## 2025-06-07 - Mitigated JSON-LD XSS via securely stringifying JSON-LD script tags
**Vulnerability:** Used `dangerouslySetInnerHTML` directly with `JSON.stringify` on objects containing dynamically generated data. By doing so, an attacker could potentially break out of the script context with a malicious payload like `</script><script>alert(1)</script>`.
**Learning:** React elements inserted via `dangerouslySetInnerHTML` within script tags are rendered essentially without escaping HTML characters unless we properly serialize it. This pattern was visible in several route files under `app`.
**Prevention:** Ensured the use of a robust JSON-LD serialization utility like `JSON.stringify(value).replace(/<\/script>/gi, '<\\/script>')` across all points of usage.
