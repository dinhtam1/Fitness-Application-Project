const express = require('express');
const exerciseRouter = express.Router();
const exerciseController = require('../controllers/exerciseController');
const authValidation = require('../validation/authValidation');
const authMiddleware = require('../middlewares/authMiddleware');

exerciseRouter.get('/category', authMiddleware.verifyToken, exerciseController.getCategory)
exerciseRouter.get('/exercise', authMiddleware.verifyToken, exerciseController.getExercise)
exerciseRouter.get('/exercise/:id', authMiddleware.verifyToken, exerciseController.getDetailExercise)
module.exports = exerciseRouter;