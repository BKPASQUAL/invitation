'use client';

import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Link2, MapPin, MessageCircle, Phone } from 'lucide-react';
import Image from 'next/image';
import { wedding } from '@/data/wedding';
import { buttonOutline, directionsUrl, Feather, Reveal, Section, SectionTitle } from './ui';

/* ---------- Share links ---------- */

export const ShareLinks: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked; nothing else to do
    }
  };

  const whatsappShare = () => {
    const text = `You're invited to the wedding of ${wedding.bride.name} & ${wedding.groom.name}! ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <Section className="!py-14">
      <Reveal className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={copyLink} className={buttonOutline}>
          <Link2 className="h-4 w-4 text-blush-500" /> {copied ? 'Link copied' : 'Copy link'}
        </button>
        <button type="button" onClick={whatsappShare} className={buttonOutline}>
          <MessageCircle className="h-4 w-4 text-blush-500" /> Share on WhatsApp
        </button>
        <a href={directionsUrl()} target="_blank" rel="noreferrer" className={buttonOutline}>
          <MapPin className="h-4 w-4 text-blush-500" /> Get directions
        </a>
      </Reveal>
    </Section>
  );
};

/* ---------- Bride & Groom ---------- */

type CirclePhoto = { src: string; face: number[]; zoom: number; aspect: number };

// Places the photo so the face sits in the middle of the circle, without leaving gaps at the edges
const circleCrop = ({ face: [fx, fy], zoom, aspect }: CirclePhoto): React.CSSProperties => {
  const clamp = (v: number, min: number) => Math.min(0, Math.max(min, v));
  const left = clamp(0.5 - fx * zoom, 1 - zoom);
  const top = clamp(0.5 - fy * zoom * aspect, 1 - zoom * aspect);
  return {
    position: 'absolute',
    maxWidth: 'none',
    width: `${zoom * 100}%`,
    height: `${zoom * aspect * 100}%`,
    left: `${left * 100}%`,
    top: `${top * 100}%`,
  };
};

const PersonCard: React.FC<{
  role: string;
  person: { name: string; parents: string; photo: CirclePhoto };
}> = ({ role, person }) => (
  <div className="flex flex-col items-center rounded-3xl border border-blush-200 bg-white px-6 py-10 text-center shadow-xl shadow-blush-100">
    <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-white shadow-md ring-2 ring-blush-300">
      <Image
        src={person.photo.src}
        alt={person.name}
        width={600}
        height={Math.round(600 * person.photo.aspect)}
        sizes="320px"
        loading="eager"
        style={circleCrop(person.photo)}
      />
    </div>
    <p className="mt-6 text-[11px] uppercase tracking-[0.35em] text-blush-500">{role}</p>
    <p className="mt-1 font-script text-5xl text-ink">{person.name}</p>
    <p className="mt-3 text-sm font-medium text-ink-soft">{person.parents}</p>
  </div>
);

export const Couple: React.FC = () => (
  <Section id="couple">
    <SectionTitle eyebrow="With the blessings of" title="The Bride & Groom" />
    <Reveal className="relative grid gap-6 sm:grid-cols-2">
      <PersonCard role="The Bride" person={wedding.bride} />
      <PersonCard role="The Groom" person={wedding.groom} />
      <div className="absolute left-1/2 top-1/2 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blush-300 bg-white shadow-md sm:flex">
        <Heart className="h-4 w-4 fill-blush-500 text-blush-500" />
      </div>
    </Reveal>
  </Section>
);

/* ---------- Events ---------- */

export const Events: React.FC = () => (
  <Section id="events">
    <SectionTitle eyebrow="Join us in celebration" title="The Wedding Day" subtitle={wedding.dateLabel} />
    <div className="relative mx-auto max-w-xl">
      <span className="absolute bottom-6 left-[1.15rem] top-6 w-px bg-blush-300" />
      <div className="space-y-5">
        {wedding.events.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.08}>
            <div className="relative flex gap-5">
              <span className="relative z-10 mt-5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blush-300 bg-white">
                <Feather className="h-5 w-2 text-blush-300" />
              </span>
              <div className="flex-1 rounded-2xl border border-blush-200 bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.25em] text-blush-600">{e.time}</p>
                <p className="mt-1 font-serif text-2xl text-ink">{e.title}</p>
                <p className="mt-1 text-sm text-ink-soft">{e.note}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </Section>
);

/* ---------- Venue ---------- */

export const Venue: React.FC = () => (
  <Section id="venue" tint>
    <SectionTitle eyebrow="The venue" title="Find Us" />
    <Reveal className="text-center">
      <div className="overflow-hidden rounded-3xl border border-blush-200 shadow-xl shadow-blush-100">
        <iframe
          title="Venue map"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(wedding.venue.mapQuery)}&z=15&output=embed`}
          className="block h-72 w-full sm:h-80"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <p className="mt-6 font-serif text-3xl text-ink">{wedding.venue.name}</p>
      <p className="mt-1 text-sm text-ink-soft">{wedding.venue.address}</p>
      <a href={directionsUrl()} target="_blank" rel="noreferrer" className={`${buttonOutline} mt-6`}>
        <MapPin className="h-4 w-4 text-blush-500" /> Get directions
      </a>
    </Reveal>
  </Section>
);

