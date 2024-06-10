const express = require('express');
const adminRouter = express.Router();
const statisticController = require('../controllers/statisticController');
const userController = require('../controllers/userController');
const authValidation = require('../validation/authValidation');
const authMiddleware = require('../middlewares/authMiddleware');

adminRouter.get('/user-management', authMiddleware.verifyTokenAdmin, userController.getUserManagement);
adminRouter.get('/gender-statistic', authMiddleware.verifyTokenAdmin, statisticController.getGenderStatisticsUser)
adminRouter.get('/age-statistic', authMiddleware.verifyTokenAdmin, statisticController.getAgeStatisticsUser)

module.exports = adminRouter;