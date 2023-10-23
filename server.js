const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const UserRoutes = require("./routes/UserRoutes");
const PostRoutes = require("./routes/PostRoutes");
const MessageRoutes = require("./routes/MessageRoutes");

require("dotenv").config();
const config = require("./config/config");

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));
app.use(express.json());
const commentRouter = require("./routes/MessageRoutes");

// Routes
app.use("/auth", UserRoutes);
app.use("/post", PostRoutes);
app.get("/comment", MessageRoutes);

// Default routes
app.get("/", (req, res) => {
  res.send("Connected!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

app.listen(port, () => {
  console.log(`Connected to port: ${port}`);
});
