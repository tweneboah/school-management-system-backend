const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const ChatSchema = new Schema(
  {
    userID: {
      type: String,
    },
    message: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    parent: {
      type: String,
    },
    sender: {
      type: String,
    },
    requestor_id: {
      type: String,
    },
    acceptor_id: {
      type: String,
    },
    messages: {
      type: [
        {
          senderID: String,
          message: String,
          role: String,
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("chats", ChatSchema);
