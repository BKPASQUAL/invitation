'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume1, Volume2, VolumeX } from 'lucide-react';
import { wedding } from '@/data/wedding';

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
/* ---------- Background song with volume control ---------- */

const DEFAULT_VOLUME = 0.25;

const readSavedVolume = () => {
  try {
    const v = Number(localStorage.getItem('invite-volume'));
    return v > 0 && v <= 1 ? v : DEFAULT_VOLUME;
  } catch {
    return DEFAULT_VOLUME;
  }
};

export const MusicButton: React.FC<{ playing: boolean; onToggle: () => void }> = ({ playing, onToggle }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [missing, setMissing] = useState(false);
  const [open, setOpen] = useState(false);
  const [volume, setVolume] = useState(readSavedVolume);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.play().catch(() => {});
    else audio.pause();
  }, [playing]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
    try {
      localStorage.setItem('invite-volume', String(volume));
    } catch {
      // Storage blocked; volume still works for this visit
    }
  }, [volume]);

  // Close the volume panel when tapping elsewhere
  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  const icon = playing ? (volume < 0.4 ? Volume1 : Volume2) : VolumeX;
  const Icon = icon;

  return (
    <>
      <audio ref={audioRef} src={wedding.music} loop preload="metadata" onError={() => setMissing(true)} />
      {!missing && (
        <div
          ref={panelRef}
          className="fixed right-4 top-4 z-40 flex items-center gap-2 rounded-full border border-blush-300 bg-white/90 p-1 shadow-md backdrop-blur-md"
        >
          {open && (
            <>
              <button
                type="button"
                onClick={onToggle}
                aria-label={playing ? 'Pause music' : 'Play music'}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-blush-600 transition hover:bg-blush-50"
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <input
                type="range"
                min={0.05}
                max={1}
                step={0.05}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                aria-label="Music volume"
                className="h-1 w-28 cursor-pointer accent-blush-600"
              />
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Music settings"
            aria-expanded={open}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-blush-600 transition hover:bg-blush-50"
          >
            <Icon className={`h-4 w-4 ${playing && !open ? 'animate-pulse' : ''}`} />
          </button>
        </div>
      )}
    </>
  );
};
