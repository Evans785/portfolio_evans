// LanguageContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import fr from "../translations/fr.json";
import en from "../translations/en.json";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("fr");
  const [language, setLanguage] = useState(fr);

  useEffect(() => {
    setLanguage(lang === "fr" ? fr : en);
  }, [lang]);

  const toggleLanguage = (code) => setLang(code);

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, language }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
