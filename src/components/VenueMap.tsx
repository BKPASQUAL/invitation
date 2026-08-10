'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Calendar, ExternalLink } from 'lucide-react';
import { CoupleDetails, Language } from '@/types/wedding';
import { dictionary } from '@/data/dictionary';

interface VenueMapProps {
  couple: CoupleDetails;
  lang: Language;
}

export const VenueMap: React.FC<VenueMapProps> = ({ couple, lang }) => {
  const t = dictionary[lang];

  const handleGoogleCalendar = () => {
    const title = encodeURIComponent(`${couple.groomName} & ${couple.brideName} Wedding`);
    const details = encodeURIComponent(`We cordially invite you to celebrate our wedding at ${couple.venueName}.`);
    const location = encodeURIComponent(couple.venueAddress);
    const startDate = new Date(couple.weddingDate).toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endDate = new Date(new Date(couple.weddingDate).getTime() + 6 * 3600 * 1000)
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, '');

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    window.open(calendarUrl, '_blank');
  };

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-200 text-xs sm:text-sm font-medium mb-3">
          <MapPin className="w-4 h-4 text-pink-300" />
          <span>{t.venueHeading}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif gold-text-gradient font-bold mb-3">
          {couple.venueName}
        </h2>
        <p className="text-pink-100/70 text-sm sm:text-base font-light">
          {couple.venueAddress}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Venue Photo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-4 sm:p-6 overflow-hidden relative"
        >
          <div className="relative h-72 sm:h-96 w-full rounded-xl overflow-hidden border border-pink-400/30 shadow-2xl">
            <Image
              src={couple.poruwaImage}
              alt="Venue & Poruwa Ceremony setup"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#180710] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-pink-400/30">
              <span className="text-pink-200 font-serif text-lg font-bold block mb-1">
                {couple.venueName}
              </span>
              <p className="text-pink-100/80 text-xs">{couple.venueAddress}</p>
            </div>
          </div>
        </motion.div>

        {/* Directions & Calendar Actions */}
        <div className="space-y-6">
          <div className="glass-card p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-serif gold-text-gradient font-bold">
              {lang === 'si' ? 'ස්ථානයට පැමිණීමට සහ දිනදර්ශනයට එක්කිරීම' : 'Location & Calendar Details'}
            </h3>
            <p className="text-pink-100/80 text-sm leading-relaxed font-light">
              {t.venueSubheading}
            </p>

            <div className="space-y-3 pt-2">
              {/* Google Maps Button */}
              <a
                href={couple.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700 text-white font-semibold text-sm shadow-lg hover:brightness-110 transition-all flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{t.getDirections}</span>
                </div>
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Waze Button */}
              <a
                href={couple.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-stone-900/90 border border-pink-400/40 text-pink-200 font-medium text-sm hover:bg-pink-500/15 transition-all flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-pink-300" />
                  <span>{t.wazeNav}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-pink-300" />
              </a>

              {/* Add to Google Calendar Button */}
              <button
                onClick={handleGoogleCalendar}
                className="w-full py-3.5 px-6 rounded-xl bg-stone-900/90 border border-pink-400/40 text-pink-200 font-medium text-sm hover:bg-pink-500/15 transition-all flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-pink-300" />
                  <span>{t.addToCalendar}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-pink-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
