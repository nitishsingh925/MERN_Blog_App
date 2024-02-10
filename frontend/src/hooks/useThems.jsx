import { useState, useEffect } from "react";

const useTheme = () => {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const isDarkMode = localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle("dark", isDarkMode);
    setMode(isDarkMode ? "dark" : "light");
  }, []);

  const toggleThemeHandler = () => {
    const isDarkMode = mode === "light";
    document.documentElement.classList.toggle("dark", isDarkMode);
    setMode(isDarkMode ? "dark" : "light");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  };

  return { mode, toggleThemeHandler };
};

export default useTheme;
