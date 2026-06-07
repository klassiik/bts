## 2024-06-07 - Add missing aria-labels and focus states

**Learning:** Fixed some buttons and links that lacked proper aria-labels and keyboard focus rings. Icon-only buttons and buttons/links with clear visual cues but no text context can be problematic for screen readers. Added focus-visible styles for keyboard navigation in `error.tsx` and `ServiceCard.tsx`.

**Action:** Consistently apply `focus-visible` styles (`focus-visible:ring-2 focus-visible:ring-emerald-500 focus:outline-none`) and `aria-label` attributes to interactive elements, especially those serving as generic links (like "Learn More" in a card) or generic actions (like "Try again" in an error state).
