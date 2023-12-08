const express = require("express");
const {
  addNews,
  getAllNews,
  getSavedAllNews,
} = require("../controllers/newsController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.route("/addNews").post(protect, addNews);
router
  .route("/getSavedAllNews/:pageNum/:pageSize")
  .get(protect, getSavedAllNews);
router.route("/getAllNews/:pageNum/:pageSize").get(getAllNews);
module.exports = router;
