const Type = require('../constant/appRequestType.js')
const Joi = require('joi');
const statusCode = require('../constant/appNumber.js')
const appString = require('../constant/appString.js')
var requestType = Type.VALIDATION;

const dashboardUpdateSchema = Joi.object({
    time_sleep: Joi.number().positive().strict(),
    time_practice: Joi.number().positive().strict(),
    calories_burned: Joi.number().positive().strict()
});
const dashboardUpdateValidation = (req, res, next) => {
    try {
        const { error, value } = dashboardUpdateSchema.validate(req.body);
        if (error) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: error.message.replace(/\\/g, '').replace(/"/g, ''),
                requestType
            });
        };

        req.updateDashboard = value;
    } catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.FAIL,
            message: err.message,
            requestType
        });
    };
    next();
};


module.exports = {
    dashboardUpdateValidation
}
