const router = require("express").Router();
const controller = require("../controllers/userController");
const middleware = require("../middleware");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/register", upload.single("profilepic"), controller.Register);
router.post("/login", controller.Login);
router.put(
  "/update/:user_id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePassword
);
router.delete("/delete/:id", controller.user_delete);

module.exports = router;
