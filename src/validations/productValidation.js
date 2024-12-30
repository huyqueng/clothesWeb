const Joi = require('joi');

const createNew = async (req, res, next) => {
  const validationSchema = Joi.object({
    name: Joi.string().required().trim().messages({
      'any.required': 'Tên sản phẩm là bắt buộc.',
      'string.empty': 'Tên sản phẩm không được để trống.',
    }),
    description: Joi.string().allow('').messages({
      'any.required': 'Mô tả sản phẩm là bắt buộc.',
    }),
    price: Joi.number().required().min(0).messages({
      'any.required': 'Giá sản phẩm là bắt buộc.',
      'number.empty': 'Giá sản phẩm không được để trống.',
      'number.min': 'Giá sản phẩm không được nhỏ hơn 0.',
    }),
    category: Joi.string().required().messages({
      'any.required': 'Danh mục sản phẩm là bắt buộc.',
      'string.empty': 'Danh mục sản phẩm không được để trống.',
    }),
  });

  try {
    await validationSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(422).json({
      message: 'Lỗi xác thực',
      errors: error.details.map((detail) => detail.message),
    });
  }
};

const updateProduct = async (req, res, next) => {
  const validationSchema = Joi.object({
    name: Joi.string().optional().trim(),
    description: Joi.string().optional().allow(''),
    price: Joi.number().optional().min(0).messages({
      'number.min': 'Giá sản phẩm không được nhỏ hơn 0.',
    }),
    category: Joi.string().optional(),
  });

  try {
    await validationSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(422).json({
      message: 'Lỗi xác thực',
      errors: error.details.map((detail) => detail.message),
    });
  }
};

const productValidation = {
  createNew,
  updateProduct,
};

module.exports = productValidation;
