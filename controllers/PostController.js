const Post = require("../models/Post");
const User = require("../models/User");
const mongoose = require("mongoose");

const CreatePost = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    const image = req.file.path;
    const {
      title,
      description,
      userId,
      brand,
      year,
      model,
      kilometers,
      transmitionType,
      price,
      location,
    } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (user) {
      console.log(user);
      const post = await Post.create({
        title,
        image,
        description,
        author: userId,
        brand,
        year,
        model,
        kilometers,
        transmitionType,
        price,
        location,
      });
      res.status(201).send("Post Created Successfully.");
    } else {
      res.status(404).send("UserId Not Found");
    }
  } catch (error) {
    res.status(500).send("Unable to Create Post");
    console.error(error);
  }
};

// Fetch Post
const fetchPost = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("author");
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send("Unable to Fetch Posts");
    console.error(error);
  }
};

module.exports = {
  CreatePost,
  fetchPost,
};
