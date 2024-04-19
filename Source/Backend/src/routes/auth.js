const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');

authRouter.get('/signin', authController.sigIn);
authRouter.get('/signup', authController.signUp);

module.exports = authRouter;