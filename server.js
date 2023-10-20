const express = require("express");
const cors = require("cors");
const multer = require("multer");

const UserRoutes = require("./routes/UserRoutes");

require("dotenv").config();
const config = require("./config/config");

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", UserRoutes);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use("/register", upload.single("profilepic"));

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
