'use client';

import React from 'react';
import { CoupleArt } from './CoupleArt';
import { motion } from 'framer-motion';
import { wedding } from '@/data/wedding';
import { FallingFeathers, Feather } from './ui';

export const Cover: React.FC<{ onOpen: () => void }> = ({ onOpen }) => (
  <motion.div
    key="cover"
    exit={{ opacity: 0, y: -40, transition: { duration: 0.8, ease: 'easeInOut' } }}
    className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-b from-blush-100 via-white to-blush-100 p-4"
  >
    {/* Soft blush glows */}
    <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blush-200/60 blur-3xl" />
    <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-blush-200/60 blur-3xl" />

    {/* Large resting feathers */}
    <Feather className="absolute -left-4 top-16 h-56 w-20 -rotate-[25deg] text-blush-200 sm:left-[12%]" />
    <Feather className="absolute -right-2 bottom-10 h-64 w-24 rotate-[30deg] text-blush-200 sm:right-[12%]" />

    <FallingFeathers className="absolute" />

    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9 }}
      aria-label="Open the invitation"
      className="relative z-40 w-full max-w-sm cursor-pointer rounded-b-[2rem] rounded-t-[12rem] border border-blush-300 bg-white/85 px-6 pb-8 pt-14 text-center shadow-2xl shadow-blush-300/40 backdrop-blur-sm"
    >
      <span className="pointer-events-none absolute inset-2.5 rounded-b-[1.6rem] rounded-t-[11.5rem] border border-blush-200" />

      <p className="text-[10px] uppercase tracking-[0.35em] text-ink-soft">Together with their families</p>

      <h1 className="mt-4 font-script text-5xl leading-tight text-ink sm:text-6xl">{wedding.bride.name}</h1>
      <p className="font-script text-3xl text-blush-500">&</p>
      <h1 className="font-script text-5xl leading-tight text-ink sm:text-6xl">{wedding.groom.name}</h1>

      <p className="mt-3 font-serif text-base italic text-ink-soft">
        request the pleasure of your company at their marriage
      </p>
      <p className="mt-2 text-sm tracking-[0.3em] text-blush-600">{wedding.dateShort}</p>

      <CoupleArt className="mx-auto mt-3 h-44 w-auto sm:h-52" />

      <span className="soft-float mt-6 inline-block rounded-full border border-blush-400 px-6 py-2 text-[11px] uppercase tracking-[0.3em] text-ink">
        Tap to open
      </span>
    </motion.button>
  </motion.div>
);
