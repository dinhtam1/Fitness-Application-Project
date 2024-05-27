const Type = require('../constant/appRequestType.js')
const Joi = require('joi');
const statusCode = require('../constant/appNumber.js')
const appString = require('../constant/appString.js')
const GENDER = {
    MALE: 'male',
    FEMALE: 'female',
}
const LEVEL = {
    BEGINNER: 'BEGINNER',
    INTERMEDIATE: 'INTERMEDIATE',
    ADVANCED: 'ADVANCED',
}
const GOAL = {
    WEIGHT_LOSS: 'WEIGHT_LOSS',
    MUSCLE_GAIN: 'GAIN_MUSCLE',
    FITNESS: 'FITNESS',
}
const NUMBER = {
    MIN_PASSWORD: 6,
    PHONE_NUMBER: 10
}
const ERROR_FIELDS = {
    STR_PATTERN_BASE: "string.pattern.base",
    STR_LENGTH: "string.length",
    NUMBER_BASE: "number.base",
    NUMBER_INTEGER: "number.integer",
    NUMBER_POSITIVE: "number.positive",
    ANY_ONLY: "any.only"
}
var requestType = Type.VALIDATION;

const userSchema = Joi.object({
    full_name: Joi.string().required(),
    phone_number: Joi.string().length(NUMBER.PHONE_NUMBER).pattern(/^[0-9]+$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(NUMBER.MIN_PASSWORD).required(),
    age: Joi.number().integer().positive().strict(),
    gender: Joi.string().valid(GENDER.MALE, GENDER.FEMALE),
    weight: Joi.number().positive().strict(),
    goal_weight: Joi.number().positive().strict(),
    height: Joi.number().positive().strict(),
    level: Joi.string().valid(LEVEL.BEGINNER, LEVEL.INTERMEDIATE, LEVEL.ADVANCED),
    goal: Joi.string().valid(GOAL.WEIGHT_LOSS, GOAL.MUSCLE_GAIN, GOAL.FITNESS),
});

const passwordSchema = Joi.object({
    new_password: Joi.string().required().min(NUMBER.MIN_PASSWORD),
    confirm_password: Joi.string().required().min(NUMBER.MIN_PASSWORD),
})

const userUpdateSchema = Joi.object({
    full_name: Joi.string()
        .pattern(/^[^\d~`!@#$%^&*()_+\-={[}\]|;:'",<.>?/]+$/)
        .messages({
            [ERROR_FIELDS.STR_PATTERN_BASE]: appString.FULL_NAME_PATTERN
        }),
    phone_number: Joi.string()
        .length(10).pattern(/^[0-9]+$/)
        .messages({
            [ERROR_FIELDS.STR_LENGTH]: appString.PHONE_NUMBER_LENGTH,
            [ERROR_FIELDS.STR_PATTERN_BASE]: appString.PHONE_NUMBER_ONLY_NUMBERS,
        }),
    age: Joi.number().integer().positive().strict()
        .messages({
            [ERROR_FIELDS.NUMBER_BASE]: appString.AGE_MUST_BE_NUMBER,
            [ERROR_FIELDS.NUMBER_INTEGER]: appString.AGE_MUST_BE_INTEGER,
            [ERROR_FIELDS.NUMBER_POSITIVE]: appString.AGE_MUST_BE_POSITIVE,
        }),
    gender: Joi.string().valid(GENDER.MALE, GENDER.FEMALE)
        .messages({
            [ERROR_FIELDS.ANY_ONLY]: appString.GENDER_INVALID
        }),
    weight: Joi.number().positive().strict()
        .messages({
            [ERROR_FIELDS.NUMBER_BASE]: appString.WEIGHT_MUST_BE_NUMBER,
            [ERROR_FIELDS.NUMBER_POSITIVE]: appString.WEIGHT_MUST_BE_POSITIVE
        }),
    height: Joi.number().positive().strict()
        .messages({
            [ERROR_FIELDS.NUMBER_BASE]: appString.HEIGHT_MUST_BE_NUMBER,
            [ERROR_FIELDS.NUMBER_POSITIVE]: appString.HEIGHT_MUST_BE_POSITIVE
        }),
    level: Joi.string().valid(LEVEL.BEGINNER, LEVEL.INTERMEDIATE, LEVEL.ADVANCED)
        .messages({
            [ERROR_FIELDS.ANY_ONLY]: appString.LEVEL_INVALID
        }),
    goal: Joi.string().valid(GOAL.WEIGHT_LOSS, GOAL.MUSCLE_GAIN, GOAL.FITNESS)
        .messages({
            [ERROR_FIELDS.ANY_ONLY]: appString.GOAL_INVALID
        }),
    goal_weight: Joi.number().positive().strict(),
});

const createUserValidation = (req, res, next) => {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: error.message.replace(/\\/g, '').replace(/"/g, ''),
                requestType
            });
        }
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.FAIL,
            message: error.message,
            requestType
        });
    }
    next();
};

const userUpdateValidation = (req, res, next) => {
    try {
        if (req.body.weight) req.body.weight = parseInt(req.body.weight);
        if (req.body.height); req.body.height = parseInt(req.body.height);
        if (req.body.age) req.body.age = parseInt(req.body.age)
        const { error, value } = userUpdateSchema.validate(req.body);
        if (error) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: error.stack,
                requestType
            });
        };

        req.updateInfoUser = value;
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.FAIL,
            message: error.message,
            requestType
        });
    };
    next();
};

const signInUserValidation = (req, res, next) => {
    try {
        var requestType = Type.VALIDATION;
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: error.message.replace(/\\/g, '').replace(/"/g, ''),
                requestType
            });
        }
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.FAIL,
            message: error.message,
            requestType
        });
    }
    next();
};

const forgotPasswordValidation = (req, res, next) => {
    try {
        var requestType = Type.VALIDATION;
        const { error } = passwordSchema.validate(req.body);
        if (error) {
            return res.status(statusCode.SUCCESS).json({
                statusCode: statusCode.FAIL,
                message: error.message.replace(/\\/g, '').replace(/"/g, ''),
                requestType
            });
        }
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.FAIL,
            message: error.message,
            requestType
        });
    }
    next();
}

module.exports = { createUserValidation, signInUserValidation, forgotPasswordValidation, userUpdateValidation };