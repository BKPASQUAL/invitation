'use client';

import React, { useState } from 'react';
import { EnvelopeHero } from '@/components/EnvelopeHero';
import { Navbar } from '@/components/Navbar';
import { CountdownTimer } from '@/components/CountdownTimer';
import { CoupleStory } from '@/components/CoupleStory';
import { NakathTimeline } from '@/components/NakathTimeline';
import { VenueMap } from '@/components/VenueMap';
import { RsvpForm } from '@/components/RsvpForm';
import { WishesWall } from '@/components/WishesWall';
import { PhotoGallery } from '@/components/PhotoGallery';
import { MusicPlayer } from '@/components/MusicPlayer';
import { CustomizerModal } from '@/components/CustomizerModal';

import { initialCoupleDetails, initialNakathTimes, initialWishes, dictionary } from '@/data/dictionary';
import { CoupleDetails, GuestWish, Language } from '@/types/wedding';
import { Heart, Sparkles } from 'lucide-react';

export default function Home() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const [couple, setCouple] = useState<CoupleDetails>(initialCoupleDetails);
  const [nakaths, setNakaths] = useState(initialNakathTimes);
  const [wishes, setWishes] = useState<GuestWish[]>(initialWishes);

  const t = dictionary[lang];

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'si' : 'en'));
  };

  const handleToggleMusic = () => {
    setIsMusicPlaying((prev) => !prev);
  };

  const handleAddWish = (newWish: GuestWish) => {
    setWishes((prev) => [newWish, ...prev]);
  };

  const handleResetDefaults = () => {
    setCouple(initialCoupleDetails);
    setNakaths(initialNakathTimes);
    setWishes(initialWishes);
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Sticky Header Navbar */}
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* Hero Envelope Section */}
      <EnvelopeHero
        couple={couple}
        lang={lang}
        isOpen={isEnvelopeOpen}
        onOpen={() => {
          setIsEnvelopeOpen(true);
          setIsMusicPlaying(true);
        }}
      />

      {/* Unfolded Main Wedding Invitation Content */}
      {isEnvelopeOpen && (
        <div className="space-y-12 sm:space-y-20 pb-24">
          {/* Countdown Clock */}
          <CountdownTimer targetDate={couple.weddingDate} lang={lang} />

          {/* Couple Profiles & Story */}
          <CoupleStory couple={couple} lang={lang} />

          {/* Traditional Nakath Schedule */}
          <NakathTimeline nakaths={nakaths} lang={lang} />

          {/* Venue & Directions Map */}
          <VenueMap couple={couple} lang={lang} />

          {/* Interactive RSVP Form */}
          <RsvpForm lang={lang} />

          {/* Blessings & Wishes Wall */}
          <WishesWall wishes={wishes} lang={lang} onAddWish={handleAddWish} />

          {/* Pre-Wedding Photo Gallery */}
          <PhotoGallery couple={couple} lang={lang} />

          {/* Royal Footer */}
          <footer className="py-12 border-t border-pink-400/20 text-center px-4">
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex items-center justify-center gap-2 text-pink-300">
                <Sparkles className="w-4 h-4" />
                <span className="font-serif gold-text-gradient text-lg font-semibold">
                  {couple.groomName.split(' ')[0]} & {couple.brideName.split(' ')[0]}
                </span>
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-pink-200/70 text-xs sm:text-sm font-light">
                {lang === 'si'
                  ? 'අපගේ මංගල්‍යයට ඔබගේ සහභාගීත්වය සහ ආශීර්වාදය අගය කරමු!'
                  : 'Thank you for being part of our special beginning!'}
              </p>
              <div className="pt-4 flex items-center justify-center gap-1 text-pink-300/50 text-xs">
                <span>Created with</span>
                <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
                <span>for Sri Lankan Weddings</span>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* Floating Audio Player */}
      <MusicPlayer isPlaying={isMusicPlaying} onToggle={handleToggleMusic} />

      {/* Customizer Drawer */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        couple={couple}
        onUpdateCouple={setCouple}
        onReset={handleResetDefaults}
        lang={lang}
      />
    </main>
  );
}
