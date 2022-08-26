import React, { createContext, useContext } from "react";

type ThemeContextProps = {
  handleThemeToggle: () => void;
  currentTheme: string | null;
};

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

export const ThemeContext = createContext<ThemeContextProps | null>(null);

export default function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  const currentTheme = localStorage.getItem("color-theme");
  const handleThemeToggle = () => {
    if (
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };
  return (
    <ThemeContext.Provider value={{ handleThemeToggle, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);
