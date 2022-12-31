import express from 'express'
import ApiRouter from './api.js'
import AuthRouter from './auth.js'
import UserRouter from './users.js'

const router = express()

router.use('/login', AuthRouter)
router.use('/users', UserRouter)
router.use('/api', ApiRouter)

export default router