const Joi = require('joi');

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().required().max(30).trim().messages({
      'any.required': 'Tên danh mục sản phẩm là bắt buộc.',
      'string.empty': 'Tên danh mục sản phẩm không được để trống.',
      'string.max': 'Tên danh mục sản phẩm không được vượt quá 30 ký tự.',
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

const updateCategory = async (req, res, next) => {
  const correctCondition = Joi.object({
    name: Joi.string().optional().max(30).trim().messages({
      'string.max': 'Tên danh mục sản phẩm không được vượt quá 30 ký tự.',
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

const categoryValidation = {
  createNew,
  updateCategory,
};

module.exports = categoryValidation;
