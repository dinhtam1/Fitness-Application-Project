const express = require('express');
const adminRouter = express.Router();
const statisticController = require('../controllers/statisticController');
const authValidation = require('../validation/authValidation');
const authMiddleware = require('../middlewares/authMiddleware');

adminRouter.get('/gender-statistic', authMiddleware.verifyTokenAdmin, statisticController.getGenderStatisticsUser)
adminRouter.get('/age-statistic', authMiddleware.verifyTokenAdmin, statisticController.getAgeStatisticsUser)

module.exports = adminRouter;