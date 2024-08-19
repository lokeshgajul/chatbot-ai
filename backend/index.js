import express from "express";
import cors from "cors";
import { getContent, getStartChat } from "./Controllers/ChatController.js";

import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.post("/getPrompt", getContent);

app.post("/startChat", getStartChat);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
