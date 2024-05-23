const mealServices = require('../services/mealServices.js');
const statusCode = require('../constant/appNumber.js')
const Type = require('../constant/appRequestType.js')
const appString = require('../constant/appString.js')
const getMeal = async (req, res) => {
    var data = null;
    var requestType = Type.GET_MEAL;
    try {
        data = await mealServices.getMeal(req.user.userId, req.query.page, req.query.limit);
        if(!data) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.MEAL_NOT_FOUND,
                requestType
            });
        }
        if(data.length === 0){
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


module.exports = {
    getMeal
};