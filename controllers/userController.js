const User = require("../models/User");
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
        .status(400)
        .send("A user with that email has already been registered!");
    } else {
      // Creates a new user
      const user = await User.create({
        firstname,
        lastname,
        email,
        username,
        password: passwordDigest,
      });
      // Sends the user as a response
      res.send(user);
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  Register,
};
