import React, { useContext, useState } from "react";
import { MdDarkMode, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { ThemeContext } from "../../Context/ThemeContext";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
// import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/zoom.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { toggleTheme, theme } = useContext(ThemeContext);
  const [moveArrow, setMoveArrow] = useState(false);

  const icon = theme === "dark" ? "white" : "black";

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div
          className={`  ${
            theme === "dark"
              ? "bg-[#2f2e2e] text-white"
              : "bg-[#a9a9a9] text-black"
          } rounded-md `}
        >
          <Menu
            className=""
            menuClassName="menuClass"
            menuButton={
              <div
                onClick={() => setMoveArrow(!moveArrow)}
                className={` flex flow-row justify-center items-center p-2 pb-2 w-[100px] `}
              >
                <MenuButton className={`font-semibold  text-[13px]`}>
                  ConverseAI
                </MenuButton>

                <div>
                  {moveArrow ? (
                    <MdOutlineKeyboardArrowDown />
                  ) : (
                    <MdKeyboardArrowRight />
                  )}
                </div>
              </div>
            }
            transition
          >
            {/* <MenuItem className="">Cut</MenuItem> */}

            <MenuItem
              onClick={() => {
                setMoveArrow(!moveArrow);
              }}
              className={` text-[12px] flex flow-row items-center ${
                theme === "dark"
                  ? "bg-[#2f2e2e] text-white"
                  : "bg-[#a9a9a9] text-black"
              } w-[100px] mt-[-8px] p-1  rounded cursor-pointer pl-2 pb-2 pt-2 font-medium`}
            >
              <div>LogOut</div>
              <div className="pl-[3px] mt-[1px] font-semibold">
                <AiOutlineLogout size={15} width={10} />
              </div>
            </MenuItem>
          </Menu>
        </div>

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
