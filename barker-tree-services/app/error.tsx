'use client'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-emerald-900 mb-4">500</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-8">We encountered an unexpected error. Please try again.</p>
        <button onClick={reset} className="inline-flex items-center gap-2 bg-emerald-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition">
          Try again
        </button>
      </div>
    </div>
  )
}
