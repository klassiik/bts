interface ServiceCardProps {
  id: string
  title: string
  description: string
  features: string[]
}

export default function ServiceCard({ title, description, features }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl p-8 border-2 border-emerald-100 hover:border-emerald-400 hover:shadow-lg transition">
      <h3 className="text-2xl font-bold text-emerald-900 mb-3">{title}</h3>
      <p className="text-gray-700 mb-6">{description}</p>
      
      <div className="space-y-2 mb-6">
        {features.map(feature => (
          <div key={feature} className="flex items-center gap-2">
            <div className="w-5 h-5 bg-emerald-900 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <span className="text-gray-700 font-semibold text-sm">{feature}</span>
          </div>
        ))}
      </div>

      <a href="/contact" className="inline-flex items-center gap-2 bg-emerald-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-800 transition text-sm">
        Learn More →
      </a>
    </div>
  )
}
