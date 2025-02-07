const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const authValidation = require('../validation/authValidation');
const authMiddleware = require('../middlewares/authMiddleware');

authRouter.post('/sign-up',authValidation.createUserValidation, authController.signUp);
authRouter.post('/sign-in', authController.signIn);
authRouter.post('/log-out',authMiddleware.verifyToken, authController.logOut);
authRouter.post('/decode-token', authController.decodeToken);
authRouter.post('/send-otp', authController.sendOTP);
authRouter.post('/verify-otp', authController.verifyOTP);
authRouter.put('/forgot-password',authValidation.forgotPasswordValidation, authMiddleware.verifyToken, authController.forgotPassword);
authRouter.post('/renew-token', authController.renewToken);

module.exports = authRouter;