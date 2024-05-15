const express = require('express');
const dashboardRouter = express.Router();
const dashboardController = require('../controllers/dashboardController');
const dashboardValidation = require('../validation/dashboardValidation');
const authMiddleware = require('../middlewares/authMiddleware');

dashboardRouter.get('/', authMiddleware.verifyToken, dashboardController.getDashboard)
dashboardRouter.put('/', authMiddleware.verifyToken,dashboardValidation.dashboardUpdateValidation, dashboardController.updateDashboard)
module.exports = dashboardRouter;