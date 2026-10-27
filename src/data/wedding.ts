// All invitation details live here. Edit this file to change names, dates, venue or contacts.

export const wedding = {
  bride: {
    name: 'Sanduni',
    parents: 'Daughter of Mr. & Mrs. Perera',
    // Photo crop: which point of the image to zoom into (x% y%)
    photo: '/images/casual.png',
    photoFocus: '48% 45%',
  },
  groom: {
    name: 'Kasun',
    parents: 'Son of Mr. & Mrs. Wickramasinghe',
    photo: '/images/casual.png',
    photoFocus: '63% 40%',
  },

  // Local time of the ceremony (used by the countdown and calendar link)
  date: '2026-11-28T09:30:00+05:30',
  dateLabel: 'Saturday, 28 November 2026',
  dateShort: '28 · 11 · 2026',
  ceremonyTime: '9:30 AM',
  rsvpBy: '15 November 2026',

  coverImage: '/images/hero.png',

  events: [
    { time: '9:00 AM', title: 'Arrival of Guests', note: 'Welcome drinks at the reception hall' },
    { time: '9:30 AM', title: 'Poruwa Ceremony', note: 'The auspicious Poruwa ritual' },
    { time: '10:30 AM', title: 'Registration', note: 'Signing of the marriage register' },
    { time: '12:30 PM', title: 'Wedding Lunch', note: 'Lunch and celebrations' },
  ],

  venue: {
    name: 'Shangri-La Colombo',
    address: '1 Galle Face, Colombo 00200',
    mapQuery: 'Shangri-La Colombo',
  },

  // RSVP replies are sent to this WhatsApp number (digits only, with country code)
  rsvpWhatsApp: '94770000000',

  contacts: [
    { label: "Bride's family", phone: '+94 77 000 0000' },
    { label: "Groom's family", phone: '+94 77 000 0001' },
  ],

  wishes: [
    { message: 'Wishing you both a lifetime of love and happiness!', author: 'Uncle Chaminda' },
    { message: 'So happy for you two. Can’t wait to celebrate with you!', author: 'Ruwanthi' },
    { message: 'දෙදෙනාටම ප්‍රීතිමත් යුග දිවියකට සුබ පැතුම්!', author: 'Sunil & Latha' },
  ],
};

export type Wedding = typeof wedding;
