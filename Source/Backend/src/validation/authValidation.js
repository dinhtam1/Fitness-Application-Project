const Joi = require('joi');

const userSchema= Joi.object({
    full_name: Joi.string().required(),
    phone_number: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    age: Joi.number().integer().positive().strict().required(),
    weight: Joi.number().positive().strict().required(),
    goal_weight: Joi.number().positive().strict().required(),
    height: Joi.number().positive().strict().required(),
    level: Joi.string().valid('BEGINNER', 'INTERMEDIATE', 'ADVANCED').required(),
    goal: Joi.string().valid('WEIGHT_LOSS', 'MUSCLE_GAIN', 'FITNESS').required(),

});

const createUserValidation = (req, res, next) => {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(422).send({
                message: error.message
            });
        }
    } catch (err) {
        return res.status(500).send({
            position: "User creation validation Error",
            msg: "Error from the server",
        });
    }
    next();
};

module.exports = {createUserValidation};