import type { HomeContent } from '../../i18n';
import GallerySection from './GallerySection.astro';
import AmenitiesSection from './AmenitiesSection.astro';
import BookingSection from './BookingSection.astro';

type SectionLabelKey = 'sectionGalleryLabel' | 'sectionAmenitiesLabel' | 'sectionBookingLabel';

type SectionComponent = typeof GallerySection;

type SectionDefinition = {
  id: string;
  contentKey: SectionLabelKey;
  Component: SectionComponent;
};

export type HomeSection = SectionDefinition & {
  label: string;
};

const baseSections: SectionDefinition[] = [
  {
    id: 'gallery',
    contentKey: 'sectionGalleryLabel',
    Component: GallerySection,
  },
  {
    id: 'amenities',
    contentKey: 'sectionAmenitiesLabel',
    Component: AmenitiesSection,
  },
  {
    id: 'booking',
    contentKey: 'sectionBookingLabel',
    Component: BookingSection,
  },
];

export const getHomeSections = (content: HomeContent): HomeSection[] =>
  baseSections.map((section) => ({
    ...section,
    label: content[section.contentKey],
  }));
