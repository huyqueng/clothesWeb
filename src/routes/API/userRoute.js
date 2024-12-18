  const router = require('express').Router()
  const userController = require('~/controllers/userController')
  const authMiddleware = require('~/middlewares/authMiddleware')
  const  userValidation  = require('~/validations/userValidation')

  router.get("/list-user", authMiddleware.verifyAdmin, userController.getAllUsers)
  router.post('/create-user',authMiddleware.verifyAdmin, userValidation.createNew, userController.createUser)
  router.delete('/delete-user/:id', authMiddleware.verifyAdmin, userController.deleteUser)
  router.put('/update-user/:id', userValidation.updateUser, userController.updateUser)

  const userRoute = router

  module.exports = userRoute