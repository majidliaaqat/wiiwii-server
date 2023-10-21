const Post = require("../models/Post");

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

    const post = await Post.create({
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
    });
    res.status(201).send("Post Created Successfully");
  } catch (error) {
    res.status(404).send("Unable to Create Post");
    throw error;
  }
};

module.exports = {
  CreatePost,
};
