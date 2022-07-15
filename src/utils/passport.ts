import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import User from '../models/users'
import logger from './logger'
import sendMail from './nodemailer'

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
                logger.info('Email no encontrado')
                return done(null, false)
            }
            if (!isValidPassword(user, password)) {
                logger.info('Contraseña incorrecta')
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
        ({ body }, username, password, done) => {
            User.findOne({ username: username }, (err, user) => {
                if (err) {
                    return done(err)
                }
                if (user) {
                    logger.info('Email ya existe')
                    return done(null, false)
                }
                const newUser = new User({
                    username: username,
                    password: createHash(password),
                    name: body.name,
                    address: body.address,
                    age: body.age,
                    phoneNumber: body.phoneNumber,
                    avatar: body.avatar
                })

                newUser.save(async (err) => {
                    if (err) {
                        return done(err)
                    }
                    await sendMail(newUser)
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

export default passport
