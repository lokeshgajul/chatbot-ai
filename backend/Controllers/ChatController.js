import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI("AIzaSyDtHtKuKYDzlJ9R5tH_rcmbMrTtWwoxoho");

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
    let result = await chat.sendMessage("I have 2 dogs in my house.");
    console.log(result.response.text());
    result = await chat.sendMessage("How many paws are in my house?");
    console.log(result.response.text());
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).send({ error: "Failed to start chat" });
  }
};
