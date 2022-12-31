import { ApiError } from './errors.js'

export function AuthMiddleware () {
    return (req, res, next) => {
        try {
            console.log(req.session)
            return res.json(1)
        } catch (e) {
            next(e)
        }
    }
}

export function AuthApiMiddleware () {
    return (req, res, next) => {
        try {
            const key = req.headers.apikey || req.cookies.apikey
            if (!key) throw ApiError.badRequest([ `apikey is not provided` ])
            
            return res.json(1)
        } catch (e) {
            next(e)
        }
    }
}

export function AuthSteamMiddleware () {
    return (req, res, next) => {
         try {
            if (!req.session.passport?.user) return res.status(401).json({ status: false })
            return res.status(200).json({ status: true })
         } catch (e) {
            next(e)
         }
    }
}