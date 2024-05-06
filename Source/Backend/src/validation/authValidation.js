const Type = require('../constant/appRequestType.js')
const Joi = require('joi');
const statusCode = require('../constant/appNumber.js')
const userSchema = Joi.object({
    full_name: Joi.string().required(),
    phone_number: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    age: Joi.number().integer().positive().strict(),
    gender: Joi.string().valid('MALE', 'FEMALE'),
    weight: Joi.number().positive().strict(),
    goal_weight: Joi.number().positive().strict(),
    height: Joi.number().positive().strict(),
    level: Joi.string().valid('BEGINNER', 'INTERMEDIATE', 'ADVANCED'),
    goal: Joi.string().valid('WEIGHT_LOSS', 'MUSCLE_GAIN', 'FITNESS'),
});

const passwordSchema = Joi.object({
    new_password: Joi.string().required().min(6),
    confirm_password: Joi.string().required().min(6),
})

const createUserValidation = (req, res, next) => {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(200).send({
                statusCode: statusCode.SUCCESS,
                message: error.message,
                requestType: Type.VALIDATION
            });
        }
    } catch (error) {
        return res.status(500).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
    next();
};

const signInUserValidation = (req, res, next) => {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(200).send({
                statusCode: statusCode.SUCCESS,
                message: error.message,
                requestType: Type.VALIDATION
            });
        }
    } catch (error) {
        return res.status(500).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
    next();
};

const forgotPasswordValidation = (req, res, next) => {
    try {
        const { error } = passwordSchema.validate(req.body);
        if (error) {
            return res.status(200).send({
                statusCode: statusCode.SUCCESS,
                message: error.message,
                requestType: Type.VALIDATION
            });
        }
    } catch (error) {
        return res.status(500).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
    next();
}

module.exports = { createUserValidation, signInUserValidation, forgotPasswordValidation };