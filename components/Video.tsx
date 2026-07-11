import React from 'react';

export type VideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  src: string;
  poster?: string;
};

export default function Video({
  src,
  poster,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  preload = 'none', // Changed from 'metadata' to 'none' for better performance
  className,
  children,
  ...rest
}: VideoProps) {
  // sync-media.mjs emits a WebP poster next to every optimized mp4, so the
  // browser has an immediate paint candidate instead of waiting on video bytes
  const resolvedPoster =
    poster ?? (src.endsWith('.mp4') ? src.replace(/\.mp4$/, '.webp') : undefined);
  return (
    <video
      src={src}
      poster={resolvedPoster}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={preload}
      className={className}
      {...rest}
    >
      {/* Fallback source for browsers that ignore src on video */}
      {children ?? <source src={src} type="video/mp4" />}
    </video>
  );
}
