const express = require('express')
const { addCategory, getAllCategories } = require('../controllers/categoryController')
const router = express.Router()

router.post('/addcategory', addCategory)
router.get('/getallcategories', getAllCategories)

module.exports = router