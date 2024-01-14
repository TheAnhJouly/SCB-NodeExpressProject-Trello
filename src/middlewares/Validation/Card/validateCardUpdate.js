const Joi = require("joi");

const ValidationSchema = Joi.object({
    idCard: Joi.string().required(),
    cardName: Joi.string().required(),
});


const validateCardUpdate = (req, res, next) => {
    const { error, value } =ValidationSchema.validate(req.body, {abortEarly: false});
    console.log(error)
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }
    req.body = value;
    next();
};

module.exports = validateCardUpdate;

