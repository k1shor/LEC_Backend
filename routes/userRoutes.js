const { register, verifyEmail, forgetPassword, resetPassword, signin } = require('../controllers/userController')
const { userRegisterRules, validationMethod } = require('../middlewares/categoryValidation')

const router = require('express').Router()

router.post('/register', userRegisterRules, validationMethod, register)
router.get('/verifyEmail/:token', verifyEmail)
router.post('/forgetpassword', forgetPassword)
router.post('/resetpassword/:token', resetPassword)
router.post('/login', signin)

module.exports = router