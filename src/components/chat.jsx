import React, { useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { RotatingLines } from "react-loader-spinner";
import "./chat.css";

const Chat = () => {
  const [response, setResponse] = useState("");
  const [searchText, SetSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearchText = (e) => {
    SetSearchText(e.target.value);
    console.log(e.target.value);
  };

  const handleApiRequest = async () => {
    const apiKey = "********************";
    const apiUrl = "********************";
    const url = `${apiUrl}?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: searchText,
            },
          ],
        },
      ],
    };

    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();
      const generatedText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // Set the response text to be displayed in the textarea
      setResponse(generatedText);
      console.log("Searched ", searchText);
      console.log("response ", generatedText);

      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while processing the request.");
    } finally {
      SetSearchText("");
    }
  };

  return (
    <div>
      <h2 className="text-white text-center mt-8 text-2xl uppercase font-semibold tracking-wider">
        Ai ChatBot
      </h2>

      <div className="absolute bottom-9 w-full ]">
        <div className="flex justify-center items-center pb-6">
          <textarea
            name="chat"
            id="chat"
            placeholder="Generated Text"
            value={response}
            readOnly // This makes the textarea read-only
            className="w-[48%] h-80 pl-3 pt-2  rounded-sm bg-[#212121] focus:outline-none text-white overflow-y-scroll scrollbar-hide "
          ></textarea>
        </div>

        <div className="flex justify-center items-center">
          <div
            className=" w-[50%]
       bg-[#212121] p-2 rounded-3xl"
          >
            <div className="flex justify-between items-center ">
              <input
                type="text"
                placeholder="Enter Prompt"
                onChange={handleSearchText}
                className="p-1 ml-3 rounded-2xl bg-[#212121] w-full focus:outline-none text-white"
              />
              <button onClick={handleApiRequest} className="p-1 mr-1">
                {loading ? (
                  <RotatingLines
                    visible={true}
                    height="30"
                    width="30"
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  <LuSendHorizonal color="#fff" size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
