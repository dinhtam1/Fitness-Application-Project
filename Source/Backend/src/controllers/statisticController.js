const analysisServices = require('../services/analysisServices.js');
const statusCode = require('../constant/appNumber.js')
const Type = require('../constant/appRequestType.js')
const appString = require('../constant/appString.js')
const moment = require('moment');
moment.locale('en', {
    week: {
        dow: 1, // Monday is the first day of the week
    }
});

const getCalorieStatistics = async (req, res) => {
    const requestType = Type.GET_CALORIE_STATISTICS;
    try {
        let startDate, endDate;
        let returnDayNames = false;
        const { period, start, end } = req.query;
        if (period === 'week') {
            startDate = moment().startOf('isoWeek').add(1, 'day').toDate();
            endDate = moment().endOf('isoWeek').add(1, 'day').toDate();
            returnDayNames = true;
        } else if (period === 'month') {
            startDate = moment().startOf('month').toDate();
            endDate = moment().endOf('month').toDate();
        } else if (start && end) {
            startDate = moment(start, 'DD/MM/YYYY').toDate();
            endDate = moment(end, 'DD/MM/YYYY').toDate();
        } else {
            return res.status(statusCode.BAD_REQUEST).json({
                statusCode: statusCode.FAIL,
                message: appString.INVALID_PERIOD,
                requestType
            });
        }
        console.log("start ", startDate, "end", endDate);
        const data = await analysisServices.getCalorieStatistics(req.user.userId, startDate, endDate, returnDayNames);
        console.log(data);
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
        console.log(error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.FAIL,
            message: appString.INTERNAL_SERVER_ERROR,
            requestType
        });
    }
};


module.exports = {
    getCalorieStatistics
};