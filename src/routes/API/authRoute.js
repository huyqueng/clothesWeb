const { registerUser, login } = require('~/contronllers/authController')
const  userValidation  = require('~/validations/userValidation')
const router = require('express').Router()

router.post('/register',userValidation.createNew , registerUser)
router.post('/login', login)

// //Refesh
// router.post('/refesh', reqRefeshToken)

const authRoute = router

module.exports = authRoute