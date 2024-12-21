const express = require('express')
const app = express()

const connection = require('~/config/mongodb')
const cookieParser = require('cookie-parser')
const userRoute = require('~/routes/API/userRoute')
const authRoute = require('~/routes/API/authRoute')
const categoryRoute = require('~/routes/API/categoryRoute')
const productRoute = require('~/routes/API/productRoute')
const variantRouter = require('~/routes/API/productVariantRoute')

const host = process.env.HOST
const port = process.env.PORT

//Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser()) 

//Connect mongo
connection();

//Routes
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/category', categoryRoute)
app.use('/api/product', productRoute)
app.use('/api/product-variant', variantRouter)

app.listen(port, () => {
  console.log("Server is running")
})