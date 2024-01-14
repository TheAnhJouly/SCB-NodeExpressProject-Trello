const Joi = require('joi');

    const BoardValidationSchema = Joi.object({
    idList: Joi.string().required(),
    cardName: Joi.string().required(),
    desCard: Joi.string().required(),
    dueDate : Joi.date(),
    cardMember: Joi.string()
    });

    const validateCardCreate = (req, res, next) => {
    
    const { error, value } = BoardValidationSchema.validate(req.body, {abortEarly: false});
    if (error) { 
        const errorMessages = error.details.map((detail) => detail.message); 
        return res.status(400).json({ errors: errorMessages }); 
    }
    req.body = value;
    next();
};

module.exports = validateCardCreate;