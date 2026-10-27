// All invitation details live here. Edit this file to change names, dates, venue or contacts.

export const wedding = {
  bride: {
    name: 'Chandula',
    parents: 'Daughter of Mr. & Mrs. Senanayake',
    // Circle photo. face = centre of the face as a fraction of the photo (0–1 across, 0–1 down),
    // zoom = how close to crop (1 = whole width), aspect = photo height ÷ width.
    photo: { src: '/couple/bride.jpg', face: [0.5, 0.225], zoom: 2.2, aspect: 1.5 },
  },
  groom: {
    name: 'Nawod',
    parents: 'Son of Mr. & Mrs. Gamage',
    photo: { src: '/couple/groom.jpg', face: [0.48, 0.27], zoom: 2.2, aspect: 1.5 },
  },

  // Local time of the ceremony (used by the countdown and calendar link)
  date: '2027-02-11T09:30:00+05:30',
  dateLabel: 'Thursday, 11 February 2027',
  dateShort: '11 · 02 · 2027',
  ceremonyTime: '9:30 AM',
  rsvpBy: '25 January 2027',

  // Picture shown when the invitation link is shared (e.g. WhatsApp preview)
  coverImage: '/memories/memory-7.jpg',

  // Background song: put the MP3 file in public/music/ with this name
  music: '/music/perfect.mp3',

  // Memories gallery. The FIRST photo is shown large as the highlight.
  // Put your photos in public/memories/ and list them here in order.
  // caption and focus (which part of the photo to keep in view, e.g. 'center top') are optional.
  memories: [
    { src: '/memories/memory-1.jpg', caption: 'Where it all began', focus: '55% 40%' },
    { src: '/memories/memory-2.jpg', focus: '50% 40%' },
    { src: '/memories/memory-3.jpg', focus: '50% 45%' },
    { src: '/memories/memory-4.jpg', focus: '55% 50%' },
    { src: '/memories/memory-5.jpg', focus: '50% 40%' },
    { src: '/memories/memory-6.jpg', focus: '55% 40%' },
    { src: '/memories/memory-7.jpg', focus: '50% 35%' },
  ] as { src: string; caption?: string; focus?: string }[],

  events: [
    { time: '9:00 AM', title: 'Arrival of Guests', note: 'Welcome drinks at the reception hall' },
    { time: '9:30 AM', title: 'Poruwa Ceremony', note: 'The auspicious Poruwa ritual' },
    { time: '10:30 AM', title: 'Registration', note: 'Signing of the marriage register' },
    { time: '12:30 PM', title: 'Wedding Lunch', note: 'Lunch and celebrations' },
  ],

  venue: {
    name: 'Monarch Imperial',
    address: 'Sri Jayawardenepura Kotte',
    mapQuery: 'Monarch Imperial, Sri Jayawardenepura Kotte, Sri Lanka',
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
