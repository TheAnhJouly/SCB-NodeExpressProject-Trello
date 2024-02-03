const Joi = require('joi');

    const ListValidationSchema = Joi.object({
    idBoard: Joi.string().required(),
    listName: Joi.string().required(),
    position: Joi.number(),
    Cards: Joi.array().allow(null, '')
    });
 
    const validateListCreate = (req, res, next) => {
    
    const { error, value } = ListValidationSchema.validate(req.body, {abortEarly: false});
    if (error) { 
        const errorMessages = error.details.map((detail) => detail.message); 
        return res.status(400).json({ errors: errorMessages }); 
    }
    req.body = value;
    next();
};

module.exports = validateListCreate;