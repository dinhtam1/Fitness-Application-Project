const exerciseServices = require('../services/exerciseServices.js');
const statusCode = require('../constant/appNumber.js')
const Type = require('../constant/appRequestType.js')
const appString = require('../constant/appString.js')

const getCategory = async (req, res) => {
    try {
        var data = null;
        var requestType = Type.GET_CATEGORY;
        const category = await exerciseServices.getCategory()
        if(!category){
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
        
    } catch (error) {
        
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