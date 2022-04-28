import mongoose from "mongoose";
import { productSchema } from "./products";

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: [productSchema],
  timestamp: { type: Date, default: Date.now },
});

export const Cart = mongoose.model(cartsCollection, cartSchema);
