const Joi = require('joi');

    const BoardValidationSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    });

    const validateUserCreate = (req, res, next) => {
    
    const { error, value } = BoardValidationSchema.validate(req.body, {abortEarly: false});
    if (error) { 
        const errorMessages = error.details.map((detail) => detail.message); 
        return res.status(400).json({ errors: errorMessages }); 
    }
    req.body = value;
    next();
};

module.exports = validateUserCreate;