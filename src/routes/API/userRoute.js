  const router = require('express').Router()
  const userController = require('~/contronllers/userController')
  const authMiddleware = require('~/middlewares/authMiddleware')
  const  userValidation  = require('~/validations/userValidation')

  router.get("/list-user" ,userController.getUsers)
  router.post('/create-user', userValidation.createNew, userController.createUser)
  router.delete('/delete-user/:id',  userController.deleteUser)
  router.put('/update-user/:id', userValidation.updateUser, userController.updateUser)

  const userRoute = router

  module.exports = userRoute