const { registerUser, login } = require('~/contronllers/authController')
const router = require('express').Router()

router.post('/register', registerUser)

router.post('/login', login)

// //Refesh
// router.post('/refesh', reqRefeshToken)

const auth = router

module.exports = auth