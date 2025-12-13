import { Star } from 'lucide-react'

interface TestimonialCardProps {
  name: string
  text: string
  rating: number
}

export default function TestimonialCard({ name, text, rating }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl p-8 border border-emerald-100 hover:shadow-lg transition">
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={18} fill="#05472A" className="text-emerald-900" />
        ))}
      </div>
      <p className="text-gray-700 mb-6 italic">&ldquo;{text}&rdquo;</p>
      <p className="font-bold text-emerald-900">{name}</p>
    </div>
  )
}
