const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    postID: String,
    text: String,
    author: String,
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
