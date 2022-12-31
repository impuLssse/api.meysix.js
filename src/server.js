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


const { PORT, SECRET } = process.env
const app = express()

app
    .use(cors({ origin: 'http://localhost:8080', credentials: true }))
    .use(express.json({ limit: '10kb' }))
    .use(cookieParser())
    .use(urlencoded({ extended: true, limit: '10kb'}))
    .use(session({
        resave: false,
        saveUninitialized: true,
        secret: SECRET,
        cookie: {
            maxAge: (1000 * 60 * 100)
        },
    }))
    .use(router)
    .use(ErrorMiddleware)
    .use(passport.initialize())
    .use(passport.session())
    .listen(PORT, async () => {
        try {
            await mysql.authenticate()
            await mysql.sync()
            console.log(c.blue.bold(`[SERVER] success start on port ${PORT}`))
        } catch (e) {
            console.log(e)
            console.log(c.red.bold(`[SERVER] started is failed`))
        }
    })

app.get('/', (req, res) => res.send('прокрастинация — игрушка дьявола'))

export default app