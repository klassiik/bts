import Image from 'next/image'
import { WorkPhoto } from '@/lib/workGallery'

export default function WorkGallery({
  photos,
  columns = 3
}: {
  photos: WorkPhoto[]
  columns?: 2 | 3
}) {
  if (photos.length === 0) return null
  // Two across even on phones: full-width 3:4 photos made the mobile homepage ~11k px tall
  const gridCols = columns === 2 ? '' : 'lg:grid-cols-3'

  return (
    <div className={`grid grid-cols-2 ${gridCols} gap-3 sm:gap-6`} role="list" aria-label="Photos of recent tree work">
      {photos.map((photo) => (
        <figure
          key={photo.src}
          role="listitem"
          className="rounded-lg overflow-hidden border border-evergreen-900/20 bg-charcoal-800/50"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className="w-full h-auto"
            sizes="(max-width: 1024px) 50vw, 33vw"
          />
          <figcaption className="text-charcoal-100 text-xs sm:text-sm p-2 sm:p-3">{photo.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}
