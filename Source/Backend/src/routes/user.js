const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const authValidation = require('../validation/authValidation');
const authMiddleware = require('../middlewares/authMiddleware');

userRouter.get('/me', authMiddleware.verifyToken, userController.getUsers);
userRouter.put('/me', authMiddleware.verifyToken,authValidation.userUpdateValidation, userController.updatedUser)
module.exports = userRouter;