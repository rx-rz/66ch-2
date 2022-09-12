import { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export const Switcher = () => {
  
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [isDark, setIsDark] = useState(theme === "dark" || null ? true : false);
  const colorTheme = theme === "dark" ? "light" : "dark";

  const toggleDarkMode = (checked: boolean) => {
    setTheme(colorTheme);
    setIsDark(checked);
  };

  useEffect(() => {
    const root = document.body;
    root.classList.toggle(colorTheme);
    root.classList.toggle(theme!);
    localStorage.setItem("theme", theme!);
  }, [theme, colorTheme]);

  return (
    <div className="flex items-center">
      <DarkModeSwitch
        checked={isDark}
        onChange={toggleDarkMode}
        size={30}
        moonColor="white"
        sunColor="#121212"
      />
    </div>
  );
};
