'use client';

import React, { useEffect, useState } from 'react';
import { CalendarDays, Mail } from 'lucide-react';
import { wedding } from '@/data/wedding';
import { buttonOutline, buttonSolid, calendarUrl, Reveal } from './ui';

const getTimeLeft = () => {
  const diff = Math.max(0, +new Date(wedding.date) - Date.now());
  return [
    { label: 'Days', value: Math.floor(diff / 86400000) },
    { label: 'Hours', value: Math.floor(diff / 3600000) % 24 },
    { label: 'Minutes', value: Math.floor(diff / 60000) % 60 },
    { label: 'Seconds', value: Math.floor(diff / 1000) % 60 },
  ];
};

const Countdown: React.FC = () => {
  // Starts empty so the server and browser render the same markup
  const [units, setUnits] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    const tick = () => setUnits(getTimeLeft());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const shown = units ?? getTimeLeft().map((u) => ({ ...u, value: -1 }));

  return (
    <div className="flex justify-center gap-2.5 sm:gap-4">
      {shown.map((u) => (
        <div
          key={u.label}
          className="flex w-[4.5rem] flex-col items-center rounded-2xl border border-blush-200 bg-white/80 py-3 shadow-md shadow-blush-200/50 sm:w-20"
        >
          <span className="font-serif text-3xl tabular-nums text-ink">
            {u.value < 0 ? '--' : String(u.value).padStart(2, '0')}
          </span>
          <span className="mt-1 text-[9px] uppercase tracking-[0.2em] text-ink-soft">{u.label}</span>
        </div>
      ))}
    </div>
  );
};

export const Hero: React.FC<{ guestName: string; guestCount: number }> = ({ guestName, guestCount }) => (
  <section id="invite" className="relative scroll-mt-4 bg-gradient-to-b from-white via-blush-50 to-blush-100 px-4 pb-28 pt-20 text-center">
    <Reveal className="mx-auto max-w-2xl">
      <h1 className="font-script text-5xl text-ink sm:text-7xl">
        {wedding.bride.name} <span className="text-blush-500">&</span> {wedding.groom.name}
      </h1>

      {guestName && (
        <div className="mt-8">
          <p className="text-[11px] uppercase tracking-[0.35em] text-blush-500">An invitation for</p>
          <p className="mt-2 font-script text-4xl text-ink sm:text-5xl">{guestName}</p>
          {guestCount > 0 && (
            <p className="mt-4 inline-block rounded-full border border-blush-300 bg-white/70 px-5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-ink-soft">
              Invitation for <span className="mx-1 text-base font-medium text-ink">{guestCount}</span>
              {guestCount === 1 ? 'guest' : 'guests'}
            </p>
          )}
        </div>
      )}

      <p className="mx-auto mt-8 max-w-lg font-serif text-lg leading-relaxed text-ink-soft sm:text-xl">
        With hearts full of joy, we invite you to share in the celebration of our marriage. Your presence would
        make our day complete.
      </p>

      <p className="mt-5 text-xs font-medium uppercase tracking-[0.25em] text-ink">
        {wedding.dateLabel} · Ceremony {wedding.ceremonyTime}
      </p>

      <div className="mt-8">
        <Countdown />
      </div>

      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <a href={calendarUrl()} target="_blank" rel="noreferrer" className={buttonOutline}>
          <CalendarDays className="h-4 w-4 text-blush-500" /> Save the date
        </a>
        <a href="#rsvp" className={buttonSolid}>
          <Mail className="h-4 w-4" /> RSVP
        </a>
      </div>
    </Reveal>

    {/* Wave into the next (white) section */}
    <svg
      className="absolute inset-x-0 bottom-0 h-12 w-full sm:h-16"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 50 C 360 10, 720 80, 1080 40 C 1260 20, 1380 30, 1440 40 L1440 80 L0 80 Z" fill="#fff" />
      <path d="M0 50 C 360 10, 720 80, 1080 40 C 1260 20, 1380 30, 1440 40" stroke="#e3a7b5" strokeWidth="1.5" fill="none" />
    </svg>
  </section>
);
