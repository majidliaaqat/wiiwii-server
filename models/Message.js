const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    createdUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comments", commentSchema);
