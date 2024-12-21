const Joi = require('joi');

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().required().max(30).trim().messages({
      'any.required': 'The product category name is required.',
      'string.empty': 'The product category name cannot be empty.',
      'string.max': 'The product category name cannot exceed 30 characters.',
    }),
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(422).json({
      message: 'Validation Error',
      errors: error.details.map((detail) => detail.message),
    });
  }
};

const updateCategory = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().optional().max(30).trim().messages({
      'string.max': 'The product category name cannot exceed 30 characters.',
    }),
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(422).json({
      message: 'Validation Error',
      errors: error.details.map((detail) => detail.message),
    });
  }
};

const categoryValidation = {
  createNew,
  updateCategory,
};

module.exports = categoryValidation;