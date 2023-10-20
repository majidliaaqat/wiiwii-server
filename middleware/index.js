const bcrypt = require("bcrypt");
require("dotenv").config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

const hashPassword = async (password) => {
  let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return hashedPassword;
};

module.exports = {
  hashPassword,
};
