const express = require('express');
const exerciseListRouter = express.Router();
const exerciseListController = require('../controllers/exerciseListController');
const exerciseListValidation = require('../validation/exerciseListValidation');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const LIMIT_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: LIMIT_FILE_SIZE,
    },
});
exerciseListRouter.post('/create-list', authMiddleware.verifyToken,upload.single('cover-exercise'),exerciseListValidation.exerciseListCreateValidation, exerciseListController.createExerciseList)
exerciseListRouter.post('/add-list', authMiddleware.verifyToken,exerciseListValidation.exerciseListAddValidation, exerciseListController.addExerciseToList)
module.exports = exerciseListRouter;