import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Chat from "../chat/chat";
import { ThemeContext } from "../../Context/ThemeContext";

function Sidebar() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={` w-1/5 ${
        theme === "light" ? "bg-[#f5f5f5]" : "bg-[#171717]"
      }  min-h-screen pl-3 pr-3 pt-4  `}
    >
      <h1 className={`${theme === "dark" ? "text-white" : "text-black"}`}>
        ConversAI
      </h1>
      {/* Add additional sidebar content or links here */}

      <div
        className={`mt-4 ${
          theme === "light" ? "hover:bg-[#e0e0e0]" : "hover:bg-[#353535]"
        }  p-1.5 rounded-md`}
      >
        <Link
          to="/Chat"
          className={`${theme === "dark" ? "text-white" : "text-black"}`}
        >
          New Chat
        </Link>
      </div>

      <div
        className={`mt-2 ${
          theme === "light" ? "hover:bg-[#e0e0e0]" : "hover:bg-[#353535]"
        }  p-1.5 rounded-md`}
      >
        <Link
          to="/Chat"
          className={`${theme === "dark" ? "text-white" : "text-black"}`}
        >
          Chat History
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
