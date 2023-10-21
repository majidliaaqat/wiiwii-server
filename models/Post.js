const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // image: {
    //   type: String,
    //   required: true,
    // },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    // userProfilePic: {
    //   type: String,
    //   required: true,
    // },
    brand: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    kilometers: {
      type: String,
      required: true,
    },
    transmitionType: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
