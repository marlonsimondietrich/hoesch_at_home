interface HeroContent {
    eyebrow?: string;
    headline: string;
    body: string[];
    features: string[];
    primaryCta: {
        label: string;
        href: string;
    };
    secondaryCta: {
        label: string;
        href: string;
    };
    alt: string;
    toggleLabel: string;
    toggleAriaLabel: string;
    // Transitional fields while migrating from the previous hero structure.
    subheadline?: string;
    cta?: string;
}

interface NavContent {
    home: string;
    about: string;
    contact: string;
}

interface ContentStrings {
    hero: HeroContent;
    nav: NavContent;
}

export const homeContent: Record<'en' | 'de', ContentStrings> = {
    en: {
        hero: {
            eyebrow: "Between city and Alps",
            headline: "Come stay awhile",
            body: [
                "For everyone who loves city, countryside, river, mountain, and lake."
            ],
            features: [
                "Sleeps 8",
                "Daily fresh eggs",
                "Spacious garden"
            ],
            primaryCta: {
                label: "Start booking inquiry",
                href: "#"
            },
            secondaryCta: {
                label: "Learn more",
                href: "#"
            },
            alt: "Illustration of a Bavarian country home in a calm setting",
            toggleLabel: "Switch to German",
            toggleAriaLabel: "Switch language to German",
            subheadline: "For everyone who loves city, countryside, river, mountain, and lake.",
            cta: "Start booking inquiry"
        },
        nav: {
            home: "Gallery",
            about: "About",
            contact: "Contact"
        }
    },
    de: {
        hero: {
            eyebrow: "Zwischen Stadt und Alpen",
            headline: "Dein Zuhause in Oberbayern",
            body: [
                "Für alle die Stadt, Land, Fluss, Berg und See mögen."
            ],
            features: [
                "8 Personen",
                "tägl. frische Eier",
                "Großer Garten"
            ],
            primaryCta: {
                label: "Buchungsanfrage senden",
                href: "#"
            },
            secondaryCta: {
                label: "Mehr erfahren",
                href: "#"
            },
            alt: "Illustration eines bayerischen Landhauses in ruhiger Umgebung",
            toggleLabel: "Switch to English",
            toggleAriaLabel: "Sprache wechseln",
            subheadline: "Für alle die Stadt, Land, Fluss, Berg und See mögen.",
            cta: "Buchungsanfrage senden"
        },
        nav: {
            home: "Gallerie",
            about: "Über uns",
            contact: "Kontakt"
        }
    },
};

export type HomeContent = ContentStrings;
