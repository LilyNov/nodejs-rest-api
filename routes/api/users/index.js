const express = require('express')
const router = express.Router()
const validate = require('./validation')
const userController = require('../../../controllers/users')
const guard = require('../../../helpers/guard')
const { createAccountLimiter } = require('../../../helpers/rate-limit-reg')

router.post(
  '/registration',
  createAccountLimiter,
  validate.registration,
  userController.reg
)
router.post('/login', validate.login, userController.login)
router.post('/logout', guard, userController.logout)

module.exports = router
