const express = require("express");
const router = express.Router();
const multer = require('multer');
const { getDetails, postDetails, deleteUser } = require("../controllers/user");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/users/get", getDetails);
router.post("/users",upload.single("profile"), postDetails);
router.delete("/users/delete/:id", deleteUser);

module.exports = router;
