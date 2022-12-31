import ApiError from './ErrorMiddleware.js'


export default function AuthMiddleware () {
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