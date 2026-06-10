## 2024-06-10 - Lazy Load Floating Contact Button
**Learning:** Using `next/dynamic` with `ssr: false` for components that depend on client-side state (like scroll events) and are not needed on initial render can significantly reduce the initial JS bundle size.
**Action:** Always consider using `next/dynamic` for heavy, below-the-fold, or interaction-dependent components like floating action buttons, modals, and tooltips to improve TTI and First Load JS.
