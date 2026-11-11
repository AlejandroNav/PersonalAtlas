
import type { Category } from "../config/site";

// 1. Shared values

export type ExperienceStatus =
    | "planned"
    | "in_progress"
    | "completed"
    | "dropped";

export type PublicationStatus =
    | "draft"
    | "published"
    | "archived";
// Individual images in an item's gallery.
export interface ItemImage {
    id: string;
    url: string;
    alt: string;
    caption?: string;
}
// 2. Shared item properties

export interface ItemBase {
    id: string;
    title: string;
    slug: string;
    description: string;
    review: string | null;
    rating: number | null;
    coverUrl: string | null;
    images: ItemImage[];

    genreIds: string[];
    tagIds: string[];

    experienceStatus: ExperienceStatus;
    publicationStatus: PublicationStatus;
    isFavorite: boolean;

    createdAt: string;
    updatedAt: string;
}

// 3. Category-specific metadata

export interface MetadataByCategory {
    game: {
        developer: string;
        platforms: string[];
        playtimeHours?: number;
        releaseYear?: number;
    };

    book: {
        author: string;
        pageCount?: number;
        publicationYear?: number;
    };

    movie: {
        director: string;
        runtimeMinutes?: number;
        releaseYear?: number;
    };

    series: {
        creator: string;
        seasonsWatched?: number;
        totalSeasons?: number;
    };

    song: {
        artist: string;
        albumId?: string;
        durationSeconds?: number;
    };

    album: {
        artist: string;
        trackCount?: number;
        releaseYear?: number;
    };

    place: {
        city: string;
        country: string;
        visitedAt?: string;
        latitude?: number;
        longitude?: number;
    };

    other: {
        kind: string;
    };
}

// 4. Discriminated union of all item categories

export type Item = {
    [K in Category]: ItemBase & {
        category: K;
        metadata: MetadataByCategory[K];
    };
}[Category];

// 5. Genres and universal tags

export interface Genre {
    id: string;
    name: string;
    categories: Category[];
}

export interface Tag {
    id: string;
    name: string;
}

// 6. Collections

export interface CollectionFilters {
    categories?: Category[];
    genreIds?: string[];
    tagIds?: string[];
    minRating?: number;
    favoritesOnly?: boolean;
}

interface CollectionBase {
    id: string;
    title: string;
    description: string;
}

export type Collection =
    | (CollectionBase & {
        kind: "manual";
        itemIds: string[];
    })
    | (CollectionBase & {
        kind: "smart";
        filters: CollectionFilters;
    });
