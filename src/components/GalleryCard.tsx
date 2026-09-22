import { useState } from 'react';
import { thumbUrl, type Photo } from '../data/photos';
import { Expand, Heart } from './Icons';

interface Props {
  photo: Photo;
  index: number;
  tone: string;
  masonry: boolean;
  liked: boolean;
  onToggleLike: (id: number) => void;
  onOpen: (id: number) => void;
}

export default function GalleryCard({ photo, index, tone, masonry, liked, onToggleLike, onOpen }: Props) {
  const [loaded, setLoaded] = useState(false);

  const ratio = masonry
    ? photo.orientation === 'portrait'
      ? 'aspect-[3/4]'
      : 'aspect-[4/3]'
    : 'aspect-square';

  return (
    <figure
      className="animate-fade-up group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)]"
      style={{ animationDelay: `${Math.min(index, 14) * 45}ms` }}
    >
      <button
        type="button"
        onClick={() => onOpen(photo.id)}
        aria-label={`Open ${photo.title} in lightbox`}
        className={`relative block w-full ${ratio} cursor-zoom-in overflow-hidden`}
      >
        {!loaded && <div className="skeleton absolute inset-0" />}
        <img
          src={thumbUrl(photo.id, 760)}
          alt={photo.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{ filter: tone }}
          className={`h-full w-full object-cover transition-[transform,opacity,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* gradient veil */}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />

        {/* shine sweep */}
        <span className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 group-hover:left-[115%] group-hover:opacity-100" />

        {/* caption */}
        <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fuchsia-300/90">
            {photo.category}
          </p>
          <h3 className="mt-1 font-display text-base font-semibold leading-tight text-white sm:text-lg">
            {photo.title}
          </h3>
          <p className="mt-0.5 text-xs text-white/60">by {photo.author}</p>
        </figcaption>

        <span className="pointer-events-none absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <Expand className="h-4 w-4" />
        </span>
      </button>

      <button
        type="button"
        onClick={() => onToggleLike(photo.id)}
        aria-label={liked ? 'Remove from favourites' : 'Add to favourites'}
        className={`absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-500 ${
          liked
            ? 'border-rose-400/60 bg-rose-500/25 text-rose-300 opacity-100'
            : 'translate-y-2 border-white/25 bg-black/40 text-white/80 opacity-0 hover:text-rose-300 group-hover:translate-y-0 group-hover:opacity-100'
        }`}
      >
        <Heart filled={liked} className="h-4 w-4" />
      </button>

      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 transition duration-500 group-hover:ring-fuchsia-400/40" />
    </figure>
  );
}
