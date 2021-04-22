const express = require('express')
const userRouter = new express.Router()

const UserController = require('../controller/user-controller.js')

userRouter.post('/user/create',UserController.userSignup)

userRouter.post('/user/edit/',UserController.userEdit)

userRouter.delete('/user/delete/',UserController.deleteUser)

userRouter.get('/user/getAll/',UserController.getUsers)

module.exports = userRouter