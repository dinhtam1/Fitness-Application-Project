const Type = require('../constant/appRequestType.js')
const Joi = require('joi');
const statusCode = require('../constant/appNumber.js')
const GENDER = {
    MALE : 'MALE',
    FEMALE : 'FEMALE',
}
const LEVEL = {
    BEGINNER : 'BEGINNER',
    INTERMEDIATE : 'INTERMEDIATE',
    ADVANCED : 'ADVANCED',
}
const GOAL = {
    WEIGHT_LOSS : 'WEIGHT_LOSS',
    MUSCLE_GAIN : 'MUSCLE_GAIN',
    FITNESS : 'FITNESS',
}
const NUMBER = {
    MIN_PASSWORD : 6,
    PHONE_NUMBER : 10
}
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

const createUserValidation = (req, res, next) => {
    try {
        var requestType = Type.VALIDATION;
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(statusCode.SUCCESS).send({
                statusCode: statusCode.SUCCESS,
                message: error.message,
                requestType
            });
        }
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: error.message,
            requestType
        });
    }
    next();
};

const signInUserValidation = (req, res, next) => {
    try {
        var requestType = Type.VALIDATION;
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(statusCode.SUCCESS).send({
                statusCode: statusCode.SUCCESS,
                message: error.message,
                requestType
            });
        }
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
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
            return res.status(statusCode.SUCCESS).send({
                statusCode: statusCode.SUCCESS,
                message: error.message,
                requestType
            });
        }
    } catch (error) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: error.message,
            requestType
        });
    }
    next();
}

module.exports = { createUserValidation, signInUserValidation, forgotPasswordValidation };