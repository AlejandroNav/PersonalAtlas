
import type { Collection, Item } from "../../types/models";
import { filterItems } from "../items/item-utils";

export function getCollectionItems(
    collection: Collection,
    items: Item[],
): Item[] {
    if (collection.kind === "manual") {
        // Create a lookup table for fast item access.
        const itemsById = new Map(
            items.map((item) => [item.id, item]),
        );

        // Preserve the order chosen by the collection owner.
        return collection.itemIds.flatMap((id) => {
            const item = itemsById.get(id);

            return item ? [item] : [];
        });
    }

    // Smart collections are calculated dynamically.
    return filterItems(items, collection.filters);
}
