const Joi = require('joi');

    const BoardValidationSchema = Joi.object({
    boardName: Joi.string().required(),
    desBoard: Joi.string().required(),
    lists: Joi.array().allow(null, '')
    });

    const validateBoardCreate = (req, res, next) => {
    
    const { error, value } = BoardValidationSchema.validate(req.body, {abortEarly: false});
    if (error) { 
        const errorMessages = error.details.map((detail) => detail.message); 
        return res.status(400).json({ errors: errorMessages }); 
    }
    req.body = value;
    next();
};

module.exports = validateBoardCreate;