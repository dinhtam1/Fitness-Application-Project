const Type = require('../constant/appRequestType.js')
const Joi = require('joi');
const statusCode = require('../constant/appNumber.js')
const appString = require('../constant/appString.js')
var requestType = Type.VALIDATION;

const exerciseListCreateSchema = Joi.object({
    list_name: Joi.string().required(),
});
const exerciseListCreateValidation = (req, res, next) => {
    try {
        const { error, value } = exerciseListCreateSchema.validate(req.body);
        if (error) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: error.message.replace(/\\/g, '').replace(/"/g, ''),
                requestType
            });
        };

        req.createExerciseList = value;
    } catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.FAIL,
            message: err.message,
            requestType
        });
    };
    next();
};

const exerciseListAddSchema = Joi.object({
    exerciseId: Joi.number().positive().required().strict(),
    exerciseListId: Joi.array().items(Joi.number().positive().required().strict()).required()
});

const exerciseListAddValidation = (req, res, next) => {
    try {
        const { error, value } = exerciseListAddSchema.validate(req.body);
        if (error) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: error.message.replace(/\\/g, '').replace(/"/g, ''),
                requestType
            });
        };

        req.addExerciseToList = value;
    } catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.FAIL,
            message: err.message,
            requestType
        });
    };
    next();
};

const exerciseListDeleteSchema = Joi.object({
    exerciseId: Joi.number().positive().required().strict(),
});

const exerciseListDeleteValidation = (req, res, next) => {
    try {
        const { error, value } = exerciseListDeleteSchema.validate(req.body);
        if (error) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: error.message.replace(/\\/g, '').replace(/"/g, ''),
                requestType
            });
        };

        req.deleteExerciseToList = value;
    } catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.FAIL,
            message: err.message,
            requestType
        });
    };
    next();
};

const exerciseListUpdateNameSchema = Joi.object({
    list_name: Joi.required(),
});

const exerciseListUpdateNameValidation = (req, res, next) => {
    try {
        const { error, value } = exerciseListUpdateNameSchema.validate(req.body);
        if (error) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: error.message.replace(/\\/g, '').replace(/"/g, ''),
                requestType
            });
        };

        req.updateNameExerciseList = value;
    } catch (err) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.FAIL,
            message: err.message,
            requestType
        });
    };
    next();
}
module.exports = {
    exerciseListCreateValidation,
    exerciseListAddValidation,
    exerciseListDeleteValidation,
    exerciseListUpdateNameValidation
}
