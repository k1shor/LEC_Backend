const express = require('express')
const { testFunction, hello } = require('../controllers/testController')
const router = express.Router()

router.get('/', testFunction)
router.get('/hello', hello)

module.exports = router