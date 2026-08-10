'use client';

import React from 'react';
import { Volume2, VolumeX, Globe, Settings, Heart } from 'lucide-react';
import { Language } from '@/types/wedding';
import { dictionary } from '@/data/dictionary';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onOpenCustomizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  isMusicPlaying,
  onToggleMusic,
  onOpenCustomizer,
}) => {
  const t = dictionary[lang];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#180710]/85 border-b border-pink-400/25 px-4 sm:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand/Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#E05285] via-[#E8A598] to-[#7E1235] flex items-center justify-center text-pink-100 font-serif font-bold text-sm shadow-md">
            <Heart className="w-4 h-4 text-pink-200 fill-pink-200" />
          </div>
          <span className="text-sm sm:text-base font-serif gold-text-gradient font-semibold tracking-wider">
            Kasun & Sanduni
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Toggle */}
          <button
            onClick={onToggleMusic}
            title={isMusicPlaying ? t.musicOff : t.musicOn}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 cursor-pointer ${
              isMusicPlaying
                ? 'bg-pink-500/20 border-pink-400 text-pink-200 shadow-[0_0_12px_rgba(244,166,183,0.35)]'
                : 'bg-stone-900/60 border-pink-400/30 text-pink-200/70 hover:text-pink-200'
            }`}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-pink-300 animate-pulse" />
                <span className="hidden sm:inline">{t.musicOff}</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-pink-200/60" />
                <span className="hidden sm:inline">{t.musicOn}</span>
              </>
            )}
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium bg-stone-900/80 border border-pink-400/40 text-pink-200 hover:bg-pink-500/15 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Globe className="w-4 h-4 text-pink-300" />
            <span>{lang === 'en' ? 'සිංහල' : 'English'}</span>
          </button>

          {/* Customizer Drawer Trigger */}
          <button
            onClick={onOpenCustomizer}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700 text-white hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md cursor-pointer font-semibold"
          >
            <Settings className="w-4 h-4 text-pink-100" />
            <span className="hidden sm:inline">{t.customizeBtn}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
