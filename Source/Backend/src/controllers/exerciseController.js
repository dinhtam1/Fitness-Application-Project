const exerciseServices = require('../services/exerciseServices.js');
const statusCode = require('../constant/appNumber.js')
const Type = require('../constant/appRequestType.js')
const appString = require('../constant/appString.js')

const LEVEL_CONSTANT = {
    BEGINNER: 'BEGINNER',
    ADVANCED: 'ADVANCED',
}

const GOAL_CONSTANT = {
    WEIGHT_LOSS: 'WEIGHT_LOSS',
    GAIN_MUSCLE: 'GAIN_MUSCLE',
}

const CONVERT = {
    BEGINNER: "Beginner",
    ADVANCED: "Advanced",
    LOSE : "Lose",
    GAIN : "Gain"

}

const getCategory = async (req, res) => {
    var data = null;
    var requestType = Type.GET_CATEGORY;
    try {
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
    var requestType = Type.GET_EXERCISE;
    var data = null;
    try {
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
    const requestType = Type.GET_DETAIL_EXERCISE;
    try {
        const { goal, level,gender } = req.user
        const exerciseId = parseInt(req.params.id);
        const exercise = await exerciseServices.getDetailExercise(exerciseId)
        exercise.level = level;
        if(!exercise){
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.SUCCESS,
                message: appString.EXERCISE_NOT_FOUND,
                requestType
            });
        }
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.SUCCESS,
            message: appString.GET_DETAIL_EXERCISE_SUCCESSFUL,
            data: exercise,
            requestType
        
        })
        
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: appString.INTERNAL_SERVER_ERROR,
            requestType
        });
    }
}
 
const getResultExercise = async (req, res) => {
    var requestType = Type.GET_RESULT_EXERCISE;
    var data = null;
    try {
        const userId = req.user.userId;
        const exerciseId = req.params.id;
        const result = await exerciseServices.getResultExercise(exerciseId)
        if(!result) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.SUCCESS,
                message: appString.EXERCISE_NOT_FOUND,
                data,
                requestType
            });
        }
        result.weight = req.user.weight;
        if(req.user.level === LEVEL_CONSTANT.BEGINNER) result.level = CONVERT.BEGINNER
        if(req.user.level === LEVEL_CONSTANT.ADVANCED) result.level = CONVERT.ADVANCED
        if(req.user.goal === GOAL_CONSTANT.WEIGHT_LOSS) result.goal = CONVERT.LOSE
        if(req.user.goal === GOAL_CONSTANT.GAIN_MUSCLE) result.goal = CONVERT.GAIN
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.SUCCESS,
            message: appString.GET_RESULT_EXERCISE_SUCCESSFUL,
            data: result,
            requestType
        })
    } catch (error) {
        console.log(error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: appString.INTERNAL_SERVER_ERROR,
            requestType
        });
    }
}


module.exports = {
    getCategory,
    getExercise,
    getDetailExercise,
    getResultExercise
};