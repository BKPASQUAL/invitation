'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Calendar, MapPin, ChevronDown, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CoupleDetails, Language } from '@/types/wedding';
import { dictionary } from '@/data/dictionary';

interface EnvelopeHeroProps {
  couple: CoupleDetails;
  lang: Language;
  onOpen: () => void;
  isOpen: boolean;
}

export const EnvelopeHero: React.FC<EnvelopeHeroProps> = ({ couple, lang, onOpen, isOpen }) => {
  const t = dictionary[lang];

  const handleOpenCard = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#F4A6B7', '#FFB6C1', '#E8A598', '#E05285', '#FFF0F5', '#F9E79F']
    });
    onOpen();
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Background Subtle Floral Ornaments */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#F4A6B7_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Floating Petals */}
      <div className="absolute top-10 left-1/4 w-3.5 h-3.5 bg-pink-300/40 rounded-full blur-sm petal-float" />
      <div className="absolute bottom-20 right-1/4 w-4 h-4 bg-rose-300/30 rounded-full blur-sm petal-float [animation-delay:3s]" />
      <div className="absolute top-1/3 right-1/6 w-3 h-3 bg-pink-200/40 rounded-full blur-xs petal-float [animation-delay:5s]" />
      
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="sealed-envelope"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0, transition: { duration: 0.6 } }}
            className="relative w-full max-w-lg mx-auto"
          >
            {/* Envelope Envelope Outer */}
            <div className="glass-card gold-border p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl bg-gradient-to-b from-[#2F0D20]/90 to-[#180710]/95 backdrop-blur-xl">
              {/* Traditional Arch Top Border */}
              <div className="w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-[#F4A6B7] to-transparent mb-6" />

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-200 text-xs sm:text-sm font-medium tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5 text-pink-300" />
                <span>{t.invitationGreeting}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif gold-text-gradient tracking-wide mb-2">
                {couple.groomName.split(' ')[0]} & {couple.brideName.split(' ')[0]}
              </h2>
              <p className="text-pink-200/75 text-xs sm:text-sm mb-8 italic">
                {t.invitationGreetingSiSub}
              </p>

              {/* Interactive Wax Seal Button */}
              <div className="my-8 flex justify-center">
                <button
                  onClick={handleOpenCard}
                  className="group relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#B81D4F] via-[#7E1235] to-[#45071B] border-2 border-[#F4A6B7] wax-seal-pulse hover:scale-105 transition-all duration-300 shadow-2xl cursor-pointer"
                >
                  <div className="absolute inset-1 rounded-full border border-pink-300/40 border-dashed" />
                  <div className="flex flex-col items-center justify-center text-pink-100">
                    <Heart className="w-7 h-7 fill-pink-300 text-pink-300 group-hover:scale-110 transition-transform drop-shadow" />
                    <span className="text-[10px] font-bold tracking-widest mt-1 text-pink-200">OPEN</span>
                  </div>
                </button>
              </div>

              <p className="text-pink-300/85 text-xs tracking-widest uppercase mb-4 font-medium">
                {t.tapToOpen}
              </p>

              <button
                onClick={handleOpenCard}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#E05285] via-[#E8A598] to-[#C96885] text-[#1E0512] font-bold text-sm sm:text-base shadow-lg hover:brightness-110 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>{t.openEnvelope}</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="revealed-hero"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl mx-auto text-center pt-8 pb-12"
          >
            {/* Sri Lankan Traditional Motif Header */}
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-[#F4A6B7]" />
              <div className="text-pink-300 text-xl font-serif">𑩐 𑩐 𑩐</div>
              <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-[#F4A6B7]" />
            </div>

            <p className="text-pink-200/90 text-sm sm:text-base font-light uppercase tracking-widest mb-3">
              {t.invitationGreeting}
            </p>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif gold-text-gradient font-bold tracking-tight mb-4 drop-shadow-md">
              {couple.groomName}
            </h1>
            <div className="flex items-center justify-center gap-3 my-2 text-pink-400">
              <Heart className="w-5 h-5 fill-pink-400 animate-pulse" />
              <span className="text-xl sm:text-2xl font-serif italic text-pink-200">&</span>
              <Heart className="w-5 h-5 fill-pink-400 animate-pulse" />
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif gold-text-gradient font-bold tracking-tight mb-6 drop-shadow-md">
              {couple.brideName}
            </h1>

            <p className="text-pink-100/90 max-w-xl mx-auto text-sm sm:text-base mb-8 px-4 leading-relaxed font-light">
              {t.requestTitle}
            </p>

            {/* Date & Venue Pill Badges */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-10 px-2">
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-950/60 border border-pink-400/40 text-pink-100 text-sm backdrop-blur-md shadow-lg">
                <Calendar className="w-4 h-4 text-pink-300" />
                <span className="font-medium">
                  {new Date(couple.weddingDate).toLocaleDateString(lang === 'si' ? 'si-LK' : 'en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-950/60 border border-pink-400/40 text-pink-100 text-sm backdrop-blur-md shadow-lg">
                <MapPin className="w-4 h-4 text-pink-300" />
                <span className="font-medium">{couple.venueName}</span>
              </div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-flex flex-col items-center text-pink-300/70 text-xs gap-1"
            >
              <span>Scroll to Explore</span>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

