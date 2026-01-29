import de from './de';
import en from './en';
import type { Locale, LocaleStrings } from './types';

export { defaultLocale, locales } from './types';
export type { CalendarContent, HomeContent, Locale } from './types';

const stringsByLocale = {
  de,
  en,
} satisfies Record<Locale, LocaleStrings>;

export const getStrings = (locale: Locale): LocaleStrings => stringsByLocale[locale];
