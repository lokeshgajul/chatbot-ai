import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { getContent, getStartChat } from "./Controllers/ChatController.js";
import { ConnectDb } from "./Db/Db.js";
import { registerUser } from "./Controllers/AuthController.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
ConnectDb();

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.post("/getPrompt", getContent);

app.post("/startChat", getStartChat);

app.post("/register", registerUser);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
