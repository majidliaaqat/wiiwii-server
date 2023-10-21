const Post = require("../models/Post");
const User = require("../models/User");
const mongoose = require("mongoose");

const CreatePost = async (req, res) => {
  try {
    console.log(req.body);
    // Extracts the necessary fields from the request body
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

    const Id = new mongoose.Types.ObjectId(userId);
    const user = await User.findById(Id);
    if (user) {
      console.log(user);
      const username = user.username;
      const post = await Post.create({
        title,
        description,
        userId,
        username,
        // userProfilePic,
        brand,
        year,
        model,
        kilometers,
        transmitionType,
        price,
        location,
      });
      res.status(201).send("Post Created Successfully.");
    } else res.status(404).send("UserId Not Found");
  } catch (error) {
    res.status(404).send("Unable to Create Post");
    throw error;
  }
};

module.exports = {
  CreatePost,
};
