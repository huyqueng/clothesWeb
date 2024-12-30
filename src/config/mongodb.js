const mongoose = require('mongoose')
require('dotenv').config()

//Cấu hình kết nối DB
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Can not connect to database', error)
    process.exit(0)
  }
}

module.exports = connection