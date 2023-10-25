const Post = require("../models/Post");
const User = require("../models/User");
const mongoose = require("mongoose");

const CreatePost = async (req, res) => {
  try {
    console.log(req.body);
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

    // Input validation
    if (
      !title ||
      !description ||
      !userId ||
      !brand ||
      !year ||
      !model ||
      !kilometers ||
      !transmitionType ||
      !price ||
      !location
    ) {
      return res.status(400).send("All fields are required.");
    }

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send("Invalid UserId format.");
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("UserId Not Found");
    }

    const post = await Post.create({
      title,
      image,
      description,
      user: userId,
      brand,
      year,
      model,
      kilometers,
      transmitionType,
      price,
      location,
    });

    res.status(201).send("Post Created Successfully.");
  } catch (error) {
    console.log(error);
    if (error.name === "CastError") {
      return res.status(400).send("Invalid input format.");
    }
    res.status(500).send("Internal Server Error.");
  }
};

// Fetch Post
const fetchPost = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user");
    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send("Unable to Fetch Posts");
    console.error(error);
  }
};

// delete post

const post_delete = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).send("Post Deleted");
  } catch (err) {
    console.error("Error deleting message: " + err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  CreatePost,
  fetchPost,
  post_delete,
};
