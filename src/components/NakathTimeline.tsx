'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Flame, Utensils, Users, Sparkles, FileCheck, Star } from 'lucide-react';
import { NakathTime, Language } from '@/types/wedding';
import { dictionary } from '@/data/dictionary';

interface NakathTimelineProps {
  nakaths: NakathTime[];
  lang: Language;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Crown':
      return <Crown className="w-5 h-5 text-pink-300" />;
    case 'Flame':
      return <Flame className="w-5 h-5 text-pink-300 animate-pulse" />;
    case 'Utensils':
      return <Utensils className="w-5 h-5 text-pink-300" />;
    case 'Users':
      return <Users className="w-5 h-5 text-pink-300" />;
    case 'FileCheck':
      return <FileCheck className="w-5 h-5 text-pink-300" />;
    case 'Sparkles':
    default:
      return <Sparkles className="w-5 h-5 text-pink-300" />;
  }
};

export const NakathTimeline: React.FC<NakathTimelineProps> = ({ nakaths, lang }) => {
  const t = dictionary[lang];

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-200 text-xs sm:text-sm font-medium mb-3">
          <Star className="w-4 h-4 text-pink-300 fill-pink-300" />
          <span>{t.nakathHeading}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif gold-text-gradient font-bold mb-4">
          {lang === 'si' ? 'නැකත් සහ උත්සව කාලසටහන' : 'Auspicious Times & Schedule'}
        </h2>
        <p className="text-pink-100/70 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-light">
          {t.nakathSubheading}
        </p>
      </div>

      <div className="relative border-l-2 border-pink-400/30 ml-4 sm:ml-32 pl-6 sm:pl-10 space-y-8">
        {nakaths.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative group"
          >
            {/* Timeline Circle Marker */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-10 h-10 rounded-full bg-[#2F0D20] border-2 border-pink-400 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              {getIcon(item.iconName)}
            </div>

            {/* Time Pill for Mobile/Desktop */}
            <div className="sm:absolute sm:-left-44 sm:top-2 mb-2 sm:mb-0">
              <span className="inline-block px-3 py-1 rounded-md bg-pink-950/80 border border-pink-400/40 text-pink-200 font-serif font-semibold text-xs sm:text-sm shadow-md">
                {lang === 'si' ? item.timeSi : item.time}
              </span>
            </div>

            {/* Content Card */}
            <div className="glass-card p-6 relative">
              {item.isAuspicious && (
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pink-500/20 border border-pink-400/50 text-pink-200 text-xs font-semibold mb-3">
                  <Star className="w-3 h-3 fill-pink-400 text-pink-400" />
                  <span>{t.auspiciousBadge}</span>
                </div>
              )}
              <h3 className="text-xl font-serif gold-text-gradient font-bold mb-2">
                {lang === 'si' ? item.titleSi : item.title}
              </h3>
              <p className="text-pink-100/80 text-sm leading-relaxed font-light">
                {lang === 'si' ? item.descriptionSi : item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
