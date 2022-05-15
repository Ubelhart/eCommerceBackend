import 'dotenv/config'
import express from 'express'
import CartsRoute from './routes/CartsRoute'
import ProductsRoute from './routes/ProductsRoute'
const app = express()

app.use('/api/carrito', new CartsRoute().router)
app.use('/api/productos', new ProductsRoute().router)

export default app
