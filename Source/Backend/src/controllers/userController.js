const userServices = require('../services/userServices');
const statusCode = require('../constant/appNumber.js')
const Type = require('../constant/appRequestType.js')
const appString = require('../constant/appString.js')
const getUsers = async (req, res) => {
    var data = null;
    var requestType = Type.VIEW_PROFILE;
    try {
        const userId = req.user.userId;
        const user = await userServices.getUserByUserId(userId)
        if(!user){
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.USER_NOT_FOUND,
                data,
                requestType
            });
        }
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.SUCCESS,
            message: appString.VIEW_PROFILE_SUCCESSFUL,
            data: user,
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

const updatedUser = async (req, res) => {
    var data = null;
    var requestType = Type.UPDATE_PROFILE;
    try {
        const userId = req.user.userId;
        const user = await userServices.getUserByUserId(userId)
        if(!user){
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.USER_NOT_FOUND,
                data,
                requestType
            });
        }
        const updatedUser = await userServices.updateUser(userId, req.updateInfoUser)
        if(!updatedUser){
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.ERROR_UPDATE_USER,
                data,
                requestType
            });
        }
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.SUCCESS,
            message: appString.UPDATE_PROFILE_SUCCESSFUL,
            data: updatedUser,
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
    getUsers,
    updatedUser
};