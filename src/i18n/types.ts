import type { CollectionEntry } from 'astro:content';

export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'de';

export type HomeContent = CollectionEntry<'home'>['data'];

export type CalendarContent = {
  metaTitle: string;
  metaDescription?: string;
  eyebrow: string;
  loadingLabel: string;
  loadErrorMessage: string;
  selectionLabel: string;
  fromLabel: string;
  toLabel: string;
  bookButtonLabel: string;
  bookButtonLoadingLabel: string;
  bookingSuccessMessage: string;
  bookingErrorMessage: string;
  modalEyebrow: string;
  modalHeading: string;
  modalDescription: string;
  modalCloseLabel: string;
  firstNameLabel: string;
  lastNameLabel: string;
  streetLabel: string;
  houseNumberLabel: string;
  postalCodeLabel: string;
  countryLabel: string;
  guestCountLabel: string;
  notesLabel: string;
  cancelLabel: string;
  confirmBookingLabel: string;
  confirmBookingLoadingLabel: string;
};

export type LocaleStrings = {
  home: HomeContent;
  calendar: CalendarContent;
};
