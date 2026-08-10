'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { CoupleDetails, Language } from '@/types/wedding';
import { dictionary } from '@/data/dictionary';

interface CoupleStoryProps {
  couple: CoupleDetails;
  lang: Language;
}

export const CoupleStory: React.FC<CoupleStoryProps> = ({ couple, lang }) => {
  const t = dictionary[lang];

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-200 text-xs sm:text-sm font-medium mb-3">
          <Sparkles className="w-4 h-4 text-pink-300" />
          <span>{t.theCouple}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif gold-text-gradient font-bold">
          Kasun & Sanduni
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch mb-16">
        {/* Groom Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-2 border-pink-400/60 p-1 mb-6 shadow-2xl">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src={couple.coverImage}
                alt={couple.groomName}
                fill
                className="object-cover object-top hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <h3 className="text-2xl font-serif gold-text-gradient font-bold mb-1">
            {couple.groomName}
          </h3>
          <p className="text-pink-300/85 text-xs tracking-wider uppercase mb-3">
            {couple.groomParents}
          </p>
          <div className="w-16 h-[1px] bg-pink-500/40 my-3" />
          <p className="text-pink-100/85 text-sm leading-relaxed font-light">
            {t.groomBio}
          </p>
        </motion.div>

        {/* Bride Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden"
        >
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-2 border-pink-400/60 p-1 mb-6 shadow-2xl">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src={couple.casualImage}
                alt={couple.brideName}
                fill
                className="object-cover object-top hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <h3 className="text-2xl font-serif gold-text-gradient font-bold mb-1">
            {couple.brideName}
          </h3>
          <p className="text-pink-300/85 text-xs tracking-wider uppercase mb-3">
            {couple.brideParents}
          </p>
          <div className="w-16 h-[1px] bg-pink-500/40 my-3" />
          <p className="text-pink-100/85 text-sm leading-relaxed font-light">
            {t.brideBio}
          </p>
        </motion.div>
      </div>

      {/* Love Story Timeline */}
      <div className="glass-card p-8 sm:p-12 text-center max-w-4xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-serif gold-text-gradient font-bold mb-8 flex items-center justify-center gap-2">
          <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
          <span>{t.ourStory}</span>
          <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-4 rounded-xl bg-pink-950/40 border border-pink-400/20">
            <span className="text-pink-300 font-serif text-sm font-semibold block mb-1">2021</span>
            <h4 className="text-pink-100 font-medium text-base mb-2">{t.storyLine1Title}</h4>
            <p className="text-pink-200/70 text-xs leading-relaxed">{t.storyLine1Desc}</p>
          </div>
          <div className="p-4 rounded-xl bg-pink-950/40 border border-pink-400/20">
            <span className="text-pink-300 font-serif text-sm font-semibold block mb-1">2024</span>
            <h4 className="text-pink-100 font-medium text-base mb-2">{t.storyLine2Title}</h4>
            <p className="text-pink-200/70 text-xs leading-relaxed">{t.storyLine2Desc}</p>
          </div>
          <div className="p-4 rounded-xl bg-pink-950/40 border border-pink-400/20">
            <span className="text-pink-300 font-serif text-sm font-semibold block mb-1">2026</span>
            <h4 className="text-pink-100 font-medium text-base mb-2">{t.storyLine3Title}</h4>
            <p className="text-pink-200/70 text-xs leading-relaxed">{t.storyLine3Desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
