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
  preload = 'metadata',
  className,
  children,
  ...rest
}: VideoProps) {
  return (
    <video
      src={src}
      poster={poster}
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
