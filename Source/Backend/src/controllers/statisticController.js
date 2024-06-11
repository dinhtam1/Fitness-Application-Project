const statisticServices = require('../services/statisticServices.js');
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

const getCalorieStatistics = async (req, res) => {
    const requestType = Type.GET_CALORIE_STATISTICS;
    var data = null;
    try {
        let startDate, endDate;
        let returnDayNames = false;
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
            startDate = moment().startOf(PERIOD_TYPE.WEEK).add(1, PERIOD.DAY).toDate();
            endDate = moment().endOf(PERIOD_TYPE.WEEK).add(1, PERIOD.DAY).toDate();
            returnDayNames = true;
        }
        data = await statisticServices.getCalorieStatistics(req.user.userId, startDate, endDate, returnDayNames);
        if (!data) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.CALORIE_STATISTICS_NOT_FOUND,
                data,
                requestType
            });
        } else {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.SUCCESS,
                message: appString.GET_CALORIE_STATISTICS_SUCCESFUL,
                data,
                requestType
            });
        }
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.FAIL,
            message: appString.INTERNAL_SERVER_ERROR,
            requestType
        });
    }
};

const getGenderStatisticsUser = async (req, res) => {
    const requestType = Type.GET_GENDER_STATISTICS_USER;
    var data = null;
    try {
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
            startDate = moment().startOf(PERIOD_TYPE.WEEK).add(1, PERIOD.DAY).toDate();
            endDate = moment().endOf(PERIOD_TYPE.WEEK).add(1, PERIOD.DAY).toDate();
        }
        data = await statisticServices.getGenderStatisticsUser(startDate, endDate);
        if (!data) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.GET_GENDER_STATISTICS_USER_NOT_FOUND,
                data,
                requestType
            });
        } else {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.SUCCESS,
                message: appString.GET_GENDER_STATISTICS_USER_SUCCESFUL,
                data,
                requestType
            })
        }
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.FAIL,
            message: appString.INTERNAL_SERVER_ERROR,
            requestType
        });
    }
}

const getAgeStatisticsUser = async (req, res) => {
    const requestType = Type.GET_GENDER_STATISTICS_USER;
    var data = null;
    try {
        let startDate, endDate;
        const { period, start, end } = req.query;
        if (period === PERIOD.WEEK) {
            startDate = moment().startOf(PERIOD_TYPE.WEEK).add(1, PERIOD.DAY).toDate();
            endDate = moment().endOf(PERIOD_TYPE.WEEK).add(1, PERIOD.DAY).toDate();
        } else if (period === PERIOD.MONTH) {
            startDate = moment().startOf(PERIOD_TYPE.MONTH).toDate();
            endDate = moment().endOf(PERIOD_TYPE.MONTH).toDate();
        } else if (start && end) {
            startDate = moment(start, PERIOD_TYPE.DAY).toDate();
            endDate = moment(end, PERIOD_TYPE.DAY).toDate();
        } else {
            startDate = moment().startOf(PERIOD_TYPE.WEEK).add(1, PERIOD.DAY).toDate();
            endDate = moment().endOf(PERIOD_TYPE.WEEK).add(1, PERIOD.DAY).toDate();
        }
        data = await statisticServices.getAgeStatisticsUser(startDate, endDate);
        if (!data) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.GET_GENDER_STATISTICS_USER_NOT_FOUND,
                data,
                requestType
            });
        } else {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.SUCCESS,
                message: appString.GET_GENDER_STATISTICS_USER_SUCCESFUL,
                data,
                requestType
            })
        }
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.FAIL,
            message: appString.INTERNAL_SERVER_ERROR,
            requestType
        });
    }
}

const getWeightStatisticsUser = async (req, res) => {
    const requestType = Type.GET_WEIGHT_STATISTICS_USER;
    var data = null;
    try {
        let startDate, endDate;
        const { period, start, end } = req.query;
        if (period === PERIOD.WEEK) {
            startDate = moment().startOf(PERIOD_TYPE.WEEK).add(1, PERIOD.DAY).toDate();
            endDate = moment().endOf(PERIOD_TYPE.WEEK).add(1, PERIOD.DAY).toDate();
        } else if (period === PERIOD.MONTH) {
            startDate = moment().startOf(PERIOD_TYPE.MONTH).toDate();
            endDate = moment().endOf(PERIOD_TYPE.MONTH).toDate();
        } else if (start && end) {
            startDate = moment(start, PERIOD_TYPE.DAY).toDate();
            endDate = moment(end, PERIOD_TYPE.DAY).toDate();
        } else {
            startDate = moment().startOf(PERIOD_TYPE.WEEK).add(1, PERIOD.DAY).toDate();
            endDate = moment().endOf(PERIOD_TYPE.WEEK).add(1, PERIOD.DAY).toDate();
        }
        data = await statisticServices.getWeightStatisticsUser(startDate, endDate);
        if (!data) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.GET_WEIGHT_STATISTICS_USER_NOT_FOUND,
                data,
                requestType
            });
        } else {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.SUCCESS,
                message: appString.GET_WEIGHT_STATISTICS_USER_SUCCESSFUL,
                data,
                requestType
            })
        }
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.FAIL,
            message: appString.INTERNAL_SERVER_ERROR,
            requestType
        });
    }
}

const getHeightStatisticsUser = async (req,res) => {
    const requestType = Type.GET_HEIGHT_STATISTICS_USER;
    var data = null;
    try {
        let startDate, endDate;
        const { period, start, end } = req.query;
        if (period === PERIOD.WEEK) {
            startDate = moment().startOf(PERIOD_TYPE.WEEK).add(1, PERIOD.DAY).toDate();
            endDate = moment().endOf(PERIOD_TYPE.WEEK).add(1, PERIOD.DAY).toDate();
        } else if (period === PERIOD.MONTH) {
            startDate = moment().startOf(PERIOD_TYPE.MONTH).toDate();
            endDate = moment().endOf(PERIOD_TYPE.MONTH).toDate();
        } else if (start && end) {
            startDate = moment(start, PERIOD_TYPE.DAY).toDate();
            endDate = moment(end, PERIOD_TYPE.DAY).toDate();
        } else {
            startDate = moment().startOf(PERIOD_TYPE.WEEK).add(1, PERIOD.DAY).toDate();
            endDate = moment().endOf(PERIOD_TYPE.WEEK).add(1, PERIOD.DAY).toDate();
        }
        data = await statisticServices.getHeightStatisticsUser(startDate, endDate);
        if (!data) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: appString.GET_HEIGHT_STATISTICS_USER_NOT_FOUND,
                data,
                requestType
            });
        } else {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.SUCCESS,
                message: appString.GET_HEIGHT_STATISTICS_USER_SUCCESSFUL,
                data,
                requestType
            })
        }
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.FAIL,
            message: appString.INTERNAL_SERVER_ERROR,
            requestType
        });
    }
}

module.exports = {
    getCalorieStatistics,
    getGenderStatisticsUser,
    getAgeStatisticsUser,
    getWeightStatisticsUser,
    getHeightStatisticsUser
};