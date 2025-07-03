import express from 'express'
import { getAllUser, getMe, login, register } from '../controllers/authController.js';
import { authUser } from '../middlewares/authUser.js';

const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/auth', authUser, getMe)
userRouter.get('/getAll', getAllUser)
export default userRouter;