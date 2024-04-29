const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const authValidation = require('../validation/authValidation');
const authMiddleware = require('../middlewares/authMiddleware');

authRouter.post('/sign-up',authValidation.createUserValidation, authController.signUp);
authRouter.post('/sign-in', authController.signIn);
authRouter.post('/log-out',authMiddleware.verifyToken, authController.logOut);
authRouter.post('/decode-token', authController.decodeToken);

module.exports = authRouter;