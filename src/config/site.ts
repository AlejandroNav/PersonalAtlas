
export const SITE_NAME = "Personal Atlas";

export const CATEGORIES = [
    "game",
    "book",
    "movie",
    "series",
    "song",
    "album",
    "place",
    "other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const SITE_CONFIG = {
    supportedLanguages: ["en", "es"],
    defaultLanguage: "en",
    rating: {
        min: 1,
        max: 10,
        integerOnly: true,
    },
    allowMultipleGenres: true,
    genresScopedToCategory: true,
    tagsAreUniversal: true,
    collectionTypes: ["manual", "smart"],
    singleAdmin: true,
} as const;
