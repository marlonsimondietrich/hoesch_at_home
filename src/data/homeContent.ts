interface ContentStrings {
    hero: {
        headline: string;
        subheadline: string;
        cta: string;
    };
    nav: {
        home: string;
        about: string;
        contact: string;
    };
}

export const homeContent: Record<'en' | 'de', ContentStrings> = {
    en: {
        hero: {
            headline: "Welcome to Vibeperform",
            subheadline: "Elevate your performance.",
            cta: "Get Started"
        },
        nav: {
            home: "Home",
            about: "About",
            contact: "Contact"
        }
    },
    de: {
        hero: {
            headline: "Willkommen bei Vibeperform",
            subheadline: "Steigern Sie Ihre Leistung.",
            cta: "Loslegen"
        },
        nav: {
            home: "Startseite",
            about: "Über uns",
            contact: "Kontakt"
        }
    },
};

export type HomeContent = ContentStrings;
