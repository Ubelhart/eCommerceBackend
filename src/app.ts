import 'dotenv/config'
import CartsRoute from './routes/CartsRoute'
import ProductsRoute from './routes/ProductsRoute'
import compression from 'compression'
import express from 'express'
import session from 'express-session'
import passport from './utils/passport'
const app = express()
/*
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
    cb(null, './uploads')
    },
    filename: (_req, file, cb) => {
    cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage }) 
*/
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
app.use('/api/carrito', new CartsRoute().router)
app.use('/api/productos', new ProductsRoute().router)

app.set('views', './views')
app.set('view engine', 'ejs')

export default app
