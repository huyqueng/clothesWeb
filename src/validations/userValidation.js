const Joi = require('joi');

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().required().min(6).max(20).trim().pattern(/^[a-zA-Z0-9]+$/).messages({
      'any.required': 'The username is required.',
      'string.empty': 'The username cannot be empty.',
      'string.min': 'The username must have at least 6 characters.',
      'string.max': 'The username cannot exceed 20 characters.',
      'string.pattern.base': 'The username must only contain letters and numbers.',
    }),
    password: Joi.string().required().min(6).trim().messages({
      'any.required': 'The password is required.',
      'string.empty': 'The password cannot be empty.',
      'string.min': 'The password must have at least 6 characters.',
    }),
    fullName: Joi.string().required().min(3).pattern(/^[a-zA-Z\s]+$/).messages({
      'any.required': 'The full name is required.',
      'string.empty': 'The full name cannot be empty.',
      'string.min': 'The full name must have at least 3 characters.',
    }),
    phone: Joi.string().required().trim().strict().pattern(/^[0-9]+$/).messages({
      'any.required': 'The phone number is required.',
      'string.empty': 'The phone number cannot be empty.',
      'string.pattern.base': 'The phone number is invalid (must not contain characters).',
    }),
    email: Joi.string().required().email().trim().messages({
      'any.required': 'The email is required.',
      'string.empty': 'The email cannot be empty.',
      'string.email': 'The email format is invalid.',
    }),
    address: Joi.string().required().trim().messages({
      'any.required': 'The address is required.',
      'string.empty': 'The address cannot be empty.',
    }),
    role: Joi.string().valid('admin', 'staff', 'customer').default('customer').messages({
      'any.only': 'Invalid role. It must be one of the following: admin, staff, customer.',
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

const updateUser = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().optional().min(6).max(20).trim().pattern(/^[a-zA-Z0-9]+$/).messages({
      'string.min': 'The username must have at least 6 characters.',
      'string.max': 'The username cannot exceed 20 characters.',
      'string.pattern.base': 'The username must only contain letters and numbers.',
    }),
    password: Joi.string().optional().min(6).trim().messages({
      'string.min': 'The password must have at least 6 characters.',
    }),
    fullName: Joi.string().optional().min(3).pattern(/^[a-zA-Z\s]+$/).messages({
      'string.min': 'The full name must have at least 3 characters.',
    }),
    phone: Joi.string().optional().trim().strict().pattern(/^[0-9]+$/).messages({
      'string.pattern.base': 'The phone number is invalid (must not contain characters).',
    }),
    email: Joi.string().optional().email().trim().messages({
      'string.email': 'The email format is invalid.',
    }),
    address: Joi.string().optional().trim(),
    role: Joi.string().valid('admin', 'staff', 'customer').default('customer').messages({
      'any.only': 'Invalid role. It must be one of the following: admin, staff, customer.',
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

const userValidation = {
  createNew,
  updateUser,
};

module.exports = userValidation;