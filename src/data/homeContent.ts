interface HeroContent {
    eyebrow?: string;
    headline: string;
    body: string[];
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
            headline: "A grounded retreat in Upper Bavaria",
            body: [
                "Arrive, breathe out — a quiet home with honest materials.",
                "Plenty of space to slow down, close to forest and fields."
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
            subheadline: "Arrive, breathe out — a quiet home with honest materials.",
            cta: "Start booking inquiry"
        },
        nav: {
            home: "Home",
            about: "About",
            contact: "Contact"
        }
    },
    de: {
        hero: {
            eyebrow: "Zwischen Stadt und Alpen",
            headline: "Ein geerdeter Rückzugsort in Oberbayern",
            body: [
                "Komm an, atme aus – ein stilles Zuhause mit ehrlichen Materialien.",
                "Viel Raum zum Durchatmen, nah an Wald und Wiese, ohne Luxus-Klimbim."
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
            subheadline: "Komm an, atme aus – ein stilles Zuhause mit ehrlichen Materialien.",
            cta: "Buchungsanfrage senden"
        },
        nav: {
            home: "Startseite",
            about: "Über uns",
            contact: "Kontakt"
        }
    },
};

export type HomeContent = ContentStrings;
