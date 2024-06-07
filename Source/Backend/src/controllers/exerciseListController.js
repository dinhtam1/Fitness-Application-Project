const exerciseListServices = require('../services/exerciseListServices.js');
const statusCode = require('../constant/appNumber.js')
const Type = require('../constant/appRequestType.js')
const appString = require('../constant/appString.js')

const createExerciseList = async (req, res) => {
    var data = null;
    const requestType = Type.CREATE_EXERCISE_LIST;
    try {
        const image = req.file;
        data = await exerciseListServices.createExerciseList(req.user.userId, req.body.list_name,image);
        if (!data) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.CREATE_EXERCISE_LIST_FAIL,
                requestType
            });
        }
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.SUCCESS,
            message: appString.CREATE_EXERCISE_LIST_SUCCESFUL,
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
    createExerciseList
};