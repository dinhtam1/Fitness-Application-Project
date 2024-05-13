const exerciseServices = require('../services/exerciseServices.js');
const statusCode = require('../constant/appNumber.js')
const Type = require('../constant/appRequestType.js')
const appString = require('../constant/appString.js')

const getCategory = async (req, res) => {
    try {
        var data = null;
        var requestType = Type.GET_CATEGORY;
        const category = await exerciseServices.getCategory()
        if (!category) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.SUCCESS,
                message: appString.CATEGORY_NOT_FOUND,
                data,
                requestType
            });
        }
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.SUCCESS,
            message: appString.GET_CATEGORY_SUCCESSFUL,
            data: category,
            requestType
        });
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: appString.INTERNAL_SERVER_ERROR,
            requestType
        });
    }
}

const getExercise = async (req, res) => {
    try {
        var requestType = Type.GET_EXERCISE;
        var data = null;
        const { category, page, muscle_name } = req.query
        const { goal, level,gender } = req.user
        const exercises = await exerciseServices.getExercise(category, page,gender, goal, level,muscle_name);
        if (!exercises) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.SUCCESS,
                message: appString.EXERCISE_NOT_FOUND,
                data,
                requestType
            });
        }
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.SUCCESS,
            message: appString.GET_EXERCISE_SUCCESSFUL,
            data: exercises,
            requestType
        });
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: appString.INTERNAL_SERVER_ERROR,
            requestType
        });
    }
}

const getDetailExercise = async (req, res) => {
    try {
        const exerciseId = parseInt(req.params.id);
        console.log(exerciseId);
    } catch (error) {

    }
}


module.exports = {
    getCategory,
    getExercise,
    getDetailExercise
};