const express = require('express')
const connection = require('~/config/mongodb')
const app = express()
const cookieParser = require('cookie-parser')

const host = process.env.HOST
const port = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

connection();

//Router
const userRoute = require('~/routes/API/userRoute')
const auth = require('~/routes/API/authRoute')


//use route
app.use('/api/user', userRoute)
app.use('/api/auth', auth)

app.listen(port, () => {
  console.log("Server is running")
})