import 'dotenv/config'
import express from 'express'
import { fork } from 'child_process'
import CartsRoute from './routes/CartsRoute'
import ProductsRoute from './routes/ProductsRoute'
const app = express()

app.use('/api/carrito', new CartsRoute().router)
app.use('/api/productos', new ProductsRoute().router)

app.get('/api/randoms', (req, res) => {
  const { cant } = req.query
  const calculation = fork('./src/calculation.js')
  calculation.send({ cant })
  calculation.on('message', (numbers) => {
    res.json(numbers)
  })
})

export default app
