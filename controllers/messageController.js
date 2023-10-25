const Message = require("../models/Message");
const User = require("../models/User");
const Post = require("../models/Post");

// Create new message
exports.message_create = async (req, res) => {
  try {
    console.log(req.body);
    const { postId, text, userId } = req.body;

    // Ensure that the post and user exist
    const post = await Post.findById(postId);
    console.log(postId);
    const user = await User.findById(userId);

    if (!post || !user) {
      return res.status(400).send("Invalid post or user ID");
    }

    const newmessage = await Message.create({
      post: postId,
      text,
      user: user._id,
    });

    if (newmessage) {
      res.status(201).send("Message Created!");
    } else {
      res.status(400).send("Unable to create message!");
    }
  } catch (err) {
    console.error("Error creating message: " + err);
    res.status(500).send("Internal Server Error");
  }
};

// Read a message by ID
exports.message_read = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    // Populate post and user details when fetching messages
    const messages = await Message.find({ post: id })
      .populate("post")
      .populate("user");

    if (messages) {
      console.log(messages);
      res.status(200).json(messages);
    } else {
      res.status(400).send("Unable to fetch messages");
    }
  } catch (err) {
    console.error("Error reading message: " + err);
    res.status(500).send("Internal Server Error");
  }
};

// Update a message by ID
exports.message_update = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.redirect(`/post?id=${req.body.postId}`);
  } catch (err) {
    console.error("Error updating message: " + err);
    res.status(500).send("Internal Server Error");
  }
};

// Delete a message by ID
exports.message_delete = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    await message.remove();
    res.redirect(`/post?id=${req.body.postId}`);
  } catch (err) {
    console.error("Error deleting message: " + err);
    res.status(500).send("Internal Server Error");
  }
};
