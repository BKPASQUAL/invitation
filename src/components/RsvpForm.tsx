'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Send, Users, Utensils, Music, Heart, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RsvpSubmission, Language } from '@/types/wedding';
import { dictionary } from '@/data/dictionary';

interface RsvpFormProps {
  lang: Language;
  onRsvpSubmit?: (submission: RsvpSubmission) => void;
}

export const RsvpForm: React.FC<RsvpFormProps> = ({ lang, onRsvpSubmit }) => {
  const t = dictionary[lang];

  const [guestName, setGuestName] = useState('');
  const [emailPhone, setEmailPhone] = useState('');
  const [attending, setAttending] = useState(true);
  const [guestCount, setGuestCount] = useState(1);
  const [mealPreference, setMealPreference] = useState(t.mealBuffet);
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [songRequest, setSongRequest] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const submission: RsvpSubmission = {
      id: Date.now().toString(),
      guestName,
      emailPhone,
      attending,
      guestCount,
      mealPreference,
      dietaryNotes,
      songRequest,
      message,
      submittedAt: new Date().toISOString(),
    };

    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F4A6B7', '#FFB6C1', '#E8A598', '#E05285', '#FFF0F5', '#F9E79F']
    });

    if (onRsvpSubmit) {
      onRsvpSubmit(submission);
    }
    setIsSubmitted(true);
  };

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-200 text-xs sm:text-sm font-medium mb-3">
          <Heart className="w-4 h-4 text-pink-300 fill-pink-300" />
          <span>{t.rsvpHeading}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif gold-text-gradient font-bold mb-3">
          {lang === 'si' ? 'සම්ප්‍රාප්තිය තහවුරු කරන්න' : 'RSVP Confirmation'}
        </h2>
        <p className="text-pink-100/70 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-light">
          {t.rsvpSubheading}
        </p>
      </div>

      <div className="glass-card p-6 sm:p-10 relative overflow-hidden">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-pink-500/20 border-2 border-pink-400 flex items-center justify-center mx-auto text-pink-300">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif gold-text-gradient font-bold">
              {t.rsvpSuccessTitle}
            </h3>
            <p className="text-pink-100/80 max-w-md mx-auto text-sm leading-relaxed">
              {t.rsvpSuccessDesc}
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-6 px-6 py-2.5 rounded-full bg-pink-950/60 border border-pink-400/40 text-pink-200 text-xs font-semibold hover:bg-pink-500/20 transition-all cursor-pointer"
            >
              {lang === 'si' ? 'වෙනත් පිළිතුරක් ඇතුළත් කරන්න' : 'Submit Another Response'}
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Guest Name */}
              <div>
                <label className="block text-pink-200 text-xs tracking-wider uppercase font-semibold mb-2">
                  {t.yourName} *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder={t.authorPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-pink-400/30 text-pink-100 placeholder-pink-200/30 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400 text-sm"
                />
              </div>

              {/* Email / Mobile */}
              <div>
                <label className="block text-pink-200 text-xs tracking-wider uppercase font-semibold mb-2">
                  {t.contactInfo}
                </label>
                <input
                  type="text"
                  value={emailPhone}
                  onChange={(e) => setEmailPhone(e.target.value)}
                  placeholder="077 123 4567 / name@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-pink-400/30 text-pink-100 placeholder-pink-200/30 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400 text-sm"
                />
              </div>
            </div>

            {/* Attendance Toggle */}
            <div>
              <label className="block text-pink-200 text-xs tracking-wider uppercase font-semibold mb-2">
                {t.attendingStatus}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className={`p-4 rounded-xl border flex items-center gap-3 text-sm font-medium transition-all cursor-pointer ${
                    attending
                      ? 'bg-pink-500/20 border-pink-400 text-pink-100 shadow-md'
                      : 'bg-black/30 border-pink-400/20 text-pink-200/60 hover:text-pink-200'
                  }`}
                >
                  <CheckCircle2 className={`w-5 h-5 ${attending ? 'text-pink-300' : 'text-pink-500/40'}`} />
                  <span>{t.attendingYes}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className={`p-4 rounded-xl border flex items-center gap-3 text-sm font-medium transition-all cursor-pointer ${
                    !attending
                      ? 'bg-pink-500/20 border-pink-400 text-pink-100 shadow-md'
                      : 'bg-black/30 border-pink-400/20 text-pink-200/60 hover:text-pink-200'
                  }`}
                >
                  <CheckCircle2 className={`w-5 h-5 ${!attending ? 'text-pink-300' : 'text-pink-500/40'}`} />
                  <span>{t.attendingNo}</span>
                </button>
              </div>
            </div>

            {attending && (
              <>
                {/* Guest Count Selector */}
                <div>
                  <label className="block text-pink-200 text-xs tracking-wider uppercase font-semibold mb-2">
                    {t.numberOfGuests}
                  </label>
                  <div className="flex items-center gap-3">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuestCount(num)}
                        className={`w-12 h-12 rounded-xl font-semibold text-sm border flex items-center justify-center transition-all cursor-pointer ${
                          guestCount === num
                            ? 'bg-gradient-to-tr from-pink-600 via-rose-500 to-pink-400 text-white border-pink-300 font-bold shadow-lg'
                            : 'bg-black/40 border-pink-400/30 text-pink-200/80 hover:border-pink-300'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Meal Preference */}
                <div>
                  <label className="block text-pink-200 text-xs tracking-wider uppercase font-semibold mb-2 flex items-center gap-1.5">
                    <Utensils className="w-4 h-4 text-pink-300" />
                    <span>{t.mealPreference}</span>
                  </label>
                  <select
                    value={mealPreference}
                    onChange={(e) => setMealPreference(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-pink-400/30 text-pink-100 focus:border-pink-400 focus:outline-none text-sm"
                  >
                    <option value={t.mealBuffet} className="bg-stone-900 text-pink-100">
                      {t.mealBuffet}
                    </option>
                    <option value={t.mealContinental} className="bg-stone-900 text-pink-100">
                      {t.mealContinental}
                    </option>
                    <option value={t.mealVegetarian} className="bg-stone-900 text-pink-100">
                      {t.mealVegetarian}
                    </option>
                  </select>
                </div>
              </>
            )}

            {/* Optional Song & Personal Message */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-pink-200 text-xs tracking-wider uppercase font-semibold mb-2 flex items-center gap-1.5">
                  <Music className="w-4 h-4 text-pink-300" />
                  <span>{t.songRequest}</span>
                </label>
                <input
                  type="text"
                  value={songRequest}
                  onChange={(e) => setSongRequest(e.target.value)}
                  placeholder="Song name or artist..."
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-pink-400/30 text-pink-100 placeholder-pink-200/30 focus:border-pink-400 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-pink-200 text-xs tracking-wider uppercase font-semibold mb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-pink-300" />
                  <span>{t.personalMessage}</span>
                </label>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Warm wishes for the couple..."
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-pink-400/30 text-pink-100 placeholder-pink-200/30 focus:border-pink-400 focus:outline-none text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#E05285] via-[#E8A598] to-[#C96885] text-[#1E0512] font-bold text-base shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <Send className="w-5 h-5" />
              <span>{t.submitRsvp}</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
