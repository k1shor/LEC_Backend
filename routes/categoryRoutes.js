const express = require('express')
const { addCategory, getAllCategories, getCategoryDetails, updateCategory, deleteCategory } = require('../controllers/categoryController')
const router = express.Router()

router.post('/addcategory', addCategory)
router.get('/getallcategories', getAllCategories)
router.get('/getcategorydetails/:id', getCategoryDetails)
router.put('/updatecategory/:id', updateCategory)
router.delete('/deletecategory/:id', deleteCategory)

// app.use('/api/category', CategoryRoutes)
// router.post('/', addCategory)
// router.get('/', getAllCategories)
// router.get('/:id', getCategoryDetails)
// router.put('/:id', updateCategory)
// router.delete('/:id', deleteCategory)

module.exports = router