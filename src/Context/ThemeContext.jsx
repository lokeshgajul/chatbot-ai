import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvder = ({ children }) => {
  const [theme, setTheme] = useState("dark");
  const changeTheme = (value) => {
    setTheme(value);
    console.log("theme ", value);
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.body.style.backgroundColor = "#212121";
      document.body.style.color = "#fff";
    } else {
      setTheme("light");
      document.body.style.backgroundColor = "#e3e3e3";
      document.body.style.color = "black";
    }
  };

  useEffect(() => {
    if (theme === "light") {
      document.body.style.backgroundColor = "#e3e3e3";
      document.body.style.color = "black";
    } else {
      // document.body.style.backgroundColor = "#212121";
    }
  }, [theme]);

  const value = {
    changeTheme,
    toggleTheme,
    theme,
    setTheme,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
