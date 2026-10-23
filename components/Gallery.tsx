"use client";
import { useEffect, useRef, useState } from "react";

type Tile = { cls: string; src?: string; alt?: string };

export default function Gallery({ tiles }: { tiles: Tile[] }) {
  const photos = tiles.filter((t) => t.src);
  const [idx, setIdx] = useState<number | null>(null);
  const startX = useRef(0);

  const go = (d: number) => setIdx((i) => (i === null ? i : (i + d + photos.length) % photos.length));

  useEffect(() => {
    if (idx === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  return (
    <>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:grid-rows-2">
        {tiles.map((t, i) => {
          const base = `${t.cls} relative overflow-hidden rounded-2xl shadow-soft`;
          if (!t.src)
            return (
              <div key={i} className={base}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute bottom-3 left-3 text-sm text-milk/90">Photo to come</span>
              </div>
            );
          const n = photos.findIndex((p) => p.src === t.src);
          return (
            <button key={i} onClick={() => setIdx(n)} aria-label={`Open photo: ${t.alt}`} className={`${base} lift group`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.src} alt={t.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </button>
          );
        })}
      </div>

      {idx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3"
          onClick={() => setIdx(null)}
          onTouchStart={(e) => (startX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - startX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photos[idx].src} alt={photos[idx].alt} className="max-h-[85vh] max-w-full rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
          <button onClick={() => setIdx(null)} aria-label="Close" className="lift absolute right-3 top-3 h-12 w-12 rounded-full bg-white/15 text-2xl text-white">×</button>
          {photos.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous photo" className="lift absolute left-3 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-white/15 text-2xl text-white">‹</button>
              <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next photo" className="lift absolute right-3 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-white/15 text-2xl text-white">›</button>
            </>
          )}
        </div>
      )}
    </>
  );
}
