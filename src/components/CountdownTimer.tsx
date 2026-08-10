'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Language } from '@/types/wedding';
import { dictionary } from '@/data/dictionary';

interface CountdownTimerProps {
  targetDate: string;
  lang: Language;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, lang }) => {
  const t = dictionary[lang];

  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: t.days, value: timeLeft.days },
    { label: t.hours, value: timeLeft.hours },
    { label: t.minutes, value: timeLeft.minutes },
    { label: t.seconds, value: timeLeft.seconds },
  ];

  return (
    <section className="py-12 px-4 max-w-5xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-200 text-xs sm:text-sm font-medium mb-4">
        <Clock className="w-4 h-4 text-pink-300" />
        <span>{t.countdownHeading}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto mt-6">
        {units.map((unit, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="glass-card p-6 flex flex-col items-center justify-center relative group hover:scale-105 transition-transform"
          >
            {/* Subtle Pink Outer Ring */}
            <div className="absolute inset-2 rounded-xl border border-pink-400/20 group-hover:border-pink-300/50 transition-colors" />

            <span className="text-3xl sm:text-5xl font-serif gold-text-gradient font-bold tracking-tight">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-pink-200/80 text-xs sm:text-sm tracking-widest uppercase mt-2 font-light">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
