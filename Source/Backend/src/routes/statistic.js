const express = require('express');
const statisticsRouter = express.Router();
const statisticsController = require('../controllers/statisticController');
const authValidation = require('../validation/authValidation');
const authMiddleware = require('../middlewares/authMiddleware');

statisticsRouter.get('/', authMiddleware.verifyToken, statisticsController.getCalorieStatistics)

module.exports = statisticsRouter;