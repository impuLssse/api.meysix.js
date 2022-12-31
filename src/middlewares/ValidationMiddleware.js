import { validationResult } from 'express-validator'
import ApiError from './ErrorMiddleware.js'

export default function ValidationMiddleware (req, res, next) {
    if (!validationResult(req).isEmpty()) throw ApiError.badRequest(validationResult(req).array())
    next()
}