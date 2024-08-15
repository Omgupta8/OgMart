import express from "express";
import Category from "../models/categoryModel.js";

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.json({
        error: "Category already exists!",
      });
    }

    const category = await new Category({ name }).save();

    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const updateCategory = async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.params);

    const {name} = req.body;
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    category.name = name;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const removeCategory = async (req, res) => {
  try {
    console.log(req.params);

    const removed = await Category.findByIdAndDelete(req.params.categoryId);

    res.json({
      message: "Category deleted!",
      data: removed,
    });
  } catch (error) {
    return res.status(404).json({
      error: error.message,
    });
  }
};

const listCategory = async (req, res) => {
  try {
    const all = await Category.find({});
    res.status(201).json({
      // all
      message: "List of all Category",
      data: all,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

const readCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });

    res.status(201).json({
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
};
