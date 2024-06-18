const express = require('express');
const adminRouter = express.Router();
const statisticController = require('../controllers/statisticController');
const userController = require('../controllers/userController');
const authValidation = require('../validation/authValidation');
const authMiddleware = require('../middlewares/authMiddleware');

adminRouter.get('/user-management',  userController.getUserManagement);
adminRouter.get('/gender-statistic',  statisticController.getGenderStatisticsUser)
adminRouter.get('/age-statistic',  statisticController.getAgeStatisticsUser)
adminRouter.get('/weight-statistic',  statisticController.getWeightStatisticsUser)
adminRouter.get('/height-statistic',  statisticController.getHeightStatisticsUser)
adminRouter.put('/update-status', authValidation.updateStatusUserValidation, userController.updateStatusUser)
module.exports = adminRouter;