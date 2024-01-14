const Joi = require("joi");

const ValidationSchema = Joi.object({
    idBoard: Joi.string().required()
});

const validateListR = (req, res, next) => {
    const { error, value } =ValidationSchema.validate(req.body, {abortEarly: false});
    console.log(error)
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }

    req.body = value;
    next();
};

module.exports = validateListR;