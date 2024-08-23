import React, { useContext, useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import "./chat.css";
import { ThemeContext } from "../../Context/ThemeContext";

const Chat = () => {
  const [response, setResponse] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const { theme } = useContext(ThemeContext);

  const handleSearchText = (e) => {
    setText(e.target.value);
  };

  // const handleApiRequest = async () => {
  //   const apiKey = "********************";
  //   const apiUrl = "********************";
  //   const url = `${apiUrl}?key=${apiKey}`;

  //   const requestBody = {
  //     contents: [
  //       {
  //         parts: [
  //           {
  //             text: searchText,
  //           },
  //         ],
  //       },
  //     ],
  //   };

  //   setLoading(true);
  //   try {
  //     const res = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(requestBody),
  //     });

  //     const data = await res.json();
  //     const generatedText =
  //       data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  //     // Set the response text to be displayed in the textarea
  //     setResponse(generatedText);
  //     console.log("Searched ", searchText);
  //     console.log("response ", generatedText);

  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setResponse("An error occurred while processing the request.");
  //   } finally {
  //     SetSearchText("");
  //   }
  // };

  const handleSubmit = async () => {
    const message = text;

    try {
      const res = await axios.post("http://localhost:3000/startChat", {
        message,
      });

      console.log("request body ", message);

      if (res.status === 200) {
        const data = res.data.response;
        console.log(data);
        setResponse(res.data.response);
        setHistory(res.data.chatHistory);
        console.log("history", res.data.chatHistory);

        setText("");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div>
      <h2 className="text-center text-2xl uppercase font-semibold tracking-wider">
        Ai ChatBot
      </h2>

      <div className="mt-[3%]">
        <div className="flex justify-center items-center pb-6">
          <textarea
            name="chat"
            id="chat"
            placeholder="Generated Text"
            value={response}
            readOnly // This makes the textarea read-only
            className={`w-[60%] text-[14px] h-80 p-3  rounded-sm ${
              theme === "dark" ? "bg-[#212121]" : "bg-[#F0F0F0]"
            }  focus:outline-none  overflow-y-scroll scrollbar-hide `}
          ></textarea>
        </div>

        <div className="flex justify-center items-center">
          <div
            className={` w-[60%]
              ${
                theme === "dark" ? "bg-[#2f2f2f]" : "bg-[#F0F0F0]"
              } p-2 rounded-3xl`}
          >
            <div className="flex justify-between items-center ">
              <input
                type="text"
                placeholder="Enter Prompt"
                onChange={handleSearchText}
                value={text}
                className={` p-1 ml-3 rounded-2xl ${
                  theme === "dark" ? "bg-[#2f2f2f]" : "bg-[#F0F0F0]"
                } w-full focus:outline-none `}
              />
              <button onClick={handleSubmit} className="p-1 mr-1">
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
                  <LuSendHorizonal size={20} />
                )}
              </button>
            </div>
          </div>
        </div>

        <div>
          {history && history.length > 0 ? (
            history.map((item, index) => (
              <div key={index}>
                <p className="text-white">role: {item.role}</p>
                <p className="text-white">
                  text:{" "}
                  {typeof item.parts[0].text === "string"
                    ? item.parts[0].text
                    : JSON.stringify(item.parts[0].text)}
                </p>
              </div>
            ))
          ) : (
            <div>
              <p className="text-white">No history available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
