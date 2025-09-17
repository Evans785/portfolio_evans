import { createContext, useContext, useEffect, useState } from "react";

const themeContexte = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <themeContexte.Provider
      value={{ isDarkMode: theme === "dark", toggleDarkMode }}
    >
      {children}
    </themeContexte.Provider>
  );
};

export const useTheme = () => useContext(themeContexte);
