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
    const requestType = Type.GET_CALORIE_STATISTICS
    var data = null;
    try {
        let startDate, endDate;
    const { period } = req.query;
    switch (period) {
        case 'week':
            startDate = moment().startOf('week').toDate();
            endDate = moment().endOf('week').toDate();
            break;
        case 'month':
            startDate = moment().startOf('month').toDate();
            endDate = moment().endOf('month').toDate();
            break;
        default:
            const [start, end] = period.split(':');
            startDate = new Date(start);
            endDate = new Date(end);
            break;
    }
        data = await analysisServices.getCalorieStatistics(req.user.userId, startDate, endDate);
        console.log(data)
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
}


module.exports = {
    getCalorieStatistics
};