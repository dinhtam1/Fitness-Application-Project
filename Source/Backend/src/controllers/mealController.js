const mealServices = require('../services/mealServices.js');
const statusCode = require('../constant/appNumber.js')
const Type = require('../constant/appRequestType.js')
const appString = require('../constant/appString.js')
const getMeal = async (req, res) => {
    var data = null;
    var requestType = Type.GET_MEAL;
    try {
        const { time_meal, page, limit, return_random } = req.query;
        data = await mealServices.getMeal(req.user.userId, time_meal, page, limit,return_random);
        if (!data) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.MEAL_NOT_FOUND,
                requestType
            });
        }
        if (data.length === 0) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.ENOUGH_CALORIES,
                requestType
            });
        }
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.SUCCESS,
            message: appString.GET_MEAL_SUCCESSFUL,
            data,
            requestType
        });
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: error.message,
            requestType
        });
    }
}

const getDetailMeal = async (req, res) => {
    var data = null;
    var requestType = Type.GET_DETAIL_MEAL;
    try {
        const mealId = parseInt(req.params.id);
        data = await mealServices.getDetailMeal(mealId);
        if (!data) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.MEAL_NOT_FOUND,
                requestType
            });
        }
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.SUCCESS,
            message: appString.GET_DETAIL_MEAL_SUCCESSFUL,
            data,
            requestType
        });
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: error.message,
            requestType
        });
    }
}

const getNutrition = async (req, res) => {
    var data = null;
    var requestType = Type.GET_NUTRITION;
    try {
        const mealImage = req.file;
        data = await mealServices.getNutritionbyImage(mealImage);
        if (!data) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.MEAL_NOT_FOUND,
                requestType
            });
        }
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.SUCCESS,
            message: appString.GET_NUTRITION_SUCCESSFUL,
            data,
            requestType
        });
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: error.message,
            requestType
        });
    }

}

module.exports = {
    getDetailMeal,
    getMeal,
    getNutrition
};