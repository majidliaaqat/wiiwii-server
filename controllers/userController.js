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
      let existingUser = await User.findOne({ username });
      if (existingUser) {
        return res
          .status(400)
          .send("A user with that username has already been registered!");
      }
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
        let matched = await middleware.comparePassword(user.password, password);
        // If they match, constructs a payload object of values we want on the front end
        if (matched) {
          let payload = {
            id: user.id,
            email: user.email,
          };
          // Creates our JWT and packages it with our payload to send as a response
          let token = middleware.createToken(payload);
          return res.send({ user: payload, token });
        }
        res.status(401).send({ status: "Error", msg: "Unauthorized" });
      }
    } else if (username) {
      console.log("in username block");
      const user = await User.findOne({ username });
      if (user) {
        // Checks if the password matches the stored digest
        let matched = await middleware.comparePassword(user.password, password);
        // If they match, constructs a payload object of values we want on the front end
        if (matched) {
          let payload = {
            id: user.id,
            email: user.email,
          };
          // Creates our JWT and packages it with our payload to send as a response
          let token = middleware.createToken(payload);
          return res.send({ user: payload, token });
        }
        res.status(401).send({ status: "Error", msg: "Unauthorized" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ status: "Error", msg: "An error has occurred!" });
  }
};

module.exports = {
  Register,
  Login,
};
