const express = require("express");

require("dotenv").config();
const config = require("./config/config");

const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Connected to port: ${port}`);
});
