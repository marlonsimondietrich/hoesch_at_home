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

interface BookingContent {
    heading: string;
    description: string;
    startDateLabel: string;
    endDateLabel: string;
    guestsLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    checkAvailabilityLabel: string;
    bookNowLabel: string;
    availabilityAvailable: string;
    availabilityUnavailable: string;
    availabilityChecking: string;
    availabilityError: string;
    validationError: string;
    bookingError: string;
    successMessage: string;
}

interface ContentStrings {
    hero: HeroContent;
    nav: NavContent;
    booking: BookingContent;
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
        },
        booking: {
            heading: "Check availability",
            description: "Select your dates and guests, then confirm availability before booking.",
            startDateLabel: "Check-in date",
            endDateLabel: "Check-out date",
            guestsLabel: "Guests",
            notesLabel: "Notes",
            notesPlaceholder: "Optional notes for your stay",
            checkAvailabilityLabel: "Check availability",
            bookNowLabel: "Book now",
            availabilityAvailable: "Your dates are available.",
            availabilityUnavailable: "Those dates are not available. Please choose another range.",
            availabilityChecking: "Checking availability...",
            availabilityError: "Something went wrong while checking availability.",
            validationError: "Please choose a valid date range and guest count.",
            bookingError: "Something went wrong while submitting your booking.",
            successMessage: "Booking request submitted."
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
        },
        booking: {
            heading: "Verfügbarkeit prüfen",
            description: "Bitte Zeitraum und Anzahl der Gäste wählen und Verfügbarkeit bestätigen.",
            startDateLabel: "Anreise",
            endDateLabel: "Abreise",
            guestsLabel: "Gäste",
            notesLabel: "Notizen",
            notesPlaceholder: "Optionale Hinweise zur Buchung",
            checkAvailabilityLabel: "Verfügbarkeit prüfen",
            bookNowLabel: "Jetzt buchen",
            availabilityAvailable: "Der gewünschte Zeitraum ist verfügbar.",
            availabilityUnavailable: "Dieser Zeitraum ist nicht verfügbar. Bitte anderen Zeitraum wählen.",
            availabilityChecking: "Verfügbarkeit wird geprüft...",
            availabilityError: "Beim Prüfen der Verfügbarkeit ist ein Fehler aufgetreten.",
            validationError: "Bitte einen gültigen Zeitraum und eine Gästeanzahl angeben.",
            bookingError: "Beim Senden der Buchungsanfrage ist ein Fehler aufgetreten.",
            successMessage: "Buchungsanfrage gesendet."
        }
    },
};

export type HomeContent = ContentStrings;
