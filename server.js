const express = require('express')
const connection = require('~/config/mongodb')
const app = express()
const cookieParser = require('cookie-parser')

const host = 'localhost'
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

const userRoute = require('~/routes/API/userRoute')
const auth = require('~/routes/API/authRoute')

connection();

//use route
app.use('/api/user', userRoute)
app.use('/api/auth', auth)

app.listen(port, () => {
  console.log("Server is running")
})