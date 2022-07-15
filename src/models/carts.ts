import mongoose from 'mongoose'
import { productSchema } from './products'
import { ICartMongo } from '../interfaces/Cart'

const cartsCollection = 'carts'

const cartSchema = new mongoose.Schema<ICartMongo>({
    username: { type: String, require: true },
    products: [productSchema],
    timestamp: { type: String, default: new Date().toString() }
})

export const Cart = mongoose.model(cartsCollection, cartSchema)
