const express = require("express");
const methodOverried = require("method-override");
const router = express.Router();

router.use(methodOverried("_method"));
router.use(express.urlencoded({ extended: true }));

const adminLayout = "../views/layouts/admin";
const jwtSecret = process.env.JWT_SECRET;

const messageController = require("../controllers/MessageController");

router.get("/add-comment", messageController.comment_add_get);
router.post("/add-comment", messageController.comment_add_post);

//

module.exports = router;
