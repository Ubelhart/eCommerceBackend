import mongoose from 'mongoose'
import { IProductMongo } from '../interfaces/Product'

const productsCollection = 'products'

export const productSchema = new mongoose.Schema<IProductMongo>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    timestamp: { type: String, default: new Date().toString() },
    stock: { type: Number, required: true }
})

export const Product = mongoose.model(productsCollection, productSchema)
