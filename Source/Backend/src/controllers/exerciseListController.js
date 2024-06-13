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

const addExerciseToList = async (req, res) => {
    var data = null;
    var requestType = Type.ADD_EXERCISE_TO_LIST;
    try {
        data = await exerciseListServices.addExerciseToList(req.body.exerciseId, req.body.exerciseListId);
        if (!data) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.THE_EXERCISE_ALREADY_EXISTS_IN_THE_LIST,
                data,
                requestType
            });
        }
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.SUCCESS,
            message: appString.ADD_EXERCISE_TO_LIST_SUCCESSFUL,
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

const getExerciseInList = async (req, res) => {
    var data = null;
    var requestType = Type.GET_EXERCISE_IN_LIST;
    try {
        data = await exerciseListServices.getExerciseInList(req.user.userId, parseInt(req.params.id));
        if (!data) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.EXERCISE_IN_LIST_NOT_FOUND,
                requestType
            });
        }
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.SUCCESS,
            message: appString.GET_EXERCISE_IN_LIST_SUCCESSFUL,
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

const getExerciseList = async (req, res) => {
    var data = null;
    var requestType = Type.GET_EXERCISE_LIST;
    try {
        data = await exerciseListServices.getExerciseList(req.user.userId);
        if (!data) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.EXERCISE_LIST_NOT_FOUND,
                requestType
            });
        }
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.SUCCESS,
            message: appString.GET_EXERCISE_LIST_SUCCESSFUL,
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

const deleteExerciseList = async (req, res) => {
    var data = null;
    var requestType = Type.DELETE_EXERCISE_LIST;
    try {
        data = await exerciseListServices.deleteExerciseList(req.user.userId, parseInt(req.params.id));
        if (!data) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.EXERCISE_LIST_NOT_FOUND_OR_YOU_DONT_HAVE_ONE,
                requestType
            });
        }
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.SUCCESS,
            message: appString.DELETE_EXERCISE_LIST_SUCCESSFUL,
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
    createExerciseList,
    addExerciseToList,
    getExerciseInList,
    getExerciseList,
    deleteExerciseList
};