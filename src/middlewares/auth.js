import Users from '../models/Users.js'
import { ApiError } from './errors.js'
import bcrypto from 'bcrypt'


export function AuthMiddleware () {
    return async (req, res, next) => {
        try {
            const { nickname, password } = req.body
            
            const user = await Users.findOne({ where: { nickname: nickname } })
            if (!user) throw ApiError.badRequest([ 'user is not found' ])
            
            const validPassword = bcrypto.compareSync(password, user.hashedPassword)
            if (!validPassword) return res.status(403).json('Password is wrong')

            console.log(`founded: `, user.nickname)
            return res.json(user)
        } catch (e) {
            console.log(e)
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