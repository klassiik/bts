import { ReactNode, AnchorHTMLAttributes, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

// Server-safe replacements for the HeroUI primitives on static pages.
// Service, city, and emergency pages have no interactivity, so hydrating
// @heroui/react + framer-motion for them was pure INP cost (Lighthouse
// measured 380-570ms TBT). These render identical-looking markup with
// zero client JavaScript. Interactive pages (Header, forms) keep HeroUI.

type ButtonLinkProps = {
  href: string
  className?: string
  variant?: 'solid' | 'bordered'
  startContent?: ReactNode
  children: ReactNode
} & AnchorHTMLAttributes<HTMLAnchorElement>

export function ButtonLink({ href, className, variant = 'solid', startContent, children, ...rest }: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={twMerge(
        // min-h-12 keeps every CTA at/above the 44px touch-target minimum;
        // whitespace-normal + max-w-full lets long labels wrap instead of
        // overflowing narrow viewports
        'inline-flex items-center justify-center gap-3 rounded-xl px-6 py-2 min-h-12 font-medium text-center whitespace-normal max-w-full transition-all hover:opacity-90 active:scale-[0.98]',
        variant === 'bordered' && 'border-2 bg-transparent',
        className
      )}
      {...rest}
    >
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
