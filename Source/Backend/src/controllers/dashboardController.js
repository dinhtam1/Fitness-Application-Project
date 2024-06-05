const dashboardServices = require('../services/dashboardServices.js');
const statusCode = require('../constant/appNumber.js')
const Type = require('../constant/appRequestType.js')
const appString = require('../constant/appString.js')
const moment = require('moment');

moment.updateLocale('en', {
    // your custom configuration here
});
const PERIOD = {
    WEEK: 'week',
    MONTH: 'month',
    DAY: 'day'
}
const PERIOD_TYPE = {
    WEEK: 'isoweek',
    MONTH: 'month',
    DAY: 'DD/MM/YYYY'
}
const getDashboard = async (req, res) => {
    const requestType = Type.GET_DASHBOARD;
    var data = null;
    try {
        const userId = req.user.userId;
        let startDate, endDate;
        const { period, start, end } = req.query;
        if (period === PERIOD.WEEK) {
            startDate = moment().startOf(PERIOD_TYPE.WEEK).add(1, PERIOD.DAY).toDate();
            endDate = moment().endOf(PERIOD_TYPE.WEEK).add(1, PERIOD.DAY).toDate();
            returnDayNames = true;
        } else if (period === PERIOD.MONTH) {
            startDate = moment().startOf(PERIOD_TYPE.MONTH).toDate();
            endDate = moment().endOf(PERIOD_TYPE.MONTH).toDate();
        } else if (start && end) {
            startDate = moment(start, PERIOD_TYPE.DAY).toDate();
            endDate = moment(end, PERIOD_TYPE.DAY).toDate();
        } else {
            startDate = undefined;
            endDate = undefined
        }
        const dashboard = await dashboardServices.getDashboard(userId, startDate, endDate)
        if (!dashboard) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.DASHBOARD_NOT_FOUND,
                data,
                requestType
            });
        }
        dashboard.weight = req.user.weight;
        dashboard.height = req.user.height;
        dashboard.level = req.user.level;
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.SUCCESS,
            message: appString.GET_DASHBOARD_SUCCESSFUL,
            data: dashboard,
            requestType
        });
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.FAIL,
            message: appString.INTERNAL_SERVER_ERROR,
            requestType
        });
    }
}

const updateDashboard = async (req, res) => {
    const requestType = Type.UPDATE_DASHBOARD
    var data = null;
    try {
        const updatedDashboard = await dashboardServices.updateDashboard(req.user, req.body)
        if (!updatedDashboard) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.UPDATE_DASHBOARD_FAILED,
                data,
                requestType
            });
        }
        return res.status(statusCode.SUCCESS).json({
            statusCode: statusCode.SUCCESS,
            message: appString.UPDATE_DASHBOARD_SUCCESSFUL,
            data: updatedDashboard,
            requestType
        })
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.FAIL,
            message: appString.INTERNAL_SERVER_ERROR,
            requestType
        });
    }
}


module.exports = {
    getDashboard,
    updateDashboard
};