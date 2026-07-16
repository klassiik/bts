import React from 'react';

export type VideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  src: string;
  poster?: string;
  /** Smaller encode served under 768px. Only the decorative backdrop clips
   *  have one — see getVideoMobileUrl / BACKDROP_CLIPS in sync-media.mjs. */
  mobileSrc?: string;
};

const MOBILE_MEDIA = '(max-width: 767px)';

export default function Video({
  src,
  poster,
  mobileSrc,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  preload = 'none',
  className,
  children,
  ...rest
}: VideoProps) {
  // sync-media.mjs emits a WebP poster next to every optimized mp4, so the
  // browser has an immediate paint candidate instead of waiting on video bytes
  const resolvedPoster =
    poster ?? (src.endsWith('.mp4') ? src.replace(/\.mp4$/, '.webp') : undefined);

  // A `src` attribute on <video> wins outright over any <source> children, so
  // it has to be omitted for the media-based selection below to be consulted
  // at all. Note the browser picks a source once, at load — it won't swap on
  // resize/rotate, which is fine for a decorative backdrop.
  const useSources = Boolean(mobileSrc) || Boolean(children);

  return (
    <video
      {...(useSources ? {} : { src })}
      poster={resolvedPoster}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={preload}
      className={className}
      {...rest}
    >
      {children ?? (
        <>
          {mobileSrc && <source media={MOBILE_MEDIA} src={mobileSrc} type="video/mp4" />}
          <source src={src} type="video/mp4" />
        </>
      )}
    </video>
  );
}
