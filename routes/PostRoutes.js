const router = require("express").Router();
const controller = require("../controllers/PostController");
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

router.post("/createPost", upload.single("photo"), controller.CreatePost);
router.get("/fetchPost", controller.fetchPost);

module.exports = router;
