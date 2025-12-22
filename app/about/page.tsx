import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import AboutContent from '@/components/AboutContent'

export const metadata = generatePageMetadata({
  title: 'About Us',
  description: 'Learn about Barker Tree Services, our mission, values, and commitment to expert tree care. Licensed arborists serving Colfax & Northern California since 2018.',
  path: '/about'
})

export default function AboutPage() {
  return <AboutContent />
}
