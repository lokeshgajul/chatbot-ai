import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const apiKey = process.env.API_KEY;

const genAi = new GoogleGenerativeAI(apiKey);

const model = genAi.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const getContent = async (req, res) => {
  const { prompt } = req.body;
  try {
    const result = await model.generateContent(prompt);

    const repsonseText = result.response;

    if (repsonseText) {
      res.send({ response: repsonseText });
    }
  } catch (error) {
    console.log("error ", error);
  }
};

export const getStartChat = async (req, res) => {
  const { message } = req.body;

  try {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello" }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
    });

    // Send the user's message to the model
    let result = await chat.sendMessage(message.toString());

    console.log("message ", message);
    console.log("response", result.response);

    // result = await chat.sendMessage("How many paws are in my house?");
    // console.log("response", result.response.text());

    res.status(200).send({ response: result.response.text() });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).send({ error: "Failed to start chat" });
  }
};
