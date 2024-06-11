const express = require('express');
const adminRouter = express.Router();
const statisticController = require('../controllers/statisticController');
const userController = require('../controllers/userController');
const authValidation = require('../validation/authValidation');
const authMiddleware = require('../middlewares/authMiddleware');

adminRouter.get('/user-management', authMiddleware.verifyTokenAdmin, userController.getUserManagement);
adminRouter.get('/gender-statistic', authMiddleware.verifyTokenAdmin, statisticController.getGenderStatisticsUser)
adminRouter.get('/age-statistic', authMiddleware.verifyTokenAdmin, statisticController.getAgeStatisticsUser)
adminRouter.get('/weight-statistic', authMiddleware.verifyTokenAdmin, statisticController.getWeightStatisticsUser)
adminRouter.get('/height-statistic', authMiddleware.verifyTokenAdmin, statisticController.getHeightStatisticsUser)
adminRouter.put('/update-status', authMiddleware.verifyTokenAdmin,authValidation.updateStatusUserValidation, userController.updateStatusUser)
module.exports = adminRouter;