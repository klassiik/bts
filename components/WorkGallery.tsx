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
  const gridCols = columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div className={`grid grid-cols-1 ${gridCols} gap-6`} role="list" aria-label="Photos of recent tree work">
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
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <figcaption className="text-charcoal-100 text-sm p-3">{photo.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}
