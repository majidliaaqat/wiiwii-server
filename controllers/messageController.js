const Comments = require("../models/Message");
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

const moment = require("moment");

// const passport = require("../library/ppConfig");

exports.comment_add_get = (req, res) => {
  Post.findById(req.query.postId).then((post) => {
    res.render("profile/comment", { post });
  });
};

exports.comment_add_post = (req, res) => {
  let comment = Comments(req.body);
  console.log(req.currentUser);
  comment.createdUser = req.body.createdUser;
  comment.postId = req.body.postId;
  comment
    .save()
    .then(() => {
      Post.findById(req.body.postId)
        .then((post) => {
          post.comments.push(comment._id);
          post.save();
        })
        .catch((err) => {
          console.log(err);
        });

      res.redirect("profile");
    })
    .catch((err) => {
      console.log(err);
    });
};