/* ---------- Wishes ---------- */

export const Wishes: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = wedding.wishes.length;

  const goTo = (i: number) => {
    const track = trackRef.current;
    const card = track?.children[i] as HTMLElement | undefined;
    if (track && card) track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const pos = track.scrollLeft;
    let nearest = 0;
    cards.forEach((c, i) => {
      if (Math.abs(c.offsetLeft - track.offsetLeft - pos) < Math.abs(cards[nearest].offsetLeft - track.offsetLeft - pos)) {
        nearest = i;
      }
    });
    setIndex(nearest);
  };

  const arrow =
    'flex h-10 w-10 items-center justify-center rounded-full border border-blush-300 bg-white text-ink transition hover:bg-blush-50 disabled:opacity-40 cursor-pointer disabled:cursor-default';

  return (
    <Section>
      <SectionTitle eyebrow="From our family & friends" title="Words of Love" />
      <Reveal>
        <div ref={trackRef} onScroll={onScroll} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
          {wedding.wishes.map((w, i) => (
            <figure
              key={i}
              className="flex min-h-56 w-[85%] shrink-0 snap-start flex-col items-center justify-center rounded-3xl border border-blush-200 bg-white px-8 py-10 text-center shadow-lg shadow-blush-100 sm:w-[60%]"
            >
              <blockquote className="font-serif text-xl italic leading-relaxed text-ink">“{w.message}”</blockquote>
              <figcaption className="mt-4 text-sm text-ink-soft">— {w.author}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-5">
          <button type="button" aria-label="Previous wish" className={arrow} disabled={index === 0} onClick={() => goTo(index - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm tracking-widest text-ink-soft">
            {index + 1} / {count}
          </span>
          <button type="button" aria-label="Next wish" className={arrow} disabled={index === count - 1} onClick={() => goTo(index + 1)}>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </Reveal>
    </Section>
  );
};

/* ---------- Contact ---------- */

export const Contact: React.FC = () => (
  <Section>
    <SectionTitle eyebrow="Reach out to us" title="Contact Us" />
    <Reveal className="mx-auto max-w-md space-y-3">
      {wedding.contacts.map((c) => (
        <a
          key={c.label}
          href={`tel:${c.phone.replace(/\s/g, '')}`}
          className="flex items-center justify-between rounded-2xl border border-blush-200 bg-white px-5 py-4 shadow-sm transition hover:border-blush-400"
        >
          <span className="text-ink-soft">{c.label}</span>
          <span className="flex items-center gap-2 font-medium text-ink">
            <Phone className="h-4 w-4 text-blush-500" /> {c.phone}
          </span>
        </a>
      ))}
    </Reveal>
  </Section>
);

/* ---------- Footer ---------- */

export const Footer: React.FC = () => {
  const share = async () => {
    const data = { title: `${wedding.bride.name} & ${wedding.groom.name}`, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard.writeText(data.url);
    } catch {
      // Share cancelled
    }
  };

  return (
    <footer className="bg-blush-100 px-4 pb-32 pt-16 text-center">
      <p className="font-script text-5xl text-ink">
        {wedding.bride.name} <span className="text-blush-500">&</span> {wedding.groom.name}
      </p>
      <p className="mt-3 text-sm text-ink-soft">With love & the blessings of our families</p>
      <button type="button" onClick={share} className={`${buttonOutline} mt-7`}>
        Share this invitation
      </button>
    </footer>
  );
};
