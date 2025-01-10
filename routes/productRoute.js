const { addProduct, getAllProducts, getProductDetails, updateProduct, deleteProduct } = require('../controllers/productController')
const { requireAdmin } = require('../middlewares/authentication')
const { addProductRules, validationMethod } = require('../middlewares/categoryValidation')
const upload = require('../middlewares/fileUpload')

const router = require('express').Router()

router.post('/addproduct', upload.single('product_image'), addProductRules, validationMethod, addProduct)
router.get('/getallproducts', getAllProducts)
router.get('/getproductdetails/:id', getProductDetails)
router.put('/updateproduct/:id', requireAdmin, updateProduct)
router.delete('/deleteproduct', requireAdmin, deleteProduct)

module.exports = router