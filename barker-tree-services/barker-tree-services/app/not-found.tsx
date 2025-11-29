import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-emerald-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-emerald-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-800 transition">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
