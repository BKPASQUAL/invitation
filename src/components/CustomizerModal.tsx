'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Check, RotateCcw } from 'lucide-react';
import { CoupleDetails, Language } from '@/types/wedding';
import { dictionary } from '@/data/dictionary';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  couple: CoupleDetails;
  onUpdateCouple: (updated: CoupleDetails) => void;
  onReset: () => void;
  lang: Language;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  couple,
  onUpdateCouple,
  onReset,
  lang,
}) => {
  const t = dictionary[lang];

  const [formData, setFormData] = useState<CoupleDetails>({ ...couple });

  const handleChange = (field: keyof CoupleDetails, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCouple(formData);
    onClose();
  };

  const handleResetClick = () => {
    onReset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-md bg-[#1F0714] border-l border-pink-400/30 h-full overflow-y-auto p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-pink-400/20 mb-6">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-pink-300" />
                  <h3 className="text-xl font-serif gold-text-gradient font-bold">
                    {t.customizerTitle}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-pink-500/10 text-pink-300 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-pink-100/70 text-xs mb-6 leading-relaxed">
                {t.customizerSub}
              </p>

              <form id="customizer-form" onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-pink-200 text-xs tracking-wider uppercase font-semibold mb-1">
                    {t.groomNameLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.groomName}
                    onChange={(e) => handleChange('groomName', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-pink-400/30 text-pink-100 text-sm focus:border-pink-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-pink-200 text-xs tracking-wider uppercase font-semibold mb-1">
                    {t.brideNameLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.brideName}
                    onChange={(e) => handleChange('brideName', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-pink-400/30 text-pink-100 text-sm focus:border-pink-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-pink-200 text-xs tracking-wider uppercase font-semibold mb-1">
                    {t.weddingDateLabel}
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.weddingDate.slice(0, 16)}
                    onChange={(e) => handleChange('weddingDate', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-pink-400/30 text-pink-100 text-sm focus:border-pink-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-pink-200 text-xs tracking-wider uppercase font-semibold mb-1">
                    {t.venueNameLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.venueName}
                    onChange={(e) => handleChange('venueName', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-pink-400/30 text-pink-100 text-sm focus:border-pink-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-pink-200 text-xs tracking-wider uppercase font-semibold mb-1">
                    {t.venueAddressLabel}
                  </label>
                  <input
                    type="text"
                    value={formData.venueAddress}
                    onChange={(e) => handleChange('venueAddress', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-pink-400/30 text-pink-100 text-sm focus:border-pink-400 focus:outline-none"
                  />
                </div>
              </form>
            </div>

            <div className="pt-6 border-t border-pink-400/20 space-y-3">
              <button
                type="submit"
                form="customizer-form"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700 text-white font-bold text-sm shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{t.saveCustomization}</span>
              </button>

              <button
                type="button"
                onClick={handleResetClick}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-900/90 border border-pink-400/30 text-pink-200 text-xs font-semibold hover:bg-pink-500/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.resetDefault}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
