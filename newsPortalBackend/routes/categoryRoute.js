const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} = require("../controllers/categoryController");

router.route("/addCategory").post(protect, addCategory);
router.route("/deleteCategory").post(protect, deleteCategory);
router.route("/getAllCategories").get(getAllCategories);
router.route("/updateCategory").put(protect, updateCategory);

module.exports = router;
