import express from 'express'
import { adminLogin } from '../controllers/adminController'

const authRouter = express.Router()

authRouter.post("/admin-login", adminLogin)

export default authRouter