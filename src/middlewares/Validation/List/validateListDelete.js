const Joi = require("joi");

const ValidationSchema = Joi.object({
    _id : Joi.string().required()
});


const validateListDelete = (req, res, next) => {
    const { error, value } =ValidationSchema.validate(req.query, {abortEarly: false});
    console.log(error)
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }

    
    req.query = value;
    next();
};

module.exports = validateListDelete;