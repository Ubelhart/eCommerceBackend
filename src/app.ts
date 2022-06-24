import 'dotenv/config'
import express from 'express'
import { fork } from 'child_process'
import CartsRoute from './routes/CartsRoute'
import ProductsRoute from './routes/ProductsRoute'
import compression from 'compression'
import session from 'express-session'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import User from './models/users'
import winston from 'winston'

const app = express()

export const logger = winston.createLogger({
  level: 'warn',
  transports: [
    new winston.transports.Console({ level: 'info' }),
    new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ]
})

app.use(compression())
app.use('/api/carrito', new CartsRoute().router)
app.use('/api/productos', new ProductsRoute().router)
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

app.set('views', './views')
app.set('view engine', 'ejs')

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password)
}

passport.use(
  'login',
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err)
      }
      if (!user) {
        console.log('Usuario no encontrado')
        return done(null, false)
      }
      if (!isValidPassword(user, password)) {
        console.log('Contraseña incorrecta')
        return done(null, false)
      }
      return done(null, user)
    })
  })
)

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

passport.use(
  'signup',
  new LocalStrategy(
    { passReqToCallback: true },
    (_req, username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err)
        }
        if (user) {
          console.log('Usuario ya existe')
          return done(null, false)
        }
        const newUser = new User({
          username: username,
          password: createHash(password)
        })
        newUser.save((err) => {
          if (err) {
            return done(err)
          }
          return done(null, newUser)
        })
      })
    }
  )
)

passport.serializeUser(({ _id }, done) => {
  done(null, _id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      return done(err)
    }
    return done(null, user)
  })
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
)

app.get('/failregister', (_req, res) => {
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
  res.render('faillogin')
})

app.get('/logout', (req: any, res) => {
  if (req.user) {
    const { username } = req.user
    return req.logOut((err) => {
      if (err) {
        return res.redirect('/login')
      }
      return res.render('logout', { username })
    })
  }
  res.redirect('/login')
})

app.get('*', (_req, res) => {
  logger.warn('Ruta no existente')
  res.send('Ruta no existente')
})

app.get('/api/randoms', (req, res) => {
  const { cant } = req.query
  const calculation = fork('./src/calculation.js')
  calculation.send({ cant })
  calculation.on('message', (numbers) => {
    res.json(numbers)
  })
})

export default app
