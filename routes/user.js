const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

// [POST] /user
router.get('/', UserController.index)

// [POST] /user/register
router.post('/register', UserController.register)

// [POST] /user/login
router.post('/login', UserController.logIn)

module.exports = router