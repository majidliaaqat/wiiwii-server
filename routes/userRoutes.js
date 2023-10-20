const router = require("express").Router();
const controller = require("../controllers/UserController");
const middleware = require("../middleware");

router.post("/register", controller.Register);

module.exports = router;
