import { useEffect, useMemo, useState } from 'react';
import { CATEGORIES, photos as ALL_PHOTOS, type Category } from './data/photos';
import { TONES, toneById } from './data/filters';
import GalleryCard from './components/GalleryCard';
import Lightbox from './components/Lightbox';
import { Camera, Columns, Grid, Heart, Search, Close } from './components/Icons';

type Filter = Category | 'all';

export default function App() {
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [toneId, setToneId] = useState('original');
  const [masonry, setMasonry] = useState(true);
  const [onlyLiked, setOnlyLiked] = useState(false);
  const [liked, setLiked] = useState<number[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const tone = toneById(toneId);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_PHOTOS.filter((p) => {
      if (filter !== 'all' && p.category !== filter) return false;
      if (onlyLiked && !liked.includes(p.id)) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.category.includes(q) ||
        p.tags.some((t) => t.includes(q))
      );
    });
  }, [filter, query, onlyLiked, liked]);

  // keep lightbox valid when the collection changes
  useEffect(() => {
    if (lightboxIndex !== null && lightboxIndex >= filtered.length) {
      setLightboxIndex(filtered.length ? filtered.length - 1 : null);
    }
  }, [filtered.length, lightboxIndex]);

  const toggleLike = (id: number) =>
    setLiked((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const countFor = (id: Filter) =>
    id === 'all' ? ALL_PHOTOS.length : ALL_PHOTOS.filter((p) => p.category === id).length;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#08080b] text-zinc-100">
      {/* ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="animate-glow absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-fuchsia-600/20 blur-[130px]" />
        <div className="animate-glow absolute -right-32 top-1/3 h-[30rem] w-[30rem] rounded-full bg-indigo-600/20 blur-[130px] [animation-delay:3s]" />
        <div className="animate-glow absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-cyan-500/10 blur-[130px] [animation-delay:6s]" />
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at 50% 0%, black 25%, transparent 78%)',
          }}
        />
      </div>

      {/* ---------------- Hero ---------------- */}
      <header className="mx-auto max-w-7xl px-5 pb-10 pt-14 sm:px-8 sm:pt-20">
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-xs text-white/70 backdrop-blur">
          <Camera className="h-3.5 w-3.5 text-fuchsia-300" />
          Curated collection · {ALL_PHOTOS.length} photographs
        </div>

        <h1
          className="animate-fade-up mt-6 font-display text-[clamp(2.5rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-tight"
          style={{ animationDelay: '80ms' }}
        >
          <span className="bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
            Aperture
          </span>{' '}
          <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
            Gallery
          </span>
        </h1>

        <p
          className="animate-fade-up mt-5 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base"
          style={{ animationDelay: '160ms' }}
        >
          A responsive, filterable photo wall with a full-screen lightbox. Browse by category, tune the
          colour grade, then use the arrows, keyboard or swipe to move through the set.
        </p>

        <div
          className="animate-fade-up mt-8 flex flex-wrap items-center gap-6 text-xs text-white/40"
          style={{ animationDelay: '240ms' }}
        >
          <Stat value={`${ALL_PHOTOS.length}`} label="Images" />
          <Stat value={`${CATEGORIES.length - 1}`} label="Categories" />
          <Stat value={`${TONES.length}`} label="Colour grades" />
          <Stat value={`${liked.length}`} label="Favourites" />
        </div>
      </header>

      {/* ---------------- Toolbar ---------------- */}
      <div className="sticky top-0 z-30 border-y border-white/8 bg-[#08080b]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 py-3 sm:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* categories */}
            <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 py-1">
              {CATEGORIES.map((c) => {
                const active = filter === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setFilter(c.id)}
                    className={`group flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 sm:text-sm ${
                      active
                        ? 'border-transparent bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white shadow-[0_8px_24px_-8px_rgba(217,70,239,0.8)]'
                        : 'border-white/12 bg-white/[0.04] text-white/60 hover:-translate-y-0.5 hover:border-white/35 hover:text-white'
                    }`}
                  >
                    <span className="text-[13px]">{c.icon}</span>
                    {c.label}
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                        active ? 'bg-black/25 text-white' : 'bg-white/8 text-white/45'
                      }`}
                    >
                      {countFor(c.id)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* search + controls */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 lg:w-56 lg:flex-none">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search title, tag, author…"
                  className="w-full rounded-full border border-white/12 bg-white/[0.04] py-2 pl-9 pr-8 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-fuchsia-400/60 focus:bg-white/[0.07]"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    <Close className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <button
                onClick={() => setOnlyLiked((v) => !v)}
                aria-label="Show favourites"
                title="Show favourites"
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition hover:scale-105 ${
                  onlyLiked
                    ? 'border-rose-400/70 bg-rose-500/20 text-rose-300'
                    : 'border-white/12 bg-white/[0.04] text-white/60 hover:text-white'
                }`}
              >
                <Heart filled={onlyLiked} className="h-4 w-4" />
              </button>

              <button
                onClick={() => setMasonry((v) => !v)}
                aria-label="Toggle layout"
                title={masonry ? 'Switch to uniform grid' : 'Switch to masonry'}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/60 transition hover:scale-105 hover:text-white"
              >
                {masonry ? <Grid className="h-4 w-4" /> : <Columns className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* tone presets */}
          <div className="no-scrollbar -mx-1 mt-2 flex items-center gap-2 overflow-x-auto px-1 pb-1">
            <span className="shrink-0 pr-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
              Filter
            </span>
            {TONES.map((t) => (
              <button
                key={t.id}
                onClick={() => setToneId(t.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1 text-[11px] transition-all duration-300 ${
                  toneId === t.id
                    ? 'border-fuchsia-400/70 bg-fuchsia-500/12 text-white'
                    : 'border-white/10 bg-white/[0.03] text-white/50 hover:-translate-y-0.5 hover:border-white/30 hover:text-white'
                }`}
              >
                <span className="h-3 w-3 rounded-full ring-1 ring-white/20" style={{ background: t.swatch }} />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- Gallery ---------------- */}
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-display text-lg font-semibold text-white/90">
            {CATEGORIES.find((c) => c.id === filter)?.label}
            {onlyLiked && ' · favourites'}
          </h2>
          <p className="text-xs text-white/40">
            {filtered.length} {filtered.length === 1 ? 'image' : 'images'}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="animate-pop flex flex-col items-center gap-3 rounded-3xl border border-dashed border-white/12 bg-white/[0.02] py-24 text-center">
            <span className="text-4xl">🔍</span>
            <p className="font-display text-lg text-white/80">Nothing matches that yet</p>
            <p className="max-w-xs text-sm text-white/40">
              Try another category, clear the search field, or turn off the favourites filter.
            </p>
            <button
              onClick={() => {
                setFilter('all');
                setQuery('');
                setOnlyLiked(false);
              }}
              className="mt-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 px-5 py-2 text-sm font-medium text-white transition hover:scale-105"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div
            className={
              masonry
                ? 'masonry'
                : 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'
            }
          >
            {filtered.map((p, i) => (
              <GalleryCard
                key={p.id}
                photo={p}
                index={i}
                tone={tone.css}
                masonry={masonry}
                liked={liked.includes(p.id)}
                onToggleLike={toggleLike}
                onOpen={() => setLightboxIndex(i)}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-white/8 px-5 py-10 text-center text-xs text-white/35 sm:px-8">
        <p className="font-display text-sm text-white/60">Aperture Gallery</p>
        <p className="mt-2">
          Photography courtesy of Pexels contributors · Built with React, Tailwind CSS &amp; a little
          CSS trickery.
        </p>
        <p className="mt-1">Tip: press ← → to navigate, space to play the slideshow, Esc to close.</p>
      </footer>

      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <Lightbox
          photos={filtered}
          index={lightboxIndex}
          toneId={toneId}
          liked={liked}
          onToneChange={setToneId}
          onToggleLike={toggleLike}
          onIndexChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-display text-2xl font-semibold text-white">{value}</span>
      <span className="uppercase tracking-[0.18em]">{label}</span>
    </div>
  );
}
