const CategoryModel = require('../models/categoryModel')

// add category
exports.addCategory = async (req, res) => {
    let categoryExists = await CategoryModel.findOne({
        category_name: req.body.category_name
    })
    if(categoryExists){
        return res.status(400).json({error:"Category already exists"})
    }

    let categoryToCreate = await CategoryModel.create({
        category_name: req.body.category_name
    })
    if (!categoryToCreate) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(categoryToCreate)
}

// get all categories
exports.getAllCategories = async (req, res) => {
    let categories = await CategoryModel.find()
    if (!categories) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(categories)
}

// get category details
exports.getCategoryDetails = async (req, res) => {
    let category = await CategoryModel.findById(req.params.id)
    if (!category) {
        return res.status(400).json({ error: "Something went wrong" })
    }
    res.send(category)
}

// update category
exports.updateCategory = async (req, res) => {
    try {
        let categoryToUpdate = await CategoryModel.findByIdAndUpdate(req.params.id, {
            category_name: req.body.category_name
        }, { new: true })
        if (!categoryToUpdate) {
            return res.status(400).json({ error: "Something went wrong" })
        }
        res.send(categoryToUpdate)
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

// delete Category
exports.deleteCategory = (req, res) => {
    CategoryModel.findByIdAndDelete(req.params.id)
        .then((deletedCategory) => {
            if (!deletedCategory) {
                return res.status(400).json({ error: "Category not found" })
            }
            res.send({ message: "Category Deleted Successfully" })
        })
        .catch(error => res.status(500).json({ error: "Something went wrong" }))
}