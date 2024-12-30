const { registerUser, login, logout } = require('~/controllers/authController')
const  userValidation  = require('~/validations/userValidation')
const router = require('express').Router()

router.post('/register',userValidation.createNew , registerUser)
router.post('/login', login)
router.get('/logout', logout)

const authRoute = router

module.exports = authRoute