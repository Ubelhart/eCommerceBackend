import 'dotenv/config'
import CartsRoute from './routes/CartsRoute'
import ProductsRoute from './routes/ProductsRoute'
import compression from 'compression'
import express from 'express'
import session from 'express-session'
import passport from './utils/passport'
import cors from 'cors'
const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
    session({
        secret: 'secreto',
        cookie: { httpOnly: false, secure: false, maxAge: 1000 * 600 },
        rolling: true,
        resave: true,
        saveUninitialized: false
    })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(compression())
app.use(cors())
app.use('/api/carrito', new CartsRoute().router)
app.use('/api/productos', new ProductsRoute().router)

app.set('views', './views')
app.set('view engine', 'ejs')

export default app
