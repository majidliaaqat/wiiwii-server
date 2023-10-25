const Message = require("../models/Message");
const User = require("../models/User");
const Post = require("../models/Post");

// Create new message
exports.message_create = async (req, res) => {
  try {
    console.log(req.body);
    const { postID, text, author } = req.body;
    const newmessage = await Message.create({
      postID,
      text,
      author,
    });
    if (newmessage) {
      res.status(201).send("Message Created!");
    } else {
      res.staus(400).send("Unable to create message!");
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
    const messages = await Message.find({ postID: id });
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
