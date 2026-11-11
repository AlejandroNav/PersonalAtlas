
import { Link, NavLink, Route, Routes } from "react-router";
import { SITE_NAME } from "../config/site";
import { useLanguage } from "../i18n/useLanguage";
import {
    HomePage,
    ExplorePage,
    CollectionsPage,
    ItemPage,
    AdminPage,
    NotFoundPage,
} from "../pages/Pages";

function Header() {
    const { language, setLanguage, t } = useLanguage();

    return (
        <header className="site-header">
            <Link to="/" className="brand">
                {SITE_NAME.toUpperCase()}_
            </Link>

            <nav aria-label="Main navigation">
                <NavLink to="/" end>
                    {t("home")}
                </NavLink>
                <NavLink to="/explore">
                    {t("explore")}
                </NavLink>
                <NavLink to="/collections">
                    {t("collections")}
                </NavLink>
                <NavLink to="/admin">
                    {t("admin")}
                </NavLink>
            </nav>

            <label className="language-select">
                {t("language")}
                <select
                    value={language}
                    onChange={(event) =>
                        setLanguage(event.target.value as "en" | "es")
                    }
                >
                    <option value="en">EN</option>
                    <option value="es">ES</option>
                </select>
            </label>
        </header>
    );
}

export default function App() {
    return (
        <>
            <Header />

            <main className="container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route
                        path="/explore/:category"
                        element={<ExplorePage />}
                    />
                    <Route
                        path="/collections"
                        element={<CollectionsPage />}
                    />
                    <Route path="/item/:slug" element={<ItemPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
        </>
    );
}
