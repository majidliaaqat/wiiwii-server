const User = require("../models/User");
const Message = require("../models/Message");
const Post = require("../models/Post");
const middleware = require("../middleware");

const Register = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);
    // Extracts the necessary fields from the request body
    const { firstname, lastname, email, username, password } = req.body;
    // Hashes the provided password
    let passwordDigest = await middleware.hashPassword(password);
    // Checks if there has already been a user registered with that email
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .send("A user with that email has already been registered!");
    } else {
      // Creates a new user
      let existingUser = await User.findOne({ username });
      if (existingUser) {
        return res
          .status(409)
          .send("A user with that username has already been registered!");
      }
      const user = await User.create({
        firstname,
        lastname,
        email,
        username,
        profilepic: req.file.path,
        password: passwordDigest,
      });
      // Sends the user as a response
      res.status(201).json(user);
    }
  } catch (error) {
    throw error;
  }
};

const Login = async (req, res) => {
  console.log(req.body);
  try {
    // Extracts the necessary fields from the request body
    const { email, username, password } = req.body;
    // Finds a user by a particular field (in this case, email)
    if (email) {
      console.log("in email block");
      const user = await User.findOne({ email });
      if (user) {
        console.log("email found");
        // Checks if the password matches the stored digest
        let passwordMatched = await middleware.comparePassword(
          user.password,
          password
        );
        // If they match, constructs a payload object of values we want on the front end
        if (passwordMatched) {
          let payload = {
            id: user.id,
            email: user.email,
          };
          // Creates our JWT and packages it with our payload to send as a response
          let token = middleware.createToken(payload);
          return res.send({ user: user, token });
        }
        res.status(401).send({ status: "Error", msg: "Unauthorized" });
      }
    } else if (username) {
      console.log("in username block");
      const user = await User.findOne({ username });
      if (user) {
        // Checks if the password matches the stored digest
        let passwordMatched = await middleware.comparePassword(
          user.password,
          password
        );
        // If they match, constructs a payload object of values we want on the front end
        if (passwordMatched) {
          let payload = {
            id: user.id,
            email: user.email,
          };
          // Creates our JWT and packages it with our payload to send as a response
          let token = middleware.createToken(payload);
          return res.send({ user: user, token });
        }
        res.status(401).send({ status: "Error", msg: "Unauthorized" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ status: "Error", msg: "An error has occurred!" });
  }
};

const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    console.log(req.body);
    let user = await User.findById(req.params.user_id);
    let passwordMatched = await middleware.comparePassword(
      user.password,
      oldPassword
    );
    if (passwordMatched) {
      let passwordDigest = await middleware.hashPassword(newPassword);
      user = await User.findByIdAndUpdate(req.params.user_id, {
        password: passwordDigest,
      });
      let payload = {
        id: user.id,
        email: user.email,
      };
      return res
        .status(200)
        .send({ status: "Password Updated!", user: payload });
    }
    console.log("Not Matched");
    res
      .status(221)
      .json({ status: "Error", msg: "Old Password did not match!" });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      status: "Error",
      msg: "An error has occurred updating password!",
    });
  }
};

// Delete a user by ID
const user_delete = async (req, res) => {
  try {
    const userId = req.params.id;
    if (Post.find({ user: userId })) {
      const deletedPosts = await Post.deleteMany({ user: userId });
      console.log("Deleted Posts: ", deletedPosts);
    }
    await User.findByIdAndDelete(userId);
    res.status(200).send("User Deleted");
  } catch (err) {
    console.error("Error deleting message: " + err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  Login,
  Register,
  UpdatePassword,
  user_delete,
};
