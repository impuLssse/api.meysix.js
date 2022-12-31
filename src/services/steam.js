import dotenv from 'dotenv'
dotenv.config()

import passport from 'passport'
import passportSteam from 'passport-steam'

const SteamStrategy = passportSteam.Strategy

passport.serializeUser( (user, done) => {
        try { done(null, user) } catch (e) { console.log(e) }
})
passport.deserializeUser( (user, done) => {
    try { done(null, user) } catch (e) { console.log(e) }
})

passport.use(new SteamStrategy({
    returnURL: `http://localhost:5000/auth/steam/return`,
    realm: 'http://localhost:5000/',
    apiKey: process.env.STEAM_API_TOKEN,
}, function (id, profile, done) {
    process.nextTick(function () {
        profile.identifier = id
        return done(null, profile)
    })

}))

export default passport