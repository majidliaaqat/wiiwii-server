const router = require("express").Router();
const controller = require("../controllers/PostController");

router.post("/createPost", controller.CreatePost);
router.get("/fetchPost", controller.fetchPost);

module.exports = router;
