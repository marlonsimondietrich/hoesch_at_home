import type { HomeContent } from '../../i18n';
type SectionLabelKey = 'sectionGalleryLabel';

type SectionDefinition = {
  id: string;
  contentKey: SectionLabelKey;
  Component: typeof import('./GallerySection.astro').default;
};

export type HomeSection = SectionDefinition & {
  label: string;
};

const baseSections: SectionDefinition[] = [];

export const getHomeSections = (content: HomeContent): HomeSection[] =>
  baseSections.map((section) => ({
    ...section,
    label: content[section.contentKey],
  }));
