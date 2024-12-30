const Joi = require('joi');

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    productId: Joi.string().required().trim().messages({
      'any.required': 'Mã sản phẩm là bắt buộc.',
      'string.empty': 'Mã sản phẩm không được để trống.',
      'string.trim': 'Mã sản phẩm không được có khoảng trắng đầu hoặc cuối.',
    }),
    size: Joi.string().required().trim().messages({
      'any.required': 'Kích thước là bắt buộc.',
      'string.trim': 'Kích thước không được có khoảng trắng đầu hoặc cuối.',
    }),
    color: Joi.string().required().trim().messages({
      'any.required': 'Màu sắc là bắt buộc.',
      'string.trim': 'Màu sắc không được có khoảng trắng đầu hoặc cuối.',
    }),
    stock: Joi.number().integer().required().min(0).default(0).messages({
      'any.required': 'Tồn kho là bắt buộc.',
      'number.base': 'Tồn kho phải là một số nguyên không âm.',
      'number.integer': 'Tồn kho phải là một số nguyên không âm.',
      'number.min': 'Tồn kho phải là một số nguyên không âm.',
    }),
    isAccessory: Joi.boolean().default(false).messages({
      'boolean.base': 'isAccessory phải là true hoặc false.',
    }),
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(422).json({
      message: 'Lỗi xác thực',
      errors: error.details.map((detail) => detail.message),
    });
  }
};

const updateVariant = async (req, res, next) => {
  const correctCondition = Joi.object({
    productId: Joi.string().optional().trim().messages({
      'string.empty': 'Mã sản phẩm không được để trống.',
      'string.trim': 'Mã sản phẩm không được có khoảng trắng đầu hoặc cuối.',
    }),
    size: Joi.string().optional().trim().messages({
      'string.trim': 'Kích thước không được có khoảng trắng đầu hoặc cuối.',
    }),
    color: Joi.string().optional().trim().messages({
      'string.trim': 'Màu sắc không được có khoảng trắng đầu hoặc cuối.',
    }),
    stock: Joi.number().integer().optional().min(0).messages({
      'number.base': 'Tồn kho phải là một số nguyên không âm.',
      'number.integer': 'Tồn kho phải là một số nguyên không âm.',
      'number.min': 'Tồn kho phải là một số nguyên không âm.',
    }),
    isAccessory: Joi.boolean().optional(),
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(422).json({
      message: 'Lỗi xác thực',
      errors: error.details.map((detail) => detail.message),
    });
  }
};

const variantValidation = {
  createNew,
  updateVariant,
};

module.exports = variantValidation;
