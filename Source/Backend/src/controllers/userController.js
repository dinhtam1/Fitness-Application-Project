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
        if (!user) {
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
        const avatarImage = req.file;
        const userId = req.user.userId;
        const user = await userServices.getUserByUserId(userId)
        if (!user) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.USER_NOT_FOUND,
                data,
                requestType
            });
        }
        const updatedUser = await userServices.updateUser(userId, req.body, avatarImage)
        if (!updatedUser) {
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

const getUserManagement = async (req, res) => {
    var data = null;
    var requestType = Type.GET_USER_MANAGEMENT;
    try {
        const users = await userServices.getAllUser(req.user.userId)
        if (!users) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.USER_NOT_FOUND,
                data,
                requestType
            });
        }
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.SUCCESS,
            message: appString.GET_USER_MANAGEMENT_SUCCESSFUL,
            data: users,
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

const updateStatusUser = async (req, res) => {
    var data = null;
    const requestType = Type.UPDATE_STATUS_USER;
    try {
        data = await userServices.updateStatusUser(req.body.userId, req.body.status)
        if (!data) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.UPDATE_STATUS_USER_FAIL,
                data,
                requestType
            });
        }
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.SUCCESS,
            message: appString.UPDATE_STATUS_USER_SUCCESSFUL,
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
    getUsers,
    updatedUser,
    getUserManagement,
    updateStatusUser
};