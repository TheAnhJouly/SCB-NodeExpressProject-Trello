const Joi = require("joi");

const ValidationSchema = Joi.object({
    id : Joi.string().required()
});


const validateUserDelete = (req, res, next) => {
    const { error, value } =ValidationSchema.validate(req.query, {abortEarly: false});
    console.log(error)
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }

    
    req.query = value;
    next();
};

module.exports = validateUserDelete;