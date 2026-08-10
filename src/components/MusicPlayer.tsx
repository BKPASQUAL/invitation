'use client';

import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, onToggle }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      startAmbientAudio();
    } else {
      stopAmbientAudio();
    }
    return () => {
      stopAmbientAudio();
    };
  }, [isPlaying]);

  const startAmbientAudio = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Pentatonic warm Sri Lankan flute/sitar scale notes (Hz)
      const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33];
      let step = 0;

      const playMelodyNote = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Soft sine wave for flute-like warmth
        osc.type = 'sine';
        const noteFreq = notes[step % notes.length];
        osc.frequency.setValueAtTime(noteFreq, ctx.currentTime);

        // Envelope
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 2.0);

        step++;
      };

      playMelodyNote();
      timerRef.current = setInterval(playMelodyNote, 1800);
    } catch {
      // Audio context fallback gracefully handled
    }
  };

  const stopAmbientAudio = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      try {
        audioCtxRef.current.suspend();
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onToggle}
        className={`p-3.5 rounded-full border shadow-2xl flex items-center gap-2 backdrop-blur-xl transition-all cursor-pointer ${
          isPlaying
            ? 'bg-pink-950/80 border-pink-400 text-pink-200 shadow-[0_0_20px_rgba(244,166,183,0.45)]'
            : 'bg-[#180710]/90 border-pink-400/30 text-pink-200/60 hover:text-pink-200'
        }`}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-5 h-5 text-pink-300 animate-pulse" />
            <div className="flex items-end gap-0.5 h-4">
              <span className="w-0.5 bg-pink-400 h-full animate-bounce [animation-delay:0.1s]" />
              <span className="w-0.5 bg-pink-400 h-2/3 animate-bounce [animation-delay:0.3s]" />
              <span className="w-0.5 bg-pink-400 h-full animate-bounce [animation-delay:0.2s]" />
            </div>
          </>
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};
