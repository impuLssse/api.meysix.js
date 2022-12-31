import express from 'express'
import AuthSteamMiddleware from '../middlewares/auth.js'
import passport from '../services/steam.js'

const AuthSteamRouter = express()
    .get('/', AuthSteamMiddleware())
    .get('/steam',
        passport.authenticate('steam'),
        (req, res, next) => {
            try {
                res.redirect('/')
            } catch (e) {
                next(e)
            }
        }
    )
    .get('/steam/return',
        passport.authenticate('steam', { failureRedirect: '/' }),
        (req, res, next) => {
            try {
                res.redirect('/')
            } catch (e) {
                next(e)
            }
        }
    )


export default AuthSteamRouter