const CategoryModel = require('../models/categoryModel')

// add category
exports.addCategory = async (req, res) => {
    let categoryToCreate = await CategoryModel.create({
        category_name: req.body.category_name
    })
    if(!categoryToCreate){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(categoryToCreate)
}

// get all categories
exports.getAllCategories = async (req, res) => {
    let categories = await CategoryModel.find()
    if(!categories){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send(categories)
}