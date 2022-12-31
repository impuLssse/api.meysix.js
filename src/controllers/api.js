import express from 'express'
import { header } from 'express-validator'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'
import ValidationMiddleware from '../middlewares/ValidationMiddleware.js'
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