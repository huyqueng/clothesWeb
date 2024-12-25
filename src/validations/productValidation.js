const Joi = require('joi');

const createNew = async (req, res, next) => {
  const validationSchema = Joi.object({
    name: Joi.string().required().trim().messages({
      'any.required': 'Product name is required.',
      'string.empty': 'Product name cannot be empty.',
    }),
    description: Joi.string().allow('').messages({
      'any.required': 'Product description is required.',
    }),
    price: Joi.number().required().min(0).messages({
      'any.required': 'Product price is required.',
      'number.empty': 'Product price cannot be empty.',
      'number.min': 'Product price cannot be less than 0.',
    }),
    category: Joi.string().required().messages({
      'any.required': 'Product category is required.',
      'string.empty': 'Product category cannot be empty.',
    }),
  });

  try {
    await validationSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(422).json({
      message: 'Validation Error',
      errors: error.details.map((detail) => detail.message),
    });
  }
};

const updateProduct = async (req, res, next) => {
  const validationSchema = Joi.object({
    name: Joi.string().optional().trim(),
    description: Joi.string().optional().allow(''),
    price: Joi.number().optional().min(0).messages({
      'number.min': 'Product price cannot be less than 0.',
    }),
    category: Joi.string().optional(),
  });

  try {
    await validationSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(422).json({
      message: 'Validation Error',
      errors: error.details.map((detail) => detail.message),
    });
  }
};

const productValidation = {
  createNew,
  updateProduct,
};

module.exports = productValidation;
