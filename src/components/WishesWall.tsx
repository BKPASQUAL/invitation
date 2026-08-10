'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Send, Sparkles, User } from 'lucide-react';
import { GuestWish, Language } from '@/types/wedding';
import { dictionary } from '@/data/dictionary';

interface WishesWallProps {
  wishes: GuestWish[];
  lang: Language;
  onAddWish: (newWish: GuestWish) => void;
}

export const WishesWall: React.FC<WishesWallProps> = ({ wishes, lang, onAddWish }) => {
  const t = dictionary[lang];

  const [author, setAuthor] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [likesState, setLikesState] = useState<{ [id: string]: number }>(
    wishes.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.likes }), {})
  );

  const handleLike = (id: string) => {
    setLikesState((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    const newWish: GuestWish = {
      id: Date.now().toString(),
      author: author.trim(),
      relation: relation.trim() || (lang === 'si' ? 'හිතවතා' : 'Wellwisher'),
      message: message.trim(),
      likes: 1,
      date: lang === 'si' ? 'දැන්' : 'Just now',
    };

    onAddWish(newWish);
    setLikesState((prev) => ({ ...prev, [newWish.id]: 1 }));
    setAuthor('');
    setRelation('');
    setMessage('');
  };

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-200 text-xs sm:text-sm font-medium mb-3">
          <MessageCircle className="w-4 h-4 text-pink-300" />
          <span>{t.wishesHeading}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif gold-text-gradient font-bold mb-3">
          {lang === 'si' ? 'ආශීර්වාද පවුර' : 'Guestbook Blessings'}
        </h2>
        <p className="text-pink-100/70 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-light">
          {t.wishesSubheading}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Wish Post Form */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 sticky top-24">
            <h3 className="text-xl font-serif gold-text-gradient font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-300" />
              <span>{t.leaveWish}</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-pink-200 text-xs tracking-wider uppercase font-semibold mb-1">
                  {t.authorPlaceholder} *
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder={t.authorPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-pink-400/30 text-pink-100 placeholder-pink-200/30 focus:border-pink-400 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-pink-200 text-xs tracking-wider uppercase font-semibold mb-1">
                  {t.relationPlaceholder}
                </label>
                <input
                  type="text"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  placeholder={t.relationPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-pink-400/30 text-pink-100 placeholder-pink-200/30 focus:border-pink-400 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-pink-200 text-xs tracking-wider uppercase font-semibold mb-1">
                  {lang === 'si' ? 'සුබ පැතුම' : 'Blessing Note'} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.wishPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-pink-400/30 text-pink-100 placeholder-pink-200/30 focus:border-pink-400 focus:outline-none text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700 text-white font-bold text-sm shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{t.postWishBtn}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Wishes Feed */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence initial={false}>
            {wishes.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card p-6 relative group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-200 font-serif font-bold">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-pink-100 font-medium text-base leading-tight">
                        {item.author}
                      </h4>
                      <span className="text-pink-300/80 text-xs">{item.relation}</span>
                    </div>
                  </div>
                  <span className="text-pink-200/50 text-xs font-light">{item.date}</span>
                </div>

                <p className="text-pink-100/90 text-sm leading-relaxed font-light mb-4 italic">
                  &ldquo;{item.message}&rdquo;
                </p>

                <div className="flex items-center justify-end">
                  <button
                    onClick={() => handleLike(item.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-950/40 border border-pink-400/30 text-pink-200 text-xs font-medium hover:bg-pink-500/20 transition-all cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400 animate-pulse" />
                    <span>{likesState[item.id] || item.likes}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
