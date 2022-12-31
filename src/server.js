import dotenv from 'dotenv'
dotenv.config()

import express, { urlencoded } from 'express'
import session from 'express-session'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import c from 'colors'

import router from './controllers/router.js'
import mysql from './database.js'
import passport from './services/steam.js'
import { ErrorMiddleware } from './middlewares/ErrorMiddleware.js'


const port = 5000
const app = express()
const logOff = { logging: false }

app
    .use(cors({ origin: 'http://localhost:8080', credentials: true }))
    .use(express.json({ limit: '10kb' }))
    .use(cookieParser())
    .use(urlencoded({ extended: true, limit: '10kb'}))
    .use(session({
        resave: false,
        saveUninitialized: true,
        secret: 'мурчалка',
        cookie: {
            maxAge: (1000 * 60 * 100)
        },
    }))
    .use(router)
    .use(ErrorMiddleware)
    .use(passport.initialize())
    .use(passport.session())
    .listen(port, async () => {
        try {
            await mysql.authenticate(logOff)
            await mysql.sync(logOff)
            console.log(c.blue.bold(`[SERVER] success start on port ${port}`))
        } catch (e) {
            console.log(e)
            console.log(c.red.bold(`[SERVER] started is failed`))
        }
    })

app.get('/', (req, res) => res.send('мурчу мурчу запутать хочу'))

export default app