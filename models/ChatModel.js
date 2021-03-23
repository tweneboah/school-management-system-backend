import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const ChatSchema = new Schema(
  {
    userID: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    parent: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("chats", ChatSchema);
