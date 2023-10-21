const router = require("express").Router();
const controller = require("../controllers/PostController");

router.post("/createPost", controller.CreatePost);

module.exports = router;
