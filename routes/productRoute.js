const { addProduct, getAllProducts, getProductDetails, updateProduct, deleteProduct } = require('../controllers/productController')

const router = require('express').Router()

router.post('/addproduct', addProduct)
router.get('/getallproducts', getAllProducts)
router.get('/getproductdetails/:id', getProductDetails)
router.put('/updateproduct/:id', updateProduct)
router.delete('/deleteproduct', deleteProduct)

module.exports = router