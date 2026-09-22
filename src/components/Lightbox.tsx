import { useCallback, useEffect, useRef, useState } from 'react';
import { fullUrl, sourceUrl, thumbUrl, type Photo } from '../data/photos';
import { TONES, toneById } from '../data/filters';
import { ChevronLeft, ChevronRight, Close, Heart, Link, Pause, Play, Sliders } from './Icons';

interface Props {
  photos: Photo[];
  index: number;
  toneId: string;
  liked: number[];
  onToneChange: (id: string) => void;
  onToggleLike: (id: number) => void;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}

export default function Lightbox({
  photos,
  index,
  toneId,
  liked,
  onToneChange,
  onToggleLike,
  onIndexChange,
  onClose,
}: Props) {
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showTones, setShowTones] = useState(false);
  const touchX = useRef<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const photo = photos[index];

  const go = useCallback(
    (dir: 'next' | 'prev') => {
      if (photos.length < 2) return;
      setDirection(dir);
      setLoaded(false);
      onIndexChange(dir === 'next' ? (index + 1) % photos.length : (index - 1 + photos.length) % photos.length);
    },
    [index, photos.length, onIndexChange],
  );

  // keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go('next');
      else if (e.key === 'ArrowLeft') go('prev');
      else if (e.key === ' ') {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  // lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // slideshow
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => go('next'), 3200);
    return () => clearInterval(t);
  }, [playing, go]);

  // keep active thumbnail visible
  useEffect(() => {
    const el = stripRef.current?.querySelector<HTMLElement>('[data-active="true"]');
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [index]);

  if (!photo) return null;
  const tone = toneById(toneId);

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 55) go(dx < 0 ? 'next' : 'prev');
        touchX.current = null;
      }}
    >
      {/* Top bar */}
      <header className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-semibold text-white sm:text-lg">{photo.title}</p>
          <p className="truncate text-[11px] text-white/50 sm:text-xs">
            {photo.author} · <span className="capitalize">{photo.category}</span> ·{' '}
            {index + 1}/{photos.length}
          </p>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <IconBtn
            active={showTones}
            label="Image filters"
            onClick={() => setShowTones((s) => !s)}
          >
            <Sliders className="h-4 w-4" />
          </IconBtn>
          <IconBtn active={playing} label={playing ? 'Pause slideshow' : 'Play slideshow'} onClick={() => setPlaying((p) => !p)}>
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </IconBtn>
          <IconBtn
            active={liked.includes(photo.id)}
            label="Favourite"
            onClick={() => onToggleLike(photo.id)}
          >
            <Heart filled={liked.includes(photo.id)} className="h-4 w-4" />
          </IconBtn>
          <a
            href={sourceUrl(photo.id)}
            target="_blank"
            rel="noreferrer"
            aria-label="Open source"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:scale-105 hover:border-white/40 hover:text-white"
          >
            <Link className="h-4 w-4" />
          </a>
          <IconBtn label="Close" onClick={onClose} danger>
            <Close className="h-4 w-4" />
          </IconBtn>
        </div>
      </header>

      {/* Tone rail */}
      <div
        className={`grid overflow-hidden px-4 transition-all duration-500 sm:px-6 ${
          showTones ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0">
          <div className="no-scrollbar mb-3 flex gap-2 overflow-x-auto pb-1">
            {TONES.map((t) => (
              <button
                key={t.id}
                onClick={() => onToneChange(t.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition ${
                  t.id === toneId
                    ? 'border-fuchsia-400/70 bg-fuchsia-500/15 text-white'
                    : 'border-white/12 bg-white/5 text-white/60 hover:border-white/35 hover:text-white'
                }`}
              >
                <span className="h-3.5 w-3.5 rounded-full ring-1 ring-white/25" style={{ background: t.swatch }} />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stage */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
        <NavBtn side="left" onClick={() => go('prev')} />
        <NavBtn side="right" onClick={() => go('next')} />

        <div
          key={photo.id}
          className={`relative flex h-full max-h-full w-full items-center justify-center ${
            direction === 'next' ? 'slide-next' : 'slide-prev'
          }`}
        >
          <img
            src={fullUrl(photo.id)}
            alt={photo.title}
            onLoad={() => setLoaded(true)}
            style={{ filter: tone.css }}
            className={`max-h-full max-w-full rounded-xl object-contain shadow-[0_40px_120px_-30px_rgba(0,0,0,1)] transition-all duration-700 ${
              loaded ? 'opacity-100 blur-0' : 'opacity-40 blur-md'
            }`}
          />
        </div>
      </div>

      {/* Thumbnail strip */}
      <div ref={stripRef} className="no-scrollbar shrink-0 overflow-x-auto px-4 py-4 sm:px-6">
        <div className="mx-auto flex w-max gap-2">
          {photos.map((p, i) => (
            <button
              key={p.id}
              data-active={i === index}
              onClick={() => {
                setDirection(i > index ? 'next' : 'prev');
                setLoaded(false);
                onIndexChange(i);
              }}
              className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 sm:h-14 sm:w-20 ${
                i === index
                  ? 'border-fuchsia-400 opacity-100 ring-2 ring-fuchsia-400/30'
                  : 'border-white/10 opacity-45 hover:opacity-90'
              }`}
            >
              <img
                src={thumbUrl(p.id, 200)}
                alt={p.title}
                loading="lazy"
                style={{ filter: tone.css }}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  label,
  active,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  active?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition hover:scale-105 ${
        active
          ? 'border-fuchsia-400/70 bg-fuchsia-500/20 text-fuchsia-200'
          : danger
            ? 'border-white/15 bg-white/5 text-white/80 hover:border-rose-400/70 hover:text-rose-300'
            : 'border-white/15 bg-white/5 text-white/80 hover:border-white/40 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

function NavBtn({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={side === 'left' ? 'Previous image' : 'Next image'}
      onClick={onClick}
      className={`group absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/85 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-fuchsia-400/60 hover:bg-fuchsia-500/20 hover:text-white sm:h-14 sm:w-14 ${
        side === 'left' ? 'left-1 sm:left-4' : 'right-1 sm:right-4'
      }`}
    >
      {side === 'left' ? (
        <ChevronLeft className="h-6 w-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
      ) : (
        <ChevronRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-0.5" />
      )}
    </button>
  );
}
