const express = require('express');
const mealRouter = express.Router();
const mealController = require('../controllers/mealController');
const authValidation = require('../validation/authValidation');
const authMiddleware = require('../middlewares/authMiddleware');

mealRouter.get('/', authMiddleware.verifyToken, mealController.getMeal)

module.exports = mealRouter;