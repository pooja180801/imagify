import express from 'express'
import {registerUser, loginUser, userCredits, paymentStripe, verifyPayment} from '../controllers/userController.js'
import userAuth from '../middleware/auth.js';

const userRouter = express.Router()

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/credits', userAuth, userCredits);
userRouter.post('/pay-stripe', userAuth, paymentStripe);
userRouter.post('/verify', verifyPayment);

export default userRouter;
