import express from 'express'
import { body, check } from 'express-validator'
import bcrypto from 'bcrypt'
import { ApiError } from '../middlewares/errors.js'


const UserRouter = express()
    .get('/', async (req, res, next) => {
        try {
            return res.json('hello get')
        } catch (e) {
            next(e)
        }
    })

export default UserRouter