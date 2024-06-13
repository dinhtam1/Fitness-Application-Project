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
exerciseListRouter.get('/', authMiddleware.verifyToken, exerciseListController.getExerciseList)
exerciseListRouter.post('/', authMiddleware.verifyToken,upload.single('cover-exercise'),exerciseListValidation.exerciseListCreateValidation, exerciseListController.createExerciseList)
exerciseListRouter.post('/add-list', authMiddleware.verifyToken,exerciseListValidation.exerciseListAddValidation, exerciseListController.addExerciseToList)
exerciseListRouter.delete('/:id', authMiddleware.verifyToken, exerciseListController.deleteExerciseList)
exerciseListRouter.get('/:id', authMiddleware.verifyToken, exerciseListController.getExerciseInList)
module.exports = exerciseListRouter;