import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  role: String,
  parts: [
    {
      text: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
