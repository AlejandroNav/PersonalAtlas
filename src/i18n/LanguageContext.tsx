
import {
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    LanguageContext,
    translations,
    type Language,
    type LanguageContextValue,
} from "./language-context";

function getInitialLanguage(): Language {
    try {
        const saved = localStorage.getItem("atlas-language");

        if (saved === "en" || saved === "es") {
            return saved;
        }
    } catch {
        // Storage may be unavailable.
    }

    return navigator.language.toLowerCase().startsWith("es")
        ? "es"
        : "en";
}

export function LanguageProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [language, setLanguage] =
        useState<Language>(getInitialLanguage);

    useEffect(() => {
        document.documentElement.lang = language;

        try {
            localStorage.setItem("atlas-language", language);
        } catch {
            // The switch still works without persistence.
        }
    }, [language]);

    const value: LanguageContextValue = {
        language,
        setLanguage,
        t: (key) => translations[language][key],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}
