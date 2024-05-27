const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const authValidation = require('../validation/authValidation');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const LIMIT_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: LIMIT_FILE_SIZE,
    },
});
userRouter.get('/me', authMiddleware.verifyToken, userController.getUsers);
userRouter.put('/me', authMiddleware.verifyToken, upload.single('avatar'), authValidation.userUpdateValidation, userController.updatedUser)
module.exports = userRouter;