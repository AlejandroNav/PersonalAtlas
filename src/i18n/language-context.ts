
import { createContext } from "react";

export type Language = "en" | "es";

export const translations = {
  en: {
    home: "Home",
    explore: "Explore",
    collections: "Collections",
    admin: "Admin",
    title: "A collection of things worth remembering.",
    subtitle: "Games, books, movies, music, places, and more.",
    categories: "Categories",
    empty: "Collection functionality comes in Phase 2.",
    adminNote: "Admin functionality comes in later phases.",
    collectionsNote: "Manual and smart collections are planned.",
    itemNote: "Item detail pages come in Phase 3.",
    notFound: "Page not found",
    games: "Games",
    books: "Books",
    movies: "Movies",
    series: "Series",
    songs: "Songs",
    albums: "Albums",
    places: "Places",
    other: "Other",
    language: "Language",
  },
  es: {
    home: "Inicio",
    explore: "Explorar",
    collections: "Colecciones",
    admin: "Administración",
    title: "Una colección de cosas que vale la pena recordar.",
    subtitle: "Videojuegos, libros, películas, música, lugares y más.",
    categories: "Categorías",
    empty: "Las funciones de colección llegan en la fase 2.",
    adminNote: "La administración llegará en fases posteriores.",
    collectionsNote: "Están previstas las colecciones manuales e inteligentes.",
    itemNote: "Las páginas de detalle llegan en la fase 3.",
    notFound: "Página no encontrada",
    games: "Videojuegos",
    books: "Libros",
    movies: "Películas",
    series: "Series",
    songs: "Canciones",
    albums: "Álbumes",
    places: "Lugares",
    other: "Otros",
    language: "Idioma",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

export const LanguageContext =
  createContext<LanguageContextValue | null>(null);
