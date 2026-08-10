'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ZoomIn } from 'lucide-react';
import { CoupleDetails, Language } from '@/types/wedding';
import { dictionary } from '@/data/dictionary';

interface PhotoGalleryProps {
  couple: CoupleDetails;
  lang: Language;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ couple, lang }) => {
  const t = dictionary[lang];

  const photos = [
    { src: couple.coverImage, title: 'Royal Traditional Attire', caption: 'Kandyan Nilame & Osari Elegance' },
    { src: couple.poruwaImage, title: 'Poruwa Ceremony Rituals', caption: 'Traditional Sri Lankan Blessing' },
    { src: couple.casualImage, title: 'Sunset at Bentota Beach', caption: 'Pre-wedding moments in paradise' },
  ];

  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-200 text-xs sm:text-sm font-medium mb-3">
          <Camera className="w-4 h-4 text-pink-300" />
          <span>{t.galleryHeading}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif gold-text-gradient font-bold mb-3">
          {lang === 'si' ? 'මතක සටහන් එකතුව' : 'Pre-Wedding Moments'}
        </h2>
        <p className="text-pink-100/70 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-light">
          {t.gallerySubheading}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {photos.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            onClick={() => setActivePhoto(item.src)}
            className="glass-card p-3 overflow-hidden cursor-pointer group relative"
          >
            <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#180710] via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-pink-200 font-serif font-bold text-base">{item.title}</span>
                <span className="text-pink-100/80 text-xs">{item.caption}</span>
                <div className="mt-2 inline-flex items-center gap-1 text-pink-300 text-xs font-semibold">
                  <ZoomIn className="w-4 h-4" />
                  <span>Click to view full size</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-pink-950/80 border border-pink-400/40 text-pink-200 hover:bg-pink-500/20 transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative w-full max-w-4xl h-[80vh] rounded-2xl overflow-hidden border border-pink-400/40 shadow-2xl">
              <Image src={activePhoto} alt="Full pre-wedding image" fill className="object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
