  const router = require('express').Router()
  const userController = require('~/contronllers/userController')
  const authMiddleware = require('~/middlewares/authMiddleware')
  const  userValidation  = require('~/validations/userValidation')

  router.get("/list-user", authMiddleware.verifyToken ,userController.getAllUsers)
  router.post('/create-user',authMiddleware.verifyToken, userValidation.createNew, userController.createUser)
  router.delete('/delete-user/:id', authMiddleware.verifyAdmin, userController.deleteUser)
  router.put('/update-user/:id', authMiddleware.verifyAdmin, userValidation.updateUser, userController.updateUser)

  const userRoute = router

  module.exports = userRoute