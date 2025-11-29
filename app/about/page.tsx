import { generateMetadata as generatePageMetadata } from '@/lib/seo'
import AboutContent from '@/components/AboutContent'

export const metadata = generatePageMetadata({
  title: 'About Us',
  description: 'Learn about Barker Tree Services, our mission, values, and commitment to tree care excellence',
  path: '/about'
})

export default function AboutPage() {
  return <AboutContent />
}
