const Joi = require('joi');

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    productId: Joi.string().required().trim().messages({
      'any.required': 'Product ID is required.',
      'string.empty': 'Product ID cannot be empty.',
      'string.trim': 'Product ID must not have leading or trailing spaces.',
    }),
    size: Joi.string().trim().messages({
      'string.trim': 'Size must not have leading or trailing spaces.',
    }),
    color: Joi.string().trim().messages({
      'string.trim': 'Color must not have leading or trailing spaces.',
    }),
    stock: Joi.number().integer().min(0).default(0).messages({
      'number.base': 'Stock must be a non-negative integer.',
      'number.integer': 'Stock must be a non-negative integer.',
      'number.min': 'Stock must be a non-negative integer.',
    }),
    isAccessory: Joi.boolean().default(false).messages({
      'boolean.base': 'isAccessory must be either true or false.',
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

const updateVariant = async (req, res, next) => {
  const correctCondition = Joi.object({
    productId: Joi.string().optional().trim().messages({
      'any.required': 'Product ID is required.',
      'string.empty': 'Product ID cannot be empty.',
      'string.trim': 'Product ID must not have leading or trailing spaces.',
    }),
    size: Joi.string().optional().trim().messages({
      'string.trim': 'Size must not have leading or trailing spaces.',
    }),
    color: Joi.string().optional().trim().messages({
      'string.trim': 'Color must not have leading or trailing spaces.',
    }),
    stock: Joi.number().integer().optional().min(0).messages({
      'number.base': 'Stock must be a non-negative integer.',
      'number.integer': 'Stock must be a non-negative integer.',
      'number.min': 'Stock must be a non-negative integer.',
    }),
    isAccessory: Joi.boolean().optional(),
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

const variantValidation = {
  createNew,
  updateVariant,
};

module.exports = variantValidation;
