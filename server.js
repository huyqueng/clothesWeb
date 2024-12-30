const express = require('express')
const app = express()

const path = require('path')

const connection = require('~/config/mongodb')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const userRoute = require('~/routes/API/userRoute')
const authRoute = require('~/routes/API/authRoute')
const categoryRoute = require('~/routes/API/categoryRoute')
const productRoute = require('~/routes/API/productRoute')
const variantRouter = require('~/routes/API/productVariantRoute')
const cartRoute = require('~/routes/API/cartRoute')

const host = process.env.HOST
const port = process.env.PORT

//Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser()) 
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Kết nối Mongodb
connection();

//Routes
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/category', categoryRoute)
app.use('/api/product', productRoute)
app.use('/api/product-variant', variantRouter)
app.use('/api/cart', cartRoute)

app.listen(port, () => {
  console.log('Server is running')
})