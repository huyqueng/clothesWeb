const multer = require('multer')
const path = require('path')

//Lưu trữ ảnh ở thư mục uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

//Chỉ lưu trữ file ảnh
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  }
  else {
    cb(new Error('Chỉ cho phép file hình ảnh (JPG, PNG, JPEG, GIF)'), false)
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } //Dung lượng ảnh không vượt quá 5MB
})

module.exports = upload