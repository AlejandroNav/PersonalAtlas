import type {
    Collection,
    Genre,
    Item,
    ItemBase,
    Tag,
} from "../types/models";

// ========================================
// 1. GENRES
// ========================================

export const genres: Genre[] = [
    {
        id: "adventure",
        name: "Adventure",
        categories: ["game"],
    },
    {
        id: "puzzle",
        name: "Puzzle",
        categories: ["game"],
    },
    {
        id: "science-fiction",
        name: "Science Fiction",
        categories: ["game", "book", "movie", "series"],
    },
    {
        id: "fantasy",
        name: "Fantasy",
        categories: ["game", "book", "movie", "series"],
    },
    {
        id: "drama",
        name: "Drama",
        categories: ["movie", "series"],
    },
    {
        id: "indie-folk",
        name: "Indie Folk",
        categories: ["song", "album"],
    },
    {
        id: "ambient",
        name: "Ambient",
        categories: ["song", "album"],
    },
];

// ========================================
// 2. UNIVERSAL TAGS
// ========================================

export const tags: Tag[] = [
    { id: "cozy", name: "Cozy" },
    { id: "depressing", name: "Depressing" },
    { id: "atmospheric", name: "Atmospheric" },
    { id: "nostalgic", name: "Nostalgic" },
    { id: "favorite", name: "Favorite" },
    { id: "mysterious", name: "Mysterious" },
];

// ========================================
// 3. DEFAULT ITEM VALUES
// ========================================


// Default values shared by all items.
const createdAt = "2026-11-11T00:00:00Z";

const common = {
    description: "",
    review: null,
    coverUrl: null,
    images: [],
    experienceStatus: "completed",
    publicationStatus: "published",
    isFavorite: false,
    createdAt,
    updatedAt: createdAt,
} satisfies Pick<
    ItemBase,
    | "description"
    | "review"
    | "coverUrl"
    | "images"
    | "experienceStatus"
    | "publicationStatus"
    | "isFavorite"
    | "createdAt"
    | "updatedAt"
>;

// ========================================
// 4. ITEMS
// ========================================

export const items: Item[] = [
    // GAME
    {
        ...common,
        id: "game-tunic",
        slug: "tunic",
        title: "Tunic",
        category: "game",
        description: "An adventure about exploration and discovery.",
        review: "A wonderful game full of secrets.",
        rating: 9,
        coverUrl: "/images/tunic-cover.webp",
        images: [
            {
                id: "tunic-01",
                url: "/images/tunic-exploration.webp",
                alt: "The fox exploring a fantasy environment",
                caption: "Exploring the world.",
            },
            {
                id: "tunic-02",
                url: "/images/tunic-forest.webp",
                alt: "A forest environment in Tunic",
            },
        ],
        genreIds: ["adventure", "puzzle"],
        tagIds: ["atmospheric", "mysterious"],
        isFavorite: true,
        metadata: {
            developer: "Isometricorp Games",
            platforms: ["PC"],
            playtimeHours: 18,
            releaseYear: 2022,
        },
    },

    // BOOK
    {
        ...common,
        id: "book-left-hand",
        slug: "the-left-hand-of-darkness",
        title: "The Left Hand of Darkness",
        category: "book",
        description: "A science fiction novel.",
        review: "An unforgettable story.",
        rating: 10,
        genreIds: ["science-fiction"],
        tagIds: ["atmospheric"],
        metadata: {
            author: "Ursula K. Le Guin",
            pageCount: 304,
            publicationYear: 1969,
        },
    },

    // MOVIE
    {
        ...common,
        id: "movie-arrival",
        slug: "arrival",
        title: "Arrival",
        category: "movie",
        rating: 9,
        genreIds: ["science-fiction", "drama"],
        tagIds: ["depressing", "atmospheric"],
        metadata: {
            director: "Denis Villeneuve",
            runtimeMinutes: 116,
            releaseYear: 2016,
        },
    },

    // SERIES — no individual episodes
    {
        ...common,
        id: "series-dark",
        slug: "dark",
        title: "Dark",
        category: "series",
        rating: 9,
        genreIds: ["science-fiction", "drama"],
        tagIds: ["depressing", "mysterious"],
        metadata: {
            creator: "Baran bo Odar",
            seasonsWatched: 3,
            totalSeasons: 3,
        },
    },

    // SONG
    {
        ...common,
        id: "song-fourth-july",
        slug: "fourth-of-july",
        title: "Fourth of July",
        category: "song",
        rating: 9,
        genreIds: ["indie-folk"],
        tagIds: ["depressing"],
        metadata: {
            artist: "Sufjan Stevens",
            albumId: "album-carrie-lowell",
        },
    },

    // ALBUM
    {
        ...common,
        id: "album-carrie-lowell",
        slug: "carrie-and-lowell",
        title: "Carrie & Lowell",
        category: "album",
        rating: 10,
        genreIds: ["indie-folk"],
        tagIds: ["depressing", "favorite"],
        metadata: {
            artist: "Sufjan Stevens",
            trackCount: 11,
            releaseYear: 2015,
        },
    },

    // PLACE
    {
        ...common,
        id: "place-paris",
        slug: "paris",
        title: "Paris",
        category: "place",
        description: "The capital of France.",
        review: "A beautiful city to explore.",
        rating: 9,
        images: [
            {
                id: "paris-01",
                url: "/images/paris-seine.webp",
                alt: "The Seine river in Paris",
                caption: "Along the Seine.",
            },
        ],
        genreIds: [],
        tagIds: ["nostalgic", "atmospheric"],
        metadata: {
            city: "Paris",
            country: "France",
        },
    },

    // OTHER
    {
        ...common,
        id: "other-notebook",
        slug: "travel-notebook",
        title: "Travel Notebook",
        category: "other",
        review: null,
        rating: null,
        experienceStatus: "in_progress",
        publicationStatus: "draft",
        genreIds: [],
        tagIds: ["nostalgic"],
        metadata: {
            kind: "Personal notebook",
        },
    },
];

// ========================================
// 5. COLLECTIONS
// ========================================

export const collections: Collection[] = [
    {
        id: "collection-favorites",
        title: "Personal Favorites",
        description: "A manually curated selection.",
        kind: "manual",
        itemIds: [
            "game-tunic",
            "book-left-hand",
            "movie-arrival",
        ],
    },
    {
        id: "collection-sad",
        title: "Beautifully Depressing",
        description: "Highly rated emotional experiences.",
        kind: "smart",
        filters: {
            tagIds: ["depressing"],
            minRating: 9,
        },
    },
];
