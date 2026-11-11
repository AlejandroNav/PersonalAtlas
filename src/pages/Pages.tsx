
import { Link, useParams } from "react-router";
import { CATEGORIES, type Category } from "../config/site";
import { useLanguage } from "../i18n/useLanguage";
const categoryLabels: Record<
    Category,
    "games" | "books" | "movies" | "series" |
    "songs" | "albums" | "places" | "other"
> = {
    game: "games",
    book: "books",
    movie: "movies",
    series: "series",
    song: "songs",
    album: "albums",
    place: "places",
    other: "other",
};

export function HomePage() {
    const { t } = useLanguage();

    return (
        <section>
            <h1>{t("title")}</h1>
            <p>{t("subtitle")}</p>

            <h2>{t("categories")}</h2>

            <div className="category-grid">
                {CATEGORIES.map((category) => (
                    <Link
                        key={category}
                        className="category-card"
                        to={`/explore/${category}`}
                    >
                        {t(categoryLabels[category])}
                        <span aria-hidden="true"> ↗</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export function ExplorePage() {
    const { t } = useLanguage();
    const { category } = useParams();

    const isValidCategory =
        !category || CATEGORIES.some((c) => c === category);

    if (!isValidCategory) {
        return <NotFoundPage />;
    }

    const heading = category
        ? t(categoryLabels[category as Category])
        : t("explore");

    return (
        <section>
            <h1>{heading}</h1>
            <p>{t("empty")}</p>
        </section>
    );
}

export function CollectionsPage() {
    const { t } = useLanguage();

    return (
        <section>
            <h1>{t("collections")}</h1>
            <p>{t("collectionsNote")}</p>
        </section>
    );
}

export function ItemPage() {
    const { t } = useLanguage();

    return (
        <section>
            <h1>{t("explore")}</h1>
            <p>{t("itemNote")}</p>
        </section>
    );
}

export function AdminPage() {
    const { t } = useLanguage();

    return (
        <section>
            <h1>{t("admin")}</h1>
            <p>{t("adminNote")}</p>
            <p className="warning">
                Development placeholder. Not an authenticated admin.
            </p>
        </section>
    );
}

export function NotFoundPage() {
    const { t } = useLanguage();

    return (
        <section>
            <h1>404</h1>
            <p>{t("notFound")}</p>
            <Link to="/">{t("home")}</Link>
        </section>
    );
}
