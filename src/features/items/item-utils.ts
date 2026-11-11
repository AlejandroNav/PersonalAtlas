
import type {
    Item,
    Genre,
    Tag,
    CollectionFilters,
} from "../../types/models";

// 1. Return only genres compatible with a category.
export function getGenresForCategory(
    category: Item["category"],
    genres: Genre[],
): Genre[] {
    return genres.filter((genre) =>
        genre.categories.includes(category),
    );
}

// 2. Find items matching a set of filters.
export function filterItems(
    items: Item[],
    filters: CollectionFilters,
): Item[] {
    return items.filter((item) => {
        // An empty categories array means no restriction.
        if (
            filters.categories?.length &&
            !filters.categories.includes(item.category)
        ) {
            return false;
        }

        // Match ANY of the selected genres.
        if (
            filters.genreIds?.length &&
            !filters.genreIds.some((id) => item.genreIds.includes(id))
        ) {
            return false;
        }

        // Match ALL of the selected tags.
        if (
            filters.tagIds?.length &&
            !filters.tagIds.every((id) => item.tagIds.includes(id))
        ) {
            return false;
        }

        // Unrated items don't match minimum-rating filters.
        if (
            filters.minRating !== undefined &&
            (item.rating === null || item.rating < filters.minRating)
        ) {
            return false;
        }

        if (filters.favoritesOnly && !item.isFavorite) {
            return false;
        }

        return true;
    });
}

// 3. Validate an item before accepting or saving it.
export function validateItem(
    item: Item,
    genres: Genre[],
    tags: Tag[],
): string[] {
    const errors: string[] = [];

    if (!item.id.trim()) {
        errors.push("Item ID is required.");
    }

    if (!item.title.trim()) {
        errors.push("Title is required.");
    }

    if (!item.slug.trim()) {
        errors.push("Slug is required.");
    }

    if (
        item.rating !== null &&
        (!Number.isInteger(item.rating) ||
            item.rating < 1 ||
            item.rating > 10)
    ) {
        errors.push("Rating must be an integer from 1 to 10.");
    }

    // Genres cannot repeat within one item.
    if (new Set(item.genreIds).size !== item.genreIds.length) {
        errors.push("Duplicate genres are not allowed.");
    }

    // Universal tags cannot repeat within one item.
    if (new Set(item.tagIds).size !== item.tagIds.length) {
        errors.push("Duplicate tags are not allowed.");
    }

    // Validate genre references and category compatibility.
    for (const genreId of item.genreIds) {
        const genre = genres.find((g) => g.id === genreId);

        if (!genre) {
            errors.push(`Unknown genre: ${genreId}`);
        } else if (!genre.categories.includes(item.category)) {
            errors.push(
                `Genre "${genre.name}" is not valid for "${item.category}".`,
            );
        }
    }

    // Tags are universal: only existence matters.
    for (const tagId of item.tagIds) {
        if (!tags.some((tag) => tag.id === tagId)) {
            errors.push(`Unknown tag: ${tagId}`);
        }
    }

    // Validate optional gallery images.
    const imageIds = new Set<string>();

    for (const image of item.images) {
        if (!image.id.trim()) {
            errors.push("Image ID is required.");
        }

        if (!image.url.trim()) {
            errors.push("Image URL is required.");
        }

        if (!image.alt.trim()) {
            errors.push("Image alt text is required.");
        }

        if (imageIds.has(image.id)) {
            errors.push(`Duplicate image ID: ${image.id}`);
        }

        imageIds.add(image.id);
    }

    return errors;
}
