import mongoose from "mongoose";

const productsCollection = "products";

export const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  stock: { type: Number, required: true },
});

export const Product = mongoose.model(productsCollection, productSchema);
