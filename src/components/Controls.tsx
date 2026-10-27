'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Music, VolumeX } from 'lucide-react';

/* ---------- Bottom navigation pill ---------- */

const LINKS = [
  { id: 'invite', label: 'Invite' },
  { id: 'couple', label: 'Couple' },
  { id: 'events', label: 'Events' },
  { id: 'venue', label: 'Venue' },
  { id: 'rsvp', label: 'RSVP' },
];

export const BottomNav: React.FC = () => {
  const [active, setActive] = useState('invite');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-3">
      <div className="flex gap-0.5 rounded-full border border-blush-200 bg-white/90 p-1.5 shadow-xl shadow-blush-200/50 backdrop-blur-md">
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={`rounded-full px-3 py-2 text-xs transition sm:px-4 ${
              active === l.id ? 'bg-blush-600 font-medium text-white' : 'text-ink-soft hover:text-ink'
            }`}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

/* ---------- Music toggle (soft generated melody) ---------- */

const NOTES = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33];

export const MusicButton: React.FC<{ playing: boolean; onToggle: () => void }> = ({ playing, onToggle }) => {
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!playing) {
      ctxRef.current?.suspend().catch(() => {});
      return;
    }
    try {
      if (!ctxRef.current) {
        const Ctx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        ctxRef.current = new Ctx();
      }
      const ctx = ctxRef.current;
      ctx.resume().catch(() => {});
      let step = 0;

      const playNote = () => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(NOTES[step++ % NOTES.length], ctx.currentTime);
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 2);
      };

      playNote();
      const id = setInterval(playNote, 1800);
      return () => clearInterval(id);
    } catch {
      // Audio not supported
    }
  }, [playing]);

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={playing ? 'Mute music' : 'Play music'}
      className="fixed right-4 top-4 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-blush-300 bg-white/90 text-blush-600 shadow-md backdrop-blur-md transition hover:bg-blush-50"
    >
      {playing ? <Music className="h-4 w-4 animate-pulse" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
};
