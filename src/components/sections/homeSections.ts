import type { HomeContent } from '../../i18n';
import GallerySection from './GallerySection.astro';
type SectionLabelKey = 'sectionGalleryLabel';

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
];

export const getHomeSections = (content: HomeContent): HomeSection[] =>
  baseSections.map((section) => ({
    ...section,
    label: content[section.contentKey],
  }));
