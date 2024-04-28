const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const authValidation = require('../validation/authValidation');
authRouter.post('/sign-up',authValidation.createUserValidation, authController.signUp);
authRouter.post('/sign-in', authController.signIn);
authRouter.post('/decode-token', authController.decodeToken);

module.exports = authRouter;