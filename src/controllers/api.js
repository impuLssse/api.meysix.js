import express from 'express'
import { header } from 'express-validator'
import { AuthMiddleware } from '../middlewares/auth.js'

import { ValidationMiddleware } from '../middlewares/validations.js'
import passport from '../services/steam.js'

const ApiRouter = express()
    .get('/',
        header('apikey').notEmpty().withMessage('is not provided'),
        ValidationMiddleware,
        async (req, res, next) => {
            try {
                res.status(200).json({ status: 'accessed' })
            } catch (e) {
                next(e)
            }
        }
    )


export default ApiRouter