const express = require('express');
const mealRouter = express.Router();
const mealController = require('../controllers/mealController');
const authValidation = require('../validation/authValidation');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const LIMIT_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: LIMIT_FILE_SIZE,
    },
});
mealRouter.get('/', authMiddleware.verifyToken, mealController.getMeal)
mealRouter.get('/nutrition', authMiddleware.verifyToken, upload.single('food'), mealController.getNutrition)
mealRouter.get('/:id', authMiddleware.verifyToken, mealController.getDetailMeal)

module.exports = mealRouter;