export type Language = 'en' | 'si';

export type ThemeColor = 'crimson' | 'emerald' | 'sapphire' | 'rosegold';

export interface CoupleDetails {
  groomName: string;
  groomTitle: string;
  groomParents: string;
  brideName: string;
  brideTitle: string;
  brideParents: string;
  weddingDate: string; // ISO string or format
  weddingTime: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl: string;
  wazeUrl: string;
  coverImage: string;
  poruwaImage: string;
  casualImage: string;
}

export interface NakathTime {
  id: string;
  time: string;
  timeSi: string;
  title: string;
  titleSi: string;
  description: string;
  descriptionSi: string;
  iconName: string;
  isAuspicious?: boolean;
}

export interface RsvpSubmission {
  id: string;
  guestName: string;
  emailPhone: string;
  attending: boolean;
  guestCount: number;
  mealPreference: string;
  dietaryNotes?: string;
  songRequest?: string;
  message?: string;
  submittedAt: string;
}

export interface GuestWish {
  id: string;
  author: string;
  relation: string;
  message: string;
  likes: number;
  date: string;
}
