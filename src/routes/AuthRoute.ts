import app from '../app'
import passport from '../utils/passport'
import logger from '../utils/logger'

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

export default app
