const ProductModel = require('../models/productModel')

// add product
exports.addProduct = async (req, res) => {
    let productToAdd = await ProductModel.create({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        count_in_stock: req.body.count_in_stock,
        category: req.body.category
    })
    if (!productToAdd) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(productToAdd)
}

// get all products
exports.getAllProducts = async (req, res) => {
    let products = await ProductModel.find().populate('category', 'category_name')
    if (!products) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(products)
}

// get product details
exports.getProductDetails = async (req, res) => {
    let product = await ProductModel.findById(req.params.id).populate('category', 'category_name')
    if (!product) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(product)
}

// update product
exports.updateProduct = async (req, res) => {
    let productToUpdate = await ProductModel.findByIdAndUpdate(req.params.id, {
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
        count_in_stock: req.body.count_in_stock,
        category: req.body.category,
        rating: req.body.rating
    }, {new: true})
    if(!productToUpdate){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(productToUpdate)
}

// delete product
exports.deleteProduct = async (req, res) =>{
    let deletedProduct = await ProductModel.findByIdAndDelete(req.query.id)
    if(!deletedProduct){
        return res.status(400).json({error:"Product not found"})
    }
    res.send({message:"Product deleted successfully"})
}