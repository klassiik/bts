// Real job-site photos (owner-provided). Filenames are descriptive for
// image SEO; alt text describes what is actually shown. Source stills are
// 450x600 — suitable for gallery cards; swap in full-resolution exports
// before using any of these larger than ~450px wide.
export interface WorkPhoto {
  src: string
  alt: string
  caption: string
  /** SERVICES ids this photo illustrates */
  services: string[]
  width: number
  height: number
}

export const WORK_PHOTOS: WorkPhoto[] = [
  {
    src: '/images/work/pine-removal-before.png',
    alt: 'Two declining pines standing over a wooded cabin before removal',
    caption: 'Declining pines over a cabin — before removal',
    services: ['removal'],
    width: 450,
    height: 600
  },
  {
    src: '/images/work/pine-removal-line-set.png',
    alt: 'Climbing line set high in a dead pine above a cabin at the start of a sectional removal',
    caption: 'Line set — starting a sectional removal',
    services: ['removal'],
    width: 450,
    height: 600
  },
  {
    src: '/images/work/pine-removal-spar-top.png',
    alt: 'Arborist working at the top of a limbed pine spar with rigging lines during sectional removal',
    caption: 'Taking the spar down in sections',
    services: ['removal', 'emergency'],
    width: 450,
    height: 600
  },
  {
    src: '/images/work/pine-removal-spar-work.png',
    alt: 'Climber secured at the top of a fully limbed pine spar during tree removal',
    caption: 'Topping out a limbed spar',
    services: ['removal'],
    width: 450,
    height: 600
  },
  {
    src: '/images/work/oak-limb-rigging.png',
    alt: 'Climber rigging limbs out of a mature oak over a lawn near a home',
    caption: 'Rigging oak limbs safely over a lawn',
    services: ['trimming'],
    width: 450,
    height: 600
  },
  {
    src: '/images/work/pine-removal-cleanup.png',
    alt: 'Felled pine bucked into rounds on a green pasture during site cleanup',
    caption: 'Bucking and cleanup after a removal',
    services: ['removal', 'stump'],
    width: 450,
    height: 600
  }
]

export function getWorkPhotosForService(serviceId: string): WorkPhoto[] {
  return WORK_PHOTOS.filter(p => p.services.includes(serviceId))
}
