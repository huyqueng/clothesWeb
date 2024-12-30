const mongoose = require('mongoose')
require('dotenv').config()

//Cấu hình kết nối DB
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('Kết nối thành công tới MongoDB')
  } catch (error) {
    console.log('Không thể kết nối tới MongoDB', error)
    process.exit(0)
  }
}

module.exports = connection