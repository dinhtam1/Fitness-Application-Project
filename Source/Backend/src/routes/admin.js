const express = require('express');
const adminRouter = express.Router();
const statisticController = require('../controllers/statisticController');
const authValidation = require('../validation/authValidation');
const authMiddleware = require('../middlewares/authMiddleware');

adminRouter.get('/gender-statistic', authMiddleware.verifyTokenAdmin, statisticController.getGenderStatisticsUser)

module.exports = adminRouter;