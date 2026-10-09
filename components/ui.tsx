import { ReactNode, AnchorHTMLAttributes, HTMLAttributes } from 'react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

// Plain, server-safe card/chip/button primitives. They replaced HeroUI
// (@heroui/react + framer-motion), which cost hundreds of ms of INP/TBT in
// Lighthouse on static pages; these render with zero client JavaScript.

type ButtonLinkProps = {
  href: string
  className?: string
  variant?: 'solid' | 'bordered'
  startContent?: ReactNode
  children: ReactNode
} & AnchorHTMLAttributes<HTMLAnchorElement>

export function ButtonLink({ href, className, variant = 'solid', startContent, children, ...rest }: ButtonLinkProps) {
  const classes = twMerge(
    // min-h-12 keeps every CTA at/above the 44px touch-target minimum;
    // whitespace-normal + max-w-full lets long labels wrap instead of
    // overflowing narrow viewports
    'inline-flex items-center justify-center gap-3 rounded-xl px-6 py-2 min-h-12 font-medium text-center whitespace-normal max-w-full transition-all hover:opacity-90 active:scale-[0.98]',
    variant === 'bordered' && 'border-2 bg-transparent',
    className
  )

  // Route internal hrefs through next/link so they keep prefetch and soft
  // navigation; tel:/mailto:/external stay plain anchors. Link renders fine
  // from a server component, so this costs no extra client JS.
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={classes} {...rest}>
        {startContent}
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className={classes} {...rest}>
      {startContent}
      {children}
    </a>
  )
}

type DivProps = { className?: string; children: ReactNode } & HTMLAttributes<HTMLDivElement>

export function StaticCard({ className, children, ...rest }: DivProps) {
  return (
    <div className={twMerge('flex flex-col relative overflow-hidden rounded-2xl shadow-md', className)} {...rest}>
      {children}
    </div>
  )
}

// A whole-card link (tel:/mailto:) that looks like StaticCard. Focus ring and
// press feedback match the other interactive controls on the site.
type CardLinkProps = { href: string; className?: string; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>

export function StaticCardLink({ href, className, children, ...rest }: CardLinkProps) {
  return (
    <a
      href={href}
      className={twMerge(
        'flex flex-col relative overflow-hidden rounded-2xl shadow-md cursor-pointer outline-solid outline-transparent focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-evergreen-600 focus-visible:outline-offset-2 active:scale-[0.97] motion-reduce:transition-none',
        className
      )}
      {...rest}
    >
      {children}
    </a>
  )
}

export function StaticCardBody({ className, children, ...rest }: DivProps) {
  return (
    <div className={twMerge('relative flex w-full flex-auto flex-col', className)} {...rest}>
      {children}
    </div>
  )
}

type ChipProps = {
  className?: string
  variant?: string
  size?: string
  startContent?: ReactNode
  children: ReactNode
} & HTMLAttributes<HTMLSpanElement>

export function StaticChip({ className, variant: _v, size: _s, startContent, children, ...rest }: ChipProps) {
  return (
    <span
      className={twMerge('inline-flex items-center gap-1.5 rounded-full border border-transparent px-3 py-1 text-sm', className)}
      {...rest}
    >
      {startContent}
      {children}
    </span>
  )
}
