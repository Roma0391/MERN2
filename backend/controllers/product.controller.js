import mongoose from "mongoose";
import Product from "../models/products.model.js";

export const getProducts = async (req, res) => {
  try {
    const data = await Product.find({});
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const data = req.body;
  if (!data.name || !data.price || !data.image) {
    res
      .status(400)
      .json({ success: false, message: "Each fiels must be send" });
  }
  const newProduct = new Product(data);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error("Invalid id");
    res.status(404).json({ success: false, message: "Invalid product id" });
  }
  try {
    await Product.findByIdAndDelete(id);
    res
      .status(201)
      .json({ success: true, message: "Product has been deleted" });
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error("Error, invalid id");
    res.status(400).json({ success: false, message: "Invalid product id" });
  }
  try {
    await Product.findByIdAndUpdate(id, data, { new: true });
    res
      .status(201)
      .json({ success: true, message: "Product has been updated", data });
  } catch (error) {
    console.error("Error", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
