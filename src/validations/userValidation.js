const Joi = require('joi')

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().required().min(6).max(20).trim().pattern(/^[a-zA-Z0-9]+$/).messages({
      'any.required': 'Tên tài khoản là bắt buộc.',
      'string.empty': 'Tên toài khoản không được để trống.',
      'string.min': 'Tên tài khoản phải có ít nhất 6 ký tự.',
      'string.max': 'Tên tài khoản không được vượt quá 20 ký tự.',
      'string.pattern.base': 'Tên tài khoản chỉ bao gồm chữ cái và số.'
    }),
    password: Joi.string().required().min(6).trim().messages({
      'any.required': 'Mật khẩu là bắt buộc.',
      'string.empty': 'Mật khẩu không được để trống.',
      'string.min': 'Mật khẩu phải có ít nhất 6 ký tự.',
    }),
    fullName: Joi.string().required().min(3).pattern(/^[a-zA-Z\s]+$/).messages({
      'any.required': 'Họ tên là bắt buộc.',
      'string.empty': 'Họ tên không được để trống.',
      'string.min': 'Nhập vào ít nhất 3 kí tự.',
    }),
    phone: Joi.string().required().trim().strict().pattern(/^[0-9]+$/).messages({
      'any.required': 'Số điện thoại là bắt buộc.',
      'string.empty': 'Số điện thoại không được để trống.',
      'string.pattern.base': 'Số điện thoại không hợp lệ (không chứa ký tự).'
    }),
    email: Joi.string().required().email().trim().messages({
      'any.required': 'Email là bắt buộc.',
      'string.empty': 'Email không được để trống.',
      'string.email': 'Email không đúng định dạng.'
    }),
    address: Joi.string().required().trim().messages({
      'any.required': 'Địa chỉ là bắt buộc.',
      'string.empty': 'Địa chỉ không được để trống.',
    }),
    role: Joi.string().valid('admin', 'staff', 'customer').default('customer').messages({
      'any.only': 'Role không hợp lệ, phải là một trong ba vị trí: admin, staff, customer.'
    })
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false }) //abortEarly validate toàn bộ correctCondition
    next()
  } catch (error) {
    return res.status(422).json({
    message: 'Validation Error',
    errors: error.details.map(detail => detail.message) // Lấy danh sách lỗi từ Joi
    })
  }
}

const updateUser = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().optional().min(6).max(20).trim().pattern(/^[a-zA-Z0-9]+$/).messages({
      'string.min': 'Tên tài khoản phải có ít nhất 6 ký tự.',
      'string.max': 'Tên tài khoản không được vượt quá 20 ký tự.',
      'string.pattern.base': 'Tên tài khoản chỉ bao gồm chữ cái và số.'
    }),
    password: Joi.string().optional().min(6).trim().messages({
      'string.min': 'Mật khẩu phải có ít nhất 6 ký tự.',
    }),
    fullName: Joi.string().optional().min(3).pattern(/^[a-zA-Z\s]+$/).messages({
      'string.min': 'Nhập vào ít nhất 3 kí tự.',
    }),
    phone: Joi.string().optional().trim().strict().pattern(/^[0-9]+$/).messages({
      'string.pattern.base': 'Số điện thoại không hợp lệ (không chứa ký tự).'
    }),
    email: Joi.string().optional().email().trim().messages({
      'string.email': 'Email không đúng định dạng.'
    }),
    address: Joi.string().optional().trim(),
    role: Joi.string().valid('admin', 'staff', 'customer').default('customer').messages({
      'any.only': 'Role không hợp lệ, phải là một trong ba giá trị: admin, staff, customer.'
    })
  })

  try {
    await correctCondition.validateAsync(req.boy, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(422).json({
      message: 'Validation Error',
      errors: error.details.map(detail => detail.message)
    })
  }
}

const userValidation = {
  createNew,
  updateUser
}

module.exports = userValidation