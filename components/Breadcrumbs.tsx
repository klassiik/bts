import Link from 'next/link'

export interface Crumb {
  name: string
  path: string
}

// Visible trail for pages that also emit BreadcrumbList schema. Pass the same
// array to generateBreadcrumbSchema so the markup always matches what's shown.
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm">
      <ol className="flex flex-wrap items-center gap-x-2 text-charcoal-300">
        {items.map((item, i) => {
          const isCurrent = i === items.length - 1
          return (
            <li key={item.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">›</span>}
              {isCurrent ? (
                <span aria-current="page" className="text-charcoal-100">{item.name}</span>
              ) : (
                <Link
                  href={item.path}
                  className="inline-block py-1 underline-offset-2 hover:text-evergreen-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-evergreen-400 rounded"
                >
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
