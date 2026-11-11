
import { describe, expect, it } from "vitest";

import { collections, items } from "../../data/seed";
import { getCollectionItems } from "./collection-utils";

describe("Manual collections", () => {
    it("preserves the chosen item order", () => {
        const result = getCollectionItems(
            collections[0],
            items,
        );

        expect(result.map((item) => item.id)).toEqual([
            "game-tunic",
            "book-left-hand",
            "movie-arrival",
        ]);
    });

    it("ignores missing item references", () => {
        const collection = {
            id: "test",
            title: "Test",
            description: "",
            kind: "manual" as const,
            itemIds: ["missing-id", "game-tunic"],
        };

        const result = getCollectionItems(collection, items);

        expect(result.map((item) => item.id)).toEqual([
            "game-tunic",
        ]);
    });
});

describe("Smart collections", () => {
    it("automatically finds matching items", () => {
        const result = getCollectionItems(
            collections[1],
            items,
        );

        expect(result.map((item) => item.title)).toEqual([
            "Arrival",
            "Dark",
            "Fourth of July",
            "Carrie & Lowell",
        ]);
    });

    it("automatically includes new matching items", () => {
        const newItem = {
            ...items[0],
            id: "game-new",
            title: "New Game",
            tagIds: ["depressing"],
            rating: 10,
        };

        const result = getCollectionItems(
            collections[1],
            [...items, newItem],
        );

        expect(
            result.some((item) => item.id === "game-new"),
        ).toBe(true);
    });
});
