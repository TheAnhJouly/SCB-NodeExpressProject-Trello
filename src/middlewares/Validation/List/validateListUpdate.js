const Joi = require("joi");

const ValidationSchema = Joi.object({
    _id: Joi.string().required(),
    listName: Joi.string().required(),
});


const validateListUpdate = (req, res, next) => {
    const { error, value } =ValidationSchema.validate(req.body, {abortEarly: false});
    console.log(error)
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }
    req.body = value;
    next();
};

module.exports = validateListUpdate;

