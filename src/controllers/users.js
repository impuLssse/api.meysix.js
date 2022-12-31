import express from 'express'
import { body, check } from 'express-validator'
import bcrypto from 'bcrypt'

import ValidationMiddleware from '../middlewares/ValidationMiddleware.js'
import ApiError from '../middlewares/ErrorMiddleware.js'
import Users from '../models/Users.js'
import Time from '../services/time.js'


const UserRouter = express()
    .get('/', async (req, res, next) => {
        try {
            return res.json('hello get')
        } catch (e) {
            next(e)
        }
    })
    .post('/',
        body('nickname').notEmpty().withMessage(`not provided`),
        body('password').notEmpty().withMessage(`not provided`),
        check('nickname').matches(/^[A-Za-z\s\-]+$/gui).withMessage(`Name must be alphabetic`),
        check('password').isLength({ min: 6, max: 36 }).withMessage(`Password must be 6-36 chars`),
        ValidationMiddleware,
        async (req, res, next) => {
            try {
                const { nickname, password } = req.body
                const hashPassword = bcrypto.hashSync(password, 7)

                const user = await Users.create({ nickname: nickname, hashedPassword: hashPassword })
                    .then( data => res.status(201).json(data))
                    .catch( err => { throw ApiError.badRequest([err]) })
            } catch (e) {
                next(e)
            }
    })

export default UserRouter