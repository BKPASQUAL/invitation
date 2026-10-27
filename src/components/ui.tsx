'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { wedding } from '@/data/wedding';

/* ---------- Links ---------- */

const toCalendarStamp = (d: Date) => d.toISOString().replace(/-|:|\.\d{3}/g, '');

export const calendarUrl = () => {
  const start = new Date(wedding.date);
  const end = new Date(start.getTime() + 6 * 3600 * 1000);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Wedding of ${wedding.bride.name} & ${wedding.groom.name}`,
    dates: `${toCalendarStamp(start)}/${toCalendarStamp(end)}`,
    location: `${wedding.venue.name}, ${wedding.venue.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const directionsUrl = () =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(wedding.venue.mapQuery)}`;

/* ---------- Feather ---------- */

export const Feather: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg viewBox="0 0 40 120" className={className} style={style} aria-hidden="true">
    <path
      d="M20 3 C33 18 36 52 27 88 C25 96 22 102 20 106 C18 102 15 96 13 88 C4 52 7 18 20 3Z"
      fill="currentColor"
    />
    <path d="M20 40 L31 29 M20 58 L8 47 M20 76 L29 67 M20 90 L13 84" stroke="#fff" strokeWidth="1.6" />
    <path d="M20 8 Q21.5 60 20 117" stroke="#d08c9c" strokeWidth="1.1" fill="none" strokeLinecap="round" />
  </svg>
);

// Fixed positions so server and client render the same thing
const FEATHERS = [
  { left: '4%', size: 22, duration: 24, delay: -2 },
  { left: '18%', size: 16, duration: 30, delay: -14 },
  { left: '33%', size: 20, duration: 27, delay: -8 },
  { left: '52%', size: 14, duration: 33, delay: -20 },
  { left: '67%', size: 24, duration: 26, delay: -4 },
  { left: '81%', size: 17, duration: 31, delay: -17 },
  { left: '93%', size: 21, duration: 28, delay: -11 },
];

export const FallingFeathers: React.FC<{ className?: string }> = ({ className = 'fixed' }) => (
  <div aria-hidden="true" className={`pointer-events-none inset-0 z-30 overflow-hidden ${className}`}>
    {FEATHERS.map((f, i) => (
      <Feather
        key={i}
        className="feather text-blush-300/45"
        style={{
          left: f.left,
          width: f.size,
          height: f.size * 3,
          animationDuration: `${f.duration}s`,
          animationDelay: `${f.delay}s`,
        }}
      />
    ))}
  </div>
);

/* ---------- Section pieces ---------- */

export const Section: React.FC<{
  id?: string;
  tint?: boolean;
  className?: string;
  children: React.ReactNode;
}> = ({ id, tint, className = '', children }) => (
  <section
    id={id}
    className={`scroll-mt-4 px-4 py-20 sm:py-24 ${tint ? 'bg-blush-50' : 'bg-white'} ${className}`}
  >
    <div className="mx-auto max-w-4xl">{children}</div>
  </section>
);

export const SectionTitle: React.FC<{ eyebrow: string; title: string; subtitle?: string }> = ({
  eyebrow,
  title,
  subtitle,
}) => (
  <Reveal className="mb-12 text-center">
    <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-blush-500">{eyebrow}</p>
    <h2 className="font-serif text-3xl font-medium uppercase tracking-wide text-ink sm:text-4xl">{title}</h2>
    {subtitle && <p className="mt-2 text-sm text-ink-soft">{subtitle}</p>}
    <div className="mx-auto mt-5 flex w-32 items-center gap-2">
      <span className="h-px flex-1 bg-blush-300" />
      <Feather className="h-5 w-2.5 rotate-45 text-blush-300" />
      <span className="h-px flex-1 bg-blush-300" />
    </div>
  </Reveal>
);

export const Reveal: React.FC<{ className?: string; delay?: number; children: React.ReactNode }> = ({
  className,
  delay = 0,
  children,
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay }}
  >
    {children}
  </motion.div>
);

export const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all cursor-pointer';
export const buttonSolid = `${buttonBase} bg-blush-600 text-white shadow-lg shadow-blush-300/50 hover:bg-[#a65d6f]`;
export const buttonOutline = `${buttonBase} border border-blush-300 bg-white text-ink shadow-sm hover:border-blush-400 hover:bg-blush-50`;
