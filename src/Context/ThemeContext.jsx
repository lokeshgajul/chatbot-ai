import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvder = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    console.log("newtheme", newTheme);

    document.body.style.backgroundColor =
      newTheme === "light" ? "#e3e3e3" : "#212121";
    document.body.style.color = newTheme === "dark" && "#ffff";

    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.body.style.backgroundColor =
        storedTheme === "light" ? "#e3e3e3" : "#212121";
      document.body.style.color = storedTheme === "light" ? "black" : "#fff";
    }
  }, [theme]);

  const value = {
    toggleTheme,
    theme,
    setTheme,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
