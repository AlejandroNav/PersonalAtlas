
import { describe, expect, it } from "vitest";

import { genres, items, tags } from "../../data/seed";
import {
    filterItems,
    getGenresForCategory,
    validateItem,
} from "./item-utils";

describe("Genre filtering", () => {
    it("returns only genres available to songs", () => {
        const result = getGenresForCategory("song", genres);

        expect(result.map((genre) => genre.id)).toEqual([
            "indie-folk",
            "ambient",
        ]);
    });

    it("rejects incompatible genres", () => {
        const movie = items.find((item) => item.category === "movie");

        if (!movie) {
            throw new Error("Sample movie is missing");
        }

        const invalidMovie = {
            ...movie,
            genreIds: ["puzzle"],
        };

        const errors = validateItem(invalidMovie, genres, tags);

        expect(errors).toContain(
            'Genre "Puzzle" is not valid for "movie".',
        );
    });
});

describe("Item filtering", () => {
    it("filters by category", () => {
        const result = filterItems(items, {
            categories: ["game"],
        });

        expect(result.map((item) => item.title)).toEqual([
            "Tunic",
        ]);
    });

    it("finds depressing items across different categories", () => {
        const result = filterItems(items, {
            tagIds: ["depressing"],
        });

        expect(result.map((item) => item.category)).toEqual([
            "movie",
            "series",
            "song",
            "album",
        ]);
    });

    it("requires all selected tags", () => {
        const result = filterItems(items, {
            tagIds: ["depressing", "atmospheric"],
        });

        expect(result.map((item) => item.title)).toEqual([
            "Arrival",
        ]);
    });

    it("matches any selected genre", () => {
        const result = filterItems(items, {
            genreIds: ["puzzle", "indie-folk"],
        });

        expect(result.map((item) => item.title)).toEqual([
            "Tunic",
            "Fourth of July",
            "Carrie & Lowell",
        ]);
    });

    it("excludes unrated items from rating filters", () => {
        const result = filterItems(items, {
            minRating: 10,
        });

        expect(result.map((item) => item.title)).toEqual([
            "The Left Hand of Darkness",
            "Carrie & Lowell",
        ]);
    });

    it("filters favorites", () => {
        const result = filterItems(items, {
            favoritesOnly: true,
        });

        expect(result.map((item) => item.title)).toEqual([
            "Tunic",
        ]);
    });
});

describe("Item validation", () => {
    it("accepts all valid sample items", () => {
        for (const item of items) {
            expect(validateItem(item, genres, tags)).toEqual([]);
        }
    });

    it("rejects decimal ratings", () => {
        const invalidItem = {
            ...items[0],
            rating: 9.5,
        };

        expect(
            validateItem(invalidItem, genres, tags),
        ).toContain("Rating must be an integer from 1 to 10.");
    });

    it("rejects nonexistent universal tags", () => {
        const invalidItem = {
            ...items[0],
            tagIds: ["unknown-tag"],
        };

        expect(
            validateItem(invalidItem, genres, tags),
        ).toContain("Unknown tag: unknown-tag");
    });

    it("allows items without reviews or galleries", () => {
        const validItem = {
            ...items[0],
            review: null,
            images: [],
        };

        expect(
            validateItem(validItem, genres, tags),
        ).toEqual([]);
    });

    it("rejects duplicate image IDs", () => {
        const image = {
            id: "same-id",
            url: "/images/example.webp",
            alt: "Example image",
        };

        const invalidItem = {
            ...items[0],
            images: [image, image],
        };

        expect(
            validateItem(invalidItem, genres, tags),
        ).toContain("Duplicate image ID: same-id");
    });

    it("requires alt text for gallery images", () => {
        const invalidItem = {
            ...items[0],
            images: [
                {
                    id: "image-1",
                    url: "/images/test.webp",
                    alt: "",
                },
            ],
        };

        expect(
            validateItem(invalidItem, genres, tags),
        ).toContain("Image alt text is required.");
    });
});
