import type { HomeSection } from '../components/sections/homeSections';

type NavLink = {
  label: string;
  href: string;
};

export const getNavLinks = (
  sections: HomeSection[],
  homeHref: string,
  calendarHref: string
): NavLink[] =>
  sections.map((section) => ({
    label: section.label,
    href: section.id === 'booking' ? calendarHref : `${homeHref}#${section.id}`,
  }));
