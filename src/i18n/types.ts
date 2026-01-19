import type { CollectionEntry } from 'astro:content';

export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'de';

export type HomeContent = CollectionEntry<'home'>['data'];

export type LocaleStrings = {
  home: HomeContent;
};
