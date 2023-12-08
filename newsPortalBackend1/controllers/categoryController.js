const Category = require("../models/categoryModel");

//Add Category

const addCategory = async (req, res, next) => {
  try {
    const { category_name } = req.body;

    const category = await Category.findOne({ category_name });

    //if category already exist
    if (category) {
      return res.status(401).json({
        succes: false,
        msg: "Category it's already exist!",
      });
    }

    const new_category = await Category.create({ category_name });
    res.status(200).json({
      success: true,
      msg: "Category Created.",
      data: new_category,
    });
  } catch (error) {
    return res.status(500).json({
      succes: false,
      msg: "Internal Server Error Occured.",
    });
  }
};

//Get all Category
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({
      succes: true,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      succes: false,
      msg: "Internal Server Error Occured.",
    });
  }
};

//Delete Category
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.catId);
    res.status(201).json({
      succes: true,
      msg: "Successfully Deleted.",
      data: category,
    });

    if (!category) {
      res.status(404).json({
        succes: false,
        msg: "Category not found.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      succes: false,
      msg: "Internal Server Error Occured.",
    });
  }
};

//Update Category
const updateCategory = async (req, res, next) => {
  try {
    console.log(req.body, "<<<");
    const category = await Category.findByIdAndUpdate(
      req.params.catId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!category) {
      res.status(404).json({
        succes: false,
        msg: "Category not found.",
      });
    }
    res.status(200).json({
      succes: true,
      msg: "Successfully Updated.",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      succes: false,
      msg: "Internal Server Error Occured.",
    });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
};
