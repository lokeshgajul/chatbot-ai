import React, { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Chat");
  };

  return (
    <div className={` `}>
      <div className=" flex items-center flex-col">
        <h2
          className={` text-center mt-8 text-2xl uppercase font-semibold tracking-normal ${
            theme == "dark" && "text-white"
          } `}
        >
          Get Started
        </h2>

        <div className="flex flex-wrap justify-center items-center  mt-16">
          <div
            className={`border-[1px] border-slate-500 p-4 rounded-md m-3 cursor-pointer ${
              theme === "light"
                ? "hover:bg-[#f2f2f2] text-black"
                : "hover:bg-[#2b2b2b] text-white"
            }  hover:shadow-md`}
          >
            <h3 className="text-[18px] font-medium tracking-wide capitalize">
              Create an image from text
            </h3>
            <p className="mt-1 text-[13.5px]  tracking-wide capitalize">
              Generate an Image from Text
            </p>
          </div>

          <div
            onClick={() => navigate("/Qa")}
            className={`border-[1px] border-slate-500 p-4 rounded-md m-3 cursor-pointer hover:shadow-md ${
              theme === "light"
                ? "hover:bg-[#f2f2f2]  text-black"
                : "hover:bg-[#2b2b2b] text-white"
            } `}
          >
            <h3 className="text-[18px] font-medium tracking-wide capitalize">
              Question-Answer
            </h3>
            <p className="mt-1 text-[13.5px]  tracking-wide capitalize">
              Ask a Question
            </p>
          </div>

          <div
            onClick={handleClick}
            className={`border-[1px] border-slate-500 p-4 rounded-md m-3 cursor-pointer hover:shadow-md ${
              theme === "light"
                ? "hover:bg-[#f2f2f2] text-black"
                : "hover:bg-[#2b2b2b] text-white"
            } `}
          >
            <h3 className="text-[18px] font-medium tracking-wide capitalize">
              Start Conversation with AI
            </h3>
            <p className="mt-1 text-[13.5px]  tracking-wide capitalize">
              Chat with AI
            </p>
          </div>

          <div
            className={`border-[1px] border-slate-500 p-4 rounded-md m-3 cursor-pointer hover:shadow-md ${
              theme === "light"
                ? "hover:bg-[#f2f2f2] text-black"
                : "hover:bg-[#2b2b2b] text-white"
            } `}
          >
            <h3 className="text-[18px] font-medium tracking-wide capitalize">
              Learn Programming with AI
            </h3>
            <p className="mt-1 text-[13.5px]  tracking-wide capitalize">
              How to code
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
