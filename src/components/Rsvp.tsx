'use client';

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { wedding } from '@/data/wedding';
import { buttonSolid, Reveal, SectionTitle } from './ui';

export const Rsvp: React.FC<{ guestName: string; guestCount: number }> = ({ guestName, guestCount }) => {
  const [name, setName] = useState(guestName);
  const [attending, setAttending] = useState(true);
  const [guests, setGuests] = useState(guestCount || 1);
  const [message, setMessage] = useState('');

  const maxGuests = Math.max(guestCount, 5);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `RSVP – ${wedding.bride.name} & ${wedding.groom.name}`,
      `Name: ${name.trim()}`,
      attending ? `Attending: Yes (${guests} ${guests === 1 ? 'guest' : 'guests'})` : 'Attending: Sorry, can’t make it',
      message.trim() && `Wishes: ${message.trim()}`,
    ].filter(Boolean);
    window.open(`https://wa.me/${wedding.rsvpWhatsApp}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
  };

  const field =
    'w-full rounded-xl border border-blush-200 bg-white px-4 py-3 text-ink outline-none transition focus:border-blush-400 focus:ring-2 focus:ring-blush-100';
  const label = 'mb-1.5 block text-xs tracking-wider text-ink-soft';
  const choice = (active: boolean) =>
    `rounded-xl border px-4 py-3 text-sm transition cursor-pointer ${
      active ? 'border-blush-600 bg-blush-600 text-white shadow-md shadow-blush-200' : 'border-blush-200 bg-white text-ink hover:bg-blush-50'
    }`;

  return (
    <section id="rsvp" className="scroll-mt-4 bg-gradient-to-b from-blush-50 to-blush-100 px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-md">
        <SectionTitle
          eyebrow={`Kindly respond by ${wedding.rsvpBy}`}
          title="Will You Join Us?"
          subtitle="Your reply reaches the family straight away"
        />
        <Reveal>
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label htmlFor="rsvp-name" className={label}>Your name</label>
              <input id="rsvp-name" required value={name} onChange={(e) => setName(e.target.value)} className={field} />
            </div>

            <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Will you attend?">
              <button type="button" role="radio" aria-checked={attending} onClick={() => setAttending(true)} className={choice(attending)}>
                Joyfully accept
              </button>
              <button type="button" role="radio" aria-checked={!attending} onClick={() => setAttending(false)} className={choice(!attending)}>
                Regretfully decline
              </button>
            </div>

            {attending && (
              <div>
                <label htmlFor="rsvp-guests" className={label}>Number of guests</label>
                <select id="rsvp-guests" value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={field}>
                  {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="rsvp-message" className={label}>Your wishes for the couple (optional)</label>
              <textarea id="rsvp-message" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className={`${field} resize-none`} />
            </div>

            <button type="submit" className={`${buttonSolid} w-full py-3.5`}>
              <Send className="h-4 w-4" /> Send RSVP on WhatsApp
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
};
