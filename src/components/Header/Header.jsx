import React, { useContext } from "react";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { ThemeContext } from "../../Context/ThemeContext";

const Header = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const icon = theme === "dark" ? "white" : "black";
  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <h2
          className={` text-[18x] font-semibold tracking-wide ${
            theme === "dark" ? "text-white" : "text-black"
          } `}
        >
          ConversAI{" "}
        </h2>
        <div onClick={() => toggleTheme()}>
          {theme === "light" ? (
            <MdDarkMode size={25} cursor="pointer" color={icon} />
          ) : (
            <CiLight size={25} cursor="pointer" color={icon} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
