export type LocalizedString = { de: string; en: string };

export interface HouseContent {
  title: LocalizedString;
  rating: {
    score: string;
    badge: LocalizedString;
    reviews: LocalizedString;
    location: LocalizedString;
  };
  highlight: {
    label: LocalizedString;
    quote: LocalizedString;
  };
  facts: {
    id: 'bedrooms' | 'bathrooms' | 'pets' | 'occupancy' | 'wifi' | 'size' | 'type';
    icon: 'bed' | 'bath' | 'pet' | 'people' | 'wifi' | 'area' | 'home';
    label: LocalizedString;
    value: LocalizedString;
  }[];
  gallery: {
    hero: { src: string; alt: LocalizedString };
    supporting: { src: string; alt: LocalizedString }[];
    ctaLabel: LocalizedString;
  };
  notes: LocalizedString;
}

/**
 * To replace placeholders: add your real image files under `public/house/` and
 * update the `src` paths below. Keep alt text updated for accessibility.
 */
export const houseContent: HouseContent = {
  title: {
    de: "Surf-Bungalow in erster Reihe mit Meerblick, privater Terrasse und Wi‑Fi",
    en: "Surf bungalow on the waterfront with sea view, private terrace, and Wi‑Fi",
  },
  rating: {
    score: "9,8",
    badge: { de: "Fantastisch", en: "Fantastic" },
    reviews: { de: "8 Bewertungen", en: "8 reviews" },
    location: { de: "Pepelow, Salzhaff", en: "Pepelow, Salzhaff" },
  },
  highlight: {
    label: { de: "Was Gäste lieben", en: "What guests love" },
    quote: { de: "“Die Ausstattung ist sehr gut.”", en: "\"The furnishings are excellent.\"" },
  },
  facts: [
    {
      id: 'bedrooms',
      icon: 'bed',
      label: { de: "Schlafzimmer", en: "Bedrooms" },
      value: { de: "2", en: "2" },
    },
    {
      id: 'bathrooms',
      icon: 'bath',
      label: { de: "Badezimmer", en: "Bathroom" },
      value: { de: "1", en: "1" },
    },
    {
      id: 'pets',
      icon: 'pet',
      label: { de: "Haustiere", en: "Pets" },
      value: { de: "Nicht erlaubt", en: "Not allowed" },
    },
    {
      id: 'occupancy',
      icon: 'people',
      label: { de: "Personen", en: "Guests" },
      value: { de: "4 Personen", en: "4 guests" },
    },
    {
      id: 'wifi',
      icon: 'wifi',
      label: { de: "WLAN", en: "Wi‑Fi" },
      value: { de: "Inklusive", en: "Included" },
    },
    {
      id: 'size',
      icon: 'area',
      label: { de: "Größe", en: "Size" },
      value: { de: "40 m²", en: "40 m²" },
    },
    {
      id: 'type',
      icon: 'home',
      label: { de: "Objekttyp", en: "Property type" },
      value: { de: "Bungalow", en: "Bungalow" },
    },
  ],
  gallery: {
    hero: {
      src: "/house/hero-placeholder.svg",
      alt: {
        de: "Terrasse mit Sofa, Meerblick und Bäumen im Hintergrund",
        en: "Terrace with sofa, sea view, and trees in the background",
      },
    },
    supporting: [
      {
        src: "/house/support-1.svg",
        alt: {
          de: "Seitliche Ansicht der Terrasse mit Sofa",
          en: "Side view of the terrace with sofa",
        },
      },
      {
        src: "/house/support-2.svg",
        alt: {
          de: "Fußweg zwischen den Bungalows am Meer",
          en: "Pathway between bungalows by the sea",
        },
      },
      {
        src: "/house/support-3.svg",
        alt: {
          de: "Blick auf das Wasser hinter dem Zaun",
          en: "View of the water behind the fence",
        },
      },
      {
        src: "/house/support-4.svg",
        alt: {
          de: "Bäume mit Blick auf das Meer",
          en: "Trees with a view of the sea",
        },
      },
    ],
    ctaLabel: { de: "Alle Bilder ansehen", en: "View all photos" },
  },
  notes: {
    de: "Statische Inhalte mit Platzhaltern; Bilder können unter /public/house/ ersetzt werden.",
    en: "Static content with placeholders; replace images under /public/house/.",
  },
};
