'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { wedding } from '@/data/wedding';
import { Reveal, Section, SectionTitle } from './ui';

const photos = wedding.memories;

export const Memories: React.FC = () => {
  const [viewing, setViewing] = useState<number | null>(null);

  const step = useCallback(
    (by: number) => setViewing((i) => (i === null ? i : (i + by + photos.length) % photos.length)),
    [],
  );

  // Keyboard: arrows to move, Escape to close
  useEffect(() => {
    if (viewing === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setViewing(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [viewing, step]);

  if (photos.length === 0) return null;
  const [first, ...rest] = photos;

  return (
    <Section id="memories" tint>
      <SectionTitle eyebrow="Moments we treasure" title="Our Memories" />

      {/* Highlight: the first photo */}
      <Reveal>
        <button
          type="button"
          onClick={() => setViewing(0)}
          className="group relative block w-full cursor-pointer overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl shadow-blush-200 ring-1 ring-blush-200"
        >
          <div className="relative aspect-[4/5] w-full sm:aspect-[16/10]">
            <Image
              src={first.src}
              alt={first.caption || 'Our first photo'}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover transition duration-700 group-hover:scale-105"
              style={{ objectPosition: first.focus ?? 'center' }}
            />
          </div>
          {first.caption && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-6 pb-6 pt-16 text-left">
              <p className="font-script text-4xl text-white drop-shadow sm:text-5xl">{first.caption}</p>
            </div>
          )}
        </button>
      </Reveal>

      {/* The rest */}
      {rest.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:grid-cols-3 sm:gap-4">
          {rest.map((p, i) => (
            <Reveal key={p.src + i} delay={(i % 3) * 0.08}>
              <button
                type="button"
                onClick={() => setViewing(i + 1)}
                aria-label={p.caption || `Photo ${i + 2}`}
                className="group relative block aspect-square w-full cursor-pointer overflow-hidden rounded-2xl border-2 border-white shadow-lg shadow-blush-100 ring-1 ring-blush-200"
              >
                <Image
                  src={p.src}
                  alt={p.caption || ''}
                  fill
                  sizes="(max-width: 640px) 50vw, 300px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                  style={{ objectPosition: p.focus ?? 'center' }}
                />
              </button>
            </Reveal>
          ))}
        </div>
      )}

      {/* Full-screen viewer */}
      <AnimatePresence>
        {viewing !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-white/95 p-4 backdrop-blur-sm"
            onClick={() => setViewing(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-blush-300 bg-white text-ink shadow-md"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.figure
              key={viewing}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative flex h-full max-h-[80vh] w-full max-w-4xl flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-full w-full">
                <Image src={photos[viewing].src} alt={photos[viewing].caption || ''} fill sizes="100vw" className="object-contain" />
              </div>
              <figcaption className="mt-3 text-center text-sm text-ink-soft">
                {photos[viewing].caption && <span className="font-serif text-lg italic text-ink">{photos[viewing].caption} · </span>}
                {viewing + 1} / {photos.length}
              </figcaption>
            </motion.figure>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-blush-300 bg-white text-ink shadow-md"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-blush-300 bg-white text-ink shadow-md"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};
