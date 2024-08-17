import React, { useContext } from "react";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { ThemeContext } from "../../Context/ThemeContext";

const Header = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <h2 className="text-[18x] font-semibold tracking-wide">ConversAI </h2>
        <div onClick={() => toggleTheme()}>
          {theme === "light" ? (
            <MdDarkMode size={25} cursor="pointer" />
          ) : (
            <CiLight size={25} cursor="pointer" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
