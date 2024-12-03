import React, { createContext, useState, useContext, useEffect } from "react";
import translations from "./translations.json";

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

 const setLanguagePreference = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const translate = (key) => {
    const keys = key.split(".");
    let translated = translations[language];
    for (let k of keys) {
      translated = translated[k];
      if (!translated) return key;
    }
    return translated;
  };

  return (
    <TranslationContext.Provider
      value={{ language, setLanguagePreference, translate }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);