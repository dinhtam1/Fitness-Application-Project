const dashboardServices = require('../services/dashboardServices.js');
const statusCode = require('../constant/appNumber.js')
const Type = require('../constant/appRequestType.js')
const appString = require('../constant/appString.js')

const getDashboard = async (req, res) => {
    const requestType = Type.GET_DASHBOARD;
    var data = null;
    try {
        const userId = req.user.userId;
        const category = await dashboardServices.getDashboard(userId)
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

const updateDashboard = async (req, res) => {
    const requestType = Type.UPDATE_DASHBOARD
    var data = null;
    try {
        const updatedDashboard = await dashboardServices.updateDashboard(req.user, req.updateDashboard)
        if(!updatedDashboard) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.SUCCESS,
                message: appString.UPDATE_DASHBOARD_FAILED,
                data,
                requestType
            });
        }
        return res.status(statusCode.SUCCESS).json({
            statusCode : statusCode.SUCCESS,
            message: appString.UPDATE_DASHBOARD_SUCCESSFUL,
            data: updatedDashboard,
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


module.exports = {
    getDashboard,
    updateDashboard
};