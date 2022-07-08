import 'dotenv/config'
import { app, passport } from './utils/passport'
import CartsRoute from './routes/CartsRoute'
import ProductsRoute from './routes/ProductsRoute'
import compression from 'compression'
import logger from './utils/logger'
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

app.use(compression())
app.use('/api/carrito', new CartsRoute().router)
app.use('/api/productos', new ProductsRoute().router)

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', (req: any, res) => {
  if (req.user) {
    return res.json(req.user)
  }
  return res.redirect('/login')
})

app.get('/register', (_req, res) => {
  res.render('register')
})

app.post(
  '/register',
  passport.authenticate('signup', {
    successRedirect: '/login',
    failureRedirect: '/failregister'
  })
  //upload.single('avatar')
)

app.get('/failregister', (_req, res) => {
  logger.info('Fallo al registrar usuario')
  res.render('failregister')
})

app.get('/login', (_req, res) => {
  res.render('login')
})

app.post(
  '/login',
  passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/faillogin'
  })
)

app.get('/faillogin', (_req, res) => {
  logger.info('Fallo al iniciar sesión')
  res.render('faillogin')
})

app.get('/logout', (req: any, res) => {
  if (req.user) {
    const { username } = req.user
    return req.logOut((err) => {
      if (err) {
        logger.error(err)
        return res.redirect('/login')
      }
      return res.render('logout', { username })
    })
  }
  res.redirect('/login')
})

app.get('/api/randoms', (req, res) => {
  const { cant } = req.query
  const parseCant: number = Number(cant) || 100000
  const numbers: number[] = []

  for (let i = 0; i < parseCant; i++) {
    numbers.push(Math.floor(Math.random() * 1000))
  }
  res.json(numbers)
})

export default app
