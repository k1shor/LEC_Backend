const express = require('express')
const { addCategory, getAllCategories, getCategoryDetails, updateCategory, deleteCategory } = require('../controllers/categoryController')
const { validateLogin, requireAdmin } = require('../middlewares/authentication')
const { addCategoryRules, validationMethod } = require('../middlewares/categoryValidation')
const router = express.Router()

router.post('/addcategory', requireAdmin, addCategoryRules, validationMethod, addCategory)
router.get('/getallcategories', getAllCategories)
router.get('/getcategorydetails/:id', getCategoryDetails)
router.put('/updatecategory/:id', requireAdmin, updateCategory)
router.delete('/deletecategory/:id', requireAdmin, deleteCategory)

// app.use('/api/category', CategoryRoutes)
// router.post('/', addCategory)
// router.get('/', getAllCategories)
// router.get('/:id', getCategoryDetails)
// router.put('/:id', updateCategory)
// router.delete('/:id', deleteCategory)

module.exports = router