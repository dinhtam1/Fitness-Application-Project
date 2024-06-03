const express = require('express');
const statisticRouter = express.Router();
const statisticController = require('../controllers/statisticController');
const authValidation = require('../validation/authValidation');
const authMiddleware = require('../middlewares/authMiddleware');

statisticRouter.get('/', authMiddleware.verifyToken, statisticController.getUser)

module.exports = statisticRouter;