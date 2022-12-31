

export default function AuthSteamMiddleware () {
    return (req, res, next) => {
         try {
            if (!req.session.passport?.user) return res.status(401).json({ status: 0 })
            return res.status(200).json({ status: 1 })
         } catch (e) {
            next(e)
         }
    }
}