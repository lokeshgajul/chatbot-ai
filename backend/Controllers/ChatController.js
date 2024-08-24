import { GoogleGenerativeAI } from "@google/generative-ai";

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
  const chatHistory = [];

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
        ...chatHistory.map((item) => ({
          role: item.role,
          parts: [{ text: item.parts.map((part) => part.text).join(" ") }],
        })),
      ],
    });

    // Send the user's message to the model
    let result = await chat.sendMessage(message.toString());

    chatHistory.push({ role: "user", parts: [{ text: message }] });

    chatHistory.push({
      role: "model",
      parts: [{ text: result.response.text() }],
    });

    console.log(chatHistory);

    res
      .status(200)
      .send({ response: result.response.text(), chatHistory: chatHistory });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).send({ error: "Failed to start chat" });
  }
};
