'use client';

import React, { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Cover } from '@/components/Cover';
import { Hero } from '@/components/Hero';
import { ShareLinks, Couple, Events, Venue, Wishes, Contact, Footer } from '@/components/Sections';
import { Rsvp } from '@/components/Rsvp';
import { BottomNav, MusicButton } from '@/components/Controls';
import { FallingFeathers } from '@/components/ui';

const noSubscribe = () => () => {};

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Personal links: /?to=Nimal%20Silva&guests=2
  const search = useSyncExternalStore(noSubscribe, () => window.location.search, () => '');
  const guest = useMemo(() => {
    const params = new URLSearchParams(search);
    return {
      name: params.get('to')?.trim() ?? '',
      count: Math.max(0, Math.min(20, Number(params.get('guests')) || 0)),
    };
  }, [search]);

  // Keep the page from scrolling behind the cover
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden';
  }, [opened]);

  const open = () => {
    setOpened(true);
    setPlaying(true);
    window.scrollTo(0, 0);
  };

  return (
    <main className="relative">
      <AnimatePresence>{!opened && <Cover onOpen={open} />}</AnimatePresence>

      <Hero guestName={guest.name} guestCount={guest.count} />
      <ShareLinks />
      <Couple />
      <Events />
      <Venue />
      <Wishes />
      <Rsvp key={search} guestName={guest.name} guestCount={guest.count} />
      <Contact />
      <Footer />

      {opened && (
        <>
          <FallingFeathers />
          <BottomNav />
          <MusicButton playing={playing} onToggle={() => setPlaying((p) => !p)} />
        </>
      )}
    </main>
  );
}
